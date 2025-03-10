// app/admin.tsx
import { View, ScrollView } from "react-native";
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Text variant="headlineSmall">Not logged in</Text>
        <Button
          mode="outlined"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text>Go to Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 4 }}>
      {/* User Info Card */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 8,
          marginBottom: 24,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Welcome Back
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 8 }}>
              Name:
            </Text>
            <Text style={{ color: "#4B5563", flex: 1 }}>
              {userData?.name || "Not provided"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 8 }}>
              Email:
            </Text>
            <Text style={{ color: "#4B5563", flex: 1 }}>{userData?.email}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 8 }}>
              Role:
            </Text>
            <Text style={{ color: "#4B5563", flex: 1 }}>{userData?.role}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 8 }}>
              School:
            </Text>
            <Text style={{ color: "#4B5563", flex: 1 }}>
              {userData?.school?.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 8 }}>
              Address:
            </Text>
            <Text style={{ color: "#4B5563", flex: 1 }}>
              {userData?.school?.address}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: 16,
            }}
          >
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

      <ScrollView style={{ flex: 1, paddingBottom: 60 }}>
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
