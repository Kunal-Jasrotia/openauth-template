import { issuer } from "@openauthjs/openauth";
import { createSubjects } from "@openauthjs/openauth/subject";
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare";
import { object, string } from "valibot";
import { getProviders } from "./providers";
import { handleAuthSuccess } from "./handlers";
import { Env } from "./type";

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
});

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      url.searchParams.set("redirect_uri", url.origin + "/callback");
      url.searchParams.set("client_id", "your-client-id");
      url.searchParams.set("response_type", "code");
      url.pathname = "/authorize";
      return Response.redirect(url.toString());
    }

    return issuer({
      storage: CloudflareStorage({
        namespace: env.AUTH_STORAGE,
      }),
      subjects,
      providers: getProviders(env),
      theme: {
        title: "myAuth",
        primary: "#0051c3",
        favicon: "https://workers.cloudflare.com//favicon.ico",
        logo: {
          dark: "https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/db1e5c92-d3a6-4ea9-3e72-155844211f00/public",
          light:
            "https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fa5a3023-7da9-466b-98a7-4ce01ee6c700/public",
        },
      },
      success: async (ctx, value) => {
        return handleAuthSuccess(env, value);
      },
    }).fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
