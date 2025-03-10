import * as React from "react";
import { DataTable, Text } from "react-native-paper";
import { View } from "./Themed";
import useUserStore from "@/stores/user-store";

const StudentsTable = () => {
  const { students } = useUserStore();

  return (
    <View>
      <Text style={{ padding: 10, paddingBottom: 0 }} variant="headlineSmall">
        Students List
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Parent</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
        </DataTable.Header>

        {students?.slice().map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.parentName}</DataTable.Cell>
            <DataTable.Cell>{item.parentEmail}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default StudentsTable;
