// features/auth/hooks/useLogout.ts
import { useDeviceStore } from "@/features/devices/store/deviceStore";
import { router } from "expo-router";
import { useState } from "react";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const clearDevices = useDeviceStore((s) => s.clearDevices);

  async function logout() {
    setIsLoading(true);
    try {
      await authService.logout();
      clearDevices();
      setUser(null);
      router.replace("/(onboarding)/welcome");
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setIsLoading(false);
    }
  }

  return { logout, isLoading };
}
