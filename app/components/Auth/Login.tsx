"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { styles } from "@/app/styles/style";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("invalid emaiol!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter Password"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, data, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      // setRoute("");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, setOpen, data]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

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
            value={values.password}
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
          <FcGoogle
            size={30}
            onClick={() => {
              console.log("hellow");
              signIn("google");
              console.log("google");
            }}
            className="cursor-pointer mr-2"
          />

          <AiFillGithub
            size={30}
            onClick={() => {
              console.log("helow");
              signIn("github");
            }}
            className="cursor-pointer mr-2"
          />
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
