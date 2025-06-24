/* eslint-disable import/no-unresolved */
import { setupStageAtom } from '@/app/auth/setup'
import { signupIdAtom } from '@/app/auth/signup'
import Box from '@/components/Box'
import CustomButton from '@/components/CustomButton'
import CustomText from '@/components/CustomText'
import Urls from '@/hooks/http/urls'
import useToast from '@/hooks/useToast'
import { ApiResponseType } from '@/models/ApiResponseType'
import { Theme } from '@/theme'
import httpService from '@/utils/httpService'
import { useTheme } from '@shopify/restyle'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const items = [
    'Individual',
    'Brand'
]

const AccountTypePage = () => {
    const [active, setActive] = React.useState<string | null>(null);
    const [industries, setIndustries] = React.useState<string[]>([])
    // atoms
    const id = useAtomValue(signupIdAtom);
    const setStage = useSetAtom(setupStageAtom);
    const toast = useToast();

    // queries
    const getIndustries = useQuery<AxiosResponse<ApiResponseType<string[]>>, any>({
        queryKey: ['get-industries'],
        queryFn: () => httpService.get(`${Urls.common}/industries`),
    });

    React.useEffect(() => {
        if (!getIndustries.isLoading && !getIndustries.isError && getIndustries.data) {
            setIndustries(getIndustries.data.data.data as string[]);
            console.log(getIndustries.data.data);
        }
    }, [getIndustries.isError, getIndustries.isLoading, getIndustries.data])

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => httpService.put(`${Urls.auth}/update/user/${id}`, data),
        onError: (error) => {
            toast.show(error?.message, { type: 'danger', placement: 'bottom' });
        },
        onSuccess: (data) => {
            toast.show('Account updated successfully', { type: 'success', placement: 'bottom' });
            setStage(3)//
        }
    });


    const theme = useTheme<Theme>();
    const { width: WIDTH } = useWindowDimensions();

    const handleSave = async () => {
        try {
            if (!active) {
                toast.show('You have to select one type', { type: 'danger', placement: 'bottom' });
                return;
            }


            mutate({ industry: active });
        } catch (error: any) {
            toast.show(error?.message || 'An error occurred', { type: 'danger', placement: 'bottom' });
        }
    }

    return (
        <Box flex={1} paddingHorizontal='m' backgroundColor='secondaryBackgroundColor'>
            <Box flex={1}>

                <CustomText variant='medium' fontSize={16} marginVertical='l'>Which are you?</CustomText>

                <ScrollView>
                    <Box flexDirection='row' width={'100%'} justifyContent='space-between' flexWrap='wrap'>
                        {!getIndustries.isLoading && !getIndustries.isError && industries.map((item, index) => (
                            <TouchableOpacity onPress={() => setActive(item as string)} style={{ width: (WIDTH / 100) * 43, height: 150, borderWidth: active === item ? 2 : 0.5, borderColor: active === item ? theme.colors.primaryColor : theme.colors.borderColor, borderRadius: 15, backgroundColor: theme.colors.mainBackgroundColor, justifyContent: 'center', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 }} key={index.toString()}>
                                <CustomText variant='body' fontSize={16} color='primaryColor' textAlign='center'>{item.replaceAll('_', ' ')}</CustomText>
                            </TouchableOpacity>
                        ))}
                        {getIndustries.isLoading && (
                            <Box width={'100%'} height={50} justifyContent='center' alignItems='center'>
                                <ActivityIndicator size={'large'} />
                                <CustomText variant='body'>Loading industries</CustomText>
                            </Box>
                        )}
                    </Box>
                </ScrollView>
            </Box>

            <Box width={'100%'} height={120}>
                <CustomButton title='Save' width={'100%'} height={50} color={theme.colors.primaryColor2} borderRadius={25} textColor='white' variant='subheader' onPress={() => handleSave()} isLoading={isPending} />
            </Box>
        </Box>
    )
}

export default AccountTypePage