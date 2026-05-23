import { useAuthStore } from "@/features/auth/store/authStore";
import { dailyUsageService } from "@/features/energy/services/dailyUsageService";
import { useEffect, useRef } from "react";
import { useDeviceStore } from "../store/deviceStore";
import { useTimerStore } from "../store/timerStore";

const FLUSH_INTERVAL_MS = 10_000;

export function useActiveDeviceTimer() {
  const user = useAuthStore((s) => s.user);
  const devices = useDeviceStore((s) => s.devices);
  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>(
    {},
  );

  useEffect(() => {
    if (!user?.uid) return;

    const activeDevices = devices.filter((d) => d.active && d.activatedAt);
    const activeIds = new Set(activeDevices.map((d) => d.id));

    // Clear interval untuk device yang tidak active
    Object.keys(intervalsRef.current).forEach((id) => {
      if (!activeIds.has(id)) {
        clearInterval(intervalsRef.current[id]);
        delete intervalsRef.current[id];
      }
    });

    activeDevices.forEach((device) => {
      if (intervalsRef.current[device.id]) return;

      // Buat interval — flush ke Firestore setiap 10 detik
      intervalsRef.current[device.id] = setInterval(async () => {
        const timer = useTimerStore.getState().timers[device.id];
        if (!timer || !timer.activatedAt) return;

        const now = Date.now();
        // Flush dari activatedAt timer sampai sekarang
        const durationMs = now - timer.activatedAt;
        const durationMinutes = durationMs / 1000 / 60;
        const kwh = (device.watt * (durationMinutes / 60)) / 1000;

        await dailyUsageService.accumulateDeviceUsage(
          user.uid!,
          new Date(),
          device.id,
          { name: device.name, watt: device.watt, durationMinutes, kwh },
        );

        // Update activatedAt ke sekarang supaya interval berikutnya tidak double count
        useTimerStore
          .getState()
          .startTimer(device.id, timer.totalMinutesBefore + durationMinutes);
      }, FLUSH_INTERVAL_MS);
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      intervalsRef.current = {};
    };
  }, [devices, user?.uid]);
}
