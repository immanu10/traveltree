import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("User-Agent");

    if (!userAgent || userAgent !== "BMC-HTTPS-ROBOT") {
      throw new Error("Bad Request.");
    }

    const crypto = require("crypto");

    const jsonData = await request.json();
    const secret = process.env.BUYMEACOFFEE_SECRET;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(JSON.stringify(jsonData)).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(
      request.headers.get("X-Signature-Sha256") || "",
      "utf8"
    );

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (
      jsonData.type === "donation.created" &&
      jsonData.data.status === "succeeded"
    ) {
      await supabase.rpc("verify_and_update_toy_limit", {
        email_id: jsonData.data.supporter_email,
        toy_count: jsonData.data.amount,
      });
    }
  } catch (error) {
    return new Response(`Webhook Verification Error`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
