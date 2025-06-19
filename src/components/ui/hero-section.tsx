
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  highlightedText?: string;
  description: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  children?: ReactNode;
  className?: string;
  backgroundStyle?: "gradient" | "solid" | "none";
}

export const HeroSection = ({
  title,
  subtitle,
  highlightedText,
  description,
  primaryAction,
  secondaryAction,
  stats,
  children,
  className = "",
  backgroundStyle = "gradient"
}: HeroSectionProps) => {
  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case "gradient":
        return "bg-gradient-to-br from-red-50 to-yellow-50";
      case "solid":
        return "bg-muted/30";
      case "none":
        return "";
      default:
        return "bg-gradient-to-br from-red-50 to-yellow-50";
    }
  };

  return (
    <section className={`py-20 ${getBackgroundClass()} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            {subtitle && (
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              {title}
              {highlightedText && (
                <span className="text-red-600"> {highlightedText}</span>
              )}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryAction && (
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                  {primaryAction.icon}
                </Button>
              )}
              {secondaryAction && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.text}
                </Button>
              )}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="flex items-center justify-center space-x-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-red-600">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};
