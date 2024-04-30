"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple, LockSimple, User } from "phosphor-react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { createUser } from "@/app/api/user/route";
import { Input } from "@/components/input";
import Link from "next/link";
import { schemaRegister } from "./schema";
import { RegisterProps } from "./type";

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async ({ name, email, password }: RegisterProps) => {
    const { user, message } = await createUser(name, email, password);
    if (!user) {
      toast.error(message, { id: "error" });
      return;
    }
    toast.success(message, { id: "success" });
  };

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-[500px] mt-36 gap-3"
      >
        <Input
          {...register("name")}
          type="text"
          placeholder="Digite seu nome"
          label="Nome"
          startAdornment={<User />}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input
          {...register("email")}
          type="text"
          placeholder="Digite seu email"
          label="Email"
          startAdornment={<EnvelopeSimple />}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          {...register("password")}
          type="password"
          placeholder="Digite sua senha"
          label="Senha"
          startAdornment={<LockSimple />}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          className="bg-[#1fe6dd] p-[6px] rounded-md mt-2 text-white text-xl"
          type="submit"
        >
          Cadastrar
        </button>
        <Link href="/" className="p-[6px] text-xl rounded-md mt-2 text-center">
          Ja possui conta?
        </Link>
      </form>
    </div>
  );
}
