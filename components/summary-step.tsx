import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircleIcon } from "lucide-react"

export function SummaryStep({ formData }) {
  const getRobotName = (id) => {
    const robots = {
      "sigmatic3.5": "Sigmatic 3.5 🚀",
      "sigmatic3.0": "Sigmatic 3.0 📈",
      "sigmatic2.5": "Sigmatic 2.5 🛡️",
    }
    return robots[id] || "Unknown Robot"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Your Information</h2>

      <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
        {[
          { label: "Full Name", value: formData.fullName },
          { label: "Email Address", value: formData.email },
          { label: "VT Markets Account Number", value: formData.brokerAccountNumber },
          { label: "Deposit Amount", value: `$${formData.depositAmount}` },
          { label: "Deposit Proof", value: formData.depositProof ? formData.depositProof.name : "No file uploaded" },
          { label: "Selected Trading Robot", value: getRobotName(formData.selectedRobot) },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <h3 className="font-semibold text-gray-600">{item.label}:</h3>
            <p className="text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      <Alert className="bg-green-50 text-green-800 border-green-200">
        <CheckCircleIcon className="h-4 w-4" />
        <AlertTitle>You're almost there!</AlertTitle>
        <AlertDescription>
          Please review your information carefully. Once you submit, our team will verify your details and activate your
          Sigmatic Trading account.
        </AlertDescription>
      </Alert>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Submit this form</li>
          <li>Our team will review your information</li>
          <li>You'll receive a confirmation email within 24 hours</li>
          <li>Once approved, you'll get access to your selected Sigmatic Trading robot</li>
        </ol>
      </div>
    </div>
  )
}

