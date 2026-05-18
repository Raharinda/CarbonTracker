// features/devices/screens/AddDeviceScreen.tsx
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { CategoryGrid } from "../components/CategoryGrid";
import { EstimateBar } from "../components/EstimateBar";
import { useDeviceSetup } from "../hooks/useDeviceSetup";

interface Props {
  redirectTo?: "list" | "dashboard";
}

export function AddDeviceScreen({ redirectTo = "list" }: Props) {
  const { form, estimate, onSubmit, isSubmitting } = useDeviceSetup(redirectTo);
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0E0E0E]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Nav */}
        <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-[#1C1C1C] border border-[#2a2a2a] items-center justify-center"
          >
            <Text className="text-white text-sm">←</Text>
          </Pressable>
          <Pressable onPress={() => router.replace("/(app)/dashboard")}>
            <Text className="text-[#25CE7F] text-xs font-semibold">Skip</Text>
          </Pressable>
        </View>

        {/* Progress bar */}
        <View className="mx-5 h-1 bg-[#1C1C1C] rounded-full mb-5">
          <View className="h-1 bg-[#25CE7F] rounded-full w-1/3" />
        </View>

        <View className="px-5">
          <Text className="text-white text-2xl font-extrabold mb-1">
            Add a device
          </Text>
          <Text className="text-[#555] text-xs mb-5">
            Fill in device details
          </Text>

          {/* Category */}
          <Text className="text-[#555] text-[10px] font-bold tracking-widest uppercase mb-2">
            Device Category
          </Text>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CategoryGrid value={field.value} onChange={field.onChange} />
            )}
          />

          {/* Device Name */}
          <Text className="text-[#555] text-[10px] font-bold tracking-widest uppercase mt-5 mb-2">
            Device Name
          </Text>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                className="bg-[#171717] text-white rounded-xl px-4 py-3 border border-[#2a2a2a]"
                placeholder='e.g. Samsung 55" QLED TV'
                placeholderTextColor="#555"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-400 text-xs mt-1">
              {errors.name.message}
            </Text>
          )}

          {/* Watt */}
          <Text className="text-[#555] text-[10px] font-bold tracking-widest uppercase mt-5 mb-2">
            Power Usage (Watt)
          </Text>
          <Controller
            name="watt"
            control={control}
            render={({ field }) => (
              <TextInput
                className="bg-[#171717] text-white rounded-xl px-4 py-3 border border-[#2a2a2a]"
                placeholder="e.g. 120"
                placeholderTextColor="#555"
                keyboardType="numeric"
                onChangeText={(val) => field.onChange(Number(val) || 0)}
                value={field.value ? String(field.value) : ""}
              />
            )}
          />
          {errors.watt && (
            <Text className="text-red-400 text-xs mt-1">
              {errors.watt.message}
            </Text>
          )}

          {/* Hours & Days */}
          <View className="flex-row gap-3 mt-5">
            <View className="flex-1">
              <Text className="text-[#555] text-[10px] font-bold tracking-widest uppercase mb-2">
                Hours / Day
              </Text>
              <Controller
                name="hoursPerDay"
                control={control}
                render={({ field }) => (
                  <TextInput
                    className="bg-[#171717] text-white rounded-xl px-4 py-3 border border-[#2a2a2a]"
                    placeholder="e.g. 6"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    onChangeText={(val) => field.onChange(Number(val) || 0)}
                    value={field.value ? String(field.value) : ""}
                  />
                )}
              />
              {errors.hoursPerDay && (
                <Text className="text-red-400 text-xs mt-1">
                  {errors.hoursPerDay.message}
                </Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-[#555] text-[10px] font-bold tracking-widest uppercase mb-2">
                Days / Month
              </Text>
              <Controller
                name="daysPerMonth"
                control={control}
                render={({ field }) => (
                  <TextInput
                    className="bg-[#171717] text-white rounded-xl px-4 py-3 border border-[#2a2a2a]"
                    placeholder="30"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    onChangeText={(val) => field.onChange(Number(val) || 30)}
                    value={field.value ? String(field.value) : ""}
                  />
                )}
              />
            </View>
          </View>

          {/* Estimate */}
          <View className="mt-5">
            <EstimateBar
              kwh={estimate.kwh}
              emissions={estimate.emissions}
              cost={estimate.cost}
            />
          </View>
        </View>

        {/* Submit */}
        <Pressable
          onPress={onSubmit}
          disabled={isSubmitting}
          className={`mx-5 mt-6 rounded-2xl py-4 items-center ${
            isSubmitting ? "bg-[#1a5c3a]" : "bg-[#25CE7F]"
          }`}
        >
          <Text className="text-white font-bold text-base">
            {isSubmitting ? "Adding..." : "Add Device →"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
