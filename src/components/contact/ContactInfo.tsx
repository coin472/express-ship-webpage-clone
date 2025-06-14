
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-red-600" />
            Our Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">Headquarters</h4>
            <p className="text-muted-foreground">123 Logistics Avenue<br />New York, NY 10001</p>
          </div>
          <div>
            <h4 className="font-semibold">West Coast Hub</h4>
            <p className="text-muted-foreground">456 Shipping Blvd<br />Los Angeles, CA 90210</p>
          </div>
          <div>
            <h4 className="font-semibold">International Center</h4>
            <p className="text-muted-foreground">789 Global Way<br />Miami, FL 33101</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-red-600" />
            Phone Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">Customer Service</h4>
            <p className="text-muted-foreground">1-800-EXPRESS (1-800-397-7377)</p>
          </div>
          <div>
            <h4 className="font-semibold">Business Solutions</h4>
            <p className="text-muted-foreground">1-800-BUSINESS (1-800-287-4637)</p>
          </div>
          <div>
            <h4 className="font-semibold">International</h4>
            <p className="text-muted-foreground">1-800-GLOBAL-1 (1-800-456-2251)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-red-600" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>8:00 AM - 6:00 PM EST</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>9:00 AM - 4:00 PM EST</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-red-600" />
            Email Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">General Support</h4>
            <p className="text-muted-foreground">support@expressship.com</p>
          </div>
          <div>
            <h4 className="font-semibold">Sales Inquiries</h4>
            <p className="text-muted-foreground">sales@expressship.com</p>
          </div>
          <div>
            <h4 className="font-semibold">Technical Support</h4>
            <p className="text-muted-foreground">tech@expressship.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
