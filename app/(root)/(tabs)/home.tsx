import { StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";

export default function HomeScreen() {
  // Coordinates for Nairobi, Kenya
  const nairobiCoordinates = {
    latitude: -0.5312, // Embu Town latitude
    longitude: 37.4506, // Embu Town longitude
    latitudeDelta: 0.0922, // Zoom level (adjust for desired zoom)
    longitudeDelta: 0.0421, // Zoom level (adjust for desired zoom)
  };

  return (
    <View style={styles.container}>
      <Text>lorem</Text>
      {/* <MapView
        style={styles.map}
        initialRegion={nairobiCoordinates} // Centers the map on Nairobi
      >
        {/* Optional: Add a marker at Nairobi */}
      {/* <Marker
          coordinate={{
            latitude: -0.5312, // Embu Town latitude
            longitude: 37.4506, // Embu Town longitude
          }}
          title="Nairobi, Kenya"
          description="Capital city of Kenya"
        />
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
  map: {
    flex: 1, // Makes the map take up the remaining available space
  },
});
