
export interface ContactInfo {
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

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
  contactInfo: ContactInfo;
}

export interface SiteSettingsContextType {
  siteSettings: SiteSettings;
  updateSiteName: (value: string) => void;
  updateContactEmail: (value: string) => void;
  updateMaintenanceMode: (value: boolean) => void;
  updateContactInfo: (section: string, field: string, value: string) => void;
  saveSiteSettings: () => void;
  hasUnsavedChanges: boolean;
}
