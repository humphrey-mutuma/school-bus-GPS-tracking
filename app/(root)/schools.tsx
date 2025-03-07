import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function home() {
  return (
    <View style={styles.container}>
      <View className="flex-1 justify-center items-center  p-3 bg-slate-200">
        <Button title="Press Me" onPress={() => alert("Button Pressed!")} />
        <Text style={styles.title} className="text-[blue] text-2xl">
          Home Page this is he home page Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Eos quaerat fugit recusandae expedita quae numquam
          ut perspiciatis illo, ipsum, itaque, necessitatibus quidem dolorum
          excepturi commodi labore debitis? Expedita, cum. Amet!
        </Text>{" "}
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
