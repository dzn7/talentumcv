import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prompt = body?.prompt as string

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 })
    }

    // Google Generative Language API (Gemini) - Text generation
    // Model options: gemini-1.5-flash-latest, gemini-1.5-pro-latest, gemini-1.0-pro
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest"
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 280,
        },
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || "Gemini request failed" }, { status: response.status })
    }
    return NextResponse.json(data, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}

