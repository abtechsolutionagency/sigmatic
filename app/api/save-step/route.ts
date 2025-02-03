import { NextRequest, NextResponse } from "next/server"
import FormDataModel from "../../models/FormData"
import { connectToDatabase } from "../../lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email } = await request.json()

    await connectToDatabase()

    let existingUser = await FormDataModel.findOne({ email })

    if (!existingUser) {
      existingUser = new FormDataModel({
        fullName,
        email,
        stepCompleted: 1,
      })
      await existingUser.save()
    }

    return NextResponse.json({ success: true, message: "Step 1 data saved", userId: existingUser._id })
  } catch (error) {
    console.error("Error saving step 1 data:", error)
    return NextResponse.json({ success: false, message: "Failed to save data" }, { status: 500 })
  }
}
