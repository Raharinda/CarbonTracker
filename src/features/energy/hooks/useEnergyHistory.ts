import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect, useState } from "react";
import { dailyUsageService } from "../services/dailyUsageService";
import type { DailyUsage } from "../types/dailyUsage.types";

type EnergyHistoryState = {
  today: DailyUsage | null;
  history: DailyUsage[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useEnergyHistory(): EnergyHistoryState {
  const user = useAuthStore((s) => s.user);
  const isAuthLoading = useAuthStore((s) => s.isLoading);
  const [today, setToday] = useState<DailyUsage | null>(null);
  const [history, setHistory] = useState<DailyUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const [todayData, historyData] = await Promise.all([
        dailyUsageService.getByDate(user.uid, new Date()),
        dailyUsageService.getHistory(user.uid, 30),
      ]);
      setToday(todayData);
      setHistory(historyData);
    } catch (e) {
      setError("Gagal memuat data energi");
    } finally {
      setIsLoading(false); // ← ini yang hilang
    }
  }
  useEffect(() => {
    console.log(
      "effect triggered, isAuthLoading:",
      isAuthLoading,
      "uid:",
      user?.uid,
    );
    if (isAuthLoading) return;
    fetchData();
  }, [user?.uid, isAuthLoading]);

  return { today, history, isLoading, error, refetch: fetchData };
}
