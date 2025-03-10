// app/admin.tsx
import { View, Pressable, ScrollView } from "react-native";
import { router, useRouter } from "expo-router";
import { useState } from "react";
import useAuthStore from "@/stores/auth-store";
import CreateDriverScreen from "@/components/CreateDriverForm";
import CreateStudentForm from "@/components/CreateStudentForm";
import { Text, Button } from "react-native-paper";
import StudentsTable from "@/components/StudentsTable";
import DriversTable from "@/components/DriversTable";

export default function AdminScreen() {
  const { userData, logOut } = useAuthStore();
  const router = useRouter();

  const [createStudent, setCreateStudent] = useState(false);
  const [createDriver, setCreateDriver] = useState(false);

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-base  ">Not logged in</Text>
        <Pressable
          className="mt-4 px-6 py-2 bg-blue-500 rounded-lg"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text className="text-white font-semibold">Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-1">
      {/* User Info Card */}
      <View className="bg-white rounded-xl   p-2 mb-6">
        <View className="flex- mb-4">
          <View>
            <Text className="text-xl font-semibold">Welcome Back</Text>
          </View>
          {/*  */}
          <View className="flex-row items-center">
            <Text className="text-base font-semibold   mr-2">Name:</Text>
            <Text className="  text-gray-600 flex-1">
              {userData?.name || "Not provided"}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-base font-semibold   mr-2">Email:</Text>
            <Text className="  text-gray-600 flex-1">{userData?.email}</Text>
          </View>
          {/*  */}
          <View className="flex-row items-center">
            <Text className="text-base font-semibold   mr-2">Role:</Text>
            <Text className="  text-gray-600 flex-1">{userData?.role}</Text>
          </View>
          {/*  */}
          <View className="flex-row items-center">
            <Text className="text-base font-semibold   mr-2">School:</Text>
            <Text className="  text-gray-600 flex-1">
              {userData?.school?.name}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-base font-semibold   mr-2">Address:</Text>
            <Text className="  text-gray-600 flex-1">
              {userData?.school?.address}
            </Text>
          </View>
          <View className="flex flex-row items-baseline justify-evenly w-full mt-4">
            <Button
              icon="pencil"
              mode="contained"
              onPress={() => setCreateStudent(true)}
            >
              Create Student
            </Button>
            <Button
              icon="pencil"
              mode="outlined"
              onPress={() => setCreateDriver(true)}
              style={{ marginLeft: 5 }}
            >
              Create Driver
            </Button>
          </View>
        </View>
      </View>
      <ScrollView className="flex-1 pb-20">
        <StudentsTable />
        <DriversTable />
      </ScrollView>
      <CreateStudentForm
        {...{ visible: createStudent, setVisible: setCreateStudent }}
      />
      <CreateDriverScreen
        {...{ visible: createDriver, setVisible: setCreateDriver }}
      />
    </View>
  );
}
