// features/dashboard/screens/DashboardScreen.tsx
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useDevices } from "@/features/devices/hooks/useDevices";
import { useDeviceStore } from "@/features/devices/store/deviceStore";
import { router } from "expo-router";
import { LogOut, Plus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORY_EMOJI: Record<string, string> = {
  electronics: "🖥️",
  appliances: "❄️",
  lighting: "💡",
  other: "🔌",
};

export default function DashboardScreen() {
  const { devices } = useDevices(); //
  const clearDevices = useDeviceStore((s) => s.clearDevices);
  const user = useAuthStore((s) => s.user);

  const totalKwh = devices.reduce((sum, d) => sum + d.monthlyKwh, 0);
  const totalEmissions = devices.reduce(
    (sum, d) => sum + d.monthlyEmissions,
    0,
  );
  const totalCost = devices.reduce((sum, d) => sum + d.monthlyCost, 0);

  const handleLogout = async () => {
    await authService.logout();
    clearDevices();
    router.replace("/(onboarding)/welcome");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-foreground-muted text-sm font-medium">
              Welcome back
            </Text>
            <Text className="text-foreground text-2xl font-extrabold mt-1">
              {user?.displayName?.split(" ")[0] ?? "Dashboard"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="w-10 h-10 bg-background-secondary rounded-xl items-center justify-center"
          >
            <LogOut size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View className="px-6 flex-row gap-3 mb-6">
          <View className="bg-brand-subtle rounded-2xl p-4 flex-1">
            <Text className="text-foreground-muted text-xs font-medium mb-2">
              Energy
            </Text>
            <Text className="text-brand text-2xl font-extrabold">
              {totalKwh.toFixed(1)}
            </Text>
            <Text className="text-foreground-muted text-xs mt-1">kWh/mo</Text>
          </View>
          <View className="bg-background-secondary rounded-2xl p-4 flex-1">
            <Text className="text-foreground-muted text-xs font-medium mb-2">
              CO₂
            </Text>
            <Text className="text-foreground text-2xl font-extrabold">
              {totalEmissions.toFixed(1)}
            </Text>
            <Text className="text-foreground-muted text-xs mt-1">kg/mo</Text>
          </View>
          <View className="bg-background-secondary rounded-2xl p-4 flex-1">
            <Text className="text-foreground-muted text-xs font-medium mb-2">
              Cost
            </Text>
            <Text className="text-foreground text-2xl font-extrabold">
              {totalCost >= 1000
                ? `${(totalCost / 1000).toFixed(0)}k`
                : totalCost.toFixed(0)}
            </Text>
            <Text className="text-foreground-muted text-xs mt-1">Rp/mo</Text>
          </View>
        </View>

        {/* Device list */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-foreground text-lg font-bold">
              Your Devices
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(app)/add-device" as any)}
              className="flex-row items-center gap-1 bg-brand-subtle px-3 py-1.5 rounded-xl"
            >
              <Plus size={14} color="#25CE7F" />
              <Text className="text-brand text-xs font-semibold">Add</Text>
            </TouchableOpacity>
          </View>

          {devices.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-4xl mb-3">🔌</Text>
              <Text className="text-foreground font-semibold text-base mb-1">
                No devices yet
              </Text>
              <Text className="text-foreground-muted text-sm text-center">
                Add your first device to start{"\n"}tracking energy usage
              </Text>
            </View>
          ) : (
            devices.map((device) => (
              <View
                key={device.id}
                className="bg-surface-raised rounded-2xl p-4 flex-row items-center gap-4 mb-3"
              >
                <View className="bg-brand-subtle w-12 h-12 rounded-xl items-center justify-center">
                  <Text className="text-xl">
                    {CATEGORY_EMOJI[device.category] ?? "🔌"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-foreground font-semibold text-base">
                    {device.name}
                  </Text>
                  <Text className="text-foreground-muted text-xs mt-0.5">
                    {device.watt}W · {device.hoursPerDay}h/day
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-brand font-bold text-base">
                    {device.monthlyKwh.toFixed(1)}
                  </Text>
                  <Text className="text-foreground-muted text-xs">kWh/mo</Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
