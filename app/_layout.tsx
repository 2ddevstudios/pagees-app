import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'AncizarSans-Bold': require("../assets/fonts/AncizarSans-Bold.ttf"),
    'AncizarSans-Light': require("../assets/fonts/AncizarSans-Light.ttf"),
    'AncizarSans-Medium': require("../assets/fonts/AncizarSans-Medium.ttf"),
    'AncizarSans-Regular': require("../assets/fonts/AncizarSans-Regular.ttf"),
    'AncizarSans-SemiBold': require("../assets/fonts/AncizarSans-SemiBold.ttf"),
    'AncizarSans-ExtraBold': require("../assets/fonts/AncizarSans-ExtraBold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
