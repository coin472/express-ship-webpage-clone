
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShipmentForm } from "@/components/ShipmentForm";
import { ShipmentDetails } from "@/components/ShipmentDetails";
import { DashboardStats } from "@/components/DashboardStats";
import { ShipmentsList } from "@/components/ShipmentsList";
import { ProfileSettings } from "@/components/ProfileSettings";
import { NotificationSettings } from "@/components/NotificationSettings";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { Navigate } from "react-router-dom";

interface Shipment {
  id: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
  trackingUpdates: Array<{
    status: string;
    time: string;
    location: string;
  }>;
  cost?: number;
  senderName?: string;
  recipientName?: string;
}

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isShipmentDetailsOpen, setIsShipmentDetailsOpen] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false
  });

  // Shipments state with ability to add new ones
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "ES123456789",
      destination: "New York, NY",
      status: "In Transit",
      estimatedDelivery: "Tomorrow, 3:00 PM",
      cost: 45.50,
      trackingUpdates: [
        { status: "Package received", time: "2 days ago", location: "Los Angeles, CA" },
        { status: "In transit", time: "1 day ago", location: "Phoenix, AZ" },
        { status: "Out for delivery", time: "Today, 8:00 AM", location: "New York, NY" }
      ]
    },
    {
      id: "ES987654321",
      destination: "Chicago, IL",
      status: "Delivered",
      estimatedDelivery: "Delivered yesterday",
      cost: 32.75,
      trackingUpdates: [
        { status: "Package received", time: "3 days ago", location: "Los Angeles, CA" },
        { status: "Delivered", time: "Yesterday, 2:30 PM", location: "Chicago, IL" }
      ]
    }
  ]);

  // Statistics calculation
  const stats = {
    activeShipments: shipments.filter(s => s.status !== "Delivered").length,
    totalDeliveries: shipments.filter(s => s.status === "Delivered").length,
    monthlySpending: shipments.reduce((sum, shipment) => sum + (shipment.cost || 0), 0)
  };

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const handleCreateShipment = () => {
    setIsShipmentFormOpen(true);
  };

  const handleShipmentSubmit = (shipmentData: any) => {
    console.log('Creating new shipment:', shipmentData);
    
    const newShipment: Shipment = {
      id: shipmentData.trackingId,
      destination: `${shipmentData.recipientCity}, ${shipmentData.recipientState}`,
      status: "Processing",
      estimatedDelivery: calculateEstimatedDelivery(shipmentData.serviceType),
      cost: shipmentData.cost,
      senderName: shipmentData.senderName,
      recipientName: shipmentData.recipientName,
      trackingUpdates: [
        { 
          status: "Package received", 
          time: "Just now", 
          location: `${shipmentData.senderCity}, ${shipmentData.senderState}` 
        }
      ]
    };

    setShipments(prev => [newShipment, ...prev]);
    
    toast({
      title: "Shipment Created Successfully!",
      description: `Tracking ID: ${shipmentData.trackingId} - Estimated cost: $${shipmentData.cost.toFixed(2)}`
    });
  };

  const handleShipmentClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsShipmentDetailsOpen(true);
  };

  const calculateEstimatedDelivery = (serviceType: string) => {
    const today = new Date();
    let deliveryDays = 0;
    
    switch (serviceType) {
      case "express":
        deliveryDays = 2;
        break;
      case "standard":
        deliveryDays = 4;
        break;
      case "economy":
        deliveryDays = 8;
        break;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated."
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <DashboardStats {...stats} />
      <ShipmentsList 
        shipments={shipments}
        onCreateShipment={handleCreateShipment}
        onShipmentClick={handleShipmentClick}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Manage your shipments and account settings</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64">
            <DashboardNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          <div className="flex-1">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "profile" && (
              <ProfileSettings
                profileData={profileData}
                onInputChange={handleInputChange}
                onSave={handleSaveProfile}
              />
            )}
            {activeTab === "notifications" && (
              <NotificationSettings
                notifications={notifications}
                onNotificationChange={handleNotificationChange}
                onSave={handleSaveNotifications}
              />
            )}
          </div>
        </div>
      </main>

      <ShipmentForm
        isOpen={isShipmentFormOpen}
        onClose={() => setIsShipmentFormOpen(false)}
        onSubmit={handleShipmentSubmit}
      />

      <ShipmentDetails
        isOpen={isShipmentDetailsOpen}
        onClose={() => setIsShipmentDetailsOpen(false)}
        shipment={selectedShipment}
      />

      <Footer />
    </div>
  );
};

export default UserDashboard;
