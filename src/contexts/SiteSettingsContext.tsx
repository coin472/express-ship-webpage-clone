
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
}

interface SiteSettingsContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  saveSiteSettings: () => void;
}

const defaultSettings: SiteSettings = {
  siteName: "ExpressShip",
  contactEmail: "info@expressship.com",
  maintenanceMode: false
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
        description: `Site name: ${siteSettings.siteName}, Contact: ${siteSettings.contactEmail}, Maintenance: ${siteSettings.maintenanceMode ? 'On' : 'Off'}`,
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
