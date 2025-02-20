import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: {
    title: string
    description?: string
  }[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: Readonly<StepperProps>) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => {
          const isCurrent = currentStep === index
          const isComplete = currentStep > index

          return (
            <li key={step.title} className="md:flex-1">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!isComplete && !isCurrent}
                className={cn(
                  "group flex w-full flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  isComplete
                    ? "border-primary hover:border-primary/80"
                    : isCurrent
                      ? "border-primary"
                      : "border-muted-foreground/20",
                )}
              >
                <span className="text-sm font-medium">
                  <span
                    className={cn(
                      "mr-2 inline-flex size-6 items-center justify-center rounded-full border-2 text-xs",
                      isComplete
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                          ? "border-primary text-foreground"
                          : "border-muted-foreground/20 text-muted-foreground",
                    )}
                  >
                    {isComplete ? <Check className="size-3" /> : index + 1}
                  </span>
                  <span
                    className={cn("font-medium", isComplete || isCurrent ? "text-foreground" : "text-muted-foreground")}
                  >
                    {step.title}
                  </span>
                </span>
                {step.description && (
                  <span
                    className={cn(
                      "mt-0.5 text-sm",
                      isComplete || isCurrent ? "text-muted-foreground" : "text-muted-foreground/60",
                    )}
                  >
                    {step.description}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

