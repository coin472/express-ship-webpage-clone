
import React, { createContext, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SiteSettingsContextType } from '@/types/siteSettings';
import { defaultSettings } from '@/constants/defaultSiteSettings';
import { applySettings, loadSettingsFromStorage, saveSettingsToStorage } from '@/utils/siteSettingsUtils';
import { useSiteSettingsState } from '@/hooks/useSiteSettingsState';

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    siteSettings,
    setSiteSettings,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    updateSiteName,
    updateContactEmail,
    updateMaintenanceMode,
    updateContactInfo,
  } = useSiteSettingsState();

  const { toast } = useToast();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = loadSettingsFromStorage();
    if (savedSettings) {
      const mergedSettings = { ...defaultSettings, ...savedSettings };
      setSiteSettings(mergedSettings);
      applySettings(mergedSettings);
    }
  }, [setSiteSettings]);

  const saveSiteSettings = () => {
    const success = saveSettingsToStorage(siteSettings);
    
    if (success) {
      // Apply the settings
      applySettings(siteSettings);
      
      // Reset unsaved changes flag
      setHasUnsavedChanges(false);
      
      toast({
        title: "Settings Saved Successfully!",
        description: `Site settings have been updated and applied.`,
      });

      console.log('Site settings saved and applied:', siteSettings);
    } else {
      toast({
        title: "Error Saving Settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ 
      siteSettings, 
      updateSiteName,
      updateContactEmail,
      updateMaintenanceMode,
      updateContactInfo,
      saveSiteSettings,
      hasUnsavedChanges
    }}>
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
