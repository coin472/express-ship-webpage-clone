
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactInfoSettings } from "./ContactInfoSettings";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export const AdminSettings = () => {
  const { 
    siteSettings, 
    updateSiteName,
    updateContactEmail,
    updateMaintenanceMode,
    updateContactInfo,
    saveSiteSettings,
    hasUnsavedChanges
  } = useSiteSettings();

  const form = useForm({
    defaultValues: {
      siteName: siteSettings.siteName,
      contactEmail: siteSettings.contactEmail,
      maintenanceMode: siteSettings.maintenanceMode,
    },
  });

  // Update form when siteSettings change
  useEffect(() => {
    form.reset({
      siteName: siteSettings.siteName,
      contactEmail: siteSettings.contactEmail,
      maintenanceMode: siteSettings.maintenanceMode,
    });
  }, [siteSettings, form]);

  const onSubmit = (data: any) => {
    console.log('Saving general settings:', data);
    saveSiteSettings();
  };

  const handleContactInfoChange = (section: string, field: string, value: string) => {
    updateContactInfo(section, field, value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Website Settings</h2>
        {hasUnsavedChanges && (
          <span className="text-sm text-amber-600 font-medium">
            You have unsaved changes
          </span>
        )}
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
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
                          <Input 
                            {...field} 
                            placeholder="Enter site name"
                            onChange={(e) => {
                              field.onChange(e);
                              updateSiteName(e.target.value);
                            }}
                          />
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
                          <Input 
                            {...field} 
                            type="email" 
                            placeholder="Enter contact email"
                            onChange={(e) => {
                              field.onChange(e);
                              updateContactEmail(e.target.value);
                            }}
                          />
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
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              updateMaintenanceMode(checked);
                            }}
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
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="space-y-6">
            <ContactInfoSettings
              contactInfo={siteSettings.contactInfo}
              onContactInfoChange={handleContactInfoChange}
            />
            
            <Button onClick={saveSiteSettings} className="w-full">
              Save Contact Information
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
