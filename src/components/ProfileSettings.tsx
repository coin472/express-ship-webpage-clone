
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileSettingsProps {
  profileData: ProfileData;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
}

export const ProfileSettings = ({ profileData, onInputChange, onSave }: ProfileSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={profileData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            value={profileData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            disabled 
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1 (555) 123-4567"
            value={profileData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Default Address</Label>
          <Input 
            id="address" 
            placeholder="123 Main St, City, State 12345"
            value={profileData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
          />
        </div>
        <Button onClick={onSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};
