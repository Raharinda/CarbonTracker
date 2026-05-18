// features/devices/components/CategoryGrid.tsx
import { Pressable, Text, View } from "react-native";
import type { DeviceCategory } from "../types/device.types";

interface CategoryOption {
  value: DeviceCategory;
  label: string;
  subtitle: string;
  emoji: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    value: "electronics",
    label: "Electronics",
    subtitle: "TV, PC, Console",
    emoji: "🖥️",
  },
  {
    value: "appliances",
    label: "Appliances",
    subtitle: "Fridge, AC, Wash",
    emoji: "❄️",
  },
  {
    value: "lighting",
    label: "Lighting",
    subtitle: "LED, Lamp, Strip",
    emoji: "💡",
  },
  {
    value: "other",
    label: "Other",
    subtitle: "Fan, Charger, etc",
    emoji: "🔌",
  },
];

interface Props {
  value: DeviceCategory;
  onChange: (val: DeviceCategory) => void;
}

export function CategoryGrid({ value, onChange }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isSelected = value === cat.value;
        return (
          <Pressable
            key={cat.value}
            onPress={() => onChange(cat.value)}
            className={`
              flex-1 min-w-[45%] rounded-xl p-3 border
              ${
                isSelected
                  ? "bg-[#25CE7F]/10 border-[#25CE7F]"
                  : "bg-[#171717] border-[#2a2a2a]"
              }
            `}
          >
            <Text className="text-xl mb-1">{cat.emoji}</Text>
            <Text
              className={`text-xs font-bold ${isSelected ? "text-[#25CE7F]" : "text-white"}`}
            >
              {cat.label}
            </Text>
            <Text className="text-[10px] text-[#555] mt-0.5">
              {cat.subtitle}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
