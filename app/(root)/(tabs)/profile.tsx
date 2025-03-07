import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text>Profile Scheeen</Text>
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
