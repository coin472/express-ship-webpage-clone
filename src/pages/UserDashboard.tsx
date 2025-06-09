
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Mock user data
  const [shipments] = useState([
    {
      id: "ES123456789",
      destination: "New York, NY",
      status: "In Transit",
      estimatedDelivery: "Tomorrow, 3:00 PM",
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
      trackingUpdates: [
        { status: "Package received", time: "3 days ago", location: "Los Angeles, CA" },
        { status: "Delivered", time: "Yesterday, 2:30 PM", location: "Chicago, IL" }
      ]
    }
  ]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold">2</p>
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
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">$245</p>
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
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold">{shipment.id}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {shipment.destination}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    shipment.status === 'Delivered' ? 'text-green-600' : 
                    shipment.status === 'In Transit' ? 'text-blue-600' : 'text-yellow-600'
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
          <Input id="name" defaultValue={user.name} />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue={user.email} disabled />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <Label htmlFor="address">Default Address</Label>
          <Input id="address" placeholder="123 Main St, City, State 12345" />
        </div>
        <Button>Save Changes</Button>
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
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">SMS Notifications</p>
            <p className="text-sm text-muted-foreground">Get text updates for delivery status</p>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Marketing Updates</p>
            <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
          </div>
          <input type="checkbox" className="h-4 w-4" />
        </div>
        <Button>Save Preferences</Button>
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

      <Footer />
    </div>
  );
};

export default UserDashboard;
