import React, { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
    id: string;
  placeholder:string
} & ComponentPropsWithoutRef<"input">;

const Input = ({ label, id, placeholder, ...props }: InputProps) => {
  return (
    <div>
      <div className="mt-4 mb-2">
        <label htmlFor={id} className="font-medium text-base leading-6">
          {label}
        </label>
      </div>
      <div>
        <input id={id} {...props} placeholder={placeholder} className="p-4 border rounded-lg w-full bg-[#FAFAFA]" />
      </div>
    </div>
  );
};

export default Input;
