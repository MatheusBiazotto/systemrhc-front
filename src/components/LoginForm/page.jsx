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

export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const login = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const nickname = event.target.nickname.value;
    const password = event.target.password.value;

    const res = await onSubmit({ nickname, password });

    if (res.ok) {
      toast.success("Login efetuado com sucesso! 🎉");

      localStorage.setItem("user", res?.data?.nickname);
      router.push("/dashboard");
      setIsLoading(false);
      return;
    }

    // Do something
    toast.error(res.data.message);
    setIsLoading(false);
  };

  return (
    <>
      <form
        onSubmit={login}
        className="flex flex-col p-4 lg:p-10 max-w-lg gap-4 justify-center items-center border-stone-700 border-small rounded"
      >
        <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
          <img width={64} src="rhc1.png" />
          <h1 className="inline text-2xl">
            System RHC - Login{" "}
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

        <Button
          type="submit"
          color="success"
          isLoading={isLoading}
          disabled={isLoading}
          endContent={<CiLogin size={24} />}
        >
          Entrar
        </Button>

        <span className="text-center">
          Em caso de problemas com login, entre em contato com a fundação! 😁👍
        </span>

        <span className="text-center mt-2">
          Não possui uma conta? <Link href="/register">Crie uma agora!</Link>
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
