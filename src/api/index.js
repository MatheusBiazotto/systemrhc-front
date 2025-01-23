"use server";

import { HTTP_STATUS } from "@/constants";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

const baseURL = process.env.API_URL;

async function callout(url, options = {}) {
  if (!baseURL) throw new Error("Falha ao se comunicar com o servidor.");

  const cookiesHandler = await cookies();

  const accessToken = cookiesHandler.get("token")?.value;

  options.headers = {
    ...options?.headers,
    authorization: accessToken ? `Bearer ${accessToken}` : null,
  };

  const response = await fetch(`${baseURL}${url}`, {
    cache: "no-store",
    ...options,
  });

  const hasBody = response.status !== HTTP_STATUS.NO_CONTENT;

  const data = hasBody ? await response.json() : null;

  const unauthorized =
    response.status === HTTP_STATUS.UNAUTHORIZED ||
    response.status === HTTP_STATUS.FORBIDDEN;

  return {
    ok: response.ok,
    status: response.status,
    unauthorized,
    data,
  };
}

export default async function apiLayer() {
  "use server";

  return {
    auth: {
      login: async (props) => {
        "use server";
        return await callout("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
      },
    },
    perms: {
      getPermissions: async (props) => {
        "use server";
        return await callout("/perms/getPermissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
      },
    },
    habbo: {
      getAvatars: async (props) => {
        "use server";
        return await callout("/habbo/getAvatars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
      },
    },
    highlights: {
      getWeekly: async (props) => {
        "use server";
        return await callout("/highlights/getHighlights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
      },
    },
    ranking: {
      getRanking: async () => {
        "use server";
        return await callout("/ranking/getRanking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
    positions: {
      getPositions: async () => {
        "use server";
        return await callout("/positions/getPositions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      hire: async (props) => {
        "use server";
        return await callout("/positions/hire", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
      },
    },
  };
}
