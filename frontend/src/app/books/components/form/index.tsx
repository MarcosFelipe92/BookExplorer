"use client";

import { findGoogleBookByParams } from "@/app/api/book/route";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { useForm } from "react-hook-form";
import { schemaSearch } from "./schema";
import { SearchProps } from "./type";

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

  const handleFormSubmit = async ({ title, author }: SearchProps) => {
    const books = await findGoogleBookByParams(title, author);
    console.log(books);

    return books;
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
