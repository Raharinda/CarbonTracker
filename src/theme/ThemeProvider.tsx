// =============================================================================
// ThemeProvider.tsx
//
// Tugasnya satu: toggle className="dark" di root View.
// Saat "dark" aktif, NativeWind baca CSS variables dari .dark {} di global.css
// dan semua warna otomatis berganti — tanpa perlu props apapun ke komponen.
//
// Cara pakai di komponen:
//   const { isDark, toggleTheme } = useTheme();
// =============================================================================

import React, { createContext, useContext, useState } from "react";
import { useColorScheme, View } from "react-native";

const STORAGE_KEY = "app_color_scheme";

type ColorScheme = "light" | "dark";

type ThemeContextType = {
  colorScheme: ColorScheme;
  isDark: boolean;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: "light",
  isDark: false,
  toggleTheme: () => {},
  setColorScheme: () => {},
});

// =============================================================================

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultScheme?: ColorScheme | "system";
};

export function ThemeProvider({
  children,
  defaultScheme = "system",
}: ThemeProviderProps) {
  const systemScheme = (useColorScheme() ?? "light") as ColorScheme;
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
    defaultScheme === "system" ? systemScheme : defaultScheme,
  );

  const setColorScheme = (scheme: ColorScheme) => setColorSchemeState(scheme);
  const toggleTheme = () =>
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  const isDark = colorScheme === "dark";

  return (
    <ThemeContext.Provider
      value={{ colorScheme, isDark, toggleTheme, setColorScheme }}
    >
      <View style={{ flex: 1 }} className={isDark ? "dark" : ""}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export type { ColorScheme };
