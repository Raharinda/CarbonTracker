// =============================================================================
// src/debug/DebugButton.tsx
// Tombol floating debug — hanya muncul di mode development.
// =============================================================================

import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function DebugButton() {

  // Hanya tampil saat development
  if (!__DEV__) return null;

  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/debug')}
      style={({ pressed }) => ({
        position: 'absolute',
        bottom: 40,
        right: 20,
        zIndex: 9999,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1C1C1C',
        opacity: pressed ? 0.7 : 0.85,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      })}
    >
      <Text style={{ fontSize: 20 }}>🛠</Text>
    </Pressable>
  );
}