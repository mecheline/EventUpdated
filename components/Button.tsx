import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  title: string;
  backgroundColor: string;
  color: string;
} & ComponentPropsWithoutRef<"a">;

const Button = ({ title, backgroundColor, color }: ButtonProps) => {
  return (
    <div className="my-4">
      <button className={`w-full font-semibold text-base border p-4 rounded-xl ${backgroundColor} ${color}`}>
        {title}
      </button>
    </div>
  );
};

export default Button;
