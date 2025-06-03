import { Theme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import Box from '../Box';
import ButtonWrapper from '../ButtonWrapper';
import CustomText from '../CustomText';

const AuthHeader = ({ title, customFunction }: { title: string, customFunction?: () => void }) => {
    const { height: HEIGHT } = useWindowDimensions();
    const theme = useTheme<Theme>();

    return (
        <>
            <Box width={'100%'} height={(HEIGHT / 100) * 15} backgroundColor='mainBackgroundColor' flexDirection='row' alignItems='center' paddingHorizontal='m' paddingTop='2xl'>
                <ButtonWrapper width={48} height={48} borderWidth={1} borderColor={theme.colors.borderColor} borderRadius={16} onPress={() => {
                    if (customFunction) {
                        customFunction();
                    } else {
                        if (router.canGoBack()) {
                            router.back();
                        }
                    }
                }}>
                    <Box flex={1} justifyContent='center' alignItems='center'>
                        <Feather name='chevron-left' color={theme.colors.bodyTextColor} size={30} />
                    </Box>
                </ButtonWrapper>
                <CustomText variant='header2' fontSize={18} color='headerTextColor' marginLeft='m'>{title}</CustomText>

            </Box>
        </>
    )
}

export default AuthHeader