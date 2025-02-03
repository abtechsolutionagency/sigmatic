"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function FloatingBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-96 mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Need Help?</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mb-4">
              If you have any questions about the onboarding process, our support team is here to assist you 24/7.
            </p>
            <Link href="https://www.sigmatic-trading.com/contact" passHref>
  <Button className="w-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200">
    Contact Support
  </Button>
</Link>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          className="rounded-full w-16 h-16 flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-lg transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  )
}

