
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export const ContactForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Send us a Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">First Name</label>
            <Input placeholder="John" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Last Name</label>
            <Input placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Email</label>
          <Input type="email" placeholder="john@example.com" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Subject</label>
          <Input placeholder="How can we help you?" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Message</label>
          <Textarea 
            placeholder="Please describe your issue or question..."
            className="min-h-[120px]"
          />
        </div>
        <Button className="w-full bg-red-600 hover:bg-red-700">
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};
