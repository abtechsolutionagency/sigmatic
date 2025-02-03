import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { InfoModal } from "./info-modal"
import Image from "next/image"

interface FormData {
  depositAmount: number
}

interface StepTwoProps {
  formData: FormData
  updateFormData: (updatedFields: Partial<FormData>) => void
}

export function StepTwo({ formData, updateFormData }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Step 2: Deposit a Minimum of $400</h2>
        <InfoModal title="How to Deposit Funds">
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your VT Markets account</li>
            <li>Navigate to the "Deposit" or "Fund Account" section</li>
            <li>Choose your preferred payment method (e.g., bank transfer, credit card)</li>
            <li>Enter the amount you wish to deposit (minimum $400)</li>
            <li>Follow the prompts to complete the transaction</li>
            <li>Save the confirmation or screenshot of your deposit</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=350&text=Account+Funding"
            alt="Account Funding Process"
            width={350}
            height={200}
            className="mt-4 rounded-lg border border-gray-200"
          />
        </InfoModal>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        To start trading with Sigmatic Trading strategies, you need to fund your VT Markets account. Here's how:
      </p>
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-lg">Fund Your Account</h3>
        <p className="text-sm text-gray-600">Choose a funding method and make your initial deposit of at least $400.</p>
        <Image
          src="/placeholder.svg?height=200&width=350&text=Account+Funding"
          alt="Account Funding Process"
          width={350}
          height={200}
          className="rounded-lg border border-gray-200"
        />
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Why $400 minimum?</AlertTitle>
        <AlertDescription>
          This amount ensures you have sufficient capital to execute Sigmatic Trading strategies effectively while
          managing risk.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="depositAmount">Deposit Amount</Label>
        <Input
          id="depositAmount"
          type="number"
          value={formData.depositAmount}
          onChange={(e) => updateFormData({ depositAmount: Number(e.target.value) })}
          placeholder="Enter deposit amount"
          min="400"
        />
        <p className="text-sm text-gray-600">Enter the exact amount you deposited into your VT Markets account.</p>
      </div>
    </div>
  )
}
