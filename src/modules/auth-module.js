import * as jose from "jose";
import { cookies } from "next/headers";

async function openSessionToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
  } catch (e) {
    return null;
  }
}

async function isSessionValid() {
  const cookiesHandler = await cookies();
  const sessionCookie = cookiesHandler.get("token");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();

    return exp * 1000 > currentDate;
  }

  return false;
}

async function getPayloadCookies() {
  const cookiesHandler = await cookies();
  const sessionCookie = await cookiesHandler.get("token");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const payload = await openSessionToken(value);

    return payload;
  }

  return false;
}

const AuthService = {
  openSessionToken,
  isSessionValid,
  getPayloadCookies,
};

export default AuthService;
