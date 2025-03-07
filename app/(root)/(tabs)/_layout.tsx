import { Stack, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
 
  return (
    <Tabs>
      {/* <Tabs.Screen name="index" options={{ headerShown: false }} /> */}
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="explore" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
