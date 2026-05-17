import React from "react";
import { View } from "react-native";

interface Props {
  total: number;
  activeIndex: number;
}

export const OnboardingDots = ({ total, activeIndex }: Props) => {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={`h-[6px] rounded-full ${
            i === activeIndex ? "w-6 bg-primary" : "w-[6px] bg-neutral-300"
          }`}
        />
      ))}
    </View>
  );
};
