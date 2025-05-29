import { User } from "../type";

export async function getOrCreateUser(
  env: Env,
  email: string | null
): Promise<User> {
  const result: User | null = await env.AUTH_DB.prepare(
    `
		INSERT INTO user (email)
		VALUES (?)
		ON CONFLICT (email) DO UPDATE SET email = email
		RETURNING id, email;
		`
  )
    .bind(email)
    .first();
  if (!result) {
    throw new Error(`Unable to process user: ${email}`);
  }
  console.log(`Found or created user ${result.id} with email ${email}`);
  return result;
}
