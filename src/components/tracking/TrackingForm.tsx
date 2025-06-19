
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { TrackingInput } from "../ui/tracking-input";

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  isTracking: boolean;
}

export const TrackingForm = ({ onTrack, isTracking }: TrackingFormProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Package Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TrackingInput
            onTrack={onTrack}
            isTracking={isTracking}
            placeholder="Enter tracking number (e.g., ES123456789, try 'delivered123' or 'transit456')"
            buttonText="Track Package"
            showValidation={true}
          />
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Sample tracking numbers to try:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code className="bg-muted px-1 rounded">delivered123</code> - Delivered package</li>
              <li><code className="bg-muted px-1 rounded">transit456</code> - Package in transit</li>
              <li><code className="bg-muted px-1 rounded">notfound999</code> - Package not found</li>
              <li><code className="bg-muted px-1 rounded">ES123456789</code> - Standard tracking</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
