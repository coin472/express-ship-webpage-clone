
import { SiteSettings } from '@/types/siteSettings';

export const applySettings = (settings: SiteSettings) => {
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

export const loadSettingsFromStorage = () => {
  const savedSettings = localStorage.getItem('siteSettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (error) {
      console.error('Error loading site settings:', error);
      return null;
    }
  }
  return null;
};

export const saveSettingsToStorage = (settings: SiteSettings) => {
  try {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving site settings:', error);
    return false;
  }
};
