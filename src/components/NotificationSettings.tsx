
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

interface NotificationSettingsProps {
  notifications: NotificationPreferences;
  onNotificationChange: (field: string, value: boolean) => void;
  onSave: () => void;
}

export const NotificationSettings = ({ notifications, onNotificationChange, onSave }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-muted-foreground">Receive updates about your shipments</p>
          </div>
          <input 
            type="checkbox" 
            checked={notifications.email}
            onChange={(e) => onNotificationChange('email', e.target.checked)}
            className="h-4 w-4" 
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">SMS Notifications</p>
            <p className="text-sm text-muted-foreground">Get text updates for delivery status</p>
          </div>
          <input 
            type="checkbox" 
            checked={notifications.sms}
            onChange={(e) => onNotificationChange('sms', e.target.checked)}
            className="h-4 w-4" 
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Marketing Updates</p>
            <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
          </div>
          <input 
            type="checkbox" 
            checked={notifications.marketing}
            onChange={(e) => onNotificationChange('marketing', e.target.checked)}
            className="h-4 w-4" 
          />
        </div>
        <Button onClick={onSave}>Save Preferences</Button>
      </CardContent>
    </Card>
  );
};
