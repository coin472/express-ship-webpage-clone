
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
}

interface AdminSettingsProps {
  siteSettings: SiteSettings;
  onSettingChange: (field: string, value: string | boolean) => void;
  onSaveSettings: () => void;
}

export const AdminSettings = ({ siteSettings, onSettingChange, onSaveSettings }: AdminSettingsProps) => {
  const form = useForm<SiteSettings>({
    defaultValues: siteSettings,
  });

  // Update form when siteSettings change
  useEffect(() => {
    form.reset(siteSettings);
  }, [siteSettings, form]);

  const onSubmit = (data: SiteSettings) => {
    console.log('Saving settings:', data);
    
    // Update each setting
    onSettingChange('siteName', data.siteName);
    onSettingChange('contactEmail', data.contactEmail);
    onSettingChange('maintenanceMode', data.maintenanceMode);
    
    // Save the settings
    onSaveSettings();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Website Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="siteName"
                rules={{ 
                  required: "Site name is required",
                  minLength: { value: 1, message: "Site name must not be empty" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter site name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                rules={{ 
                  required: "Contact email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter contact email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Maintenance Mode</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Enable maintenance mode to show a maintenance page to visitors
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
