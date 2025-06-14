
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Plus } from "lucide-react";

interface Shipment {
  id: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
  trackingUpdates: Array<{
    status: string;
    time: string;
    location: string;
  }>;
  cost?: number;
  senderName?: string;
  recipientName?: string;
}

interface ShipmentsListProps {
  shipments: Shipment[];
  onCreateShipment: () => void;
  onShipmentClick: (shipment: Shipment) => void;
}

export const ShipmentsList = ({ shipments, onCreateShipment, onShipmentClick }: ShipmentsListProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Shipments</CardTitle>
          <Button onClick={onCreateShipment} className="bg-red-600 hover:bg-red-700">
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
                  <p className="font-semibold">{shipment.id}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shipment.destination}
                  </p>
                  {shipment.cost && (
                    <p className="text-sm text-muted-foreground">
                      Cost: ${shipment.cost.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  shipment.status === 'Delivered' ? 'text-green-600' : 
                  shipment.status === 'In Transit' ? 'text-blue-600' : 
                  shipment.status === 'Processing' ? 'text-orange-600' : 'text-yellow-600'
                }`}>
                  {shipment.status}
                </p>
                <p className="text-sm text-muted-foreground">{shipment.estimatedDelivery}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
