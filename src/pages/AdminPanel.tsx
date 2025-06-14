import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShipmentForm } from "@/components/ShipmentForm";
import { SystemNotificationDialog } from "@/components/SystemNotificationDialog";
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
  Activity,
  Edit,
  Trash2,
  UserPlus
} from "lucide-react";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // Mock data with state management
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "user", status: "inactive" },
  ]);

  const [shipments, setShipments] = useState([
    { id: "ES123456789", customer: "John Doe", destination: "New York", status: "In Transit", date: "2024-01-15" },
    { id: "ES987654321", customer: "Jane Smith", destination: "Los Angeles", status: "Delivered", date: "2024-01-14" },
    { id: "ES456789123", customer: "Bob Wilson", destination: "Chicago", status: "Processing", date: "2024-01-16" },
  ]);

  const [siteSettings, setSiteSettings] = useState({
    siteName: "ExpressShip",
    contactEmail: "info@expressship.com",
    maintenanceMode: "off"
  });

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 1234,
    activeShipments: 567,
    revenue: 45200,
    deliveryRate: 98.5
  });

  const handleSendNotification = (notification: { title: string; message: string; type: string }) => {
    console.log('Sending system notification:', notification);
    toast({
      title: "Notification Sent Successfully!",
      description: `"${notification.title}" has been sent to all users.`
    });
  };

  const handleOpenNotificationDialog = () => {
    console.log('Opening notification dialog');
    setIsNotificationDialogOpen(true);
  };

  const handleCreateShipment = () => {
    console.log('Opening shipment creation form');
    setIsShipmentFormOpen(true);
  };

  const handleShipmentSubmit = (shipmentData: any) => {
    console.log('New shipment created by admin:', shipmentData);
    
    // Add the new shipment to the shipments list
    const newShipment = {
      id: shipmentData.trackingId,
      customer: shipmentData.senderName,
      destination: `${shipmentData.recipientCity}, ${shipmentData.recipientState}`,
      status: "Processing",
      date: new Date().toISOString().split('T')[0]
    };
    
    setShipments(prev => [newShipment, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      activeShipments: prev.activeShipments + 1,
      revenue: prev.revenue + shipmentData.cost
    }));

    toast({
      title: "Shipment Created Successfully!",
      description: `Admin created shipment ${shipmentData.trackingId} - Cost: $${shipmentData.cost.toFixed(2)}`
    });
  };

  const handleGenerateReport = () => {
    console.log('Generating report');
    toast({
      title: "Report Generated",
      description: "Monthly report has been generated and will be emailed to you."
    });
  };

  const handleEditUser = (userId: number) => {
    console.log('Editing user:', userId);
    const user = users.find(u => u.id === userId);
    toast({
      title: "Edit User",
      description: `Editing user: ${user?.name}`
    });
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Deleting user:', userId);
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: `User ${user?.name} has been removed.`,
      variant: "destructive"
    });
  };

  const handleAddUser = () => {
    console.log('Adding new user');
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: "newuser@example.com",
      role: "user",
      status: "active"
    };
    setUsers([...users, newUser]);
    toast({
      title: "User Added",
      description: "New user has been added to the system."
    });
  };

  const handleUpdateShipment = (shipmentId: string) => {
    console.log('Updating shipment:', shipmentId);
    const shipment = shipments.find(s => s.id === shipmentId);
    
    // Cycle through statuses
    const statusCycle = ["Processing", "In Transit", "Delivered"];
    const currentIndex = statusCycle.indexOf(shipment?.status || "Processing");
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    
    setShipments(shipments.map(s => 
      s.id === shipmentId ? { ...s, status: nextStatus } : s
    ));
    
    toast({
      title: "Shipment Updated",
      description: `Shipment ${shipmentId} status changed to ${nextStatus}`
    });
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', siteSettings);
    toast({
      title: "Settings Saved",
      description: "Website settings have been updated successfully."
    });
  };

  const handleSettingChange = (field: string, value: string) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">{stats.activeShipments}</p>
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
                <p className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(1)}K</p>
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
                <p className="text-2xl font-bold">{stats.deliveryRate}%</p>
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
            <Button onClick={handleOpenNotificationDialog} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send System Notification
            </Button>
            <Button onClick={handleCreateShipment} variant="outline" className="w-full">
              <Package className="mr-2 h-4 w-4" />
              Create New Shipment
            </Button>
            <Button onClick={handleGenerateReport} variant="outline" className="w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
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
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleEditUser(user.id)}
                        variant="outline" 
                        size="sm"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteUser(user.id)}
                        variant="outline" 
                        size="sm"
                        className="text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderShipmentManagement = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Shipment Management</h2>
      
      <Card>
        <CardContent className="p-0">
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
                  <TableCell className="font-mono">{shipment.id}</TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shipment.status}
                    </span>
                  </TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleUpdateShipment(shipment.id)}
                      variant="outline" 
                      size="sm"
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
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
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input 
              id="contact-email" 
              value={siteSettings.contactEmail}
              onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maintenance">Maintenance Mode</Label>
            <select 
              id="maintenance"
              value={siteSettings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
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
    <>
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

      <ShipmentForm
        isOpen={isShipmentFormOpen}
        onClose={() => setIsShipmentFormOpen(false)}
        onSubmit={handleShipmentSubmit}
      />

      <SystemNotificationDialog
        isOpen={isNotificationDialogOpen}
        onClose={() => setIsNotificationDialogOpen(false)}
        onSend={handleSendNotification}
      />
    </>
  );
};

export default AdminPanel;
