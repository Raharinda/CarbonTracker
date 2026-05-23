import { useAuthStore } from "@/features/auth/store/authStore";
import { dailyUsageService } from "@/features/energy/services/dailyUsageService";
import { deviceService } from "../services/deviceService";
import { useTimerStore } from "../store/timerStore";
import type { Device } from "../types/device.types";

export function useDeviceToggle() {
  const user = useAuthStore((s) => s.user);

  async function flushDeviceUsage(
    device: Device,
    until: Date,
    userId: string,
  ): Promise<void> {
    if (!device.activatedAt) return;

    const timer = useTimerStore.getState().timers[device.id];
    // Flush dari activatedAt timer (sudah di-update setiap interval)
    const flushFrom =
      timer?.activatedAt && timer.activatedAt > 0
        ? timer.activatedAt
        : device.activatedAt;

    const durationMs = until.getTime() - flushFrom;
    const durationMinutes = durationMs / 1000 / 60;
    if (durationMinutes <= 0) return;

    const kwh = (device.watt * (durationMinutes / 60)) / 1000;
    await dailyUsageService.accumulateDeviceUsage(userId, until, device.id, {
      name: device.name,
      watt: device.watt,
      durationMinutes,
      kwh,
    });
  }

  async function toggleDevice(device: Device): Promise<void> {
    if (!user?.uid) return;
    const now = new Date();

    if (!device.active) {
      await deviceService.updateDevice(device.id, {
        active: true,
        activatedAt: now.getTime(),
      });
    } else {
      await flushDeviceUsage(device, now, user.uid);
      // stopTimer sudah dipanggil di useDeviceList sebelum toggleDevice
      await deviceService.updateDevice(device.id, {
        active: false,
        activatedAt: null,
      });
    }
  }

  async function reconcileActiveDevices(devices: Device[]): Promise<void> {
    if (!user?.uid) return;
    const now = new Date();
    const activeDevices = devices.filter((d) => d.active && d.activatedAt);

    await Promise.all(
      activeDevices.map((device) => flushDeviceUsage(device, now, user.uid!)),
    );
    await Promise.all(
      activeDevices.map((device) =>
        deviceService.updateDevice(device.id, { activatedAt: now.getTime() }),
      ),
    );
  }

  return { toggleDevice, reconcileActiveDevices };
}
