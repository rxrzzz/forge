import { ColorPicker } from "antd";
import { Color } from "antd/es/color-picker";
import { useMemo, useState } from "react";
import { useAuthStore } from "../../../store/auth_store";
import { useSearchParams } from "react-router-dom";

export const ProfilePic = () => {
  const styles = [
    "adventurer-neutral",
    "avataaars-neutral",
    "big-ears-neutral",
    "bottts-neutral",
    "croodles-neutral",
    "fun-emoji",
    "identicon",
    "initials",
    "lorelei-neutral",
    "notionists-neutral",
    "rings",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
  ] as const;

  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [backgroundColor, setBackgroundColor] = useState<Color | string>(
    "#fff"
  );
  const hexString = useMemo(
    () =>
      typeof backgroundColor === "string"
        ? backgroundColor
        : backgroundColor.toHexString(),
    [backgroundColor]
  );
  const [style, setStyle] =
    useState<(typeof styles)[number]>("adventurer-neutral");
  // https://api.dicebear.com/7.x/adventurer/svg
  return (
    <div>
      <h1 className="text-lg font-medium -mt-1">Choose a Profile Picture</h1>
      <img
        src={`https://api.dicebear.com/7.x/${style}/svg?backgroundColor=${hexString}&seed=${user.email}`}
        alt={`Profile Picture: ${style} ${hexString}`}
        className="max-w-full mt-10 mb-5 rounded-md border"
      />
      <ColorPicker
        value={backgroundColor}
        format="hex"
        defaultFormat="hex"
        onChange={setBackgroundColor}
        className="w-full "
      >
        <button className="flex p-2 gap-2 w-full justify-center items-center mb-4">
          <p>Change Background Color</p>
          <div
            className="w-[30px] h-[30px] rounded-md"
            style={{ backgroundColor: hexString }}
          ></div>
        </button>
      </ColorPicker>
      <div className="grid grid-cols-7 gap-3 w-full">
        {styles.map((style) => (
          <button onClick={() => setStyle(style)} key={style}>
            <img
              src={`https://api.dicebear.com/7.x/${style}/svg?backgroundColor=${hexString}&seed=${user.email}`}
              className="w-full border rounded-md"
            />
          </button>
        ))}
      </div>
      <div className="flex justify-between w-full mt-2">
        <button
          className="bg-secondary rounded-md p-2"
          onClick={(e) => {
            e.preventDefault()
            setSearchParams({"user-registration-tab": "user-details"})
            searchParams.set("user-registration-tab", "user-details");
          }}
        >
          Previous
        </button>
        <button
          className="bg-secondary rounded-md p-2"
          onClick={() => {
            console.log("You are gay");
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
