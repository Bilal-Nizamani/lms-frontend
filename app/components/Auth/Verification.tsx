import React, { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "@/app/styles/style";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [VerifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const VerificationHandler = async () => {
    setInvalidError(true);
  };
  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...VerifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  // const VerificationHandler;
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
        {Object.keys(VerifyNumber).map((key, index): any => {
          <input
            type="number"
            key={key}
            className={`w-[65px] bg-transparent border-[13px] rounder=[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-wihte border-[#0000004a]"
            } `}
            ref={inputRefs[index]}
            placeholder=""
            maxLength={1}
            value={VerifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => {
              handleInputChange(index, e.target.value);
            }}
          />;
        })}
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
