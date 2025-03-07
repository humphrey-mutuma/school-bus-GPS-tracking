import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text>Home Scheeen</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
