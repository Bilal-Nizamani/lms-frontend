"use client";
import React, { useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

type Props = { user: any };

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogOut] = useState(false);

  const { isSuccess, data, error } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data]);
  const logOutHandler = async () => {
    signOut();
    setLogOut(true);
  };
  if (typeof window !== undefined) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white  bg-opacity-90 border border-black rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-120" : "top-[30px]"
        }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && <ProfileInfo />}
    </div>
  );
};

export default Profile;
