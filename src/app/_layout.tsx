import { initAuthListener } from "@/features/auth/store/authStore";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";

SplashScreen.preventAutoHideAsync();
initAuthListener(); // ← tambah ini, di luar komponen

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("@/assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("@/assets/fonts/Manrope-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider defaultScheme="system">
      <LoadingProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LoadingProvider>
    </ThemeProvider>
  );
}
