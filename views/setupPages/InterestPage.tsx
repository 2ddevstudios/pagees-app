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
import { router } from 'expo-router'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const items = [
    'Fashion',
    'Photography',
    'Bookstore',
    'Healthcare',
    'Content creator',
    'Church'
]

const InterestPage = () => {
    const [active, setActive] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    // atoms
    const id = useAtomValue(signupIdAtom);
    const setStage = useSetAtom(setupStageAtom);
    const toast = useToast();

    const theme = useTheme<Theme>();
    const { width: WIDTH } = useWindowDimensions();

    const toggleItem = (item: string) => {
        setActive(prev => {
            if (prev.includes(item)) {
                // Remove item if it exists
                return prev.filter(i => i !== item);
            } else {
                // Add item if it doesn't exist
                return [...prev, item];
            }
        });
    };

    const handleSave = async () => {
        try {
            if (active.length === 0) {
                toast.show('You have to select at least one interest', { type: 'danger', placement: 'bottom' });
                return;
            }

            setLoading(true);

            // Update the user record in the database
            const { error: updateError } = await supabase
                .from('Users')
                .update({
                    interests: active,
                })
                .eq('id', id);

            if (updateError) {
                throw updateError;
            }
            setLoading(false);
            toast.show('Interests updated successfully', { type: 'success', placement: 'bottom' });
            setStage(1);
            router.push('/auth/login');
        } catch (error: any) {
            toast.show(error?.message || 'An error occurred', { type: 'danger', placement: 'bottom' });
            setLoading(false);
        }
    }

    return (
        <Box flex={1} paddingHorizontal='m' backgroundColor='secondaryBackgroundColor'>
            <Box flex={1}>
                <CustomText variant='subheader' fontSize={20} marginTop='l'>Choose your interests</CustomText>
                <CustomText variant='body' fontSize={16} marginBottom='l'>You can add more later</CustomText>
                <Box overflow='hidden'>
                    <ScrollView style={{ height: '100%' }} contentContainerStyle={{ paddingBottom: 100 }} >

                        <Box flexDirection='row' width={'100%'} flexWrap='wrap' marginBottom='m' justifyContent='space-between'>
                            {items.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => toggleItem(item)}
                                    style={{
                                        width: (WIDTH / 100) * 42,
                                        height: 150,
                                        marginBottom: 10,
                                        marginRight: 10,
                                        borderWidth: active.includes(item) ? 2 : 0.5,
                                        borderColor: active.includes(item) ? theme.colors.primaryColor : theme.colors.borderColor,
                                        borderRadius: 15,
                                        backgroundColor: theme.colors.mainBackgroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    key={index.toString()}
                                >
                                    <CustomText variant='subheader' fontSize={18} color='primaryColor'>{item}</CustomText>
                                </TouchableOpacity>
                            ))}
                        </Box>

                    </ScrollView>
                </Box>
            </Box>

            <Box width={'100%'} height={120}>
                <CustomButton
                    title='Save'
                    width={'100%'}
                    height={50}
                    color={theme.colors.primaryColor2}
                    borderRadius={25}
                    textColor='white'
                    variant='subheader'
                    onPress={handleSave}
                    isLoading={loading}
                />
            </Box>
        </Box>
    )
}

export default InterestPage