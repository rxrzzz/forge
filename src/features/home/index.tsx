import { useAuthStore } from "../../store/auth_store";
import { useHandleSignIn } from "../auth/api/signin";
import { RegistrationFlow } from "../auth/containers/registration-flow";

export const Homepage = () => {
  const { signInWithGoogle, userHasCompletedRegistration } = useHandleSignIn();
  const { user } = useAuthStore();

  return (
    <div className="flex font-primary">
      <div className="w-[70%] mx-auto mt-10">
        <div className="w-full p-10 border bg-bento rounded-xl  m-2 bg-opacity-30 backdrop-blur-lg flex justify-between">
          <div>
            <img src="/logo.svg" alt="" className="w-12 mb-6" />
            <h1 className="font-title rounded-lg max-w-[190px]  text-6xl">
              Collab On Side Projects
            </h1>
          </div>
          {!user.email ? (
            <div className="font-title text-sm">
              <button
                className="px-3 rounded-lg py-2 border mr-2"
                onClick={signInWithGoogle}
              >
                SIGN IN
              </button>
              <button
                className="px-3 rounded-lg py-2 border"
                onClick={signInWithGoogle}
              >
                LOG IN
              </button>
            </div>
          ) : (
            <p className="text-black font-primary">{user.email}</p>
          )}
        </div>
      </div>
      {userHasCompletedRegistration === false ? (
        <RegistrationFlow open={userHasCompletedRegistration === false} />
      ) : (
        <></>
      )}
    </div>
  );
};
