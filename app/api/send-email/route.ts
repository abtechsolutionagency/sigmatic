import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"
import FormDataModel from "@/app/models/FormData"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { userId, brokerAccountNumber, depositAmount, selectedRobot } = await request.json()

    await connectToDatabase()

    const updatedUser = await FormDataModel.findByIdAndUpdate(
      userId,
      { brokerAccountNumber, depositAmount, selectedRobot, stepCompleted: 2 },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.RECIEVER_EMAIL,
      subject: "New Onboarding Submission",
      html: `
        <h2>New Onboarding Submission</h2>
        <p><b>Full Name:</b> ${updatedUser.fullName}</p>
        <p><b>Email:</b> ${updatedUser.email}</p>
        <p><b>Broker Account Number:</b> ${updatedUser.brokerAccountNumber}</p>
        <p><b>Deposit Amount:</b> ${updatedUser.depositAmount}</p>
        <p><b>Selected Robot:</b> ${updatedUser.selectedRobot}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Data saved & email sent" })
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return NextResponse.json({ success: false, message: "Failed to complete onboarding" }, { status: 500 })
  }
}
