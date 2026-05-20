// features/devices/components/AddDeviceSheet.tsx
import Feather from "@expo/vector-icons/Feather";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDeviceSetup } from "../hooks/useDeviceSetup";
import { CategoryGrid } from "./CategoryGrid";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AddDeviceSheet({ visible, onClose }: Props) {
  const { form, onSubmit, isSubmitting } = useDeviceSetup("list", onClose);
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Sheet */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          maxHeight: "90%",
        }}
      >
        {/* Handle */}
        <View
          style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}
        >
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#E0E0E0",
            }}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1 */}
          <StepLabel step={1} title="Device Category" />
          <Controller
            name="deviceType"
            control={control}
            render={({ field }) => (
              <CategoryGrid value={field.value} onChange={field.onChange} />
            )}
          />

          {/* Step 2 */}
          <StepLabel step={2} title="Identity" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 14, color: "#111" }}
                  placeholder="e.g. Master Bedroom AC"
                  placeholderTextColor="#ABABAB"
                  onChangeText={field.onChange}
                  value={field.value}
                />
                <Feather name="edit-3" size={16} color="#25CE7F" />
              </View>
            )}
          />
          {errors.name && (
            <Text style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>
              {errors.name.message}
            </Text>
          )}

          {/* Step 3 */}
          <StepLabel step={3} title="Energy Consumption" />
          <Controller
            name="watt"
            control={control}
            render={({ field }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 14, color: "#111" }}
                  placeholder="Wattage (W)"
                  placeholderTextColor="#ABABAB"
                  keyboardType="numeric"
                  onChangeText={(val) => field.onChange(Number(val) || 0)}
                  value={field.value ? String(field.value) : ""}
                />
                <Text
                  style={{ color: "#25CE7F", fontWeight: "700", fontSize: 14 }}
                >
                  Watts
                </Text>
              </View>
            )}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Controller
              name="hoursPerDay"
              control={control}
              render={({ field }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                    borderRadius: 14,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                  }}
                >
                  <TextInput
                    style={{ flex: 1, fontSize: 14, color: "#111" }}
                    placeholder="Hours/day"
                    placeholderTextColor="#ABABAB"
                    keyboardType="numeric"
                    onChangeText={(val) => field.onChange(Number(val) || 0)}
                    value={field.value ? String(field.value) : ""}
                  />
                  <Text style={{ color: "#ABABAB", fontSize: 13 }}>h</Text>
                </View>
              )}
            />
            <Controller
              name="daysPerMonth"
              control={control}
              render={({ field }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                    borderRadius: 14,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                  }}
                >
                  <TextInput
                    style={{ flex: 1, fontSize: 14, color: "#111" }}
                    placeholder="Days/month"
                    placeholderTextColor="#ABABAB"
                    keyboardType="numeric"
                    onChangeText={(val) => field.onChange(Number(val) || 30)}
                    value={field.value ? String(field.value) : ""}
                  />
                  <Text style={{ color: "#ABABAB", fontSize: 13 }}>d</Text>
                </View>
              )}
            />
          </View>

          {/* CTA */}
          <TouchableOpacity
            onPress={onSubmit}
            disabled={isSubmitting}
            style={{
              marginTop: 28,
              backgroundColor: "#111111",
              borderRadius: 20,
              paddingVertical: 18,
              alignItems: "center",
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            <Text style={{ color: "#25CE7F", fontWeight: "700", fontSize: 16 }}>
              {isSubmitting ? "Adding..." : "Finish Set Up"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function StepLabel({ step, title }: { step: number; title: string }) {
  return (
    <Text
      style={{
        fontSize: 15,
        fontWeight: "800",
        color: "#111",
        marginTop: 24,
        marginBottom: 12,
      }}
    >
      Step {step}: {title}
    </Text>
  );
}
