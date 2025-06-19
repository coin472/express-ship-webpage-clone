
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export const ContactInfo = () => {
  const { siteSettings } = useSiteSettings();
  const { contactInfo } = siteSettings;

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
            <p className="text-muted-foreground">
              {contactInfo.headquarters.address}<br />
              {contactInfo.headquarters.city}, {contactInfo.headquarters.state} {contactInfo.headquarters.zip}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">West Coast Hub</h4>
            <p className="text-muted-foreground">
              {contactInfo.westCoastHub.address}<br />
              {contactInfo.westCoastHub.city}, {contactInfo.westCoastHub.state} {contactInfo.westCoastHub.zip}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">International Center</h4>
            <p className="text-muted-foreground">
              {contactInfo.internationalCenter.address}<br />
              {contactInfo.internationalCenter.city}, {contactInfo.internationalCenter.state} {contactInfo.internationalCenter.zip}
            </p>
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
            <p className="text-muted-foreground">{contactInfo.phoneNumbers.customerService}</p>
          </div>
          <div>
            <h4 className="font-semibold">Business Solutions</h4>
            <p className="text-muted-foreground">{contactInfo.phoneNumbers.businessSolutions}</p>
          </div>
          <div>
            <h4 className="font-semibold">International</h4>
            <p className="text-muted-foreground">{contactInfo.phoneNumbers.international}</p>
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
            <span>{contactInfo.businessHours.mondayFriday}</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>{contactInfo.businessHours.saturday}</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>{contactInfo.businessHours.sunday}</span>
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
            <p className="text-muted-foreground">{contactInfo.emailAddresses.generalSupport}</p>
          </div>
          <div>
            <h4 className="font-semibold">Sales Inquiries</h4>
            <p className="text-muted-foreground">{contactInfo.emailAddresses.salesInquiries}</p>
          </div>
          <div>
            <h4 className="font-semibold">Technical Support</h4>
            <p className="text-muted-foreground">{contactInfo.emailAddresses.technicalSupport}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
