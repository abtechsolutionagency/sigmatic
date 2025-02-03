import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { InfoModal } from "./info-modal"
import Image from "next/image"

interface FormData {
  brokerAccountNumber: string
}

interface StepOneProps {
  formData: FormData
  updateFormData: (updatedFields: Partial<FormData>) => void
}

export function StepOne({ formData, updateFormData }: StepOneProps) {
  const signupSteps = [
    {
      title: "Visit VT Markets website",
      description: "Go to the VT Markets homepage and click on 'Open Live Account'.",
      image: "/placeholder.svg?height=200&width=350&text=VT+Markets+Homepage",
    },
    {
      title: "Fill Personal Information",
      description: "Provide your personal details such as name, date of birth, and contact information.",
      image: "/placeholder.svg?height=200&width=350&text=Personal+Information+Form",
    },
    {
      title: "Choose Account Type",
      description: "Select the appropriate account type for your trading needs.",
      image: "/placeholder.svg?height=200&width=350&text=Account+Type+Selection",
    },
    {
      title: "Complete Registration",
      description: "Review your information and submit your application.",
      image: "/placeholder.svg?height=200&width=350&text=Registration+Completion",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Step 1: Sign Up with VT Markets</h2>
        <InfoModal title="How to Sign Up with VT Markets">
          <ol className="list-decimal list-inside space-y-2">
            {signupSteps.map((step, index) => (
              <li key={index}>
                <strong>{step.title}</strong>: {step.description}
              </li>
            ))}
          </ol>
        </InfoModal>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        VT Markets is our recommended broker for Sigmatic Trading. Follow these steps to get started:
      </p>

      {signupSteps.map((step, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg">
            {index + 1}. {step.title}
          </h3>
          <p className="text-sm text-gray-600">{step.description}</p>
          <Image
            src={step.image || "/placeholder.svg"}
            alt={step.title}
            width={350}
            height={200}
            className="rounded-lg border border-gray-200"
          />
        </div>
      ))}

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Why VT Markets?</AlertTitle>
        <AlertDescription>
          VT Markets offers competitive spreads, fast execution, and a user-friendly platform that integrates seamlessly
          with Sigmatic Trading strategies.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="brokerAccountNumber">VT Markets Account Number</Label>
        <Input
          id="brokerAccountNumber"
          value={formData.brokerAccountNumber}
          onChange={(e) => updateFormData({ brokerAccountNumber: e.target.value })}
          placeholder="Enter your VT Markets account number"
        />
        <p className="text-sm text-gray-600">
          Your account number is a unique identifier provided by VT Markets after your account is approved.
        </p>
      </div>
    </div>
  )
}
