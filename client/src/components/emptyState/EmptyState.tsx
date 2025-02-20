import { FileX } from "lucide-react"

interface NoDataAvailableProps {
  message?: string
}

export function NoDataAvailable({ message = "No data available" }: NoDataAvailableProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">{message}</h3>
      <p className="text-sm text-muted-foreground mt-2">There's no data to display at the moment.</p>
    </div>
  )
}