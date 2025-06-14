
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Truck, Box } from "lucide-react";
import { TrackingInput } from "./ui/tracking-input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const TrackingSection = () => {
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTrack = (trackingNumber: string) => {
    setIsTracking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsTracking(false);
      // Navigate to tracking page with the tracking number
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

          {/* Sample tracking result */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Tracking: ES123456789</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Box className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-semibold">Delivered</div>
                      <div className="text-sm text-muted-foreground">Package delivered to recipient</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Today, 2:30 PM</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border-l-4 border-yellow-500">
                    <Truck className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                      <div className="font-medium">Out for delivery</div>
                      <div className="text-sm text-muted-foreground">Package is on the delivery vehicle</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Today, 8:30 AM</div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border-l-4 border-blue-500">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium">Arrived at delivery facility</div>
                      <div className="text-sm text-muted-foreground">Local delivery center - New York, NY</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Yesterday, 6:45 PM</div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border-l-4 border-gray-400">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Package shipped</div>
                      <div className="text-sm text-muted-foreground">Origin: Los Angeles, CA</div>
                    </div>
                    <div className="text-sm text-muted-foreground">2 days ago, 3:15 PM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
