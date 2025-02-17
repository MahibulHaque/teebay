import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <div className="space-y-6 animate-in fade-in duration-500">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} className="mt-4 inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back home
        </Button>
      </div>
    </div>
  )
}