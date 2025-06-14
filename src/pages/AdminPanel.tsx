
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShipmentForm } from "@/components/ShipmentForm";
import { SystemNotificationDialog } from "@/components/SystemNotificationDialog";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { ShipmentManagement } from "@/components/admin/ShipmentManagement";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
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
            <AdminSidebar 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="flex-1">
              {activeTab === "dashboard" && (
                <AdminDashboard 
                  stats={stats}
                  onOpenNotificationDialog={handleOpenNotificationDialog}
                  onCreateShipment={handleCreateShipment}
                  onGenerateReport={handleGenerateReport}
                />
              )}
              {activeTab === "users" && (
                <UserManagement 
                  users={users}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  onAddUser={handleAddUser}
                />
              )}
              {activeTab === "shipments" && (
                <ShipmentManagement 
                  shipments={shipments}
                  onUpdateShipment={handleUpdateShipment}
                />
              )}
              {activeTab === "settings" && (
                <AdminSettings 
                  siteSettings={siteSettings}
                  onSettingChange={handleSettingChange}
                  onSaveSettings={handleSaveSettings}
                />
              )}
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
