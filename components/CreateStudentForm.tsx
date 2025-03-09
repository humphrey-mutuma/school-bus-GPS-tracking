// app/(admin)/create-school.tsx
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import useAuthStore from "@/stores/auth-store";
import { Toast } from "toastify-react-native";
import studentsService from "@/services/students/students.service";
import { ScrollView, Modal } from "react-native";

export default function CreateStudentForm({ visible, setVisible }: any) {
  const { userData } = useAuthStore();
  const [parentEmail, setParentEmail] = useState("");
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSchool = async () => {
    if (!name || !parentEmail) {
      Toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await studentsService.createStudent({
        name,
        parentName,
        parentEmail,
      });

      if (response) {
        Toast.success(response.message);
        setName("");
        setParentEmail("");
        setPhoneNumber("");
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
              <View className="flex-1">
                <View className=" mb-2 bg-gray-100 ">
                  <View className="bg-white rounded-sm  p-2  ">
                    <Text className="text-2xl font-[500] text-gray-800 mb-2 ">
                      Create a Student with parent
                    </Text>
                    {/* Name Input  */}
                    <TextInput
                      className="w-full p-3 text-base mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                      placeholder="Enter student name "
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                    {/* Name Input  */}
                    <TextInput
                      className="w-full p-3 text-base mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                      placeholder="Enter parent name "
                      value={parentName}
                      onChangeText={setParentName}
                      autoCapitalize="words"
                    />
                    <TextInput
                      className="w-full p-3 text-base bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                      placeholder="Enter parent email"
                      value={parentEmail}
                      onChangeText={setParentEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <Text className="text-xs font-light italic p-1 mb-4 text-gray-700">
                      This email will be used by students' parent to sign in and
                      tract their location
                    </Text>
                    <Pressable
                      className={`py-2 rounded-lg ${
                        loading ? "bg-blue-300" : "bg-blue-500"
                      } active:bg-blue-600`}
                      onPress={handleCreateSchool}
                      disabled={loading}
                    >
                      <Text className="text-white text-center font-semibold text-lg">
                        {loading ? "Creating..." : "Create Student"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  className="bg-red-300 py-3 rounded-lg  my-3"
                  onPress={handleClose}
                >
                  <Text className="text-white text-center font-semibold">
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
