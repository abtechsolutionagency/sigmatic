import { ProgressTracker } from "../components/progress-tracker"
import { StepCard } from "../components/step-card"

interface Step {
  id: number
  title: string
  instruction: string
  status: "completed" | "pending" | "verification" // ✅ Ensure it matches ProgressTracker.tsx
  verificationRequired: boolean
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up with Recommended Broker",
    instruction: "Sign up with our recommended broker VT Markets.",
    status: "pending",
    verificationRequired: true,
  },
  {
    id: 2,
    title: "Deposit a Minimum of $400",
    instruction: "Deposit at least $400. Follow the step-by-step instructions in our [PDF Guide].",
    status: "pending",
    verificationRequired: true,
  },
  {
    id: 3,
    title: "Submit Account Number for Verification",
    instruction:
      "After signing up and making your deposit, send your VT or AXI account number to @trippamod (Telegram Chat).",
    status: "pending",
    verificationRequired: true,
  },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Onboarding Dashboard</h2>
      <ProgressTracker steps={steps} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  )
}

