import { router } from "expo-router";
import { ArrowLeft, PlusCircle } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DeviceCard } from "../../devices/components/DeviceCard";
import { useDeviceStore } from "../../devices/store/deviceStore";

export function DeviceListScreen() {
  const devices = useDeviceStore((s) => s.devices);

  const hasDevices = devices.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F4]">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="pt-3 mb-10">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center gap-2 mb-8"
          >
            <ArrowLeft size={18} color="#25CE7F" />

            <Text className="text-[#25CE7F] text-lg font-bold">Wattly</Text>
          </Pressable>

          {/* Badge */}
          <View className="self-center bg-[#25CE7F] rounded-full px-4 py-1 mb-8">
            <Text className="text-white text-[11px] font-bold tracking-wide">
              Device Onboarding
            </Text>
          </View>

          {/* Title */}
          <Text className="text-[#111111] text-[48px] font-bold text-center leading-[50px] mb-4">
            Set Up{"\n"}Your Devices
          </Text>

          {/* Subtitle */}
          <Text className="text-[#444] text-base text-center leading-6 px-6">
            Setup your smart monitor for optimal energy tracking.
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          {hasDevices ? (
            <View className="gap-4">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </View>
          ) : (
            <View className="items-center mt-16">
              <Text className="text-[#25CE7F] text-base font-semibold mb-2">
                No device added yet
              </Text>

              <Text className="text-[#444] text-base text-center leading-7">
                Tap the button below to add your{"\n"}
                first device
              </Text>
            </View>
          )}

          {/* Add Device Button */}
          <Pressable
            onPress={() => router.push("/(onboarding)/device-setup/add" as any)}
            className="self-center mt-12 bg-[#25CE7F] rounded-full px-8 py-4 flex-row items-center gap-3 shadow-lg"
          >
            <PlusCircle size={18} color="white" />

            <Text className="text-white text-base font-semibold">
              {hasDevices ? "Add another device" : "Add your first device"}
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="pb-8">
          <Pressable
            onPress={() =>
              router.replace("/(onboarding)/device-setup/complete" as any)
            }
            className="bg-[#111111] rounded-full py-4 items-center"
          >
            <Text className="text-[#25CE7F] text-lg font-semibold">
              Finish Set Up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
