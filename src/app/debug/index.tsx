// =============================================================================
// src/app/debug/index.tsx
// =============================================================================

import TroubleshootIndex from '@/debug/index'; // ← pakai alias @
import { Stack } from 'expo-router'; // ← import dari sini, bukan dari .expo/types

export default function DebugRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TroubleshootIndex />
    </>
  );
}