"use client";

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple, LockSimple, User } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SearchFormProps {
  onSearch: (title: string, author?: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const searchSchema = z.object({
    title: z.string(),
    author: z.string().optional(),
  });

  type FormData = z.infer<typeof searchSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(searchSchema),
    mode: "all",
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    onSearch(values.title, values.author);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex my-5 gap-3 items-center"
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
          startAdornment={<User />}
        />
        {errors.author && (
          <p className="text-red-500">{errors.author.message}</p>
        )}

        <button
          className="bg-[#1fe6dd] p-2 rounded-md text-white text-xl"
          type="submit"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}
