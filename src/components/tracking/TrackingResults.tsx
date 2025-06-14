
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";

interface TrackingStep {
  icon: any;
  title: string;
  description: string;
  location: string;
  time: string;
  status: "completed" | "current" | "pending";
}

interface TrackingResultsProps {
  trackingNumber: string;
  trackingData: TrackingStep[];
}

export const TrackingResults = ({ trackingNumber, trackingData }: TrackingResultsProps) => {
  const getEstimatedDelivery = () => {
    const hasDelivered = trackingData.some(step => step.title === "Delivered" && step.status === "completed");
    if (hasDelivered) {
      return "Package has been delivered";
    }
    return "Today by 5:00 PM";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking Results: {trackingNumber}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Estimated delivery: {getEstimatedDelivery()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trackingData.map((step, index) => (
            <div 
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                step.status === 'completed' ? 'bg-green-50 border-green-200' :
                step.status === 'current' ? 'bg-yellow-50 border-yellow-200' :
                'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step.status === 'completed' ? 'bg-green-100' :
                step.status === 'current' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <step.icon className={`h-5 w-5 ${
                  step.status === 'completed' ? 'text-green-600' :
                  step.status === 'current' ? 'text-yellow-600' :
                  'text-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm text-muted-foreground mb-1">{step.description}</div>
                <div className="text-xs text-muted-foreground">
                  {step.location} • {step.time}
                </div>
              </div>
              {step.status === 'current' && (
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
