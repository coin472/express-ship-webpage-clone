
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Clock } from "lucide-react";

interface ContactMethodProps {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  availability: string;
  onContact: () => void;
  className?: string;
}

export const ContactMethod = ({
  icon: Icon,
  title,
  description,
  detail,
  availability,
  onContact,
  className = ""
}: ContactMethodProps) => {
  return (
    <Card className={`text-center hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="font-semibold text-lg mb-2">{detail}</div>
        <div className="text-sm text-muted-foreground flex items-center justify-center mb-4">
          <Clock className="h-4 w-4 mr-1" />
          {availability}
        </div>
        <Button 
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={onContact}
        >
          Contact Now
        </Button>
      </CardContent>
    </Card>
  );
};
