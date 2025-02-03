import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { motion } from "framer-motion"

interface FormData {
  fullName: string
  email: string
}

interface StepZeroProps {
  formData: FormData
  updateFormData: (updatedFields: Partial<FormData>) => void
}

export function StepZero({ formData, updateFormData }: StepZeroProps) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Welcome to Sigmatic Trading</h2>
        <p className="text-sm text-gray-600 mb-4">
          Let's start by getting some basic information from you. This will help us personalize your onboarding
          experience.
        </p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="Enter your full name"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="Enter your email address"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll use this email to send you important updates about your account and trading strategies.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
