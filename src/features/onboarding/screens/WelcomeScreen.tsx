import AppButton from "@/shared/components/ui/AppButton";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-brand-subtle">
      <View className="flex-1 items-center justify-center px-8 pt-16">
        <Orb />
        <Text className="mt-20 text-center text-brand font-extrabold text-4xl">
          Understand your{"\n"}
          electricity usage.
        </Text>
        <Text className="mt-8 text-center text-foreground font-medium text-base opacity-80">
          Track devices in real time, reduce energy{"\n"}
          waste, and build smarter habits{"\n"}
          effortlessly.
        </Text>
      </View>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-surface rounded-t-3xl  px-7 pt-11 pb-6 gap-4"
        style={{ borderTopLeftRadius: 54, borderTopRightRadius: 54 }}
      >
        <AppButton
          label="Get Started"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.push("/(onboarding)/register")}
        />
        <AppButton
          label="I already have an account"
          variant="primary-subtle"
          size="lg"
          fullWidth
          onPress={() => router.push("/(onboarding)/login")}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

function Orb() {
  return (
    <View className="items-center justify-center">
      <View className="absolute w-56 h-56 rounded-full bg-background-secondary opacity-40" />
      <View className="w-28 h-28 items-center justify-center rounded-full bg-brand-muted">
        <View className="w-16 h-16 rounded-full bg-brand-subtle" />
      </View>
    </View>
  );
}
