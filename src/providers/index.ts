import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { GoogleProvider } from "@openauthjs/openauth/provider/google";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { Env } from "../type";
import { sendEmail } from "../utils/email";

export const getProviders = (env: Env) => {
  return {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          await sendEmail(email, code, env);
        },
        copy: {
          input_code: "Code (Sent to your email)",
        },
      })
    ),
    google: GoogleProvider({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      scopes: ["email", "profile"],
      query: {
        access_type: "offline",
        prompt: "consent",
      },
    }),
    github: GithubProvider({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      scopes: ["email", "profile"],
      query: {
        access_type: "offline",
        prompt: "consent",
      },
    }),
  };
};
