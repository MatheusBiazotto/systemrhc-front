"use server";

import DashboardMenu from "@/components/dashboardMenu/page";
import apiLayer from "@/api";
import { cookies } from "next/headers";

import AuthService from "@/modules/auth-module";
import UserProvider from "@/contexts/userContext/userContext";
import { HABBO_FIGURE_URL } from "@/constants";

export default async function DashboardLayout({ children }) {
  const api = await apiLayer();
  const userData = await AuthService.getPayloadCookies();
  const permissions = userData
    ? await api.perms.getPermissions({ userId: userData._id })
    : {};
  if (!permissions) {
    permissions.data = [];
  }
  const highlights = await api.highlights.getWeekly({
    startsAt: new Date().toISOString(),
  });

  const nicks = [];
  nicks.push(userData.nickname);

  highlights.data.forEach((highlight) => {
    if (!nicks.includes(highlight.users.nickname))
      nicks.push(highlight.users.nickname);
  });
  const habboData = await api.habbo.getAvatars({ nicks });
  habboData.data.forEach((habbo) => {
    highlights.data.forEach((highlight) => {
      if (highlight.users.nickname === habbo.nickname) {
        highlight.users.avatar = `${HABBO_FIGURE_URL}${habbo.avatar}`;
      }
    });
  });
  const ranking = await api.ranking.getRanking();

  async function onLogout() {
    "use server";
    const cookiesHandler = await cookies();

    try {
      cookiesHandler.delete("token");

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return (
    <UserProvider value={{ userData, highlights, ranking }}>
      <div className="dashboard-page">
        <div>
          <DashboardMenu
            userData={userData}
            menuData={permissions.data}
            onLogout={onLogout}
          />
        </div>
        <div>{children}</div>
      </div>
    </UserProvider>
  );
}
