"use client";
import { useTheme } from "next-themes";
import React from "react";
import { useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
type Props = {};

const ThemeSwitcher = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items,center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => {
            setTheme("dark");
          }}
        />
      ) : (
        <BiSun
          size={25}
          className="cursor-pointer  text-white"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
