
import { AdminDashboard } from "./AdminDashboard";
import { UserManagement } from "./UserManagement";
import { ShipmentManagement } from "./ShipmentManagement";
import { ReportGenerator } from "./ReportGenerator";
import { AdminSettings } from "./AdminSettings";
import { ExpressUser, FetchShipment } from "@/lib/pocketbase";

interface Stats {
  totalUsers: number;
  activeShipments: number;
  revenue: number;
  deliveryRate: number;
}

interface AdminContentProps {
  activeTab: string;
  stats: Stats;
  users: ExpressUser[];
  shipments: FetchShipment[];
  onOpenNotificationDialog: () => void;
  onCreateShipment: () => void;
  onGenerateReport: () => void;
  onEditUser: (userId: string, updates: Partial<ExpressUser>) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: (email: string, password: string, confirmPassword: string, name: string) => void;
  onRestrictUser: (userId: string) => void;
  onUnrestrictUser: (userId: string) => void;
  onUpdateShipment: (shipmentId: string) => void;
}

const reportData = {
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
};

export const AdminContent = ({
  activeTab,
  stats,
  users,
  shipments,
  onOpenNotificationDialog,
  onCreateShipment,
  onGenerateReport,
  onEditUser,
  onDeleteUser,
  onAddUser,
  onRestrictUser,
  onUnrestrictUser,
  onUpdateShipment,
}: AdminContentProps) => {
  switch (activeTab) {
    case "dashboard":
      return (
        <AdminDashboard
          stats={stats}
          onOpenNotificationDialog={onOpenNotificationDialog}
          onCreateShipment={onCreateShipment}
          onGenerateReport={onGenerateReport}
        />
      );
    case "users":
      return (
        <UserManagement
          users={users}
          onEditUser={onEditUser}
          onDeleteUser={onDeleteUser}
          onAddUser={onAddUser}
          onRestrictUser={onRestrictUser}
          onUnrestrictUser={onUnrestrictUser}
        />
      );
    case "shipments":
      return (
        <ShipmentManagement
          shipments={shipments}
          onUpdateShipment={onUpdateShipment}
        />
      );
    case "reports":
      return (
        <ReportGenerator
          reportData={reportData}
          onGenerateReport={onGenerateReport}
        />
      );
    case "settings":
      return <AdminSettings />;
    default:
      return null;
  }
};
