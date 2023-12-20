import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthUserProps = {
  uid: string;
  name: string;
  skills: string[];
  bio: string;
  email: string;
  availability: boolean;
  profilepicture: string;
};

type AuthState = {
  user: Partial<AuthUserProps>;
  setUser: (user: Partial<AuthUserProps>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => {
        set(() => ({ user: user }));
      },
    }),
    {
      name: "auth-props",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
