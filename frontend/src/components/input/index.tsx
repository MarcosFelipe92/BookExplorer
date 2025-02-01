import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import * as S from "./styles";

type InputProps = {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name = "",
      label = "",
      type = "text",
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const labelId = useId();
    return (
      <>
        {label && <S.Label htmlFor={labelId}>{label}</S.Label>}
        <S.Container>
          {startAdornment && (
            <S.StartAdornment>{startAdornment}</S.StartAdornment>
          )}
          <S.Input ref={ref} type={type} name={name} id={labelId} {...props} />
          {endAdornment && <S.EndAdornment>{endAdornment}</S.EndAdornment>}
        </S.Container>
      </>
    );
  }
);
