"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, Password } from "phosphor-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../input";
import { schemaLogin } from "./schema";
import { LoginProps } from "./type";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleFormSubmit = async ({ email, password }: LoginProps) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      toast.error("Usuário ou senha inválidos");
      return;
    }

    router.replace("/home");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-[300px] mt-36 gap-3"
      >
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
          startAdornment={<Password />}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button className="bg-[#1fe6dd] p-2 rounded-md mt-2" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
