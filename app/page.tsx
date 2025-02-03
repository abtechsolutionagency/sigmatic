import { Header } from "@/app/components/header"
import { OnboardingForm } from "@/app/components/onboarding-form"
import { FloatingBubble } from "@/app/components/floating-bubble"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center relative z-10">
        <OnboardingForm />
      </main>
      <FloatingBubble />
    </div>
  )
}

