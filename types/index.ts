// Define the shape of the user object
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PARENT" | "STUDENT" | "DRIVER";
  school: { id: string; name: string; address: string } | null;
}
