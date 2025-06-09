
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Mail,
  Truck,
  DollarSign,
  Activity
} from "lucide-react";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // Mock data
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "user", status: "inactive" },
  ]);

  const [shipments] = useState([
    { id: "ES123456789", customer: "John Doe", destination: "New York", status: "In Transit", date: "2024-01-15" },
    { id: "ES987654321", customer: "Jane Smith", destination: "Los Angeles", status: "Delivered", date: "2024-01-14" },
    { id: "ES456789123", customer: "Bob Wilson", destination: "Chicago", status: "Processing", date: "2024-01-16" },
  ]);

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "System-wide notification has been sent to all users."
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold">567</p>
              </div>
              <Package className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$45.2K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <Activity className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Package className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New shipment created</p>
                  <p className="text-xs text-muted-foreground">ES123456789 - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">john.doe@email.com - 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Truck className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Package delivered</p>
                  <p className="text-xs text-muted-foreground">ES987654321 - 10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSendNotification} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send System Notification
            </Button>
            <Button variant="outline" className="w-full">
              <Package className="mr-2 h-4 w-4" />
              Create New Shipment
            </Button>
            <Button variant="outline" className="w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderShipmentManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-name">Site Name</Label>
            <Input id="site-name" defaultValue="ExpressShip" />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" defaultValue="info@expressship.com" />
          </div>
          <div>
            <Label htmlFor="maintenance">Maintenance Mode</Label>
            <select className="w-full p-2 border rounded">
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "shipments", label: "Shipments", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="mr-2 h-6 w-6 text-red-600" />
            <h1 className="text-3xl font-bold">Admin Control Panel</h1>
          </div>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
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
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "users" && renderUserManagement()}
            {activeTab === "shipments" && renderShipmentManagement()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;
