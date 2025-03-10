// // Geoapify API key (replace with your own)
// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import MapView, { Polyline, Marker } from "react-native-maps";

// const API_KEY = "f7081337223645b8b54ae4055dbfdc35";
// const startPoint = { latitude: -1.2805069, longitude: 36.816795 };
// const endPoint = { latitude: -1.268379, longitude: 36.8204315 };

// const BusRouteMap = () => {
//   const [routeCoords, setRouteCoords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRoute = async () => {
//       try {
//         const response = await fetch(
//           `https://api.geoapify.com/v1/routing?waypoints=${startPoint.latitude},${startPoint.longitude}|${endPoint.latitude},${endPoint.longitude}&mode=drive&apiKey=${API_KEY}`
//         );
//         const data = await response.json();

//         if (data && data.features.length > 0) {
//           // Extract route coordinates
//           const coordinates = data.features[0].geometry.coordinates.map(
//             ([lon, lat]) => ({
//               latitude: lat,
//               longitude: lon,
//             })
//           );
//           setRouteCoords(coordinates);
//         }
//       } catch (error) {
//         console.error("Error fetching route:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoute();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: startPoint.latitude,
//             longitude: startPoint.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           {/* Markers for Start & End Points */}
//           <Marker coordinate={startPoint} title="Start" />
//           <Marker coordinate={endPoint} title="End" />

//           {/* Draw Route */}
//           <Polyline
//             coordinates={routeCoords}
//             strokeWidth={4}
//             strokeColor="blue"
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default BusRouteMap;
