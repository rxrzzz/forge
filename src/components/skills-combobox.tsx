import { Select, Space, Tag } from "antd";
import { skillsWithOptions } from "../data/skills";
import { Dispatch, SetStateAction } from "react";
import { SelectValue } from "antd/es/select";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

type Props = {
  setChosenSkills: Dispatch<SetStateAction<string[]>>;
  className: string;
};
export const SkillsCombobox = ({ setChosenSkills, className }: Props) => {
  const handleChange = (value: SelectValue) => {
    // Update the chosenSkills array
    setChosenSkills(value as string[]);
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
        className="hover:bg-tertiary focus:bg-tertiary"
      />
    </Space>
  );
};
