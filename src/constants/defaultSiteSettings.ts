
import { ContactInfo, SiteSettings } from '@/types/siteSettings';

export const defaultContactInfo: ContactInfo = {
  headquarters: {
    address: "123 Logistics Avenue",
    city: "New York",
    state: "NY",
    zip: "10001"
  },
  westCoastHub: {
    address: "456 Shipping Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90210"
  },
  internationalCenter: {
    address: "789 Global Way",
    city: "Miami",
    state: "FL",
    zip: "33101"
  },
  phoneNumbers: {
    customerService: "1-800-EXPRESS (1-800-397-7377)",
    businessSolutions: "1-800-BUSINESS (1-800-287-4637)",
    international: "1-800-GLOBAL-1 (1-800-456-2251)"
  },
  businessHours: {
    mondayFriday: "8:00 AM - 6:00 PM EST",
    saturday: "9:00 AM - 4:00 PM EST",
    sunday: "Closed"
  },
  emailAddresses: {
    generalSupport: "support@expressship.com",
    salesInquiries: "sales@expressship.com",
    technicalSupport: "tech@expressship.com"
  }
};

export const defaultSettings: SiteSettings = {
  siteName: "ExpressShip",
  contactEmail: "info@expressship.com",
  maintenanceMode: false,
  contactInfo: defaultContactInfo
};
