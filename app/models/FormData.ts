import mongoose, { Schema, Document } from "mongoose"

interface IFormData extends Document {
  fullName: string
  email: string
  brokerAccountNumber?: string
  depositAmount?: string
  selectedRobot?: string
  stepCompleted: number
  createdAt: Date
}

const FormDataSchema = new Schema<IFormData>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  brokerAccountNumber: { type: String },
  depositAmount: { type: String },
  selectedRobot: { type: String },
  stepCompleted: { type: Number, required: true, default: 1 }, 
  createdAt: { type: Date, default: Date.now },
})

const FormDataModel = mongoose.models.FormData || mongoose.model<IFormData>("FormData", FormDataSchema)

export default FormDataModel
