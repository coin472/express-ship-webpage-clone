
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactFormSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input type="tel" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option>General Inquiry</option>
            <option>Shipping Quote</option>
            <option>Track Package</option>
            <option>Technical Support</option>
            <option>Billing Question</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea rows={4} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"></textarea>
        </div>
        
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};
