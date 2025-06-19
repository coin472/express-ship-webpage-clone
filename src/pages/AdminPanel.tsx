import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShipmentData, ShipmentForm } from "@/components/ShipmentForm";
import { SystemNotificationDialog } from "@/components/SystemNotificationDialog";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { ShipmentManagement } from "@/components/admin/ShipmentManagement";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ReportGenerator } from "@/components/admin/ReportGenerator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  AdminCreateShipment,
  ExpressUser,
  FetchShipment,
  getShipments,
  getUsers,
  pb,
  ShipmentInput,
  signUp,
} from "@/lib/pocketbase";

interface Stats{
    totalUsers: number,
    activeShipments: number,
    revenue: number,
    deliveryRate: number,
}
const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const { siteSettings, updateSiteSettings, saveSiteSettings } =
    useSiteSettings();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const [users, setUsers] = useState<ExpressUser[]>([]);

  const handleAddUser = useCallback(
    async (
      email: string,
      password: string,
      confirmPassword: string,
      name: string
    ) => {
      const newUser = await signUp(email, password, confirmPassword, name);
      if (newUser) {
        toast({
          title: "User Added",
          description: "New user has been added to the system.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add user",
        });
      }
    },
    [toast]
  );
  const [shipments, setShipments] = useState<FetchShipment[]>([]);

  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    revenue: 0,
    activeShipments: 0,
    deliveryRate: 0
  });

  // Mock report data
  const [reportData] = useState({
    shipmentsByStatus: [
      { name: "Delivered", value: 45, color: "#10b981" },
      { name: "In Transit", value: 30, color: "#3b82f6" },
      { name: "Processing", value: 25, color: "#f59e0b" },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 12000 },
      { month: "Feb", revenue: 15000 },
      { month: "Mar", revenue: 18000 },
      { month: "Apr", revenue: 22000 },
      { month: "May", revenue: 25000 },
      { month: "Jun", revenue: 28000 },
    ],
    userActivity: [
      { category: "New Registrations", count: 45 },
      { category: "Active Shipments", count: 67 },
      { category: "Support Tickets", count: 23 },
      { category: "Feedback Submissions", count: 12 },
    ],
    summary: {
      totalShipments: 567,
      totalRevenue: 45200,
      totalUsers: 1234,
      deliveryRate: 98.5,
    },
  });

const handleShipmentSubmit = useCallback(
  async (shipmentData: ShipmentData) => {
    const currentUser = user
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
      user: currentUser.id,
      cost: shipmentData.cost,
      status: "processing",
      }
      const record = AdminCreateShipment(newShipment)
      if(!record){
        toast({
          title: "Shipment not Created!",
          description: `Failed try again`,
          variant: "destructive"
        });
        return
      }
      toast({
        title: "Shipment Created Successfully!",
        description: `Tracking ID: ${shipmentData.trackingId} - Estimated cost: $${shipmentData.cost.toFixed(2)}`
      });
  },
  [toast,user]
);

  // Mock data with state management

  const handleSendNotification = (notification: {
    title: string;
    message: string;
    type: string;
  }) => {
    console.log("Sending system notification:", notification);
    toast({
      title: "Notification Sent Successfully!",
      description: `"${notification.title}" has been sent to all users.`,
    });
  };

  const handleOpenNotificationDialog = () => {
    console.log("Opening notification dialog");
    setIsNotificationDialogOpen(true);
  };

  const handleCreateShipment = () => {
    console.log("Opening shipment creation form");
    setIsShipmentFormOpen(true);
  };

  const handleGenerateReport = () => {
    console.log("Generating report");
    toast({
      title: "Report Generated",
      description:
        "Monthly report has been generated and will be emailed to you.",
    });
  };

  const handleEditUser = (
    userId: string,
    updates: Partial<ExpressUser>
  ) => {
    console.log("Updating user:", userId, updates);
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
    toast({
      title: "User Updated",
      description: `User information has been updated successfully.`,
    });
  };

  const handleDeleteUser = useCallback(
    async (userId: string) => {
    const user = users?.find(user => user?.id === userId)
    if(!user){
      toast({
        title: "Delete Failed",
        description: `User can not found`,
        variant: 'destructive'
      })
      return 
    }
    const record = await pb.collection("expressUsers").delete(userId)
    if(!record){
      toast({
        title: "failed",
        description: `${user.name} not succesfully deleted`,
        variant: "destructive"
      })
    }
    if(record){
        toast({
          title: "User Deleted",
          description: `User ${user?.name} has been removed.`,
          variant: "destructive",
        });
    }
  },[toast,users]
  )

  const changeStatus = (status: string|"processing")=>{
    if(status==="processing"){
      return "in transit"
    }else if(status==="in transit"){
      return "delivered"
    }else if(status === "delivered"){
      return "processing"
    }else{
      return "processing"
    }
  }
  const handleUpdateShipment =useCallback(
    async (shipmentId: string) => {
      const shipment = shipments.find((s) => s?.id === shipmentId);
      const status: string = changeStatus(shipment?.status||"processing")
      const records =  await pb.collection('shipments').update(shipmentId,{
        ...shipment,
        status
      })
      if(records){
        toast({
          title: "Shipment Updated",
          description: `Shipment ${shipmentId} status changed to ${status}`,
        });
  
      }
    },[shipments,toast])

  const handleSaveSettings = () => {
    saveSiteSettings();
  };

  const handleSettingChange = (field: string, value: string | boolean) => {
    if (field.startsWith('contactInfo.')) {
      // Handle nested contactInfo updates
      const keys = field.split('.');
      const section = keys[1]; // e.g., 'headquarters', 'phoneNumbers'
      const property = keys[2]; // e.g., 'address', 'customerService'
      
      updateSiteSettings({
        contactInfo: {
          ...siteSettings.contactInfo,
          [section]: {
            ...siteSettings.contactInfo[section as keyof typeof siteSettings.contactInfo],
            [property]: value
          }
        }
      });
    } else {
      updateSiteSettings({ [field]: value });
    }
  };

  const handleRestrictUser = (userId: string) => {
    console.log("Restricting user:", userId);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "restricted" } : user
      )
    );
    toast({
      title: "User Restricted",
      description: "User access has been restricted.",
      variant: "destructive",
    });
  };

  const handleUnrestrictUser = (userId: string) => {
    console.log("Unrestricting user:", userId);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "active" } : user
      )
    );
    toast({
      title: "User Unrestricted",
      description: "User access has been restored.",
    });
  };

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
    getShipments().then((shipments) => {
      setShipments(shipments);
    });
    const user = users
    const shipment = shipments
    setStats({
      totalUsers: user.length,
      revenue: shipments.reduce((acct,item)=>acct + item.cost, 0),
      deliveryRate: 98.5,
      activeShipments: shipment.length,
    })
  }, [handleAddUser, handleShipmentSubmit,handleUpdateShipment,handleDeleteUser,shipments,users]);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
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
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

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
                  onRestrictUser={handleRestrictUser}
                  onUnrestrictUser={handleUnrestrictUser}
                />
              )}
              {activeTab === "shipments" && (
                <ShipmentManagement
                  shipments={shipments}
                  onUpdateShipment={handleUpdateShipment}
                />
              )}
              {activeTab === "reports" && (
                <ReportGenerator
                  reportData={reportData}
                  onGenerateReport={handleGenerateReport}
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
