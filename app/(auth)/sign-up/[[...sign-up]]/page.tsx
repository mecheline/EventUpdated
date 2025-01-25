"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useSignUp } from "@clerk/clerk-react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const paramValue = searchParams.get("usertype"); // Extracts the value of 'param'
  console.log(paramValue);

  // Handle submission of the sign-up form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/sign-in");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-[400px]">
          <div className="font-Syne font-bold text-[32px] leading-[48px]">
            Verify your email
          </div>
          {/* <div className="font-Syne font-semibold text-base leading-6 mb-2">
            Start connecting with your audience
          </div> */}
        </div>
        <div className="w-[400px]">
          <form onSubmit={handleVerify}>
            <Input
              label="Verification Code:"
              placeholder="username"
              value={code}
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <Button
              title="Verify"
              backgroundColor="bg-primary"
              color="text-[#FEF5FA]"
            />
          </form>
        </div>
        <div>
          <span className="font-Syne font-normal text-base leading-6">
            Already have an account?
          </span>
          <Link
            href={"/signin"}
            className="font-Syne font-normal text-base leading-6 text-primary ml-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-[400px]">
          <div className="font-Syne font-bold text-[32px] leading-[48px]">
            Sign Up
          </div>
          <div className="font-Syne font-semibold text-base leading-6 mb-2">
            Start connecting with your audience
          </div>
        </div>
        <div className="w-[400px]">
          <form onSubmit={handleSubmit}>
            <Input
              label="User Name"
              id="User Name"
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Email"
              id="Email"
              placeholder="email"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
            <Input
              label="Password"
              id="Password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div id="clerk-captcha" className="my-4"></div>
            <Button
              title="Sign Up"
              backgroundColor="bg-primary"
              color="text-[#FEF5FA]"
              type="submit"
            />
          </form>
        </div>
        <div>
          <span className="font-Syne font-normal text-base leading-6">
            Already have an account?
          </span>
          <Link
            href={"/signin"}
            className="font-Syne font-normal text-base leading-6 text-primary ml-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
