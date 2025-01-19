import LoginForm from "../components/LoginForm/page";

import apiLayer from "@/api";
import { cookies } from "next/headers";
import Footer from "@/components/footer/page";

export default async function Home() {
  async function onLogin({ nickname, password }) {
    "use server";
    const api = await apiLayer();

    const data = await api.auth.login({ nickname, password });

    if (data.ok) {
      const cookiesHandler = await cookies();
      console.log(data);

      cookiesHandler.set("token", data?.data?.token, {
        secure: true,
        httpOnly: true,
        expires: new Date(data?.expiresAt),
      });
    }

    return data;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full gap-4 justify-center items-center">
      <LoginForm onSubmit={onLogin} />
      <Footer />
    </div>
  );
}
