import { useAuthStore } from "@/features/auth/store/authStore";
import { useMemo, useState } from "react";
import { deviceService } from "../services/deviceService";
import { useDeviceStore } from "../store/deviceStore";
import { useTimerStore } from "../store/timerStore";
import type { Device } from "../types/device.types";
import { useDevices } from "./useDevices";
import { useDeviceToggle } from "./useDeviceToggle";

export type DeviceListItem = {
  id: string;
  name: string;
  category: string;
  watt: number;
  usageLabel: string;
  active: boolean;
};

export type DeviceFilter = "all" | "active";

function toUsageLabel(device: Device): string {
  if (device.monthlyKwh != null)
    return `${device.monthlyKwh.toFixed(1)} kWh/mo`;
  return `${device.hoursPerDay.toFixed(1)}h/day`;
}

export function useDeviceList() {
  const { devices } = useDevices();
  const setDevices = useDeviceStore((s) => s.setDevices);
  const { startTimer, setToggling } = useTimerStore();
  const { toggleDevice } = useDeviceToggle();
  const user = useAuthStore((s) => s.user);
  const [filter, setFilter] = useState<DeviceFilter>("all");

  const allItems = useMemo<DeviceListItem[]>(
    () =>
      devices.map((device) => ({
        id: device.id,
        name: device.name,
        category: device.category,
        watt: device.watt,
        usageLabel: toUsageLabel(device),
        active: device.active,
      })),
    [devices],
  );

  const filteredItems = useMemo(
    () => (filter === "active" ? allItems.filter((d) => d.active) : allItems),
    [filter, allItems],
  );

  const activeCount = allItems.filter((d) => d.active).length;

  const highestConsumer = allItems.length
    ? allItems.reduce((best, d) => (d.watt > best.watt ? d : best))
    : null;

  const mostActive = allItems.length
    ? allItems.reduce((best, d) =>
        d.usageLabel.localeCompare(best.usageLabel) > 0 ? d : best,
      )
    : null;

  async function toggleActive(id: string) {
    const device = devices.find((item) => item.id === id);
    if (!device) return;

    const now = new Date();
    try {
      if (!device.active) {
        // Ambil totalMinutesBefore dari store — single source of truth
        const currentTimer = useTimerStore.getState().timers[id];
        const totalMinutesBefore = currentTimer?.totalMinutesBefore ?? 0;

        await deviceService.updateDevice(id, {
          active: true,
          activatedAt: now.getTime(),
        });

        startTimer(id, totalMinutesBefore);

        setDevices(
          devices.map((item) =>
            item.id === id
              ? { ...item, active: true, activatedAt: now.getTime() }
              : item,
          ),
        );
      } else {
        // Hitung total menit sekarang SEBELUM setToggling
        const timer = useTimerStore.getState().timers[id];
        const extraMinutes =
          timer?.activatedAt && timer.activatedAt > 0
            ? (now.getTime() - timer.activatedAt) / 1000 / 60
            : 0;
        const totalMinutesNow = (timer?.totalMinutesBefore ?? 0) + extraMinutes;

        // Stop timer di store dulu — UI langsung pakai totalMinutesBefore
        useTimerStore.getState().stopTimer(id, totalMinutesNow);

        setToggling(id, true);
        await toggleDevice(device); // flush ke Firestore
        setToggling(id, false);
      }
    } catch (error) {
      console.error("Failed to update device state:", error);
      setToggling(id, false);
    }
  }

  return {
    allItems,
    filteredItems,
    filter,
    setFilter,
    activeCount,
    highestConsumer,
    mostActive,
    toggleActive,
  };
}
