
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";

interface ContactInfo {
  headquarters: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  westCoastHub: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  internationalCenter: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumbers: {
    customerService: string;
    businessSolutions: string;
    international: string;
  };
  businessHours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  emailAddresses: {
    generalSupport: string;
    salesInquiries: string;
    technicalSupport: string;
  };
}

interface ContactInfoSettingsProps {
  contactInfo: ContactInfo;
  onContactInfoChange: (section: string, field: string, value: string) => void;
}

export const ContactInfoSettings = ({ contactInfo, onContactInfoChange }: ContactInfoSettingsProps) => {
  const handleNestedChange = (section: string, field: string, value: string | number) => {
    onContactInfoChange(section, field, String(value));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Headquarters</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="hq-address"
                label="Address"
                value={contactInfo.headquarters.address}
                onChange={(value) => handleNestedChange('headquarters', 'address', value)}
                placeholder="123 Logistics Avenue"
              />
              <FormInput
                id="hq-city"
                label="City"
                value={contactInfo.headquarters.city}
                onChange={(value) => handleNestedChange('headquarters', 'city', value)}
                placeholder="New York"
              />
              <FormInput
                id="hq-state"
                label="State"
                value={contactInfo.headquarters.state}
                onChange={(value) => handleNestedChange('headquarters', 'state', value)}
                placeholder="NY"
              />
              <FormInput
                id="hq-zip"
                label="ZIP Code"
                value={contactInfo.headquarters.zip}
                onChange={(value) => handleNestedChange('headquarters', 'zip', value)}
                placeholder="10001"
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">West Coast Hub</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="wc-address"
                label="Address"
                value={contactInfo.westCoastHub.address}
                onChange={(value) => handleNestedChange('westCoastHub', 'address', value)}
                placeholder="456 Shipping Blvd"
              />
              <FormInput
                id="wc-city"
                label="City"
                value={contactInfo.westCoastHub.city}
                onChange={(value) => handleNestedChange('westCoastHub', 'city', value)}
                placeholder="Los Angeles"
              />
              <FormInput
                id="wc-state"
                label="State"
                value={contactInfo.westCoastHub.state}
                onChange={(value) => handleNestedChange('westCoastHub', 'state', value)}
                placeholder="CA"
              />
              <FormInput
                id="wc-zip"
                label="ZIP Code"
                value={contactInfo.westCoastHub.zip}
                onChange={(value) => handleNestedChange('westCoastHub', 'zip', value)}
                placeholder="90210"
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">International Center</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="intl-address"
                label="Address"
                value={contactInfo.internationalCenter.address}
                onChange={(value) => handleNestedChange('internationalCenter', 'address', value)}
                placeholder="789 Global Way"
              />
              <FormInput
                id="intl-city"
                label="City"
                value={contactInfo.internationalCenter.city}
                onChange={(value) => handleNestedChange('internationalCenter', 'city', value)}
                placeholder="Miami"
              />
              <FormInput
                id="intl-state"
                label="State"
                value={contactInfo.internationalCenter.state}
                onChange={(value) => handleNestedChange('internationalCenter', 'state', value)}
                placeholder="FL"
              />
              <FormInput
                id="intl-zip"
                label="ZIP Code"
                value={contactInfo.internationalCenter.zip}
                onChange={(value) => handleNestedChange('internationalCenter', 'zip', value)}
                placeholder="33101"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormInput
            id="phone-customer"
            label="Customer Service"
            value={contactInfo.phoneNumbers.customerService}
            onChange={(value) => handleNestedChange('phoneNumbers', 'customerService', value)}
            placeholder="1-800-EXPRESS (1-800-397-7377)"
          />
          <FormInput
            id="phone-business"
            label="Business Solutions"
            value={contactInfo.phoneNumbers.businessSolutions}
            onChange={(value) => handleNestedChange('phoneNumbers', 'businessSolutions', value)}
            placeholder="1-800-BUSINESS (1-800-287-4637)"
          />
          <FormInput
            id="phone-intl"
            label="International"
            value={contactInfo.phoneNumbers.international}
            onChange={(value) => handleNestedChange('phoneNumbers', 'international', value)}
            placeholder="1-800-GLOBAL-1 (1-800-456-2251)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormInput
            id="hours-weekday"
            label="Monday - Friday"
            value={contactInfo.businessHours.mondayFriday}
            onChange={(value) => handleNestedChange('businessHours', 'mondayFriday', value)}
            placeholder="8:00 AM - 6:00 PM EST"
          />
          <FormInput
            id="hours-saturday"
            label="Saturday"
            value={contactInfo.businessHours.saturday}
            onChange={(value) => handleNestedChange('businessHours', 'saturday', value)}
            placeholder="9:00 AM - 4:00 PM EST"
          />
          <FormInput
            id="hours-sunday"
            label="Sunday"
            value={contactInfo.businessHours.sunday}
            onChange={(value) => handleNestedChange('businessHours', 'sunday', value)}
            placeholder="Closed"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormInput
            id="email-general"
            label="General Support"
            value={contactInfo.emailAddresses.generalSupport}
            onChange={(value) => handleNestedChange('emailAddresses', 'generalSupport', value)}
            placeholder="support@expressship.com"
            type="email"
          />
          <FormInput
            id="email-sales"
            label="Sales Inquiries"
            value={contactInfo.emailAddresses.salesInquiries}
            onChange={(value) => handleNestedChange('emailAddresses', 'salesInquiries', value)}
            placeholder="sales@expressship.com"
            type="email"
          />
          <FormInput
            id="email-tech"
            label="Technical Support"
            value={contactInfo.emailAddresses.technicalSupport}
            onChange={(value) => handleNestedChange('emailAddresses', 'technicalSupport', value)}
            placeholder="tech@expressship.com"
            type="email"
          />
        </CardContent>
      </Card>
    </div>
  );
};
