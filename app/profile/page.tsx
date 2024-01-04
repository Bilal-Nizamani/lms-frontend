"use client";
import React, { FC, useState } from "react";
import Protected from "../components/customHooks/useProtected";
import Heading from "@/app/utils/Heading";
import Header from "../components/Header";
import Hero from "../components/Route/Hero";
import Profile from "../components/profile/Profile";
import { useAppSelector } from "../components/customHooks/hooks";
type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useAppSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title="bilal-courses"
          description="here I sell courses"
          keywords="Programming,MERN,redux,machineLearning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        {/* <Hero /> */}
        <Profile user={user} />
      </Protected>
    </div>
  );
};
export default Page;
