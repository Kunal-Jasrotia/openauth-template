export async function getEmailFromGoogle(accessToken: string): Promise<string> {
  const profileRes = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!profileRes.ok) {
    throw new Error("Failed to fetch user profile from Google");
  }

  const { email }: { email: string } = await profileRes.json();
  return email;
}

export async function getEmailFromGithub(accessToken: string): Promise<string> {
  const profileRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "open-auth-app",
    },
  });

  if (!profileRes.ok) {
    throw new Error("Failed to fetch user profile from GitHub");
  }

  const { email }: { email: string } = await profileRes.json();
  return email;
}
