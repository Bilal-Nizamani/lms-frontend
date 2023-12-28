"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { styles } from "@/app/styles/style";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("invalid email!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter password"),
});

import { useRegisterMutation } from "@/redux/features/auth/authApi";
const SignUp: FC<Props> = ({ setRoute }) => {
  const [register, { isError, isSuccess, data, error }] = useRegisterMutation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData.data.message);
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, setRoute, data]);
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full mb-3">
      <h1 className={`${styles.title}`}>SignUp With Bilal Courses</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.title}`}>Enter your Name</label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="SignUpmail@gmail.com"
            className={`${errors.name && touched.name && "border-red-500"}
          ${styles.input}
          `}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name} </span>
          )}
        </div>

        <label className={`${styles.title}`}>Enter your Email</label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="SignUpmail@gmail.com"
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
              className="absolute bottom-3  dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block"> </span>
          )}
        </div>
        <div className="w-full mt-5 text-white s font-bold">
          <input type="submit" value="Sign-Up" className={styles.button} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or Join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center dark:text-white pt-4 font-Poppins text-[14px]">
          Already have an account?
          <br />
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Go To Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
