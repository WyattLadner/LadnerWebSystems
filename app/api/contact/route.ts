import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON body from the client component
    const body = await request.json();

    // 2. Define the target n8n webhook URL
    const n8nWebhookUrl =
      "https://n8n-e7gukscs9qcimxyguroq4x4a.136.112.97.249.sslip.io/webhook/5c1f417a-8b9d-4035-87e7-fd6818feca03";
    // 3. Forward the payload directly to n8n via a server-side fetch.
    // This bypasses the browser's strict SSL/CORS constraints.
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle unsuccessful response from n8n
    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    // 4. Return success to the client
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Route Error (Contact):", error);

    // 5. Return an error safely to the client
    return NextResponse.json(
      { success: false, error: "Failed to forward request to webhook" },
      { status: 500 }
    );
  }
}
