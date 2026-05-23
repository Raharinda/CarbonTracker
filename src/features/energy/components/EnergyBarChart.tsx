import { Text, View } from "react-native";
import type { DailyUsage } from "../types/dailyUsage.types";

type Props = {
  history: DailyUsage[];
};

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1);
}

export function EnergyBarChart({ history }: Props) {
  // Ambil 7 hari terakhir, urutkan ascending
  const last7 = [...history]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);

  const maxKwh = Math.max(...last7.map((d) => d.totalKwh), 0.1);
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <View className="mx-4 rounded-3xl bg-white p-5 shadow-sm shadow-black/5">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-bold text-[#0E0E0E]">
          Weekly Usage Flow
        </Text>
        <Text className="text-xs text-[#888]">Mon — Sun</Text>
      </View>

      <View className="flex-row items-end justify-between h-20 gap-1">
        {last7.length === 0
          ? // Placeholder bars kalau belum ada data
            Array.from({ length: 7 }).map((_, i) => (
              <View key={i} className="flex-1 items-center gap-1">
                <View className="flex-1 w-full rounded-full bg-[#F0F0F0]" />
                <Text className="text-[10px] text-[#CCC]">—</Text>
              </View>
            ))
          : last7.map((day) => {
              const heightPercent = (day.totalKwh / maxKwh) * 100;
              const isToday = day.date === todayStr;
              return (
                <View key={day.date} className="flex-1 items-center gap-1">
                  <View className="flex-1 w-full justify-end">
                    <View
                      className={`w-full rounded-full ${
                        isToday ? "bg-brand" : "bg-[#E0E0E0]"
                      }`}
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                    />
                  </View>
                  <Text
                    className={`text-[10px] ${
                      isToday ? "text-brand font-bold" : "text-[#AAA]"
                    }`}
                  >
                    {getDayLabel(day.date)}
                  </Text>
                </View>
              );
            })}
      </View>
    </View>
  );
}
