import { Env } from "../type";
import { getOrCreateUser } from "../utils/user";
import { getEmailFromGithub, getEmailFromGoogle } from "./helper";
import { sign } from "hono/jwt";
export async function handleAuthSuccess(
  env: Env,
  value: any
): Promise<Response> {
  let email: string | null = null;

  switch (value.provider) {
    case "google":
      email = await getEmailFromGoogle(value.tokenset.access);
      break;

    case "github":
      email = await getEmailFromGithub(value.tokenset.access);
      break;

    case "password":
      email = value.email;
      break;
  }

  if (!email) {
    throw new Error("No email found in authentication response");
  }

  const user = await getOrCreateUser(env, email);

  const token = await sign({ email: user.email, id: user.id }, env.JWT_SECRET);

  const redirectUrl = `${env.REDIRECT_DOMAIN}/dashboard?token=${token}`;
  return Response.redirect(redirectUrl, 302);
}
