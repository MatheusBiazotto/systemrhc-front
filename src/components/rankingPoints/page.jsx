"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { PiRanking } from "react-icons/pi";
import { Button } from "@nextui-org/react";

export default function RankingPoints({ ranking }) {
  return (
    <div className="flex flex-col p-4 w-full justify-center items-center gap-4">
      <div className="flex pb-1 gap-2 justify-center items-center">
        <PiRanking size={28} />
        <h1 className="text-center text-2xl">Ranking Semanal de Pontos</h1>
      </div>

      <Table aria-label="Ranking Semanal" className="w-full sm:w-[800px]">
        <TableHeader>
          <TableColumn>POSIÇÃO</TableColumn>
          <TableColumn>NICK</TableColumn>
          <TableColumn>CARGO</TableColumn>
          <TableColumn>PONTOS</TableColumn>
        </TableHeader>
        <TableBody>
          {ranking.data.map((rank, index) => (
            <TableRow key={rank.id}>
              <TableCell className="text-black">{index + 1}</TableCell>
              <TableCell className="text-black">{rank.nickname}</TableCell>
              <TableCell className="text-black">
                {rank.positions.name}
              </TableCell>
              <TableCell className="text-black">{rank.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button startContent={<PiRanking size={24} />} color="primary">
        Ranking completo
      </Button>
    </div>
  );
}
