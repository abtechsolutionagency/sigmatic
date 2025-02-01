import type React from "react"
import { ToastProvider } from "@/components/ui/toast"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}



import './globals.css'