import { Plug } from "lucide-react-native";
import { Switch, Text, View } from "react-native";
import type { DeviceListItem } from "../../hooks/useDeviceList";

type Props = {
  device: DeviceListItem;
  onToggle: (id: string) => void;
};

export function DeviceCard({ device, onToggle }: Props) {
  return (
    <View className="rounded-3xl bg-white p-4 shadow-sm shadow-black/5 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3 flex-1 mr-3">
        <View className="h-14 w-14 rounded-3xl bg-[#E8FFF4] items-center justify-center">
          <Plug size={24} color="#25CE7F" />
        </View>
        <View className="flex-1">
          <Text
            className="text-base font-semibold text-[#0E0E0E]"
            numberOfLines={1}
          >
            {device.name}
          </Text>
          <Text className="text-sm text-[#888]">{device.category}</Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-xs text-[#888] mb-1">{device.usageLabel}</Text>
        <Switch
          value={device.active}
          onValueChange={() => onToggle(device.id)}
          thumbColor={device.active ? "#FFFFFF" : "#F1F5F9"}
          trackColor={{ false: "#D2D6DB", true: "#25CE7F" }}
        />
      </View>
    </View>
  );
}
