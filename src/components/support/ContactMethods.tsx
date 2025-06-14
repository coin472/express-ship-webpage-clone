
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our support team",
    detail: "1-800-EXPRESS",
    availability: "24/7 Available"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions",
    detail: "support@expressship.com",
    availability: "Response within 2 hours"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our agents",
    detail: "Start conversation",
    availability: "Mon-Fri 8AM-8PM"
  }
];

export const ContactMethods = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {contactMethods.map((method, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <method.icon className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle>{method.title}</CardTitle>
            <p className="text-muted-foreground">{method.description}</p>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-lg mb-2">{method.detail}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              {method.availability}
            </div>
            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
              Contact Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
