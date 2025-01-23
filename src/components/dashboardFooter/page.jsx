"use client";

import { Button, Link } from "@nextui-org/react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export default function DashboardFooter() {
  return (
    <footer className="flex flex-col gap-4 items-center justify-center p-4 rounded-md border-small border-slate-700 text-white">
      <p>Siga a Polícia RHC nas redes sociais: </p>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Button
          startContent={<FaInstagram size={24} />}
          as={Link}
          href="https://www.instagram.com/rhccorporation/"
          target="_blank"
          color="secondary"
        ></Button>
        <Button
          startContent={<FaWhatsapp size={24} />}
          as={Link}
          href="#"
          target="_blank"
          color="secondary"
        ></Button>
        <Button
          startContent={<FaDiscord size={24} />}
          as={Link}
          href="#"
          target="_blank"
          color="secondary"
        ></Button>
      </div>
    </footer>
  );
}
