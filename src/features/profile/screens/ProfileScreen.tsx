import AppLoading from "@/shared/components/feedback/AppLoading";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountInfoList } from "../components/AccountInfoList";
import { AchievementsBadges } from "../components/AchievementsBadges";
import { CarbonEffectsGrid } from "../components/CarbonEffectsGrid";
import { MonthlyGoalCard } from "../components/MonthlyGoalCard";
import { ProfileHeader } from "../components/ProfileHeader";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <AppLoading size="md" label="Memuat profil..." />
      </SafeAreaView>
    );
  }

  if (error || !profile) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-foreground-muted text-sm">
          {error ?? "Profil tidak ditemukan"}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingBottom: 140 }}
      >
        <ProfileHeader
          name={profile.displayName}
          level={{ label: "Eco Warrior", current: 620, target: 1000 }}
          city={profile.city ?? "—"}
          avatarUrl={profile.photoURL}
          onEditPress={() => {}}
        />

        {/* CarbonEffectsGrid & MonthlyGoalCard masih mock — 
            perlu collection terpisah atau kalkulasi dari devices */}
        <CarbonEffectsGrid
          data={{
            co2ReductionKg: 18,
            energyUsedKwh: 482,
            streakDays: 21,
            deviceCount: 12,
          }}
        />

        <AccountInfoList
          data={{
            name: profile.displayName,
            email: profile.email,
            residence: profile.residence ?? "—",
            residents: profile.residents ?? 0,
            city: profile.city ?? "—",
            plnRate: `Rp ${profile.electricityRate}/kWh`,
          }}
        />

        <MonthlyGoalCard
          data={{
            title: "Reduce usage by 20% from last month",
            description:
              "You've reached 14% reduction so far. Keep going for that Eco-Badge!",
            baselineKwh: 520,
            targetKwh: 416,
            progressPercent: 70,
          }}
          onUpdatePress={() => {}}
        />

        <AchievementsBadges
          achievements={[
            { id: "1", label: "Eco Starter", emoji: "🌱" },
            { id: "2", label: "Zero Waste Hero", emoji: "🏆" },
            { id: "3", label: "Early Bird", emoji: "🐦" },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
