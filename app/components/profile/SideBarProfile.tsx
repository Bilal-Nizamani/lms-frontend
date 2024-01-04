import React from "react";
import Image from "next/image";
import imgSrc from "@/public/assests/client-2.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: React.FC<Props> = ({
  user,
  active,
  avatar,
  logOutHandler,
  setActive,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer hover:opacity-90 ${
          active === 1 ? "bg-gray-600" : "bg-transparent"
        }`}
        onClick={() => {
          setActive(1);
        }}
      >
        <Image
          src={user.avatar || avatar ? user.avatar || avatar : imgSrc}
          alt=""
          className=" h-[40px] w-[40px]  cursor-pointer rounded-full"
        />
        <h5 className="pl-4 800px:block hidden font-Poppins  text-white">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "bg-slate-600" : " bg-transparent"
        }`}
        onClick={() => {
          setActive(2);
        }}
      >
        <RiLockPasswordLine size={29} fill="#fff" />
        <h5 className="pl-4 800px:block hidden font-Poppins  text-white">
          {" "}
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "bg-slate-600" : " bg-transparent"
        }`}
        onClick={() => {
          setActive(3);
        }}
      >
        <SiCoursera size={29} fill="#fff" />
        <h5 className="pl-4 800px:block hidden font-Poppins  text-white">
          Enroll Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "bg-slate-600" : " bg-transparent"
        }`}
        onClick={() => {
          logOutHandler();
          setActive(4);
        }}
      >
        <SiCoursera size={29} fill="#fff" />
        <h5 className="pl-4 800px:block hidden font-Poppins  text-white">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
