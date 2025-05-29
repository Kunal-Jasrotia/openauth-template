// src/types.ts
export interface Env {
  AUTH_STORAGE: KVNamespace;
  AUTH_DB: D1Database;
  JWT_SECRET: string;
  REDIRECT_DOMAIN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}
export type User = {
  id: string;
  email: string;
};
