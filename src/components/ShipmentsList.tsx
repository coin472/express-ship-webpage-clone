import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { FetchShipment, ShipmentInput } from "@/lib/pocketbase";

interface ShipmentsListProps {
  shipments: FetchShipment[];
  onCreateShipment: () => void;
  onShipmentClick: (shipment: ShipmentInput | FetchShipment) => void;
}

export const ShipmentsList = ({
  shipments,
  onCreateShipment,
  onShipmentClick,
}: ShipmentsListProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Shipments</CardTitle>
          <Button
            onClick={onCreateShipment}
            className="bg-red-600 hover:bg-red-700"
          >
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
              onClick={() => onShipmentClick(shipment)}
            >
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold">
                    {shipment.senderName} → {shipment.recipientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    From: {shipment.senderCity}, {shipment.senderState}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    To: {shipment.recipientCity}, {shipment.recipientState}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Package: {shipment.packageDescription} ({shipment.weight}kg, ${shipment.value})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Service: {shipment.serviceType}
                    {shipment.signatureRequired === "true" && " | Signature Required"}
                    {shipment.insurance === "true" && " | Insured"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Tracking ID: {shipment.trackingId} | Cost: ${shipment.cost}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};