
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, MapPin, Truck, Box, Clock, CheckCircle } from "lucide-react";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setIsTracking(true);
      setTimeout(() => {
        setIsTracking(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const trackingSteps = [
    {
      icon: Package,
      title: "Package Received",
      description: "Your package has been received at our facility",
      location: "Los Angeles, CA",
      time: "3 days ago, 2:15 PM",
      status: "completed"
    },
    {
      icon: Truck,
      title: "In Transit",
      description: "Package is on its way to destination",
      location: "Phoenix, AZ",
      time: "2 days ago, 8:30 AM",
      status: "completed"
    },
    {
      icon: MapPin,
      title: "Arrived at Facility",
      description: "Package arrived at local delivery center",
      location: "New York, NY",
      time: "Yesterday, 6:45 PM",
      status: "completed"
    },
    {
      icon: Truck,
      title: "Out for Delivery",
      description: "Package is on the delivery vehicle",
      location: "New York, NY",
      time: "Today, 8:30 AM",
      status: "current"
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "Package delivered to recipient",
      location: "New York, NY",
      time: "Estimated: Today, 2:30 PM",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Track Your Package</h1>
            <p className="text-xl text-muted-foreground">
              Enter your tracking number to get real-time updates on your shipment
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Package Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter tracking number (e.g., ES123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleTrack}
                  disabled={isTracking}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isTracking ? "Tracking..." : "Track Package"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle>Tracking Results: {trackingNumber || "ES123456789"}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: Today by 2:30 PM</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingSteps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
