"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [displayTOTP, setDisplayTOTP] = useState(false);
  const router = useRouter();

  // Handle user submitting email and pass and swapping to TOTP form
  const handleFirstStage = (e: FormEvent) => {
    e.preventDefault();
    setDisplayTOTP(true);
  };

  // Handle the submission of the TOTP of Backup Code submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      await signIn.create({
        identifier: email,
        password,
      });

      // Attempt the TOTP or backup code verification
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: useBackupCode ? "backup_code" : "totp",
        code: code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.log(signInAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (displayTOTP) {
    <div>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-[400px]">
          <div className="font-Syne font-bold text-[32px] leading-[48px]">
            Verify your account
          </div>
          {/* <div className="font-Syne font-semibold text-base leading-6 mb-2">
         Get in to track your events
       </div> */}
        </div>
        <div className="w-[400px]">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              label="Code"
              placeholder="code"
              onChange={(e) => setCode(e.target.value)}
              id="code"
              name="code"
              type="text"
              value={code}
            />
            <Input
              label="This code is a backup code"
              placeholder="code"
              onChange={() => setUseBackupCode((prev) => !prev)}
              id="backupcode"
              name="backupcode"
              type="checkbox"
              checked={useBackupCode}
            />

            <Button
              title="Verify"
              backgroundColor="bg-primary"
              color="text-[#FEF5FA]"
            />
          </form>
        </div>
      </div>
    </div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-[400px]">
          <div className="font-Syne font-bold text-[32px] leading-[48px]">
            Login
          </div>
          <div className="font-Syne font-semibold text-base leading-6 mb-2">
            Get in to track your events
          </div>
        </div>
        <div className="w-[400px]">
          <form onSubmit={(e) => handleFirstStage(e)}>
            <Input
              label="Email"
              id="Email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              value={email}
            />
            <Input
              label="Password"
              id="Password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              value={password}
            />
            <Button
              title="Continue"
              backgroundColor="bg-primary"
              color="text-[#FEF5FA]"
            />
          </form>
        </div>
        <Link
          href={"/reset-password"}
          className="font-Syne font-normal text-base leading-6 text-primary my-4"
        >
          Forgot Password?
        </Link>
        <div>
          <span className="font-Syne font-normal text-base leading-6">
            I am new here?
          </span>
          <Link
            href={"/onboarding"}
            className="font-Syne font-normal text-base leading-6 text-primary ml-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
