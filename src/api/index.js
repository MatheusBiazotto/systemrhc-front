"use server";

import { HTTP_STATUS } from "@/constants";
import { cookies, headers } from "next/headers";

const baseURL = process.env.API_URL;

async function callout(url, options = {}) {
  if (!baseURL) throw new Error("Falha ao se comunicar com o servidor.");

  async function apiLayer(payload) {
    "use server";
  }
}
