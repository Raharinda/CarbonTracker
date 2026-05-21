export type EcoLevel = {
  label: string;
  current: number;
  target: number;
};

export type CarbonEffects = {
  co2ReductionKg: number;
  energyUsedKwh: number;
  streakDays: number;
  deviceCount: number;
};

export type AccountInfo = {
  name: string;
  email: string;
  residence: string;
  residents: number;
  city: string;
  plnRate: string;
};

export type MonthlyGoal = {
  title: string;
  description: string;
  baselineKwh: number;
  targetKwh: number;
  progressPercent: number;
};

export type Achievement = {
  id: string;
  label: string;
  emoji: string;
};

export type ProfileData = {
  avatarUrl?: string;
  name: string;
  level: EcoLevel;
  carbonEffects: CarbonEffects;
  accountInfo: AccountInfo;
  monthlyGoal: MonthlyGoal;
  achievements: Achievement[];
};
