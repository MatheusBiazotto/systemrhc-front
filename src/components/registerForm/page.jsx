"use client";

import { Input, Link } from "@nextui-org/react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

import { useState } from "react";
import { Button } from "@nextui-org/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function RegisterForm({ onSubmit }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function register(e) {
    e.preventDefault();
    setIsLoading(true);

    const nickname = e.target.nickname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (password !== passwordConfirm) {
      toast.error("As senhas não coincidem! 😅");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres! 😅");
      setIsLoading(false);
      return;
    }

    if (!nickname || !email || !password || !passwordConfirm) {
      toast.error("Preencha todos os campos! 😅");
      setIsLoading(false);
      return;
    }

    const res = await onSubmit({ nickname, email, password });
    console.log(res);
    if (res.ok) {
      toast.success("Registro efetuado com sucesso! 🎉");
      router.push("/");
      setIsLoading(false);
      return;
    }

    toast.error(res.data.message);
    setIsLoading(false);
  }

  return (
    <>
      <form
        onSubmit={register}
        className="flex flex-col p-4 lg:p-10 max-w-lg gap-4 justify-center items-center border-stone-700 border-small rounded"
      >
        <div className="flex gap-4 mb-4 items-center justify-center flex-wrap">
          <img width={64} src="rhc1.png" />
          <h1 className="inline text-2xl">
            System RHC - Registro{" "}
            <span
              style={{ fontSize: "10px" }}
              className="rounded align-top p-0.5 bg-orange-500"
            >
              BETA
            </span>
          </h1>
        </div>

        <Input
          className="max-w-xs"
          id="nickname"
          type="text"
          label="Digite seu nick"
          required
        />
        <Input
          className="max-w-xs"
          id="email"
          type="email"
          label="Digite seu email"
          required
        />
        <Input
          id="password"
          className="max-w-xs"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Digite sua senha"
          type={isVisible ? "text" : "password"}
          required
        />
        <Input
          id="passwordConfirm"
          className="max-w-xs"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Confirme sua senha"
          type={isVisible ? "text" : "password"}
          required
        />

        <Button
          type="submit"
          color="success"
          isLoading={isLoading}
          disabled={isLoading}
          endContent={<CiLogin size={24} />}
        >
          Registrar
        </Button>

        <span className="text-center">
          Obs.: após o registro, sua conta permanecerá inativa até ser aceita
          por algum superior! 😁👍
        </span>

        <span className="text-center mt-2">
          Já possui uma conta? <Link href="/">Faça o login!</Link>
        </span>
      </form>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        closeOnClick
      />
    </>
  );
}
