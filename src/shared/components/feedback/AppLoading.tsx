// =============================================================================
// AppLoading.tsx
// Komponen loading spinner yang bisa dipakai di seluruh app.
//
// Cara pakai:
//   // Spinner kecil di dalam konten
//   <AppLoading />
//
//   // Spinner fullscreen (nutup seluruh halaman)
//   <AppLoading fullScreen />
//
//   // Dengan teks
//   <AppLoading label="Memuat data..." />
//
//   // Ukuran dan warna custom
//   <AppLoading size="lg" color="brand" />
// =============================================================================

import { useTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

// =============================================================================
// TIPE PROPS
// =============================================================================

type AppLoadingProps = {

  // Ukuran spinner — default: 'md'
  size?: 'sm' | 'md' | 'lg';

  // Warna spinner — default: 'brand'
  //   brand   → hijau (warna utama)
  //   primary → teks utama (hitam/putih)
  //   muted   → abu-abu
  color?: 'brand' | 'primary' | 'muted';

  // Teks di bawah spinner (opsional)
  label?: string;

  // true → spinner menutupi seluruh layar dengan overlay
  fullScreen?: boolean;

};

// =============================================================================
// UKURAN SPINNER
// =============================================================================

const spinnerSize = {
  sm: 20,
  md: 36,
  lg: 52,
};

const borderWidth = {
  sm: 2,
  md: 3,
  lg: 4,
};

const labelSize = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// =============================================================================
// KOMPONEN SPINNER
// =============================================================================

function Spinner({
  size = 'md',
  color = 'brand',
}: Pick<AppLoadingProps, 'size' | 'color'>) {
  const { theme } = useTheme();

  // Nilai animasi rotasi
  const rotation = useRef(new Animated.Value(0)).current;

  // Jalankan animasi rotasi terus-menerus saat komponen muncul
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Konversi nilai 0-1 menjadi derajat rotasi 0-360
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Pilih warna berdasarkan prop color
  const spinnerColor = {
    brand:   theme.brandDefault,
    primary: theme.textPrimary,
    muted:   theme.textTertiary,
  }[color];

  const diameter = spinnerSize[size ?? 'md'];
  const border   = borderWidth[size ?? 'md'];

  return (
    <Animated.View
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        borderWidth: border,
        // Warna track (lingkaran penuh yang redup)
        borderColor: spinnerColor + '30',
        // Warna arc (bagian yang berputar)
        borderTopColor: spinnerColor,
        transform: [{ rotate }],
      }}
    />
  );
}

// =============================================================================
// KOMPONEN UTAMA
// =============================================================================

export default function AppLoading({
  size = 'md',
  color = 'brand',
  label,
  fullScreen = false,
}: AppLoadingProps) {
  const { theme } = useTheme();

  const labelColor = {
    brand:   theme.brandDefault,
    primary: theme.textPrimary,
    muted:   theme.textTertiary,
  }[color];

  // ---------------------------------------------------------------------------
  // Mode fullscreen — overlay di atas seluruh layar
  // ---------------------------------------------------------------------------
  if (fullScreen) {
    return (
      <View
        className="absolute inset-0 items-center justify-center"
        style={{
          // Overlay semi-transparan
          backgroundColor: theme.bgPrimary + 'CC',
          zIndex: 999,
        }}
      >
        <View
          className="items-center justify-center gap-4 rounded-3xl px-10 py-8"
          style={{ backgroundColor: theme.surfaceRaised }}
        >
          <Spinner size={size} color={color} />
          {label && (
            <Text
              className={`${labelSize[size]} font-medium`}
              style={{ color: labelColor }}
            >
              {label}
            </Text>
          )}
        </View>
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // Mode inline — spinner di dalam konten biasa
  // ---------------------------------------------------------------------------
  return (
    <View className="items-center justify-center gap-3">
      <Spinner size={size} color={color} />
      {label && (
        <Text
          className={`${labelSize[size]} font-medium`}
          style={{ color: labelColor }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}