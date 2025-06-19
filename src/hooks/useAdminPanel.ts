
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
import { ShipmentData } from "@/components/ShipmentForm";

interface Stats {
  totalUsers: number;
  activeShipments: number;
  revenue: number;
  deliveryRate: number;
}

export const useAdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<ExpressUser[]>([]);
  const [shipments, setShipments] = useState<FetchShipment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    revenue: 0,
    activeShipments: 0,
    deliveryRate: 0
  });

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

  const handleShipmentSubmit = useCallback(
    async (shipmentData: ShipmentData) => {
      const currentUser = user;
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
        weight: shipmentData.weight,
        length: shipmentData.length,
        width: shipmentData.width,
        height: shipmentData.height,
        value: shipmentData.value,
        serviceType: shipmentData.serviceType,
        signatureRequired: shipmentData.signatureRequired,
        insurance: shipmentData.insurance,
        trackingId: shipmentData.trackingId,
        user: currentUser.id,
        cost: shipmentData.cost,
        status: "processing",
      };
      const record = AdminCreateShipment(newShipment);
      if (!record) {
        toast({
          title: "Shipment not Created!",
          description: `Failed try again`,
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Shipment Created Successfully!",
        description: `Tracking ID: ${shipmentData.trackingId} - Estimated cost: $${shipmentData.cost.toFixed(2)}`
      });
    },
    [toast, user]
  );

  const changeStatus = (status: string | "processing") => {
    if (status === "processing") {
      return "in transit";
    } else if (status === "in transit") {
      return "delivered";
    } else if (status === "delivered") {
      return "processing";
    } else {
      return "processing";
    }
  };

  const handleUpdateShipment = useCallback(
    async (shipmentId: string) => {
      const shipment = shipments.find((s) => s?.id === shipmentId);
      const status: string = changeStatus(shipment?.status || "processing");
      const records = await pb.collection('shipments').update(shipmentId, {
        ...shipment,
        status
      });
      if (records) {
        toast({
          title: "Shipment Updated",
          description: `Shipment ${shipmentId} status changed to ${status}`,
        });
      }
    }, [shipments, toast]);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      const user = users?.find(user => user?.id === userId);
      if (!user) {
        toast({
          title: "Delete Failed",
          description: `User can not found`,
          variant: 'destructive'
        });
        return;
      }
      const record = await pb.collection("expressUsers").delete(userId);
      if (!record) {
        toast({
          title: "failed",
          description: `${user.name} not succesfully deleted`,
          variant: "destructive"
        });
      }
      if (record) {
        toast({
          title: "User Deleted",
          description: `User ${user?.name} has been removed.`,
          variant: "destructive",
        });
      }
    }, [toast, users]
  );

  const handleEditUser = (userId: string, updates: Partial<ExpressUser>) => {
    console.log("Updating user:", userId, updates);
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
    toast({
      title: "User Updated",
      description: `User information has been updated successfully.`,
    });
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
    const user = users;
    const shipment = shipments;
    setStats({
      totalUsers: user.length,
      revenue: shipments.reduce((acct, item) => acct + item.cost, 0),
      deliveryRate: 98.5,
      activeShipments: shipment.length,
    });
  }, [handleAddUser, handleShipmentSubmit, handleUpdateShipment, handleDeleteUser, shipments, users]);

  return {
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
  };
};
