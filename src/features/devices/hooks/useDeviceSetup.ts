// features/devices/hooks/useDeviceSetup.ts
import { useAuthStore } from "@/features/auth/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { deviceService } from "../services/deviceService";
import { useDeviceStore } from "../store/deviceStore";
import { calcCost, calcEmissions, calcMonthlyKwh } from "../utils/carbonCalc";

const schema = z.object({
  name: z.string().min(2, "Name too short").max(50),
  category: z.enum(["electronics", "appliances", "lighting", "other"]),
  watt: z.number({ error: "Required" }).min(1, "Min 1W").max(10000),
  hoursPerDay: z.number({ error: "Required" }).min(0.1, "Min 0.1h").max(24),
  daysPerMonth: z.number().min(1).max(31),
});

export type DeviceFormValues = z.infer<typeof schema>;

export function useDeviceSetup(redirectTo: "list" | "dashboard" = "list") {
  const router = useRouter();
  const setDevices = useDeviceStore((s) => s.setDevices);
  const userId = useAuthStore((s) => s.user?.uid);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "electronics",
      watt: undefined,
      hoursPerDay: undefined,
      daysPerMonth: 30,
    },
  });

  const { watch } = form;
  const watt = watch("watt") || 0;
  const hoursPerDay = watch("hoursPerDay") || 0;
  const daysPerMonth = watch("daysPerMonth") || 30;

  const estimate = {
    kwh: calcMonthlyKwh(watt, hoursPerDay, daysPerMonth),
    emissions: calcEmissions(calcMonthlyKwh(watt, hoursPerDay, daysPerMonth)),
    cost: calcCost(calcMonthlyKwh(watt, hoursPerDay, daysPerMonth)),
  };

  async function onSubmit(data: DeviceFormValues) {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    if (!userId) {
      console.log("No userId — user not authenticated");
      isSubmittingRef.current = false;
      return;
    }

    setIsSubmitting(true);

    try {
      await deviceService.addDevice(userId, {
        ...data,
        monthlyKwh: estimate.kwh,
        monthlyEmissions: estimate.emissions,
        monthlyCost: estimate.cost,
      });

      // Re-fetch dari Firestore — store dijamin sync
      const updated = await deviceService.getUserDevices(userId);
      setDevices(updated);

      Toast.show({
        type: "success",
        text1: "Device added",
        text2: data.name,
        visibilityTime: 2000,
      });

      if (redirectTo === "dashboard") {
        router.back();
      } else {
        router.replace("/(onboarding)/device-setup/complete" as any);
      }
    } catch (e) {
      console.error("addDevice error:", e);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  }

  return {
    form,
    estimate,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  };
}
