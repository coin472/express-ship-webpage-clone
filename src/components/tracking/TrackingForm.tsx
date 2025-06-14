
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  isTracking: boolean;
}

export const TrackingForm = ({ onTrack, isTracking }: TrackingFormProps) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateTrackingNumber = (num: string): boolean => {
    const regex = /^[A-Za-z0-9]{8,}$/;
    return regex.test(num);
  };

  const handleTrack = () => {
    setError("");
    
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive"
      });
      return;
    }

    if (!validateTrackingNumber(trackingNumber)) {
      setError("Invalid tracking number format. Please enter at least 8 alphanumeric characters.");
      toast({
        title: "Invalid Format",
        description: "Tracking number should be at least 8 alphanumeric characters",
        variant: "destructive"
      });
      return;
    }

    onTrack(trackingNumber);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., ES123456789, try 'delivered123' or 'transit456')"
                value={trackingNumber}
                onChange={(e) => {
                  setTrackingNumber(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </div>
            <Button 
              onClick={handleTrack}
              disabled={isTracking}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isTracking ? "Tracking..." : "Track Package"}
            </Button>
          </div>
          
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
