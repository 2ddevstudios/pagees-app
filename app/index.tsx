
import Box from '@/components/Box';
import ButtonWrapper from '@/components/ButtonWrapper';
import CustomText from '@/components/CustomText';
import { Theme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LoginCurve } from 'iconsax-react-nativejs';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import PagerView from 'react-native-pager-view';


const items: { text: string, image: any, label: string }[] = [
    {
        label: 'Automate Your Pages',
        text: 'Go professional with ease. ',
        image: require('../assets/images/Illustration.png')
    },
    {
        label: 'Track Your Progress',
        text: 'Know what’s working and what isn’t',
        image: require('../assets/images/illustration2.png')
    },
    {
        label: 'Monitor all your pages in 1 place',
        text: 'be more effective...',
        image: require('../assets/images/Illustration.png')
    },
];


const LandingPage = () => {
    const [index, setIndex] = React.useState(0);
    const { height: HEIGHT } = useWindowDimensions()

    const theme = useTheme<Theme>();
    return (
        <LinearGradient
            colors={['#6B73FF', '#000DFF']}
            style={{ flex: 1 }}
        >
            <StatusBar style="light" backgroundColor='white' translucent animated networkActivityIndicatorVisible />
            <Box flex={0.68} justifyContent='center' alignItems='center' paddingHorizontal='m'>
                <PagerView style={{ flex: 1, width: '100%', height: '100%' }} onPageScroll={(e) => setIndex(e.nativeEvent.position)}>
                    {items.map((item, index) => (
                        <Box key={index.toString()} flex={1} width={'100%'} height={"100%"}>
                            <Image source={item.image} contentFit='contain' style={{ width: '100%', height: (HEIGHT / 100) * 58 }} />
                            <CustomText variant='header2' color='white' style={{ width: '70%' }}>{item?.label}</CustomText>
                            <CustomText variant='subheader' fontSize={14} style={{ color: 'whitesmoke', marginTop: 5 }}>{item?.text}</CustomText>
                        </Box>
                    ))}
                </PagerView>
                <Box style={{ width: '100%', height: 'auto', flexDirection: 'row' }}>
                    {items.map((item, indx) => (
                        <Box style={{ marginLeft: indx === 0 ? 0 : 16, backgroundColor: indx === index ? theme.colors.white : theme.colors.disabledTextColor, borderRadius: index === indx ? 5 : 5, width: 6, height: 6, transform: [{ scale: indx === index ? 1.5 : 1.5 }] }} key={indx.toString()} />
                    ))}
                </Box>
            </Box>
            <Box width={'100%'} flex={0.3} justifyContent='flex-end' paddingHorizontal='m' paddingBottom='l'>
                <ButtonWrapper width={'100%'} height={50} onPress={() => { router.push('/auth/login') }} borderRadius={30} backgroundColor={theme.colors.white}>
                    <Box flex={1} flexDirection='row' justifyContent='center' alignItems='center'>
                        <LoginCurve variant='Bulk' size={25} color={theme.colors.bodyTextColor} />
                        <CustomText variant='subheader' fontSize={14}>Continue with Email</CustomText>
                    </Box>
                </ButtonWrapper>

                <Box width={'100%'} marginTop='s' flexDirection='row' justifyContent='space-between'>
                    <ButtonWrapper width={'32%'} height={45} onPress={() => { router.push('/auth/setup') }} borderRadius={30} backgroundColor={theme.colors.white}>
                        <Box flex={1} flexDirection='row' justifyContent='center' alignItems='center'>
                            <Image source={(require('../assets/images/appleicon.png'))} contentFit='contain' style={{ width: 20, height: 20 }} />
                            <CustomText variant='subheader' fontSize={14} style={{ marginLeft: 2 }}>Apple</CustomText>
                        </Box>
                    </ButtonWrapper>

                    <ButtonWrapper width={'32%'} height={45} onPress={() => { }} borderRadius={30} backgroundColor={theme.colors.white}>
                        <Box flex={1} flexDirection='row' justifyContent='center' alignItems='center'>
                            <Image source={(require('../assets/images/googleicon.png'))} contentFit='contain' style={{ width: 20, height: 20 }} />
                            <CustomText variant='subheader' fontSize={14} style={{ marginLeft: 2 }}>Google</CustomText>
                        </Box>
                    </ButtonWrapper>

                    <ButtonWrapper width={'32%'} height={45} onPress={() => { }} borderRadius={30} backgroundColor={theme.colors.white}>
                        <Box flex={1} flexDirection='row' justifyContent='center' alignItems='center'>
                            <Image source={(require('../assets/images/facebookicon.png'))} contentFit='contain' style={{ width: 20, height: 20 }} />
                            <CustomText variant='subheader' fontSize={14} style={{ marginLeft: 2 }}>Facebook</CustomText>
                        </Box>
                    </ButtonWrapper>
                </Box>
                <CustomText marginTop='s' color='white' variant='body' textAlign='center' fontSize={14}>By continuing you agree Terms of Services & Privacy Policy </CustomText>
            </Box>
        </LinearGradient>
    )
}

export default LandingPage