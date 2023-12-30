import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "../hooks";

type Props = {
  setRoute: (route: string) => void;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [activaton, { isError, isSuccess, data, error }] =
    useActivationMutation();
  const authToken = useAppSelector((state) => {
    return state.auth.token;
  });

  const [VerifyNumber, setVerifyNumber] = useState<string>();
  const VerificationHandler = async () => {
    console.log(VerifyNumber);
    if ((VerifyNumber && VerifyNumber?.length < 4) || !VerifyNumber) {
      setInvalidError(true);
    }
    await activaton({
      activation_token: authToken,
      activation_code: VerifyNumber,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, setRoute, error, data]);
  let nums = ["1", "2", "3", "4", "5", "6", "7", "", "9", "0"];
  const handleInputChange = (value: string) => {
    // Check if the input is numeric
    if (nums.includes(value.charAt(value.length - 1))) {
      setVerifyNumber(value);
      console.log(value);
    } else {
      setVerifyNumber(VerifyNumber);
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}> Verify Your Account </h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className=" m-auto flex items-center justify-around">
        <input
          type="text"
          inputMode="numeric" // Restrict input to numeric characters
          pattern="[0-9]*" // Allow only numeric input
          className={`dark:border-white text-white h-[80px] text-5xl max-w-[200px] text-center tracking-[15px] rounded-full   ${
            invalidError
              ? "shake border-red-500"
              : "dark:border-white border-[#0000004a]"
          } `}
          placeholder=""
          maxLength={4}
          value={VerifyNumber}
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
        />
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={styles.button} onClick={VerificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        <span className="text-[#2190ff] pl-2"> Go back to sign in?</span>
        Sign in
      </h5>
    </div>
  );
};

export default Verification;
