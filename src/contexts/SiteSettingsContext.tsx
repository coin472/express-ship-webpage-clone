
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
  contactInfo: ContactInfo;
}

interface SiteSettingsContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  saveSiteSettings: () => void;
}

const defaultContactInfo: ContactInfo = {
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

const defaultSettings: SiteSettings = {
  siteName: "ExpressShip",
  contactEmail: "info@expressship.com",
  maintenanceMode: false,
  contactInfo: defaultContactInfo
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const { toast } = useToast();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSiteSettings({ ...defaultSettings, ...parsed });
        
        // Apply settings immediately
        applySettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading site settings:', error);
      }
    }
  }, []);

  const applySettings = (settings: SiteSettings) => {
    // Update document title
    document.title = settings.siteName;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${settings.siteName} - Express Shipping Solutions`);
    }
    
    // Add or update contact email meta
    let contactMeta = document.querySelector('meta[name="contact-email"]');
    if (!contactMeta) {
      contactMeta = document.createElement('meta');
      contactMeta.setAttribute('name', 'contact-email');
      document.head.appendChild(contactMeta);
    }
    contactMeta.setAttribute('content', settings.contactEmail);

    // Handle maintenance mode
    if (settings.maintenanceMode) {
      console.log('Maintenance mode is enabled');
      // In a real app, you might redirect to a maintenance page
      // For now, we'll just log it and could show a banner
    }
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  };

  const saveSiteSettings = () => {
    try {
      // Save to localStorage
      localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
      
      // Apply the settings
      applySettings(siteSettings);
      
      toast({
        title: "Settings Saved Successfully!",
        description: `Site settings have been updated and applied.`,
      });

      console.log('Site settings saved and applied:', siteSettings);
      
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast({
        title: "Error Saving Settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ siteSettings, updateSiteSettings, saveSiteSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
