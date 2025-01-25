import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-[400px]">
          <div className="font-Syne font-bold text-[32px] leading-[48px]">
            Reset Password
          </div>
          <div className="font-Syne font-semibold text-base leading-6 mb-2">
            Gain back your control
          </div>
        </div>
        <div className="w-[400px]">
          <Input label="Email" id="Email" placeholder="email" />

          <Button
            title="Submit"
            backgroundColor="bg-primary"
            color="text-[#FEF5FA]"
          />
        </div>
        <div>
          <span className="font-Syne font-normal text-base leading-6">
            Did't get the code?
          </span>
          <Link
            href={"/signin"}
            className="font-Syne font-normal text-base leading-6 text-primary ml-2"
          >
            Resend
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
