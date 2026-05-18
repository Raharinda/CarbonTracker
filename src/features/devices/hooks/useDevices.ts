// features/devices/hooks/useDevices.ts
import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect } from "react";
import { deviceService } from "../services/deviceService";
import { useDeviceStore } from "../store/deviceStore";

export const useDevices = () => {
  const user = useAuthStore((s) => s.user);
  const setDevices = useDeviceStore((s) => s.setDevices);
  const devices = useDeviceStore((s) => s.devices);

  useEffect(() => {
    if (!user?.uid) return;
    deviceService.getUserDevices(user.uid).then(setDevices);
  }, [user?.uid]);

  return { devices };
};
