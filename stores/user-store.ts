import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleAxiosError } from "@/utils/errorhandler";
import { Alert } from "react-native";

// types.ts
interface UserState {
  userBookmarks: string[];
  setUserBookmarks: (bookmarks: string[]) => void;
  bookmarkRental: (rentalId: string, userId: string) => Promise<void>;
  isBookmarked: (rentalId: string) => boolean;
  clearBookmarks: (userId: string) => Promise<void>;
}

const initialState: UserState = {
  userBookmarks: [],

  // Placeholder, will be overridden in store creation
  setUserBookmarks: () => {},
  bookmarkRental: async () => {},
  isBookmarked: () => false,
  clearBookmarks: async () => {},
};

const useUserStore = create<UserState>()(
  (set, get) => ({
    // initial states
    ...initialState,

    // .ACTIONS*****************************************
    setUserBookmarks: (bookmarks: string[]) =>
      set({ userBookmarks: bookmarks }),

    // methods *************************************************

    // bookmark a rental
    bookmarkRental: async (rentalId: string, userId: string) => {
      const { userBookmarks } = get();
      const isBookmarked = userBookmarks?.includes(rentalId);

      // Optimistically update state
      const updatedBookmarks = isBookmarked
        ? userBookmarks.filter((id) => id !== rentalId)
        : [...userBookmarks, rentalId];

      set({ userBookmarks: updatedBookmarks });

      try {
        const res = [{ message: "" }];
        // Revert state if server update fails
        set({ userBookmarks });
      } catch (error) {
        // Revert state if server update fails
        set({ userBookmarks });
        handleAxiosError(error);
      } finally {
      }
    },

    // check if a rental is bookmarked already
    isBookmarked: (rentalId: string) => {
      const { userBookmarks } = get();
      return userBookmarks?.includes(rentalId);
    },
  
    //
  })
  // {
  //   name: "users-store",
  //   partialize: (state) => ({ userBookmarks: state.userBookmarks }), // Only persist accessToken
  // }
);

export default useUserStore;
