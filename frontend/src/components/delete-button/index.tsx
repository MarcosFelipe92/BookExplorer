"use client";

import { deleteBook } from "@/actions/book/book-actions";
import { Trash } from "phosphor-react";
import toast, { Toaster } from "react-hot-toast";

type DeleteButtonProps = {
  className?: string;
  id: string;
};

export const DeleteButton = ({ className, id }: DeleteButtonProps) => {
  const handleClick = async () => {
    try {
      const res = await deleteBook(id);

      if (res.book) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Erro ao remover livro tente novamente mais tarde");
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
