import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./user-store";
import { SessionUser } from "@/types";
import authService from "@/services/auth/auth.service";
import { AuthenticateDto } from "@/services/auth/dto/auth.dto";
import { extractUsernameFromToken } from "@/utils/handleTokens";
import { Alert } from "react-native";

interface AuthState {
  userData: SessionUser | null;
  accessToken: string | null;
  refToken: string | null;
  userIsSignedIn: boolean;
  redirectUrl: string | null;
  isLoading: boolean;
  isHydrating: boolean;

  openSignUpModal: () => void;
  closeSignUpModal: () => void;

  setUserData: (data: SessionUser | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefToken: (token: string | null) => void;
  setRedirectUrl: (url: string | null) => void;

  authenticate: (data: AuthenticateDto) => Promise<any>;
  logOut: () => Promise<void>;
  setIsHydrating: (isHydrating: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // initial states
      userData: null,
      accessToken: null,
      refToken: null,
      userIsSignedIn: false,
      redirectUrl: null,
      isLoading: false, // Initially false
      isHydrating: true, // Start with true while hydrating
      // .ACTIONS*****************************************
      setUserData: (data: SessionUser | null) => set({ userData: data }),
      setAccessToken: (token: string | null) => set({ accessToken: token }),
      setRefToken: (token: string | null) => set({ refToken: token }),
      setRedirectUrl: (url: string | null) => set({ redirectUrl: url }),
      openSignUpModal: () => set({ userIsSignedIn: true }),
      closeSignUpModal: () => set({ userIsSignedIn: false }),
      setIsHydrating: (isHydrating: boolean) => set({ isHydrating }), // Function to set loading state

      //methods

      // log user out ********************************************************
      logOut: async () => {
        const { userData, accessToken, setAccessToken } = get();
        if (!accessToken && !userData) {
          Alert.prompt("You are not Logged in!");
          return;
        }

        set({ isLoading: true });

        try {
          set({
            accessToken: null,
            userData: null,
            refToken: null,
          });
          localStorage.clear();
          Alert.prompt("Successfully Signed Out!");
        } catch (error) {
          Alert.alert(`error`);
        } finally {
          // set({ isLoading: false });
        }
      },

      // sign user in *********************************************************
      authenticate: async ({ username, password }: AuthenticateDto) => {
        if (!password?.trim() || !username?.trim()) {
          return Alert.prompt("username and password is required!");
        }

        set({ isLoading: true });

        try {
          const { data, message } = await authService.authenticateUser({
            username,
            password,
          });

          if (data) {
            // store token in the local storage
            const username = await extractUsernameFromToken(data.accessToken);
            if (!username) {
              Alert.prompt("Invalid username! please refresh and login");
              return;
            }
            get().setAccessToken(data.accessToken);
            get().setRefToken(data.refreshToken);
            get().setUserData({
              isVerified: data.isVerified,
              image: data.image,
              id: data.id,
              username: username,
            });
            useUserStore.getState().setUserBookmarks(data.userBookmarks);

            Alert.prompt(message);

            // redirect to previously redirect url else home
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          // handleAxiosError(error);
        } finally {
          set({ isLoading: false });
          get().closeSignUpModal();
        }
      },
    }),
    {
      name: "auth-store",
      // getStorage: () => localStorage,
      // serialize: (state) => encryptToken(state),
      // deserialize: (state) => decryptToken(state),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refToken: state.refToken,
        userData: state.userData,
      }), // Only persist accessToken & userData

      onRehydrateStorage: () => (state) => {
        // When rehydrating from localStorage, set loading to false after the store is populated
        if (state) {
          state.setIsHydrating(false);
        }
      },
    }
  )
);

export default useAuthStore;
