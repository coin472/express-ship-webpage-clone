
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAdminModals = () => {
  const { toast } = useToast();
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);

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
      description: "Monthly report has been generated and will be emailed to you.",
    });
  };

  return {
    isShipmentFormOpen,
    setIsShipmentFormOpen,
    isNotificationDialogOpen,
    setIsNotificationDialogOpen,
    handleSendNotification,
    handleOpenNotificationDialog,
    handleCreateShipment,
    handleGenerateReport,
  };
};
