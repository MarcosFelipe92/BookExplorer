import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

type InputProps = {
  label?: string;
  startAdornment?: ReactNode;
  endAdorment?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name = "",
      label = "",
      startAdornment,
      endAdorment,
      ...props
    },
    ref
  ) => {
    const labelId = useId();
    return (
      <>
        {label && <label htmlFor={labelId} className="text-[#707070]"></label>}
        <div className="flex py-3 px-4 rounded-md border bg-white items-center focus-within:border-2 focus-within:border-[#1fe6dd] focus-within:relative">
          {startAdornment && (
            <span className="text-[#707070] mr-[0.4em]">{startAdornment}</span>
          )}
          <input
            ref={ref}
            type={type}
            name={name}
            id={labelId}
            {...props}
            className="bg-transparent h-6 border-none outline-none w-full"
          />
          {endAdorment && (
            <span className="text-[#707070] mr-[0.4em]">{endAdorment}</span>
          )}
        </div>
      </>
    );
  }
);
