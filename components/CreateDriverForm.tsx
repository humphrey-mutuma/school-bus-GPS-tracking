// app/(admin)/create-driver.tsx
import { View, ScrollView, Pressable, Modal, Alert } from "react-native";
import { useState } from "react";
import driversService from "@/services/drivers/drivers.service";
import { Toast } from "toastify-react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function CreateDriverScreen({ visible, setVisible }: any) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateDriver = async () => {
    if (!email || !phoneNumber || !carNumberPlate) {
      Toast.error("Please fill in all required fields ");
      return;
    }

    setLoading(true);
    try {
      const response = await driversService.createDriver({
        email,
        name,
        phoneNumber,
        carNumberPlate,
      });

      if (response) {
        Alert.alert(response.message);
        setEmail("");
        setName("");
        setPhoneNumber("");
        setCarNumberPlate("");
        setVisible(false);
      }
    } catch (error) {
      Alert.alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose} // Android back button support
    >
      {/* Backdrop */}
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} // Semi-transparent black backdrop
        onPress={handleClose} // Close modal when backdrop is tapped
      >
        {/* Prevent backdrop press from closing when tapping modal content */}
        <Pressable style={{ flex: 1 }} onPress={(e) => e.stopPropagation()}>
          {/* Modal Content */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "83%",
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <View style={{ marginBottom: 8, backgroundColor: "#F3F4F6" }}>
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4,
                    padding: 8,
                    gap: 15,
                  }}
                >
                  <Text variant="headlineSmall" style={{}}>
                    Create a Driver
                  </Text>
                  {/* Email Input */}
                  <TextInput
                    mode="outlined"
                    label="Enter driver email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Text variant="labelSmall">
                    This email will be used by drivers to sign in and give their
                    GPS location while in transit
                  </Text>
                  {/* Name Input  */}
                  <TextInput
                    mode="outlined"
                    label="Enter driver name  "
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                  {/* Phone Number Input */}
                  <TextInput
                    mode="outlined"
                    label="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                  {/* Car Plate Number Input */}
                  <TextInput
                    mode="outlined"
                    label="Enter car  number plate"
                    value={carNumberPlate}
                    onChangeText={setCarNumberPlate}
                    autoCapitalize="characters"
                  />
                  {/* Submit Button */}
                  <Button
                    mode="contained"
                    onPress={handleCreateDriver}
                    disabled={loading}
                  >
                    <Text>{loading ? "Creating..." : "Create Driver"}</Text>
                  </Button>
                  {/*  */}
                  <Button mode="outlined" onPress={handleClose}>
                    <Text style={{ color: "red" }}>Cancel</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
