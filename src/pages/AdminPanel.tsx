
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShipmentForm } from "@/components/ShipmentForm";
import { SystemNotificationDialog } from "@/components/SystemNotificationDialog";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminContent } from "@/components/admin/AdminContent";
import { useAdminPanel } from "@/hooks/useAdminPanel";
import { useAdminModals } from "@/hooks/useAdminModals";

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const {
    users,
    shipments,
    stats,
    handleAddUser,
    handleShipmentSubmit,
    handleUpdateShipment,
    handleDeleteUser,
    handleEditUser,
    handleRestrictUser,
    handleUnrestrictUser,
  } = useAdminPanel();

  const {
    isShipmentFormOpen,
    setIsShipmentFormOpen,
    isNotificationDialogOpen,
    setIsNotificationDialogOpen,
    handleSendNotification,
    handleOpenNotificationDialog,
    handleCreateShipment,
    handleGenerateReport,
  } = useAdminModals();

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <>
      <AdminLayout
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <AdminContent
          activeTab={activeTab}
          stats={stats}
          users={users}
          shipments={shipments}
          onOpenNotificationDialog={handleOpenNotificationDialog}
          onCreateShipment={handleCreateShipment}
          onGenerateReport={handleGenerateReport}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onAddUser={handleAddUser}
          onRestrictUser={handleRestrictUser}
          onUnrestrictUser={handleUnrestrictUser}
          onUpdateShipment={handleUpdateShipment}
        />
      </AdminLayout>

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
