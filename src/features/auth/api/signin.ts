import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "../../../store/auth_store";
import { supabase } from "../../../config/supabase-config";

export const useHandleSignIn = () => {
  const { setUser } = useAuthStore();
  const [localSession, setLocalSession] = useState<Session | null>();
  const [userHasCompletedRegistration, setUserHasCompletedRegistration] =
    useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLocalSession(session);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLocalSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  useEffect(() => {
    async function checkUserExists(email: string) {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);
      if (error) {
        console.error({ hint: error.hint, message: error.message });
        return;
      }
      if (!users || users.length === 0) {
        saveSessionDataToUserTable();
      } else {
        const user = users[0];
        const registrationFields = [
          "bio",
          "skills",
          "profilepicture",
          "availability",
        ];
        const hasCompletedRegistration = registrationFields.every(
          (field) => user[field] !== null
        );
        setUserHasCompletedRegistration(hasCompletedRegistration);
      }
    }
    async function saveSessionDataToUserTable() {
      if (localSession) {
        const { email, id, user_metadata } = localSession.user;
        const { error } = await supabase.from("users").insert({
          user_id: id,
          email,
          profilepicture: user_metadata.avatar_url,
          name: user_metadata.full_name,
        });
        if (error) {
          console.error({ hint: error.hint, message: error.message });
        } else {
          setUser({
            availability: false,
            email,
            profilepicture: user_metadata.avatar_url,
            uid: id,
            name: user_metadata.full_name,
          });
        }
      }
    }
    checkUserExists(localSession?.user.email || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSession]);

  return { signInWithGoogle, userHasCompletedRegistration };
};
