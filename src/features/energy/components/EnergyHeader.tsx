import { TrendingDown, TrendingUp } from "lucide-react-native";
import { Text, View } from "react-native";

type Props = {
  totalKwh: number;
  comparedToYesterday?: number | null; // % change, bisa null kalau tidak ada data kemarin
};

export function EnergyHeader({ totalKwh, comparedToYesterday }: Props) {
  const isDown = comparedToYesterday != null && comparedToYesterday <= 0;
  const hasComparison = comparedToYesterday != null;

  return (
    <View className="mx-4 mt-4 rounded-[28px] bg-brand px-6 py-6">
      {/* Status pill */}
      <View className="self-start rounded-full bg-black/20 px-4 py-1.5 mb-4">
        <Text className="text-xs font-semibold text-white">
          {isDown ? "Energy Flow Stable" : "Usage Increasing"}
        </Text>
      </View>

      {/* Main number */}
      <Text className="text-[10px] uppercase tracking-widest text-white/70 mb-1">
        Current Usage
      </Text>
      <View className="flex-row items-end gap-2">
        {hasComparison &&
          (isDown ? (
            <TrendingDown size={32} color="#FFFFFF" />
          ) : (
            <TrendingUp size={32} color="#FFFFFF" />
          ))}
        <Text className="text-5xl font-extrabold text-white">
          {totalKwh.toFixed(1)}
        </Text>
        <Text className="text-xl font-semibold text-white/80 mb-1">kWh</Text>
      </View>

      {/* Badges */}
      <View className="flex-row gap-2 mt-4 flex-wrap">
        {hasComparison && (
          <View className="rounded-full bg-white/20 px-3 py-1">
            <Text className="text-xs font-semibold text-white">
              {Math.abs(comparedToYesterday!).toFixed(0)}%{" "}
              {isDown ? "lower" : "higher"} than yesterday
            </Text>
          </View>
        )}
        <View className="rounded-full bg-white/20 px-3 py-1">
          <Text className="text-xs font-semibold text-white">
            {isDown ? "Efficient Energy Pattern" : "Consider reducing usage"}
          </Text>
        </View>
      </View>
    </View>
  );
}
