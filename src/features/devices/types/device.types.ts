// features/devices/types/device.types.ts

export type DeviceCategory =
  | "electronics"
  | "appliances"
  | "lighting"
  | "other";

export interface DeviceFormData {
  name: string;
  category: DeviceCategory;
  watt: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

export interface Device extends DeviceFormData {
  id: string;
  userId: string;
  monthlyKwh: number;
  monthlyEmissions: number;
  monthlyCost: number;
  createdAt: Date;
}

// untuk payload ke Firestore (tanpa id, tanpa userId — di-inject di service)
export type CreateDevicePayload = DeviceFormData & {
  monthlyKwh: number;
  monthlyEmissions: number;
  monthlyCost: number;
};
