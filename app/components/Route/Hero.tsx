import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="">
      <div className="absolute top-[100px] 1000px:top[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:w-[600px] 1100px:h-[600px] h-[50vh] w-[50vw] hero_animation">
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 100px:pt-[0] z-10">
          {/* <Image
            alt=""
            className="object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            src={require("../../../public/assests/banner-img-1.png")}
          /> */}
        </div>
        <div>
          {/* half css */}
          <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] "></h2>
          <br />
          <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!-[55%] 1100px:!w-[78%]">
            We have 40k+ Onlione courses and 500k+ Online registered student.
            Find your desired Courses from them.
          </p>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
            <input
              type="search"
              placeholder="Search Courses..."
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin "
            />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
              <BiSearch className="text-white" size={35} />
            </div>
          </div>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
            {/* <Image
              src={require("../../../public/assests/client-3.jpg")}
              alt=""
              className="rounded-full ml-[-20]"
            />
            <Image
              src={require("../../../public/assests/client-3.jpg")}
              alt=""
              className="rounded-full ml-[-20]"
            />
            <Image
              src={require("../../../public/assests/client-3.jpg")}
              alt=""
              className="rounded-full ml-[-20]"
            /> */}
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
    </div>
  );
};

export default Hero;
