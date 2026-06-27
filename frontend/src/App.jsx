// 1. Import the button shadcn just created for you
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white gap-4">
      
      <div className="flex items-center gap-2 text-xl font-bold">
        <Sparkles className="text-amber-400 animate-pulse" />
        <span>Shadcn Nova Layout Active!</span>
      </div>
      
      <p className="text-zinc-400 text-sm max-w-sm text-center mb-4">
        Notice how the buttons are perfectly compact with tighter padding—that is your Nova style working.
      </p>

      {/* 2. Render shadcn buttons with different variants */}
      <div className="flex gap-3">
        <Button variant="default">Primary Action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Delete Item</Button>
        <Button variant="outline">Outline View</Button>
      </div>

    </div>
  )
}