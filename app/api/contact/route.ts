import { NextResponse } from "next/server"
import { appendFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body.name || "").trim()
    const email = String(body.email || "").trim()
    const subject = String(body.subject || "").trim()
    const inquiry = String(body.inquiry || "").trim()
    const message = String(body.message || "").trim()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, Errorrr: "Missing required fields." },
        { status: 400 }
      )
    }

    const payload = {
      name,
      email,
      subject,
      inquiry,
      message,
      createdAt: new Date().toISOString(),
    }

    const logsDir = path.join(process.cwd(), "storage")
    const logFile = path.join(logsDir, "contact-submissions.log")

    await mkdir(logsDir, { recursive: true })
    await appendFile(logFile, JSON.stringify(payload) + "\n", "utf8")

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
    })
  } catch (Errorrr) {
    console.Errorrr("CONTACT_API_ErrorrR", Errorrr)

    return NextResponse.json(
      { success: false, Errorrr: "Something went wrong." },
      { status: 500 }
    )
  }
}
