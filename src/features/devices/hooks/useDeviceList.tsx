import { useMemo, useState } from "react";
import { deviceService } from "../services/deviceService";
import { useDeviceStore } from "../store/deviceStore";
import type { Device } from "../types/device.types";
import { useDevices } from "./useDevices";

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

  // NOTE: ini masih pakai string compare — kalau mau akurat, simpan hoursPerDay di DeviceListItem
  const mostActive = allItems.length
    ? allItems.reduce((best, d) =>
        d.usageLabel.localeCompare(best.usageLabel) > 0 ? d : best,
      )
    : null;

  async function toggleActive(id: string) {
    const device = devices.find((item) => item.id === id);
    if (!device) return;

    const nextActive = !device.active;

    try {
      await deviceService.updateDevice(id, { active: nextActive });
      setDevices(
        devices.map((item) =>
          item.id === id ? { ...item, active: nextActive } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update device state:", error);
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
