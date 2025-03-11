import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useUserStore from "./user-store";
import { SessionUser } from "@/types";
import authService from "@/services/auth/auth.service";
import {
  CreatePasswordDto,
  LoginDto,
  RegisterDto,
} from "@/services/auth/dto/auth.dto";
import { extractEmailFromToken } from "@/utils/handleTokens";
import { Alert } from "react-native";

interface AuthState {
  userData: SessionUser | null;
  accessToken: string | null;
  refToken: string | null;
  userIsSignedIn: boolean;
  redirectUrl: string | null;
  isLoading: boolean;
  isHydrating: boolean;

  setUserData: (data: SessionUser | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefToken: (token: string | null) => void;
  setRedirectUrl: (url: string | null) => void;

  login: (data: LoginDto) => Promise<any>;
  register: (data: RegisterDto) => Promise<any>;
  createPassword: (data: CreatePasswordDto) => Promise<any>;
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
      setIsHydrating: (isHydrating: boolean) => set({ isHydrating }), // Function to set loading state

      //methods

      // log user out ********************************************************
      logOut: async () => {
        const { userData, accessToken, setAccessToken } = get();
        if (!accessToken && !userData) {
          alert("You are not Logged in!");
          return;
        }

        // set({ isLoading: true });

        try {
          set({
            accessToken: null,
            userData: null,
            refToken: null,
          });
          // localStorage.clear();
          alert("Successfully Signed Out!");
        } catch (error) {
          // alert(`error`);
        } finally {
          // set({ isLoading: false });
        }
      },

      // sign user in *********************************************************
      login: async ({ email, password }: LoginDto) => {
        if (!password?.trim() || !email?.trim()) {
          return alert("email and password is required!");
        }

        set({ isLoading: true });

        try {
          const { data, message } = await authService.login({
            email,
            password,
          });

          if (data) {
            // store token in the local storage
            const email = await extractEmailFromToken(data.accessToken);
            if (!email) {
              alert("Invalid email! please refresh and login");
              return;
            }
            get().setAccessToken(data.accessToken);
            get().setRefToken(data.refreshToken);
            get().setUserData({
              id: data.id,
              email: data.email,
              name: data.name,
              role: data.role,
              school: data.school,
            });

            alert(message);

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
        }
      },

      // sign user in *********************************************************
      register: async (registerDto: RegisterDto) => {
        if (!registerDto) {
          return alert("Missing details!");
        }

        set({ isLoading: true });

        try {
          const { data, message } = await authService.register(registerDto);

          if (data) {
            alert(message);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          // handleAxiosError(error);
        } finally {
          set({ isLoading: false });
        }
      },

      // create password *********************************************************
      createPassword: async ({ email, password }: CreatePasswordDto) => {
        if (!password?.trim() || !email?.trim()) {
          return alert("email and password is required!");
        }

        set({ isLoading: true });

        try {
          const { data, message } = await authService.createPassword({
            email,
            password,
          });

          if (data) {
            alert(message);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          // handleAxiosError(error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        userData: state.userData,
      }), // Only persist accessToken & userData
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
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
