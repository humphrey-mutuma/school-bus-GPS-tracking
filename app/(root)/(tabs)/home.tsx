 import { StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

export default function HomeScreen() {
  // Coordinates for Nairobi, Kenya
  const nairobiCoordinates = {
    latitude: -0.5312, // Embu Town latitude
    longitude: 37.4506, // Embu Town longitude
    latitudeDelta: 0.0922, // Zoom level (adjust for desired zoom)
    longitudeDelta: 0.0421, // Zoom level (adjust for desired zoom)
  };
  // api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=f7081337223645b8b54ae4055dbfdc35
  https: return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 0 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/image.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover", // Ensures full display without distortion
            overflow:'visible'
          }}
        />
        {/* <Text>lorem</Text> */}
        {/* <MapView
          style={styles.map}
          initialRegion={nairobiCoordinates} // Centers the map on Nairobi
        >
          <Marker
            coordinate={{
              latitude: -0.5312, // Embu Town latitude
              longitude: 37.4506, // Embu Town longitude
            }}
            title="Nairobi, Kenya"
            description="Capital city of Kenya"
          />
        </MapView> */}
      </View>
    </SafeAreaView>
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
