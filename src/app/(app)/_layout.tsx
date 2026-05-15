// src/app/(app)/_layout.tsx
import { useAuthStore } from "@/features/auth/store/authStore";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/(onboarding)/welcome");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator color="#25CE7F" size="large" />
      </View>
    );
  }

  if (!user) return null;

  return <Slot />;
}
