import * as React from "react";
import { DataTable, Text } from "react-native-paper";
import { View } from "./Themed";
import useUserStore from "@/stores/user-store";
import useAuthStore from "@/stores/auth-store";

const DriversTable = () => {
  const { drivers } = useUserStore();
  const { userData } = useAuthStore();

  return (
    <View style={{ marginTop: 12, marginBottom: 30 }}>
      <Text style={{ padding: 10, paddingBottom: 0 }} variant="headlineSmall">
        Schools' drivers
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Car No</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Phone</DataTable.Title>
        </DataTable.Header>

        {drivers?.slice().map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.carNumberPlate}</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell>{item.phoneNumber}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default DriversTable;
