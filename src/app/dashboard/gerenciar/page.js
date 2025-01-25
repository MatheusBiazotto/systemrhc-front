"use client";

import { useUser } from "@/contexts/userContext/userContext";
import ContratarForm from "@/components/contratarForm/page";

export default function GerenciarPage() {
  const { userData, permissions, positions, handleHire } = useUser();
  console.log(permissions);

  return (
    <>
      <div className="flex flex-col flex-wrap p-4 gap-4 justify-center items-center">
        {permissions.data.map((perm) =>
          perm.name === "Contratações/Promoções" ? (
            perm.permissions.includes("Contratar") ? (
              <ContratarForm
                key={perm.id}
                userData={userData}
                positions={positions.data}
                type={"Contrato"}
                onHire={handleHire}
              />
            ) : null
          ) : null
        )}

        {permissions.data.map((perm) =>
          perm.name === "Contratações/Promoções" ? (
            perm.permissions.includes("Demitir") ? (
              <ContratarForm
                key={perm.id}
                userData={userData}
                positions={positions.data}
                type={"Demitir"}
              />
            ) : null
          ) : null
        )}
      </div>
    </>
  );
}
