import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShipmentForm } from "@/components/ShipmentForm";
import { ShipmentDetails } from "@/components/ShipmentDetails";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Package, 
  Clock, 
  MapPin, 
  Bell,
  CreditCard,
  Settings,
  LogOut,
  Plus
} from "lucide-react";
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold">{stats.activeShipments}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
                <p className="text-2xl font-bold">{stats.totalDeliveries}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${stats.monthlySpending.toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Shipments</CardTitle>
            <Button onClick={handleCreateShipment} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipments.map((shipment) => (
              <div 
                key={shipment.id} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleShipmentClick(shipment)}
              >
                <div className="flex items-center space-x-4">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold">{shipment.id}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {shipment.destination}
                    </p>
                    {shipment.cost && (
                      <p className="text-sm text-muted-foreground">
                        Cost: ${shipment.cost.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    shipment.status === 'Delivered' ? 'text-green-600' : 
                    shipment.status === 'In Transit' ? 'text-blue-600' : 
                    shipment.status === 'Processing' ? 'text-orange-600' : 'text-yellow-600'
                  }`}>
                    {shipment.status}
                  </p>
                  <p className="text-sm text-muted-foreground">{shipment.estimatedDelivery}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
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
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled 
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1 (555) 123-4567"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Default Address</Label>
          <Input 
            id="address" 
            placeholder="123 Main St, City, State 12345"
            value={profileData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>
        <Button onClick={handleSaveProfile}>Save Changes</Button>
      </CardContent>
    </Card>
  );

  const renderNotifications = () => (
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
            onChange={(e) => handleNotificationChange('email', e.target.checked)}
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
            onChange={(e) => handleNotificationChange('sms', e.target.checked)}
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
            onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
            className="h-4 w-4" 
          />
        </div>
        <Button onClick={handleSaveNotifications}>Save Preferences</Button>
      </CardContent>
    </Card>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "profile", label: "Profile", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

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
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "notifications" && renderNotifications()}
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
