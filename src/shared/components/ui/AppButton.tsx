// =============================================================================
// AppButton.tsx
// =============================================================================
import { useTheme } from "@/shared/theme/ThemeProvider";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Variant =
  | "primary"
  | "primary-subtle"
  | "secondary"
  | "secondary-subtle"
  | "outlined";
type Size = "sm" | "md" | "lg";

type AppButtonProps = {
  label: string;
  variant?: Variant;
  size?: Size;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

const SPINNER_COLOR: Record<Variant, { light: string; dark: string }> = {
  primary: { light: "#FFFFFF", dark: "#FFFFFF" },
  "primary-subtle": { light: "#25CE7F", dark: "#25CE7F" },
  secondary: { light: "#1C1C1C", dark: "#FFFFFF" },
  "secondary-subtle": { light: "#1C1C1C", dark: "#FFFFFF" },
  outlined: { light: "#25CE7F", dark: "#25CE7F" },
};

export default function AppButton({
  label,
  variant = "primary",
  size = "md",
  onPress,
  loading = false,
  disabled = false,
  fullWidth = false,
}: AppButtonProps) {
  const { isDark } = useTheme();
  const isDisabled = disabled || loading;
  const spinnerColor = isDark
    ? SPINNER_COLOR[variant].dark
    : SPINNER_COLOR[variant].light;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={[
        "flex-row items-center justify-center rounded-full border-[1.5px]",
        // ── variant container ──
        variant === "primary" && "bg-brand border-transparent",
        variant === "primary-subtle" && "bg-brand-subtle border-transparent",
        variant === "secondary" && "bg-surface-raised border-border",
        variant === "secondary-subtle" &&
          "bg-background-secondary border-transparent",
        variant === "outlined" && "bg-transparent border-brand",
        // ── size ──
        size === "sm" && "py-2.5 px-4",
        size === "md" && "py-3.5 px-6",
        size === "lg" && "py-4 px-6",
        // ── width ──
        fullWidth ? "self-stretch" : "self-start",
      ]
        .filter(Boolean)
        .join(" ")}
      style={({ pressed }) => ({
        gap: 8,
        opacity: pressed ? 0.75 : isDisabled ? 0.4 : 1,
      })}
    >
      {loading && <ActivityIndicator size="small" color={spinnerColor} />}
      <Text
        className={[
          "font-semibold",
          // ── variant label ──
          variant === "primary" && "text-white",
          variant === "primary-subtle" && "text-brand",
          variant === "secondary" && "text-foreground",
          variant === "secondary-subtle" && "text-foreground",
          variant === "outlined" && "text-brand",
          // ── size label ──
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-base",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {loading ? "Loading..." : label}
      </Text>
    </Pressable>
  );
}
