"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-31%20at%206.32.02%20pm-ljjlykA3XaY5fChDBAQnThRMwshlKR.png"
              alt="Sigmatic Trading Logo"
              width={160}
              height={40}
              priority
              className="h-14 w-auto"
            />
          </motion.div>
        </div>
        <Link href="https://www.sigmatic-trading.com/contact" passHref>
  <Button variant="ghost" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
    <HelpCircle className="w-4 h-4 mr-2" />
    Help
  </Button>
</Link>
      </div>
    </header>
  )
}

