import { Input } from "antd";

import { useState } from "react";
import { useAuthStore } from "../../../store/auth_store";
import { SkillsCombobox } from "../../../components/skills-combobox";

type Props = {
  setQueryParam(name: string, value: string | string[]): void;
  registrationQueryParams: URLSearchParams;
};
export default function UserDetails({
  setQueryParam,
  registrationQueryParams,
}: Props) {
  const { user } = useAuthStore();
  const { TextArea } = Input;
  const [chosenSkills, setChosenSkills] = useState<string[]>([]);

  return (
    <>
      <form>
        <h1 className="text-md font-bold -mt-1 mb-6">Other Details</h1>
        <label htmlFor="name" className="mt-12 font-medium">
          Name
        </label>
        <Input
          type="text"
          onChange={(e) => {
            setQueryParam("name", e.target.value);
          }}
          defaultValue={registrationQueryParams.get("name") ?? user.name}
          name="name"
          className=" focus:border-secondary hover:border-secondary mb-4"
        />
        <label htmlFor="name" className="mt-12 font-medium">
          Bio
        </label>
        <TextArea
          autoSize
          defaultValue={registrationQueryParams.get("bio") ?? user.bio}
          onChange={(e) => setQueryParam("bio", e.target.value)}
          maxLength={300}
          placeholder="Enter a short description of yourself (max 300 characters)."
          name="bio"
          className=" focus:border-secondary hover:border-secondary"
        />
        <div className="mb-4"></div>
        <label htmlFor="name" className="mt-12 font-medium">
          Skills
        </label>

        <SkillsCombobox
          setChosenSkills={setChosenSkills}
          registrationQueryParams={registrationQueryParams}
          setQueryParam={setQueryParam}
          className=" focus:border-secondary hover:border-secondary mb-4"
        />
      </form>
      <div className="flex justify-end mt-2">
        <button
          className="bg-secondary rounded-md p-2"
          onClick={(e) => {
            e.preventDefault();
            setQueryParam("user-registration-tab", "profile-pic");
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
