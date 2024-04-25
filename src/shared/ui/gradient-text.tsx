import { cn } from "../lib/utils"

type GradientType = {
  animation: string
  reverseAnimation: string
  startColor: string
  endColor: string
}

const gradients: GradientType[] = [
  {
    animation: "animated-gradient-text-fade-blue",
    reverseAnimation: "animated-gradient-text-fade-blue-reverse",
    startColor: "#007cf0",
    endColor: "#00dfd8",
  },
  {
    animation: "animated-gradient-text-fade-purple",
    reverseAnimation: "animated-gradient-text-fade-purple-reverse",
    startColor: "#7928ca",
    endColor: "#ff0080",
  },
  {
    animation: "animated-gradient-text-fade-orange",
    reverseAnimation: "animated-gradient-text-fade-orange-reverse",
    startColor: "#ff4d4d",
    endColor: "#f9cb28",
  },
]

interface GradientTextProps {
  className?: string
  children: React.ReactNode
}

function GradientText({ className, children }: GradientTextProps) {
  return (
    <span className="relative block select-none">
      {gradients.map((gradient, i) => (
        <span
          key={i}
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradient.startColor}, ${gradient.endColor})`,
          }}
          className={cn(
            "absolute inset-0 bg-clip-text text-transparent",
            gradient.animation,
            className
          )}
        >
          {children}
        </span>
      ))}
      <span className={cn("opacity-0", className)}>{children}</span>
    </span>
  )
}

export { GradientText }
