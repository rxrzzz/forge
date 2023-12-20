import { Modal } from "antd";
import { ProfilePic } from "../components/profile-pic";
import UserDetails from "../components/user-details";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
type Props = {
  open: boolean;
};
export const RegistrationFlow = ({ open }: Props) => {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(
    searchParams.get("user-registration-tab") || "user-details"
  );

  useEffect(() => {
    setCurrentTab(searchParams.get("user-registration-tab") ?? "user-details")
  }, [searchParams])
  return (
    <Modal open={open} className="mt-0 font-primary" width={500} footer={null}>
      {currentTab === "profile-pic" ? <ProfilePic /> : <UserDetails />}
    </Modal>
  );
};
