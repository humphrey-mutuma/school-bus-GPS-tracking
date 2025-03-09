import * as React from "react";
import { DataTable } from "react-native-paper";
import { Text, View } from "./Themed";
import { FindStudentDto } from "@/services/students/dto/student.dto";

const StudentsTable = () => {
  const [items] = React.useState<FindStudentDto[]>([
    {
      id: "dss",
      name: "Alice Johnson",
      parentName: "Emma Johnson",
      parentEmail: "emma.johnson@example.com",
    },
    {
      id: "dss54",

      name: "Ben Carter",
      parentName: "Liam Carter",
      parentEmail: "liam.carter@example.com",
    },
    {
      id: "ds42s",

      name: "Clara Davis",
      parentName: "Sophie Davis",
      parentEmail: "sophie.davis@example.com",
    },
    {
      id: "ds46521s",

      name: "Dylan Evans",
      parentName: "Noah Evans",
      parentEmail: "noah.evans@example.com",
    },
    {
      id: "ds685s",

      name: "Ella Foster",
      parentName: "Olivia Foster",
      parentEmail: "olivia.foster@example.com",
    },
    {
      id: "52dss",

      name: "Finn Harris",
      parentName: "Mason Harris",
      parentEmail: "mason.harris@example.com",
    },
  ]);

  return (
    <View>
      <Text className=" p-2  font-semibold text-lg">Student List</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Parent</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
        </DataTable.Header>

        {items.slice().map((item) => (
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
