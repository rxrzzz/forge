import { Input } from "antd";

import { useState } from "react";
import { useAuthStore } from "../../../store/auth_store";
import { SkillsCombobox } from "../../../components/skills-combobox";
import { useSearchParams } from "react-router-dom";

export default function UserDetails() {
  const { user } = useAuthStore();
  const { TextArea } = Input;
  const [chosenSkills, setChosenSkills] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <form>
        <h1 className="text-md font-bold -mt-1 mb-6">Other Details</h1>
        <label htmlFor="name" className="mt-12 font-medium">
          Name
        </label>
        <Input
          type="text"
          defaultValue={user.name}
          name="name"
          className=" focus:border-secondary hover:border-secondary mb-4"
        />
        <label htmlFor="name" className="mt-12 font-medium">
          Bio
        </label>
        <TextArea
          autoSize
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
          className=" focus:border-secondary hover:border-secondary mb-4"
        />
      </form>
      <div className="flex justify-end mt-2">
        <button
          className="bg-secondary rounded-md p-2"
          onClick={(e) => {
            e.preventDefault();
            setSearchParams({ "user-registration-tab": "profile-pic" });
            searchParams.set("user-registration-tab", "profile-pic")
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
