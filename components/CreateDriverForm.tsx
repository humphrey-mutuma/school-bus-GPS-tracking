// app/(admin)/create-driver.tsx
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { useState } from "react";
import driversService from "@/services/drivers/drivers.service";
import { Toast } from "toastify-react-native";

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
        className="flex-1 bg-black/50" // Semi-transparent black backdrop
        onPress={handleClose} // Close modal when backdrop is tapped
      >
        {/* Prevent backdrop press from closing when tapping modal content */}
        <Pressable className="flex-1" onPress={(e) => e.stopPropagation()}>
          {/* Modal Content */}
          <View className="absolute bottom-0 w-full h-5/6 bg-white rounded-t-3xl shadow-lg">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <View className="mb-2 bg-gray-100 ">
                <View className="bg-white rounded-sm  p-2 mb-6">
                  <Text className="text-2xl font-[500] text-gray-800 mb-2 ">
                    Create a Driver
                  </Text>
                  {/* Email Input */}
                  <TextInput
                    className="w-full p-3 text-base  bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    placeholder="Enter driver email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Text className="text-xs font-light italic p-1 mb-4 text-gray-700">
                    This email will be used by drivers to sign in and give their
                    GPS location while in transit
                  </Text>
                  {/* Name Input  */}
                  <TextInput
                    className="w-full p-3 text-base mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    placeholder="Enter driver name  "
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                  {/* Phone Number Input */}
                  <TextInput
                    className="w-full p-3 text-base mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                  {/* Car Plate Number Input */}
                  <TextInput
                    className="w-full p-3 text-base mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    placeholder="Enter car  number plate"
                    value={carNumberPlate}
                    onChangeText={setCarNumberPlate}
                    autoCapitalize="characters"
                  />
                  {/* Submit Button */}
                  <Pressable
                    className={`py-3 rounded-lg ${
                      loading ? "bg-blue-300" : "bg-blue-500"
                    } active:bg-blue-600`}
                    onPress={handleCreateDriver}
                    disabled={loading}
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      {loading ? "Creating..." : "Create Driver"}
                    </Text>
                  </Pressable>
                  <Pressable
                    className="bg-red-300 py-3 rounded-lg  my-3"
                    onPress={handleClose}
                  >
                    <Text className="text-white text-center font-semibold">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
