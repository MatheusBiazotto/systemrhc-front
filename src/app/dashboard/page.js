"use client";

import DashboardAvisos from "@/components/dashboardAvisos/page";
import DestaquesSemanais from "@/components/destaquesSemanais/page";
import RankingPoints from "@/components/rankingPoints/page";
import { useUser } from "@/contexts/userContext/userContext";

export default function DashboardPage() {
  const { userData, highlights, ranking } = useUser();

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-wrap gap-4 justify-center p-4">
        <DashboardAvisos />
        <DestaquesSemanais highlights={highlights} />
      </div>
      <RankingPoints ranking={ranking} />
    </div>
  );
}
