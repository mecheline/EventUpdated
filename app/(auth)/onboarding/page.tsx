"use client";

import Image from "next/image";
import organiser from "@/public/auth/organiser.svg";
import attendee from "@/public/auth/attendee.svg";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const router = useRouter();
  const signupHandler = (value: string) => {
    // Update the URL with a new query parameter
    router.push(`/sign-up?usertype=${value}`);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <div className="my-8 w-[530px]">
        <div className="font-Syne font-bold text-[32px] leading-[48px]">
          Start your journey
        </div>
        <div className="font-Syne font-semibold text-base leading-6">
          Choose your role to continue
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 w-[530px]">
        <div
          className="bg-[#F99ECE] p-4 rounded-2xl hover:cursor-pointer"
          onClick={() => signupHandler("organiser")}
        >
          <div className="font-medium text-[#FFF8E0] text-2xl leading-[32px]">
            Event Organiser
          </div>
          <div className="font-normal text-base leading-[24px] text-[#222222] w-[200px] my-2">
            I want to publish my event to wider audience
          </div>

          <Image src={organiser} width={250} height={248} alt="organiser" />
        </div>

        <div
          className="bg-[#FFE799] p-4 rounded-2xl hover:cursor-pointer"
          onClick={() => signupHandler("attendee")}
        >
          <div className="font-medium text-[#E40D7D] text-2xl leading-[32px]">
            Event Attendee
          </div>
          <div className="font-normal text-base leading-[24px] text-[#222222] w-[200px] my-2">
            I want to find event around me to attend
          </div>
          <Image src={attendee} width={250} height={248} alt="organiser" />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
