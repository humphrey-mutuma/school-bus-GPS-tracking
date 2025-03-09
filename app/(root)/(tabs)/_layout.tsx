// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Or any icon set you prefer

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide headers for all screens
        tabBarActiveTintColor: "#3b82f6", // Blueish active color
        tabBarInactiveTintColor: "#6b7280", // Grayish inactive color
        tabBarStyle: {
          position: "absolute", // Make it float
          bottom: 10, // Distance from bottom
          left: 10, // Margin from left
          right: 10, // Margin from right
          elevation: 4, // Android shadow
          backgroundColor: "#ffffff", // White background
          borderRadius: 20, // Rounded corners
          height: 60, // Height of the tab bar
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          padding: 5, // Adjust icon/text spacing
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: "Manage",
        }}
      />
    </Tabs>
  );
}
