import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Clock, User, Phone, CreditCard } from "lucide-react";
import { FetchShipment } from "@/lib/pocketbase";

interface ShipmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: FetchShipment | null;
}

export const ShipmentDetails = ({ isOpen, onClose, shipment }: ShipmentDetailsProps) => {
  if (!shipment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Shipment Details - {shipment.trackingId}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Sender & Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" /> Sender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{shipment.senderName}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {shipment.senderPhone}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {shipment.senderAddress}, {shipment.senderCity}, {shipment.senderState}, {shipment.senderZip}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" /> Recipient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{shipment.recipientName}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {shipment.recipientPhone}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {shipment.recipientAddress}, {shipment.recipientCity}, {shipment.recipientState}, {shipment.recipientZip}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Package Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="h-4 w-4" /> Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{shipment.packageDescription}</p>
              <p className="text-sm text-muted-foreground">Weight: {shipment.weight} kg</p>
              <p className="text-sm text-muted-foreground">Dimensions: {shipment.length} x {shipment.width} x {shipment.height} in</p>
              <p className="text-sm text-muted-foreground">Value: ${shipment.value}</p>
            </CardContent>
          </Card>

          {/* Service & Cost Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Service & Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Service: {shipment.serviceType}</p>
              <p className="text-sm">Signature Required: {shipment.signatureRequired}</p>
              <p className="text-sm">Insurance: {shipment.insurance}</p>
              <p className="text-2xl font-bold mt-2">${shipment.cost.toFixed(2)}</p>
            </CardContent>
          </Card>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tracking ID</CardTitle>
              </CardHeader>
              <CardContent>{shipment.trackingId}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Created</CardTitle>
              </CardHeader>
              <CardContent>{shipment.created}</CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};