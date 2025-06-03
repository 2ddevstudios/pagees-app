/* eslint-disable import/no-unresolved */
import { setupStageAtom } from '@/app/auth/setup'
import { signupIdAtom } from '@/app/auth/signup'
import Box from '@/components/Box'
import CustomButton from '@/components/CustomButton'
import CustomText from '@/components/CustomText'
import useToast from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'
import { Theme } from '@/theme'
import { useTheme } from '@shopify/restyle'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const items = [
    'Individual',
    'Brand'
]

const AccountTypePage = () => {
    const [active, setActive] = React.useState<'Individual' | 'Brand' | null>(null);
    const [loading, setLoading] = React.useState(false);
    // atoms
    const id = useAtomValue(signupIdAtom);
    const setStage = useSetAtom(setupStageAtom);
    const toast = useToast();

    const theme = useTheme<Theme>();
    const { width: WIDTH } = useWindowDimensions();

    const handleSave = async () => {
        try {
            if (!active) {
                toast.show('You have to select one type', { type: 'danger', placement: 'bottom' });
                return;
            }


            setLoading(true);

            // Update the user record in the database
            const { error: updateError } = await supabase
                .from('Users')
                .update({
                    accountType: active,
                })
                .eq('id', id);

            if (updateError) {
                throw updateError;
            }
            setLoading(false);
            toast.show('Account updated successfully', { type: 'success', placement: 'bottom' });
            setStage(3)//
        } catch (error: any) {
            toast.show(error?.message || 'An error occurred', { type: 'danger', placement: 'bottom' });
        }
    }

    return (
        <Box flex={1} paddingHorizontal='m' backgroundColor='secondaryBackgroundColor'>
            <Box flex={1}>

                <CustomText variant='medium' fontSize={16} marginVertical='l'>Which are you?</CustomText>
                <Box flexDirection='row' width={'100%'} justifyContent='space-between'>
                    {items.map((item, index) => (
                        <TouchableOpacity onPress={() => setActive(item as 'Individual' | 'Brand')} style={{ width: (WIDTH / 100) * 43, height: 150, borderWidth: active === item ? 2 : 0.5, borderColor: active === item ? theme.colors.primaryColor : theme.colors.borderColor, borderRadius: 15, backgroundColor: theme.colors.mainBackgroundColor, justifyContent: 'center', alignItems: 'center' }} key={index.toString()}>
                            <CustomText variant='subheader' fontSize={18} color='primaryColor'>{item}</CustomText>
                        </TouchableOpacity>
                    ))}
                </Box>

            </Box>

            <Box width={'100%'} height={120}>
                <CustomButton title='Save' width={'100%'} height={50} color={theme.colors.primaryColor2} borderRadius={25} textColor='white' variant='subheader' onPress={() => handleSave()} isLoading={loading} />
            </Box>
        </Box>
    )
}

export default AccountTypePage