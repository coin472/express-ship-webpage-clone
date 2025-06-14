
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Clock, User, Phone, CreditCard } from "lucide-react";

interface TrackingUpdate {
  status: string;
  time: string;
  location: string;
}

interface ShipmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: {
    id: string;
    destination: string;
    status: string;
    estimatedDelivery: string;
    trackingUpdates: TrackingUpdate[];
    cost?: number;
    senderName?: string;
    recipientName?: string;
  } | null;
}

export const ShipmentDetails = ({ isOpen, onClose, shipment }: ShipmentDetailsProps) => {
  if (!shipment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Shipment Details - {shipment.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(shipment.status)}>
              {shipment.status}
            </Badge>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-semibold">{shipment.estimatedDelivery}</p>
            </div>
          </div>

          {/* Shipment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{shipment.senderName || 'N/A'}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Origin Location
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Recipient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{shipment.recipientName || 'N/A'}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {shipment.destination}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cost Information */}
          {shipment.cost && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Shipping Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${shipment.cost.toFixed(2)}</p>
              </CardContent>
            </Card>
          )}

          {/* Tracking Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Tracking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipment.trackingUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    {index !== shipment.trackingUpdates.length - 1 && (
                      <div className="absolute left-2 top-6 w-0.5 h-8 bg-gray-200" />
                    )}
                    <div className="w-4 h-4 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{update.status}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {update.location}
                      </p>
                      <p className="text-xs text-muted-foreground">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
