import { create } from "zustand";

type DeviceTimer = {
  activatedAt: number; // kapan device di-ON terakhir
  totalMinutesBefore: number; // total menit sebelum toggle ON ini
};

type TimerStore = {
  timers: Record<string, DeviceTimer>;
  togglingIds: Set<string>;
  startTimer: (deviceId: string, totalMinutesBefore: number) => void;
  stopTimer: (deviceId: string, totalMinutesNow: number) => void;
  setToggling: (id: string, value: boolean) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
  timers: {},
  togglingIds: new Set<string>(),

  startTimer: (deviceId, totalMinutesBefore) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [deviceId]: { activatedAt: Date.now(), totalMinutesBefore },
      },
    })),

  stopTimer: (deviceId, totalMinutesNow) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [deviceId]: { activatedAt: 0, totalMinutesBefore: totalMinutesNow },
      },
    })),

  setToggling: (id, value) =>
    set((state) => {
      const next = new Set(state.togglingIds);
      value ? next.add(id) : next.delete(id);
      return { togglingIds: next };
    }),
}));
