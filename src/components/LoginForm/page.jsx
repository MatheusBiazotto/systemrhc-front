"use client";

import { Input } from "@nextui-org/react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleLogin(data) {
    setIsLoading(true);

    // Do something
    setIsLoading(false);
  }

  async function login(event) {
    event.preventDefault();

    const data = {
      nickname: event.target.nickname.value,
      password: event.target.password.value,
    };

    const res = await onSubmit(data);
  }

  return (
    <form className="flex flex-col p-4 lg:p-10 max-w-lg gap-4 justify-center items-center border-stone-700 border-small rounded">
      <div className="flex gap-4 mb-4 items-center">
        <img width={64} src="rhc1.png" />
        <h1 className="text-2xl">System RHC - Login</h1>
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
    </form>
  );
}
