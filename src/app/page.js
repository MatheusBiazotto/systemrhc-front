"use client";

import LoginForm from "../components/LoginForm/page";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden w-full gap-4 justify-center items-center">
      <LoginForm />
    </div>
  );
}
