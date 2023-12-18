import Image from "next/image";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full 1000px:flex  justify-center items-center">
      <div className="1000px:w-[39%] flex  1000px:min-h-screen items-center justify-center  z-10   ">
        <div className="hero_animation bg-black mb-[50px] rounded-full flex justify-center items-center 1500px:h-[600px] 1500px:w-[600px] 1100px:w-[500px] 1100px:h-[500px] h-[50vh] w-[50vw]">
          <Image
            alt=""
            className="object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            src={require("../../../public/assests/banner-img-1.png")}
          />
        </div>
      </div>
      <div className="1000px:w-[58%] bg-gray flex flex-col items-center  text-center 1000px:text-left">
        {/* half css */}
        <h2 className="dark:text-white text-[#000000c7] w-full 1000px:text-[45px] font-[600] font-Josefin py-2 1000px:leading-[55px]  1500px:!-[55%] text-[18px]  1100px:!w-[65%]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600]   text-[18px] 1500px:!-[55%] 1100px:!w-[65%] ">
          We have 40k+ online courses and 500k+ Online registered student. Find
          your desired Courses from them.
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:!w-[65%]  w-[90%] h-[50px] bg-transparent relative  1500px:!-[55%]">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin "
          />
          <div className="absolute flex items-center  justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={35} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] w-[90%] flex 1100px:!w-[65%]  items-center">
          <Image
            src={require("../../../public/assests/client-1.jpg")}
            alt=""
            className="rounded-full max-w-[50px]  ml-[-20]"
          />
          <Image
            src={require("../../../public/assests/client-2.jpg")}
            alt=""
            className="rounded-full max-w-[50px]  ml-[-20]"
          />
          <Image
            src={require("../../../public/assests/client-3.jpg")}
            alt=""
            className="rounded-full  max-w-[50px] ml-[-20]"
          />
          <p className=" font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500k+ People already trusted us.
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Hero;
