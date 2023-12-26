"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { styles } from "@/app/styles/style";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  Email: Yup.string()
    .email("invalid emaiol!")
    .required("Please enter your email"),
});

const Login: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });
  // console.log(show);
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // console.log(handleSubmit);
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login With Bilal Courses</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.title}`}>Enter your Email</label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"}
          ${styles.input}
          `}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email} </span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.title}`}>Enter your password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block"> </span>
          )}
        </div>
        <div className="mt-5 w-full">
          <input type="submit" value="Login" className={styles.button} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or Join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center pt-4 dark:text-white font-Poppins text-[14px]">
          Not have any account?
          <br />
          <span
            className="text-[#2190ff] pl-1  cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Go To Sign Up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
