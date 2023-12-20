import { Select, Space, Tag } from "antd";
import { skillsWithOptions } from "../data/skills";
import { Dispatch, SetStateAction } from "react";
import { SelectValue } from "antd/es/select";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAuthStore } from "../store/auth_store";

type Props = {
  setChosenSkills: Dispatch<SetStateAction<string[]>>;
  setQueryParam: (name: string, value: string | string[]) => void;
  className: string;
  registrationQueryParams: URLSearchParams;
};
export const SkillsCombobox = ({
  setChosenSkills,
  className,
  setQueryParam,
  registrationQueryParams,
}: Props) => {
  const {user} = useAuthStore();
  const handleChange = (value: SelectValue) => {
    setChosenSkills(value as string[]);
    setQueryParam("skills", value as string[]);
  };

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color="#D4E4BC"
        onMouseDown={onPreventMouseDown}
        className="font-primary text-black"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical" className={className}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        tagRender={tagRender}
        onChange={handleChange}
        popupClassName="font-primary"
        options={skillsWithOptions}
        defaultValue={registrationQueryParams.get("skills")?.split(",") ?? user.skills ?? []}
        className="hover:bg-tertiary focus:bg-tertiary"
      />
    </Space>
  );
};
