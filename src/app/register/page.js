import RegisterForm from "@/components/registerForm/page";
import Footer from "@/components/footer/page";

import apiLayer from "@/api";

export default async function RegisterPage() {
  async function onRegister({ nickname, email, password }) {
    "use server";

    const api = await apiLayer();
    const res = await api.auth.register({ nickname, email, password });

    return res;
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center overflow-hidden p-4 gap-4">
      <RegisterForm onSubmit={onRegister} />
      <Footer />
    </div>
  );
}
