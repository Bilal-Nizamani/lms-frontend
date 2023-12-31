"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Navitems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useAppSelector } from "./customHooks/hooks";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (open: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data } = useSession();
  const [logout, setLogOut] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const token = useAppSelector((state) => state.auth.token);

  const [soccialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!token) {
      if (data) {
        soccialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data.user?.image,
        });
      }
    }
    if (isSuccess && data === null) {
      toast.success("Login Successfully");
    }

    if (data === null) {
      setLogOut(true);
    }
  }, [data, isSuccess, token, soccialAuth]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50  dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 "
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Bilal Courses
              </Link>
            </div>
            <div className="flex items-center">
              <Navitems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {token ? (
                <Link href={"./profile"}>PROFILE</Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer 800px:block hidden dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile side bar */}
        {openSidebar && (
          <div
            onClick={handleClose}
            id="screen"
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset]"
          >
            <div
              onClick={handleClose}
              id="screen"
              className=" w-[70vw] fixed z-[99999999999] h-screen bg-white  dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0"
            >
              <Navitems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                className="curson-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => {
                  setOpen(true);
                }}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright c 2023 Elearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}{" "}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
