// features/devices/components/DeviceCard.tsx
import { Text, View } from "react-native";
import type { Device } from "../types/device.types";

const CATEGORY_EMOJI: Record<string, string> = {
  electronics: "🖥️",
  appliances: "❄️",
  lighting: "💡",
  other: "🔌",
};

interface Props {
  device: Device;
}

export function DeviceCard({ device }: Props) {
  return (
    <View className="bg-white border border-[#E8E8E8] rounded-2xl px-4 py-3 flex-row items-center gap-3 mb-3">
      <View className="w-11 h-11 rounded-xl bg-[#F0FFF8] items-center justify-center">
        <Text className="text-xl">{CATEGORY_EMOJI[device.category]}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-[#0E0E0E] text-sm font-bold">{device.name}</Text>
        <Text className="text-[#888] text-xs mt-0.5">
          {device.watt}W · {device.hoursPerDay}h/day
        </Text>
      </View>
      <Text className="text-[#25CE7F] text-sm font-bold">
        {(device.monthlyKwh ?? 0).toFixed(1)} kWh
      </Text>
    </View>
  );
}
