import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { InfoIcon } from "lucide-react"

interface InfoModalProps {
  title: string
  children: ReactNode
}

export function InfoModal({ title, children }: InfoModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">More information</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
