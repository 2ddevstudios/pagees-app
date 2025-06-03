import theme from '@/theme';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from "react-native-popup-menu";
import 'react-native-reanimated';
import { ToastProvider } from 'react-native-toast-notifications';


const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'AncizarSans-Bold': require("../assets/fonts/AncizarSans-Bold.ttf"),
    'AncizarSans-Light': require("../assets/fonts/AncizarSans-Light.ttf"),
    'AncizarSans-Medium': require("../assets/fonts/AncizarSans-Medium.ttf"),
    'AncizarSans-Regular': require("../assets/fonts/AncizarSans-Regular.ttf"),
    'AncizarSans-SemiBold': require("../assets/fonts/AncizarSans-SemiBold.ttf"),
    'AncizarSans-ExtraBold': require("../assets/fonts/AncizarSans-ExtraBold.ttf"),

    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),

    'AirbnbCereal_W_Bold': require('../assets/fonts/AirbnbCereal_W_Bd.otf'),
    'AirbnbCereal_W_Light': require('../assets/fonts/AirbnbCereal_W_Lt.otf'),
    'AirbnbCereal_W_Medium': require('../assets/fonts/AirbnbCereal_W_Md.otf'),
    'AirbnbCereal_W_XtraBold': require('../assets/fonts/AirbnbCereal_W_XBd.otf'),
    'AirbnbCereal_W_Blk': require('../assets/fonts/AirbnbCereal_W_Blk.otf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider
              placement="top"
              style={{
                marginTop: 60,
              }}
              duration={5000}
              animationType="slide-in"
              textStyle={{ fontFamily: "AirbnbCereal_W_Medium", fontSize: 14, color: 'white' }}
              swipeEnabled
              successColor={'#0f7149'}
              dangerColor="red"
              warningColor="black"
            >
              <MenuProvider>
                <Stack initialRouteName='index'>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="dark" backgroundColor='white' translucent animated />
              </MenuProvider>
            </ToastProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </View>
  );
}
