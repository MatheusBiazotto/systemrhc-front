"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { LuNotepadText } from "react-icons/lu";

export default function DashboardAvisos() {
  return (
    <div className="flex flex-col p-4">
      <div className="flex pb-1 gap-2 justify-center items-center">
        <LuNotepadText size={24} />
        <h1 className="text-center text-2xl">Avisos</h1>
      </div>
      <Card className="max-w-[450px] h-[220px]">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="rhc1.png" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                yMatthewli977
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                Chanceler
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-500">
          <p>
            Seja bem-vindo ao mais novo System da RHC! Desenvolvido de coração
            para que todos usufruam.
          </p>
          <span className="pt-2">
            Em caso de bugs, entre em contato com a fundação! 😁👍
            <span aria-label="computer" className="py-2" role="img">
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {new Date().toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
