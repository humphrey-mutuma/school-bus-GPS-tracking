import { Roles } from "@/enums";

// Define the shape of the user object
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Roles;
}
