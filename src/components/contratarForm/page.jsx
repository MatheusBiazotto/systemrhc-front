"use client";

import { Input, Select, SelectItem, Button, Textarea } from "@nextui-org/react";
import { FaHandshake } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContratarForm({ userData, positions, type, onHire }) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null);

  function handleSetPosition(e) {
    setPosition(e.target.value);
  }

  async function handleHire(e) {
    e.preventDefault();
    setIsLoading(true);

    const nickname = e.target.nicknameC.value;
    const motivo = e.target.motivoC.value;

    if (!nickname || !position || !motivo) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const res = await onHire({
      nickname,
      positionId: Number(position),
      userId: userData._id,
      motivo,
    });

    if (res.ok) {
      toast.success(`${res.data.message}`);
    } else {
      toast.error(`${res.data.message}`);
    }
  }

  return (
    <form
      onSubmit={type !== "Demitir" ? handleHire : null}
      className="flex flex-col gap-4 p-4 w-[350px] sm:w-[470px] flex-wrap justify-center"
    >
      <h1 className="flex flex-wrap gap-2 text-2xl items-center justify-center text-center">
        {type === "Demitir" ? <ImExit size={28} /> : <FaHandshake size={28} />}
        <span>
          {type === "Contrato"
            ? "Contratar/Promover Funcionário"
            : "Demitir Funcionário"}
        </span>
      </h1>
      <Input
        id={type === "Contrato" ? "nicknameC" : "nicknameD"}
        type="text"
        label="Nick do funcionário"
        required
      />
      {type === "Contrato" ? (
        <Select
          onChange={handleSetPosition}
          id="cargoC"
          className="max-w-ws"
          label="Novo cargo"
          required
        >
          {positions.map((position) => (
            <SelectItem
              className="text-black"
              key={position.id}
              value={position.id}
            >
              {position.name}
            </SelectItem>
          ))}
        </Select>
      ) : null}

      <Textarea
        id={type === "Contrato" ? "motivoC" : "motivoD"}
        label={
          type === "Contrato"
            ? "Motivo da contratação/promoção"
            : "Motivo da demissão"
        }
        required
      />

      <Button
        startContent={
          type === "Demitir" ? <ImExit size={24} /> : <FaHandshake size={24} />
        }
        type="submit"
        color={type === "Demitir" ? "danger" : "success"}
      >
        {type === "Demitir" ? "Demitir" : "Contratar/Promover"}
      </Button>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        closeOnClick
      />
    </form>
  );
}
