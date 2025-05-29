import { Env } from "../type";
import { AwsClient } from "aws4fetch";

export async function sendEmail(email: string, code: string, env: Env) {
  const aws = new AwsClient({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    service: "ses",
    region: "us-east-1", // Your SES region
  });
  const subject = "Your Verification Code";
  const text = `Your verification code is: ${code}`;
  const emailParams = {
    FromEmailAddress: "kjasrotia100@gmail.com",
    Destination: {
      ToAddresses: [email],
    },
    Content: {
      Simple: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: text,
          },
        },
      },
    },
  };

  const res = await aws.fetch(
    "https://email.us-east-1.amazonaws.com/v2/email/outbound-emails",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailParams),
    }
  );

  const data = await res.text();
  console.log(data);
  if (!res.ok) {
    throw new Error(`Failed to send email: ${data}`);
  }
  return {
    success: true,
    message: "Email sent successfully",
  };
}
