import { Modal } from "antd";
import { ProfilePic } from "../components/profile-pic";
import UserDetails from "../components/user-details";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
type Props = {
  open: boolean;
};
export const RegistrationFlow = ({ open }: Props) => {
  const [registrationSearchParams] = useSearchParams();
  const [registrationQueryParams, setRegistrationQueryParams] =
    useState<URLSearchParams>(registrationSearchParams);
console.log(registrationQueryParams)
  function setQueryParam(name: string, value: string) {
    const searchParams = new URLSearchParams(registrationQueryParams);
    if (searchParams.get(name)) {
      searchParams.delete(name);
      searchParams.append(name, value);
      setRegistrationQueryParams(searchParams);
    } else {
      searchParams.append(name, value);
      setRegistrationQueryParams(searchParams);
    }
  }
  console.log(registrationQueryParams.get("skills"));
  return (
    <Modal open={open} className="mt-0 font-primary" width={500} footer={null}>
      {registrationQueryParams &&
      registrationQueryParams.get("user-registration-tab") === "profile-pic" ? (
        <ProfilePic
          registrationQueryParams={registrationQueryParams}
          setQueryParam={setQueryParam}
        />
      ) : (
        <UserDetails
          setQueryParam={setQueryParam}
          registrationQueryParams={registrationQueryParams}
        />
      )}
    </Modal>
  );
};
