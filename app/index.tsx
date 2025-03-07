import useAuthStore from "@/stores/auth-store";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { userData } = useAuthStore();

  if (userData) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
}
