// app/(admin)/create-school.tsx
import { View, Alert, Pressable } from "react-native";
import { useState } from "react";
import useAuthStore from "@/stores/auth-store";
import { Toast } from "toastify-react-native";
import studentsService from "@/services/students/students.service";
import { ScrollView, Modal } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import useUserStore from "@/stores/user-store";

export default function CreateStudentForm({ visible, setVisible }: any) {
  const { userData } = useAuthStore();
  const { fetchStudents } = useUserStore();

  const [parentEmail, setParentEmail] = useState("");
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateStudent = async () => {
    if (!name || !parentName || !parentEmail) {
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
        // setPhoneNumber("");
        setVisible(false);
        fetchStudents();
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
      onRequestClose={handleClose}
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
              <View style={{ flex: 1 }}>
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
                      Create a Student with Parent
                    </Text>

                    {/* Name Input */}
                    <TextInput
                      style={{}}
                      mode="outlined"
                      label="Enter student name"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />

                    {/* Parent Name Input */}
                    <TextInput
                      style={{}}
                      mode="outlined"
                      label="Enter parent name"
                      value={parentName}
                      onChangeText={setParentName}
                      autoCapitalize="words"
                    />

                    {/* Parent Email Input */}
                    <TextInput
                      style={{}}
                      mode="outlined"
                      label="Enter parent email"
                      value={parentEmail}
                      onChangeText={setParentEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />

                    <Text style={{}} variant="labelSmall">
                      This email will be used by the student's parent to sign in
                      and track their location.
                    </Text>

                    {/* Create Student Button */}
                    <Button
                      style={{}}
                      onPress={handleCreateStudent}
                      disabled={loading}
                      mode="contained"
                    >
                      <Text style={{}}>
                        {loading ? "Creating..." : "Create Student"}
                      </Text>
                    </Button>
                  </View>
                </View>

                {/* Cancel Button */}
                <Button style={{}} mode="outlined" onPress={handleClose}>
                  <Text style={{ color: "red" }}>Cancel</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
