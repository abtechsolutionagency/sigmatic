"use client"

import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { InfoModal } from "./info-modal"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { LockIcon } from "lucide-react"

interface FormData {
  selectedRobot: "sigmatic3.5" | "sigmaticRV2" | "sigmaticRV4" | ""
}

interface StepThreeProps {
  formData: FormData
  updateFormData: (updatedFields: Partial<FormData>) => void
}

export function StepThree({ formData, updateFormData }: StepThreeProps) {
  const robots = [
    {
      id: "sigmatic3.5",
      name: "Sigmatic 3.5",
      description: "Our latest and most advanced trading robot",
      icon: "🚀",
      available: true,
    },
    {
      id: "sigmaticRV2",
      name: "Sigmatic RV2",
      description: "Proven performance with a track record of success",
      icon: "📈",
      available: false,
    },
    {
      id: "sigmaticRV4",
      name: "Sigmatic RV4",
      description: "Reliable and stable, perfect for beginners",
      icon: "🛡️",
      available: false,
    },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Step 3: Select Your Trading Robot</h2>
          <InfoModal title="About Our Trading Robots">
            <p className="mb-4 text-gray-600">
              Sigmatic Trading offers a range of advanced trading robots, each designed to cater to different trading
              styles and risk appetites. Our robots use sophisticated algorithms to analyze market trends and execute
              trades automatically.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>Sigmatic 3.5:</strong> Our most advanced robot, featuring AI-driven decision making and adaptive
                strategies.
              </li>
              <li>
                <strong>Sigmatic RV2:</strong> A balanced robot with a proven track record, suitable for most traders.
              </li>
              <li>
                <strong>Sigmatic RV4:</strong> A more conservative robot, ideal for those new to algorithmic trading.
              </li>
            </ul>
          </InfoModal>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose the Sigmatic Trading robot that best fits your trading goals and risk tolerance.
        </p>

        <RadioGroup
          value={formData.selectedRobot}
          onValueChange={(value) => updateFormData({ selectedRobot: value as FormData["selectedRobot"] })}
          className="space-y-4"
        >
          {robots.map((robot) => (
            <motion.div
              key={robot.id}
              whileHover={{ scale: robot.available ? 1.02 : 1 }}
              whileTap={{ scale: robot.available ? 0.98 : 1 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label
                    htmlFor={robot.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg ${
                      robot.available
                        ? "bg-gray-100 cursor-pointer hover:bg-gray-200"
                        : "bg-gray-100 cursor-not-allowed opacity-50"
                    } transition-colors relative`}
                  >
                    <RadioGroupItem value={robot.id} id={robot.id} disabled={!robot.available} />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{robot.icon}</span>
                        <span className="font-semibold text-gray-800">{robot.name}</span>
                        {!robot.available && <LockIcon className="w-4 h-4 ml-2 text-gray-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{robot.description}</p>
                    </div>
                  </Label>
                </TooltipTrigger>
                {!robot.available && (
                  <TooltipContent>
                    <p className="text-gray-800">
                      This robot is part of our pro plan. Upgrade to access advanced features.
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </motion.div>
          ))}
        </RadioGroup>
      </div>
    </TooltipProvider>
  )
}
