import { useDeviceStore } from "@/features/devices/store/deviceStore";
import { useTimerStore } from "@/features/devices/store/timerStore";
import { Plug, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import type { DailyUsage } from "../types/dailyUsage.types";

type Props = {
  today: DailyUsage | null;
};

export function ActiveDevicesList({ today }: Props) {
  const devices = useDeviceStore((s) => s.devices);
  const timers = useTimerStore((s) => s.timers);
  const togglingIds = useTimerStore((s) => s.togglingIds);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const deviceEntries = today ? Object.entries(today.devices) : [];

  if (deviceEntries.length === 0) {
    return (
      <View className="mx-4 rounded-3xl bg-white p-5 shadow-sm shadow-black/5">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-bold text-[#0E0E0E]">
            Today's Devices
          </Text>
          <View className="flex-row items-center gap-1">
            <Zap size={12} color="#25CE7F" />
            <Text className="text-xs text-brand font-semibold">0 tracked</Text>
          </View>
        </View>
        <View className="items-center py-4">
          <Text className="text-sm text-[#AAA]">
            No device usage recorded today
          </Text>
          <Text className="text-xs text-[#CCC] mt-1">
            Toggle a device ON to start tracking
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mx-4 rounded-3xl bg-white p-5 shadow-sm shadow-black/5">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-bold text-[#0E0E0E]">
          Today's Devices
        </Text>
        <View className="flex-row items-center gap-1">
          <Zap size={12} color="#25CE7F" />
          <Text className="text-xs text-brand font-semibold">
            {deviceEntries.length} tracked
          </Text>
        </View>
      </View>

      <View className="gap-3">
        {deviceEntries.map(([deviceId, record]) => {
          const isToggling = togglingIds.has(deviceId);
          const liveDevice = !isToggling
            ? devices.find(
                (d) => d.id === deviceId && d.active && d.activatedAt,
              )
            : undefined;

          const timer = timers[deviceId];

          // Single source of truth: timerStore
          const totalMinutes = timer
            ? liveDevice && timer.activatedAt > 0
              ? timer.totalMinutesBefore + (now - timer.activatedAt) / 1000 / 60
              : timer.totalMinutesBefore
            : record.durationMinutes; // fallback saat app baru dibuka

          const totalKwh = liveDevice
            ? (liveDevice.watt * (totalMinutes / 60)) / 1000
            : record.kwh;

          const hours = Math.floor(totalMinutes / 60);
          const mins = Math.floor(totalMinutes % 60);
          const secs = Math.floor((totalMinutes * 60) % 60);
          const durationLabel =
            hours > 0
              ? `${hours}h ${mins}m`
              : mins > 0
                ? `${mins}m ${secs}s`
                : `${secs}s`;

          return (
            <View
              key={deviceId}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`h-9 w-9 rounded-2xl items-center justify-center ${
                    liveDevice ? "bg-[#E8FFF4]" : "bg-[#F5F5F5]"
                  }`}
                >
                  <Plug size={16} color={liveDevice ? "#25CE7F" : "#AAA"} />
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm font-semibold text-[#0E0E0E]">
                      {record.name}
                    </Text>
                    {liveDevice && (
                      <View className="rounded-full bg-[#E8FFF4] px-1.5 py-0.5">
                        <Text className="text-[10px] font-semibold text-brand">
                          LIVE
                        </Text>
                      </View>
                    )}
                    {isToggling && (
                      <View className="rounded-full bg-[#F5F5F5] px-1.5 py-0.5">
                        <Text className="text-[10px] text-[#AAA]">
                          saving...
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-[#888]">
                    {record.watt}W · {durationLabel}
                  </Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-brand">
                {totalKwh.toFixed(4)} kWh
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
