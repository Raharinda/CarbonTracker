// features/devices/services/deviceService.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import type { CreateDevicePayload, Device } from "../types/device.types";

const COLLECTION = "devices";

function toDevice(id: string, data: any): Device {
  const createdAt = data.createdAt;
  const createdAtMillis =
    createdAt && typeof createdAt.toDate === "function"
      ? createdAt.toDate().getTime()
      : typeof createdAt === "number"
      ? createdAt
      : Date.now();

  return {
    id,
    userId: data.userId,
    name: data.name,
    category: data.category,
    deviceType: data.deviceType,
    watt: data.watt,
    hoursPerDay: data.hoursPerDay,
    daysPerMonth: data.daysPerMonth,
    active: data.active ?? true,
    monthlyKwh: data.monthlyKwh,
    monthlyEmissions: data.monthlyEmissions,
    monthlyCost: data.monthlyCost,
    createdAt: createdAtMillis,
  };
}

export const deviceService = {
  async addDevice(
    userId: string,
    payload: CreateDevicePayload,
  ): Promise<Device> {
    // 🔧 Uncomment kalau Firestore sudah ready
    const ref = await addDoc(collection(db, COLLECTION), {
      ...payload,
      userId,
      createdAt: serverTimestamp(),
    });
    return toDevice(ref.id, { ...payload, userId });

    // Mock sementara
    // return {
    //   id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    //   userId,
    //   ...payload,
    //   createdAt: new Date(),
    // };
  },
  async getUserDevices(userId: string): Promise<Device[]> {
    const q = query(
      collection(db, COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => toDevice(d.id, d.data()));
  },

  async updateDevice(
    deviceId: string,
    payload: Partial<CreateDevicePayload>,
  ): Promise<void> {
    await updateDoc(doc(db, COLLECTION, deviceId), payload);
  },

  async deleteDevice(deviceId: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, deviceId));
  },
};
