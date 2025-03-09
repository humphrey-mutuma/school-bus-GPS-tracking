import * as React from "react";
import { DataTable } from "react-native-paper";
import { Text, View } from "./Themed";
import { DriverResDto } from "@/services/drivers/dto/driver.dto";

const DriversTable = () => {
  const [items] = React.useState<DriverResDto[]>([
    {
      id: "ds",
      email: "john.doe@example.com",
      name: "John Doe",
      phoneNumber: "+1-555-4567",
      carNumberPlate: "ABC123",
    },
    {
      id: "ds532",

      email: "mary.smith@example.com",
      name: "Mary Smith",
      phoneNumber: "+125-234-5678",
      carNumberPlate: "XYZ789",
    },
    {
      id: "d2s",
      email: "peter.jones@example.com",
      name: "Peter Jones",
      phoneNumber: "+1-664-6789",
      carNumberPlate: "DEF456",
    },
  ]);

  return (
    <View className="mt-3 mb-10">
      <Text className=" p-2  font-semibold text-lg">Drivers List</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Car No</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Phone</DataTable.Title>
        </DataTable.Header>

        {items.slice().map((item) => (
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
