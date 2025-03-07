import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

// Utility function to handle errors
export function handleAxiosError(error: any): never {
  if (axios.isAxiosError(error)) {
    // The error is an AxiosError, and you can access its properties
    console.error("Axios error message:", error.message);
    // console.error("Axios error response:", error.response);
    Alert.alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message);
  } else {
    // The error is not an AxiosError
    Alert.alert(error.response?.data?.message);
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
}
