
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Truck, Box } from "lucide-react";

export const TrackingSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setIsTracking(true);
      // Simulate API call
      setTimeout(() => setIsTracking(false), 1000);
    }
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
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter tracking number (e.g., ES123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button 
                  onClick={handleTrack}
                  disabled={isTracking}
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                >
                  {isTracking ? "Tracking..." : "Track"}
                </Button>
              </div>
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
