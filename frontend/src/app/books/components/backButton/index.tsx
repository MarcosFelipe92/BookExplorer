"use client";

import { useRouter } from "next/navigation";
import { CaretLeft } from "phosphor-react";

type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button className={className} onClick={() => router.back()}>
      <CaretLeft />
      <span>Voltar</span>
    </button>
  );
};
