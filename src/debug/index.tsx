// =============================================================================
// app/troubleshoot/index.tsx
// Halaman debug — untuk cek semua fitur theme, loading, warna, dll.
// Akses via: /troubleshoot
// =============================================================================

import { useLoading } from "@/providers/LoadingProvider";
import AppLoading from "@/shared/components/feedback/AppLoading";
import { useTheme } from "@/theme/ThemeProvider";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

export default function TroubleshootIndex() {
  const { theme, colorScheme, toggleTheme } = useTheme();
  const { showLoading, hideLoading } = useLoading();
  const isDark = colorScheme === "dark";

  const simulateLoad = async (label?: string) => {
    showLoading(label);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    hideLoading();
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: theme.bgPrimary }}>
      <View className="px-6 pt-16 pb-12 gap-6">

        {/* Header */}
        <Text className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
          🛠 Troubleshoot
        </Text>

        {/* ── Dark mode toggle ── */}
        <View
          className="flex-row items-center justify-between rounded-3xl border p-4"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-medium" style={{ color: theme.textPrimary }}>
            Dark mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? theme.brandDefault : '#FFFFFF'}
            trackColor={{ false: '#9CA3AF', true: theme.brandDefault }}
          />
        </View>

        {/* ── Loading inline ── */}
        <View
          className="rounded-3xl border p-4 gap-4"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-bold" style={{ color: theme.textPrimary }}>
            Loading — Inline
          </Text>
          <View className="flex-row items-center justify-around py-2">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <View key={s} className="items-center gap-2">
                <AppLoading size={s} />
                <Text className="text-xs" style={{ color: theme.textTertiary }}>{s}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row items-center justify-around py-2">
            {(['brand', 'primary', 'muted'] as const).map((c) => (
              <View key={c} className="items-center gap-2">
                <AppLoading color={c} />
                <Text className="text-xs" style={{ color: theme.textTertiary }}>{c}</Text>
              </View>
            ))}
          </View>
          <View className="items-center rounded-2xl py-4" style={{ backgroundColor: theme.bgSecondary }}>
            <AppLoading label="Memuat data..." />
          </View>
        </View>

        {/* ── Loading fullscreen ── */}
        <View
          className="rounded-3xl border p-4 gap-3"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-bold" style={{ color: theme.textPrimary }}>
            Loading — Fullscreen
          </Text>
          <Pressable
            className="rounded-2xl px-5 py-4"
            style={{ backgroundColor: theme.brandDefault }}
            onPress={() => simulateLoad()}
          >
            <Text className="text-center text-base font-semibold" style={{ color: '#FFFFFF' }}>
              Tanpa teks (2 detik)
            </Text>
          </Pressable>
          <Pressable
            className="rounded-2xl border px-5 py-4"
            style={{ borderColor: theme.borderBrand, backgroundColor: theme.brandSubtle }}
            onPress={() => simulateLoad('Memuat data...')}
          >
            <Text className="text-center text-base font-semibold" style={{ color: theme.textBrand }}>
              Dengan teks (2 detik)
            </Text>
          </Pressable>
        </View>

        {/* ── Color swatches ── */}
        <View
          className="rounded-3xl border p-4 gap-3"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-bold mb-1" style={{ color: theme.textPrimary }}>
            Token Warna
          </Text>
          {[
            { label: 'bgPrimary',           color: theme.bgPrimary },
            { label: 'bgSecondary',         color: theme.bgSecondary },
            { label: 'bgTertiary',          color: theme.bgTertiary },
            { label: 'surfaceDefault',      color: theme.surfaceDefault },
            { label: 'surfaceRaised',       color: theme.surfaceRaised },
            { label: 'surfaceOverlay',      color: theme.surfaceOverlay },
            { label: 'brandDefault',        color: theme.brandDefault },
            { label: 'brandSubtle',         color: theme.brandSubtle },
            { label: 'brandMuted',          color: theme.brandMuted },
            { label: 'borderDefault',       color: theme.borderDefault },
            { label: 'borderStrong',        color: theme.borderStrong },
            { label: 'borderBrand',         color: theme.borderBrand },
            { label: 'statusSuccess',       color: theme.statusSuccess },
            { label: 'statusSuccessSubtle', color: theme.statusSuccessSubtle },
          ].map((item) => (
            <View key={item.label} className="flex-row items-center gap-3">
              <View className="h-8 w-8 rounded-lg border"
                style={{ backgroundColor: item.color, borderColor: theme.borderDefault }} />
              <Text className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                theme.{item.label}
              </Text>
              <Text className="ml-auto text-xs" style={{ color: theme.textTertiary }}>
                {item.color}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Typography ── */}
        <View
          className="rounded-3xl border p-4 gap-2"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-bold mb-1" style={{ color: theme.textPrimary }}>Typography</Text>
          <Text className="text-5xl font-extrabold" style={{ color: theme.textPrimary }}>Aa ExtraBold</Text>
          <Text className="text-3xl font-bold"      style={{ color: theme.textPrimary }}>Aa Bold</Text>
          <Text className="text-xl font-semibold"   style={{ color: theme.textPrimary }}>Aa SemiBold</Text>
          <Text className="text-lg font-medium"     style={{ color: theme.textPrimary }}>Aa Medium</Text>
          <Text className="text-base"               style={{ color: theme.textSecondary }}>Aa Regular</Text>
          <Text className="text-sm"                 style={{ color: theme.textSecondary }}>Aa Small</Text>
          <Text className="text-xs"                 style={{ color: theme.textTertiary }}>Aa XSmall</Text>
          <View className="mt-2 gap-1">
            <Text className="text-sm font-semibold" style={{ color: theme.textPrimary }}>textPrimary</Text>
            <Text className="text-sm"               style={{ color: theme.textSecondary }}>textSecondary</Text>
            <Text className="text-sm"               style={{ color: theme.textTertiary }}>textTertiary</Text>
            <Text className="text-sm"               style={{ color: theme.textDisabled }}>textDisabled</Text>
            <Text className="text-sm"               style={{ color: theme.textBrand }}>textBrand</Text>
          </View>
        </View>

        {/* ── Status ── */}
        <View
          className="rounded-3xl border p-4 gap-3"
          style={{ backgroundColor: theme.surfaceDefault, borderColor: theme.borderDefault }}
        >
          <Text className="text-base font-bold mb-1" style={{ color: theme.textPrimary }}>Status</Text>
          <View
            className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
            style={{ backgroundColor: theme.statusSuccessSubtle, borderColor: theme.statusSuccess, borderWidth: 1 }}
          >
            <View className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.statusSuccess }} />
            <Text className="text-sm font-medium" style={{ color: theme.statusSuccess }}>
              Berhasil! statusSuccessSubtle + statusSuccess
            </Text>
          </View>
        </View>

      </View>
    </ScrollView>
    

  );
}