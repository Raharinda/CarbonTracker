import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    DeviceCard,
    DeviceEmptyState,
    DeviceFilterBar,
    DeviceScreenHeader,
    DeviceStatsRow,
} from "../components/DeviceList";

import { useActiveDeviceTimer } from "../hooks/useActiveDeviceTimer";
import { useDeviceList } from "../hooks/useDeviceList";

export default function DevicesScreen() {
  useActiveDeviceTimer();
  const [now, setNow] = useState(Date.now());
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    allItems,
    filteredItems,
    filter,
    setFilter,
    activeCount,
    highestConsumer,
    mostActive,
    toggleActive,
  } = useDeviceList();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F3FBF7]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <DeviceScreenHeader
          totalCount={allItems.length}
          activeCount={activeCount}
        />

        <DeviceStatsRow
          highestConsumer={highestConsumer}
          mostActive={mostActive}
        />

        <DeviceFilterBar
          selected={filter}
          onSelect={setFilter}
          onAddPress={() =>
            router.push({ pathname: "/(app)/devices/add" } as any)
          }
        />

        <View className="mt-4 gap-3">
          {filteredItems.length === 0 ? (
            <DeviceEmptyState />
          ) : (
            filteredItems.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                now={now}
                onToggle={toggleActive}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
