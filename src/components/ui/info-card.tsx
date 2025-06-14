
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  description?: string;
  content?: ReactNode;
  action?: {
    text: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost";
  };
  className?: string;
  hoverable?: boolean;
}

export const InfoCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  content,
  action,
  className = "",
  hoverable = false
}: InfoCardProps) => {
  return (
    <Card className={`${hoverable ? 'hover:shadow-lg transition-shadow' : ''} ${className}`}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {Icon && (
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Icon className="h-6 w-6 text-red-600" />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        
        {content}
        
        {action && (
          <Button 
            onClick={action.onClick}
            variant={action.variant || "default"}
            className={action.variant === "default" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
          >
            {action.text}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
