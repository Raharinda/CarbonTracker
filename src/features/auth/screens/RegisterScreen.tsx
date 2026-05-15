import { router } from "expo-router";
import { ArrowLeft, Lock, Mail, User } from "lucide-react-native";
import React from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FormField } from "../components/FormFields";
import { useRegisterForm } from "../hooks/useAuthForm";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export function RegisterScreen() {
  const { form, onSubmit, error, isLoading } = useRegisterForm();

  const { promptAsync } = useGoogleAuth();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mt-14 mb-8"
        >
          <ArrowLeft size={18} color="#25CE7F" />
          <Text className="text-brand font-bold text-base">CarbonTracker</Text>
        </TouchableOpacity>

        <Text className="text-zinc-900 text-3xl font-extrabold text-center mb-2 leading-tight">
          Join{"\n"}
          <Text className="text-brand">Carbon</Text>Tracker
        </Text>
        <Text className="text-zinc-400 text-sm text-center mb-6 leading-relaxed">
          Step into the future of sustainable{"\n"}living with a personal touch.
        </Text>

        {/* Social Buttons */}
        <View className="flex-row gap-3 mb-5">
          <TouchableOpacity className="flex-1 h-12 bg-zinc-50 border border-zinc-200 rounded-xl items-center justify-center flex-row gap-2">
            <Text className="text-zinc-800 text-lg">&#xF8FF;</Text>
            <Text className="text-zinc-500 text-xs font-semibold">Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => promptAsync()}
            className="flex-1 h-12 bg-zinc-50 border border-zinc-200 rounded-xl items-center justify-center flex-row gap-2"
          >
            <Text className="text-brand font-extrabold text-sm">G</Text>
            <Text className="text-zinc-500 text-xs font-semibold">Google</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 mb-5">
          <View className="flex-1 h-px bg-zinc-200" />
          <Text className="text-zinc-400 text-xs font-medium">
            or with email
          </Text>
          <View className="flex-1 h-px bg-zinc-200" />
        </View>

        <FormField
          control={form.control}
          name="fullName"
          label="Full Name"
          icon={User}
          placeholder="John Doe"
        />
        <FormField
          control={form.control}
          name="email"
          label="Email Address"
          icon={Mail}
          placeholder="your@email.com"
          inputProps={{ keyboardType: "email-address" }}
        />
        <FormField
          control={form.control}
          name="password"
          label="Password"
          icon={Lock}
          placeholder="Minimum 6 characters"
          secureTextEntry
        />

        {error && (
          <Text className="text-red-500 text-sm text-center mb-3">{error}</Text>
        )}

        <TouchableOpacity
          onPress={onSubmit}
          disabled={isLoading}
          className="bg-brand h-14 rounded-2xl items-center justify-center mt-2 mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-extrabold text-base tracking-wide">
              Create An Account
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-zinc-400 text-sm text-center">
          Already have an account?{" "}
          <Text
            className="text-brand font-bold"
            onPress={() => router.push("/(onboarding)/(auth)/login")}
          >
            Log In
          </Text>
        </Text>
        <Text className="text-zinc-300 text-xs text-center mt-3 leading-relaxed">
          By signing up, you agree to our{" "}
          <Text className="text-brand">Terms</Text> &{" "}
          <Text className="text-brand">Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
