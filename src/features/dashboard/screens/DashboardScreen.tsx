import { authService } from "@/features/auth/services/authService";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEVICES = [
  { name: "Air Conditioner", watt: 900, hours: 8, icon: "❄️" },
  { name: "Refrigerator", watt: 150, hours: 24, icon: "🧊" },
  { name: "Washing Machine", watt: 500, hours: 2, icon: "🌀" },
  { name: "LED TV", watt: 80, hours: 6, icon: "📺" },
];

function calcKwh(watt: number, hours: number) {
  return ((watt * hours) / 1000).toFixed(2);
}

function Header() {
  const handleLogout = async () => {
    await authService.logout();
    router.replace("/(onboarding)/welcome");
  };

  return (
    <View className="px-6 pt-4 pb-6 flex-row items-center justify-between">
      <View>
        <Text className="text-foreground-muted text-sm font-medium">
          Good evening
        </Text>
        <Text className="text-foreground text-2xl font-extrabold mt-1">
          Your Dashboard
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        className="w-10 h-10 bg-background-secondary rounded-xl items-center justify-center"
      >
        <LogOut size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

function StatsRow() {
  return (
    <View className="px-6 flex-row gap-3 mb-6">
      <View className="bg-brand-subtle rounded-2xl p-4 flex-1">
        <Text className="text-foreground-muted text-xs font-medium mb-2">
          Energy Used
        </Text>
        <Text className="text-brand text-2xl font-extrabold">12.4</Text>
        <Text className="text-foreground-muted text-xs mt-1">kWh</Text>
      </View>
      <View className="bg-background-secondary rounded-2xl p-4 flex-1">
        <Text className="text-foreground-muted text-xs font-medium mb-2">
          CO₂
        </Text>
        <Text className="text-foreground text-2xl font-extrabold">5.8</Text>
        <Text className="text-foreground-muted text-xs mt-1">kg</Text>
      </View>
      <View className="bg-background-secondary rounded-2xl p-4 flex-1">
        <Text className="text-foreground-muted text-xs font-medium mb-2">
          Est. Cost
        </Text>
        <Text className="text-foreground text-2xl font-extrabold">18k</Text>
        <Text className="text-foreground-muted text-xs mt-1">Rp/mo</Text>
      </View>
    </View>
  );
}

function DeviceCard({ name, watt, hours, icon }: (typeof DEVICES)[0]) {
  const kwh = calcKwh(watt, hours);
  return (
    <View className="bg-surface-raised rounded-2xl p-4 flex-row items-center gap-4 mb-3">
      <View className="bg-brand-subtle w-12 h-12 rounded-xl items-center justify-center">
        <Text className="text-xl">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-foreground font-semibold text-base">{name}</Text>
        <Text className="text-foreground-muted text-xs mt-0.5">
          {watt}W · {hours}h/day
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-brand font-bold text-base">{kwh}</Text>
        <Text className="text-foreground-muted text-xs">kWh</Text>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <StatsRow />
        <View className="px-6">
          <Text className="text-foreground text-lg font-bold mb-4">
            Your Devices
          </Text>
          {DEVICES.map((d) => (
            <DeviceCard key={d.name} {...d} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
