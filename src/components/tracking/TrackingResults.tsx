import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchShipment } from "@/lib/pocketbase";
import { Clock, CheckCircle, Package, MapPin } from "lucide-react";

interface TrackingResultsProps {
  trackingNumber: string;
  trackingData: FetchShipment | null;
}

export const TrackingResults = ({ trackingNumber, trackingData }: TrackingResultsProps) => {
  if (!trackingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tracking Results: {trackingNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No shipment found for this tracking number.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Determine current status
  const status = trackingData.status?.toLowerCase?.() || "processing";
  const steps = [
    {
      icon: Package,
      title: "Processing",
      description: `Shipment created by ${trackingData.senderName}`,
      location: `${trackingData.senderCity}, ${trackingData.senderState}`,
      time: trackingData.created,
      status: status === "processing" ? "current" : "completed",
    },
    {
      icon: MapPin,
      title: "In Transit",
      description: `Package is on the way to ${trackingData.recipientCity}, ${trackingData.recipientState}`,
      location: `${trackingData.recipientCity}, ${trackingData.recipientState}`,
      time: trackingData.updated,
      status: status === "in transit" ? "current" : status === "delivered" ? "completed" : "pending",
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "Package delivered to recipient",
      location: `${trackingData.recipientAddress}`,
      time: status === "delivered" ? trackingData.updated : "Estimated: Today by 5:00 PM",
      status: status === "delivered" ? "current" : "pending",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking Results: {trackingNumber}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Estimated delivery:{" "}
            {status === "delivered"
              ? "Package has been delivered"
              : "Today by 5:00 PM"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                step.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : step.status === "current"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  step.status === "completed"
                    ? "bg-green-100"
                    : step.status === "current"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
                }`}
              >
                <step.icon
                  className={`h-5 w-5 ${
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "current"
                      ? "text-yellow-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm text-muted-foreground mb-1">
                  {step.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.location} • {step.time}
                </div>
              </div>
              {step.status === "current" && (
                <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};