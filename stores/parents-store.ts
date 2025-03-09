import { create } from "zustand";
import { handleAxiosError } from "@/utils/errorhandler";
import { Alert } from "react-native";
import { ParentResDto } from "@/services/parents/dto/parent.dto";
import parentsService from "@/services/parents/parents.service";

// types.ts
interface UserState {
  parents: ParentResDto[];
}

const initialState: UserState = {
  parents: [],
};

const useUserStore = create<UserState>()((set) => ({
  // initial states
  ...initialState,

  // .ACTIONS*****************************************

  // methods *************************************************

  // bookmark a rental
  fetchParents: async (userId: string) => {
    try {
      const res = await parentsService.findParents();
      // Revert state if server update fails
      set({ parents: res.data });
    } catch (error) {
      handleAxiosError(error);
    } finally {
    }
  },

  //
}));

export default useUserStore;
