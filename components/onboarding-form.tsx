"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StepZero } from "@/components/step-zero"
import { StepOne } from "@/components/step-one"
import { StepTwo } from "@/components/step-two"
import { StepThree } from "@/components/step-three"
import { SummaryStep } from "@/components/summary-step"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';

const steps = [
  { id: 0, title: "Basic Info", icon: "👤" },
  { id: 1, title: "Broker Signup", icon: "🏦" },
  { id: 2, title: "Deposit Funds", icon: "💰" },
  { id: 3, title: "Select Robot", icon: "🤖" },
  { id: 4, title: "Review & Submit", icon: "✅" },
]

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    brokerAccountNumber: "",
    depositAmount: "",
    depositProof: null,
    selectedRobot: "",
  })
  const [userId, setUserId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (data: { fullName: string; email: string; brokerAccountNumber: string; depositAmount: string; depositProof: null; selectedRobot: string }) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 0:
        return formData.fullName.trim() !== "" && formData.email.trim() !== ""
      case 1:
        return formData.brokerAccountNumber.trim() !== ""
      case 2:
        return (
          formData.depositAmount.trim() !== "" &&
          Number.parseFloat(formData.depositAmount) >= 400
          // formData.depositProof !== null
        )
      case 3:
        return formData.selectedRobot === "sigmatic3.5"
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalSubmit = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Retrieved from step 1
          brokerAccountNumber: formData.brokerAccountNumber,
          depositAmount: formData.depositAmount,
          selectedRobot: formData.selectedRobot,
        }),
      })

      const result = await response.json()
      console.log("Final step result:", result)

      if (result.success) {
        toast.success("Your onboarding information has been sent successfully.", {
          position: "bottom-center",
          autoClose: 3000,
        })

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          brokerAccountNumber: "",
          depositAmount: "",
          depositProof: null,
          selectedRobot: "",
        })
        setCurrentStep(0) // Reset to Step 1
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error completing onboarding:", error)
      toast.error("There was an error submitting your information.")
    }
  }



  const handleFirstStepSubmit = async () => {
    try {
      const response = await fetch("/api/save-step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
        }),
      })

      const result = await response.json()
      console.log("Step 1 result:", result)

      if (result.success) {
        setUserId(result.userId) // Save user ID for later steps
        setCurrentStep(1) // Move to the next step
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error saving first step:", error)
      toast.error("Failed to save Step 1")
    }
  }



  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepZero formData={formData} updateFormData={updateFormData} />
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} />
      case 2:
        return <StepTwo formData={formData} updateFormData={updateFormData} />
      case 3:
        return <StepThree formData={formData} updateFormData={updateFormData} />
      case 4:
        return <SummaryStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl bg-white shadow-md rounded-lg border border-gray-200">
      <CardHeader className="border-b border-gray-200 pb-7 pt-8">
        <ToastContainer position="bottom-center" autoClose={3000} />
        <CardTitle className="text-3xl font-bold text-gray-800 text-center">Sigmatic Trading Onboarding</CardTitle>
        <div className="mt-6">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full h-2" />
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${index === currentStep
                    ? "text-primary scale-110 transition-all duration-200"
                    : index < currentStep
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
              >
                <span className="text-2xl mb-2">{step.icon}</span>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 px-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{steps[currentStep].title}</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        {/* </form> */}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-200 pt-6 pb-8 px-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          type={currentStep === steps.length - 1 ? "submit" : "button"}
          onClick={() => {
            if (currentStep === 0) {
              handleFirstStepSubmit()
            } else if (currentStep === steps.length - 1) {
              handleFinalSubmit()
            } else {
              handleNext()
            }
          }}
          disabled={!validateStep(currentStep) || isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
        >
          {currentStep === steps.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
          {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

