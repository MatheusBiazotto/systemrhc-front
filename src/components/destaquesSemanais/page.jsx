"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { GoTrophy } from "react-icons/go";

export default function DestaquesSemanais({ highlights }) {
  return (
    <div className="flex flex-col p-4 w-[500px]">
      <div className="flex flex-wrap gap-2 justify-center pb-1">
        <GoTrophy size={24} />
        <h1 className="text-center text-2xl">Destaques Semanais</h1>
      </div>
      <Card className="max-w-[500px] h-[220px]">
        <CardBody className="px-3 py-0 text-small text-default-500">
          <div className="flex flex-wrap justify-evenly items-center gap-4">
            {highlights.data.map((highlight, index) => (
              <div className="flex flex-col gap-2 items-center" key={index}>
                <img src={highlight.users.avatar} width={64} height={64} />
                <span>{highlight.users.nickname}</span>
                {highlight.users.points ? (
                  <span>Pontos: {highlight.users.points}</span>
                ) : (
                  <span>Pontos: 0</span>
                )}
              </div>
            ))}
            {highlights.data.map((highlight, index) => (
              <div className="flex flex-col gap-2 items-center" key={index}>
                <img src={highlight.users.avatar} width={64} height={64} />
                <span>{highlight.users.nickname}</span>
                {highlight.users.points ? (
                  <span>Pontos: {highlight.users.points}</span>
                ) : (
                  <span>Pontos: 0</span>
                )}
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              Atualizado em:{" "}
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
