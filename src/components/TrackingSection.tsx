import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Truck, Box } from "lucide-react";
import { TrackingInput } from "./ui/tracking-input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FetchShipment } from "@/lib/pocketbase";

interface TrackingSectionProps {
  shipment?: FetchShipment | null;
}

export const TrackingSection = ({ shipment }: TrackingSectionProps) => {
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTrack = (trackingNumber: string) => {
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      navigate(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
      toast({
        title: "Redirecting",
        description: "Taking you to the tracking page..."
      });
    }, 1000);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Track Your Package</h2>
            <p className="text-xl text-muted-foreground">
              Enter your tracking number to get real-time updates on your shipment
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Package Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrackingInput
                onTrack={handleTrack}
                isTracking={isTracking}
                placeholder="Enter tracking number (e.g., ES123456789)"
                buttonText="Track"
                showValidation={false}
              />
            </CardContent>
          </Card>

          {shipment && (
            <Card>
              <CardHeader>
                <CardTitle>Tracking: {shipment.trackingId}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-semibold">Status: {shipment.serviceType}</div>
                  <div>Sender: {shipment.senderName} ({shipment.senderCity}, {shipment.senderState})</div>
                  <div>Recipient: {shipment.recipientName} ({shipment.recipientCity}, {shipment.recipientState})</div>
                  <div>Package: {shipment.packageDescription} ({shipment.weight}kg, ${shipment.value})</div>
                  <div>Signature Required: {shipment.signatureRequired}</div>
                  <div>Insurance: {shipment.insurance}</div>
                  <div>Cost: ${shipment.cost}</div>
                  <div>Created: {shipment.created}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};