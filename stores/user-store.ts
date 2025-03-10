import { create } from "zustand";
import { handleAxiosError } from "@/utils/errorhandler";
import parentsService from "@/services/parents/parents.service";
import { ParentResDto } from "@/services/parents/dto/parent.dto";
import { DriverResDto } from "@/services/drivers/dto/driver.dto";
import { FindStudentDto } from "@/services/students/dto/student.dto";
import driversService from "@/services/drivers/drivers.service";
import studentsService from "@/services/students/students.service";

// types.ts
interface UserState {
  fetchParents: () => Promise<void>;
  fetchDrivers: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  isFetching: boolean;
  parents: ParentResDto[];
  drivers: DriverResDto[];
  students: FindStudentDto[];
}

const initialState: UserState = {
  isFetching: false,
  parents: [],
  drivers: [],
  students: [],

  // Placeholder, will be overridden in store creation
  fetchParents: async () => {},
  fetchDrivers: async () => {},
  fetchStudents: async () => {},
};

const useUserStore = create<UserState>()(
  (set, get) => ({
    // initial states
    ...initialState,

    // .ACTIONS*****************************************

    // methods *************************************************

    // fetch parents ****
    fetchParents: async () => {
      try {
        const res = await parentsService.findParents();
        // Revert state if server update fails
        set({ parents: res.data });
      } catch (error) {
        handleAxiosError(error);
      } finally {
      }
    }, // fetch parents ****
    fetchDrivers: async () => {
      try {
        const res = await driversService.findDrivers();
        // Revert state if server update fails
        set({ drivers: res.data });
      } catch (error) {
        handleAxiosError(error);
      } finally {
      }
    }, // fetch parents ****
    fetchStudents: async () => {
      try {
        const res = await studentsService.findStudents();
        // Revert state if server update fails
        set({ students: res.data });
      } catch (error) {
        handleAxiosError(error);
      } finally {
      }
    },
  })
  // {
  //   name: "users-store",
  //   partialize: (state) => ({ userBookmarks: state.userBookmarks }), // Only persist accessToken
  // }
);

export default useUserStore;
