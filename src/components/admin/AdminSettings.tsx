
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: string;
}

interface AdminSettingsProps {
  siteSettings: SiteSettings;
  onSettingChange: (field: string, value: string) => void;
  onSaveSettings: () => void;
}

export const AdminSettings = ({ siteSettings, onSettingChange, onSaveSettings }: AdminSettingsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Website Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-name">Site Name</Label>
            <Input 
              id="site-name" 
              value={siteSettings.siteName}
              onChange={(e) => onSettingChange('siteName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input 
              id="contact-email" 
              value={siteSettings.contactEmail}
              onChange={(e) => onSettingChange('contactEmail', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maintenance">Maintenance Mode</Label>
            <select 
              id="maintenance"
              value={siteSettings.maintenanceMode}
              onChange={(e) => onSettingChange('maintenanceMode', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
          <Button onClick={onSaveSettings}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};
