
import { useEffect, useState } from "react";
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
import { createShipment, FetchShipment, getUserShipments, pb, profileUpdate, ShipmentInput } from "@/lib/pocketbase";

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
  const { user, logout, changeUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<FetchShipment | null>(null);
  const [isShipmentDetailsOpen, setIsShipmentDetailsOpen] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone,
    address: user?.address || '',
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false
  });

  // Shipments state with ability to add new ones
  const [shipments, setShipments] = useState<FetchShipment[]>([]);

  // Statistics calculation
  const stats = {
    activeShipments: shipments.filter(s => s.status !== "Delivered").length,
    totalDeliveries: shipments.filter(s => s.status === "Delivered").length,
    monthlySpending: shipments.reduce((sum, shipment) => sum + (shipment.cost || 0), 0)
  };

    // useEffect to fetch shipment and assign
    useEffect(()=>{
    const fetchShipment = async ()=>{
      if(!user?.id){
        return
      }
      const records = await getUserShipments(user?.id)
      setShipments(records)
  
    }
    fetchShipment()
  },[user?.id])

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

  const handleShipmentSubmit = (shipmentData: ShipmentInput) => {
      const newShipment: ShipmentInput = {
      senderName: shipmentData.senderName,
      senderPhone: shipmentData.senderPhone,
      senderAddress: shipmentData.senderAddress,
      senderCity: shipmentData.senderCity,
      senderState: shipmentData.senderState,
      senderZip: shipmentData.senderZip,
      recipientName: shipmentData.recipientName,
      recipientPhone: shipmentData.recipientPhone,
      recipientAddress: shipmentData.recipientAddress,
      recipientCity: shipmentData.recipientCity,
      recipientState: shipmentData.recipientState,
      recipientZip: shipmentData.recipientZip,
      packageDescription: shipmentData.packageDescription,
      weight:shipmentData.weight,
      length:shipmentData.length,
      width:shipmentData.width,
      height:shipmentData.height,
      value:shipmentData.value,
      serviceType: shipmentData.serviceType,
      signatureRequired: shipmentData.signatureRequired,
      insurance: shipmentData.insurance,
      trackingId: shipmentData.trackingId,
      cost: shipmentData.cost,
      user: user.id,
      status: "processing",
      }
      createShipment(newShipment)

      toast({
        title: "Shipment Created Successfully!",
        description: `Tracking ID: ${shipmentData.trackingId} - Estimated cost: $${shipmentData.cost.toFixed(2)}`
      });
  };

  const handleShipmentClick = (shipment: FetchShipment) => {
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

  const handleSaveProfile = async () => {
    const currentUser = await profileUpdate(profileData.name,profileData.address,Number(profileData.phone),user?.id)
    changeUser(currentUser)
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
