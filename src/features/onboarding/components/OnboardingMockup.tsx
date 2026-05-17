import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { OnboardingSlideData } from "../types";

interface Props {
  slide: OnboardingSlideData;
}

export const OnboardingMockup = ({ slide }: Props) => {
  return (
    <View className="relative w-[320px] h-[290px] items-center justify-center">
      {/* Top floating label */}
      <View
        className="
          absolute
          top-4
          left-2
          z-10
          bg-[#F7F7F7]
          px-6
          py-4
          rounded-[24px]
          shadow-sm
        "
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <Text
          className="
            text-primary
            text-[18px]
            leading-[24px]
            font-extrabold
            text-center
          "
        >
          {slide.labelText}
        </Text>
      </View>

      {/* Hero image outer frame */}
      <View
        className="
          absolute
          top-14
          right-0
          w-[240px]
          h-[185px]
          rounded-[38px]
          bg-[#F7F7F7]
          p-[10px]
        "
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        {/* Actual image */}
        <View className="flex-1 overflow-hidden rounded-[30px]">
          <Image
            source={require("@/assets/images/onboarding-hero.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Bottom card */}
      <View
        className="
          absolute
          left-0
          bottom-6
          z-20
          w-[165px]
          rounded-[22px]
          bg-[#EEF3EE]/95
          px-4
          py-3
        "
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 5 },
          elevation: 8,
        }}
      >
        {/* Top Row */}
        <View className="flex-row items-center justify-between">
          {/* Icon */}
          <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
            <Ionicons name="bulb-outline" size={22} color="white" />
          </View>

          {/* Toggle */}
          <View className="w-[44px] h-[24px] rounded-full bg-primary/60 justify-center px-[3px] items-end">
            <View className="w-[18px] h-[18px] rounded-full bg-white" />
          </View>
        </View>

        {/* Bottom Content */}
        <View className="mt-5 flex-row items-end justify-between">
          <Text
            className="
              text-neutral-700
              text-[16px]
              leading-[20px]
              font-medium
            "
          >
            Living{"\n"}Room
          </Text>

          <Text className="text-primary text-[15px] font-bold">
            {slide.deviceKwh}
          </Text>
        </View>
      </View>
    </View>
  );
};
