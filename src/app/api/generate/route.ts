import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prompt = body?.prompt as string

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({ error: "HUGGINGFACE_API_KEY not configured" }, { status: 500 })
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 180,
            temperature: 0.7,
            return_full_text: false,
          },
          options: { wait_for_model: true },
        }),
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: data?.error || "HF request failed" }, { status: response.status })
    }
    return NextResponse.json(data, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
