import { StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapGeo from "@/components/GeopyCard";

export default function HomeScreen() {
  // Coordinates for Nairobi, Kenya
  // const nairobiCoordinates = {
  //   latitude: -0.5312, // Embu Town latitude
  //   longitude: 37.4506, // Embu Town longitude
  //   latitudeDelta: 0.0922, // Zoom level (adjust for desired zoom)
  //   longitudeDelta: 0.0421, // Zoom level (adjust for desired zoom)
  // };
  return (
    <SafeAreaView style={styles.container}>
      <MapGeo />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
  },
});
