"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/input";
import { SearchProps } from "./type";
import { schemaSearch } from "./schema";
import { findGoogleBookByParams } from "@/app/api/book/route";

export default function SearchForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SearchProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaSearch),
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const router = useRouter();

  const handleFormSubmit = async ({ title, author }: SearchProps) => {
    const result = await findGoogleBookByParams(title, author);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex mt-36 gap-3"
      >
        <Input
          {...register("title")}
          type="text"
          placeholder="título"
          startAdornment={<EnvelopeSimple />}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Input
          {...register("author")}
          type="author"
          placeholder="autor"
          startAdornment={<LockSimple />}
        />
        {errors.author && (
          <p className="text-red-500">{errors.author.message}</p>
        )}

        <button
          className="bg-[#1fe6dd] p-[6px] rounded-md mt-2 text-white text-xl"
          type="submit"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}
