import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

interface Step {
  id: number
  title: string
  instruction: string
  status: "completed" | "pending" | "verification"
}

interface StepCardProps {
  step: Step
}

export function StepCard({ step }: StepCardProps) {
  const getStatusIcon = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return "✅"
      case "pending":
        return "⏳"
      case "verification":
        return "🔍"
      default:
        return "⏳"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Step {step.id}</span>
          <span>{getStatusIcon(step.status)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{step.instruction}</p>
        {step.id === 1 && (
          <div className="space-y-2">
            <Label htmlFor="account-number">VT Markets Account Number</Label>
            <Input id="account-number" placeholder="Enter your account number" />
          </div>
        )}
        {step.id === 3 && (
          <div className="space-y-2">
            <Label htmlFor="vt-axi-account">VT or AXI Account Number</Label>
            <Input id="vt-axi-account" placeholder="Enter your account number" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">{step.status === "completed" ? "Completed" : "Mark as Completed"}</Button>
      </CardFooter>
    </Card>
  )
}
