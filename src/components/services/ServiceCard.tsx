
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price: string;
}

export const ServiceCard = ({ icon: Icon, title, description, features, price }: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <Icon className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-muted-foreground">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-2xl font-bold text-red-600">{price}</div>
          <QuoteForm 
            trigger={
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
