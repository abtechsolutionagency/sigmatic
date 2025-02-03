import { Progress } from "@/app/components/ui/progress"
interface Step {
  status: "completed" | "pending" | "verification" 
}

interface ProgressTrackerProps {
  steps: Step[]
}

export function ProgressTracker({ steps }: ProgressTrackerProps) {
  const completedSteps = steps.filter((step) => step.status === "completed").length
  const progress = (completedSteps / steps.length) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Onboarding Progress</span>
        <span>
          {completedSteps} of {steps.length} steps completed
        </span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  )
}

