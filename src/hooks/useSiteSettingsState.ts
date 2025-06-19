
import { useState } from 'react';
import { SiteSettings } from '@/types/siteSettings';
import { defaultSettings } from '@/constants/defaultSiteSettings';

export const useSiteSettingsState = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateSiteName = (value: string) => {
    setSiteSettings(prev => ({ ...prev, siteName: value }));
    setHasUnsavedChanges(true);
  };

  const updateContactEmail = (value: string) => {
    setSiteSettings(prev => ({ ...prev, contactEmail: value }));
    setHasUnsavedChanges(true);
  };

  const updateMaintenanceMode = (value: boolean) => {
    setSiteSettings(prev => ({ ...prev, maintenanceMode: value }));
    setHasUnsavedChanges(true);
  };

  const updateContactInfo = (section: string, field: string, value: string) => {
    setSiteSettings(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [section]: {
          ...prev.contactInfo[section as keyof typeof prev.contactInfo],
          [field]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  return {
    siteSettings,
    setSiteSettings,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    updateSiteName,
    updateContactEmail,
    updateMaintenanceMode,
    updateContactInfo,
  };
};
