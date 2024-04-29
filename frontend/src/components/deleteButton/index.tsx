"use client";

import { deleteBook } from "@/app/api/book/route";
import { Trash } from "phosphor-react";
import toast, { Toaster } from "react-hot-toast";

type DeleteButtonProps = {
  className?: string;
  id: string;
};

export const DeleteButton = ({ className, id }: DeleteButtonProps) => {
  const handleClick = async () => {
    const res = await deleteBook(id);

    if (res.book) {
      window.location.reload();
    }
  };
  return (
    <button className={className} onClick={handleClick}>
      <Toaster />
      <Trash />
      <span>Remover</span>
    </button>
  );
};
