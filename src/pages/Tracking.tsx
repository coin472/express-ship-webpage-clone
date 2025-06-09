
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Package, MapPin, Truck, Box, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface TrackingStep {
  icon: any;
  title: string;
  description: string;
  location: string;
  time: string;
  status: "completed" | "current" | "pending";
}

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingStep[]>([]);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Simulate different tracking scenarios based on tracking number
  const generateTrackingData = (trackingNum: string): TrackingStep[] => {
    const baseSteps = [
      {
        icon: Package,
        title: "Package Received",
        description: "Your package has been received at our facility",
        location: "Los Angeles, CA",
        time: "3 days ago, 2:15 PM",
        status: "completed" as const
      },
      {
        icon: Truck,
        title: "In Transit",
        description: "Package is on its way to destination",
        location: "Phoenix, AZ",
        time: "2 days ago, 8:30 AM",
        status: "completed" as const
      },
      {
        icon: MapPin,
        title: "Arrived at Facility",
        description: "Package arrived at local delivery center",
        location: "New York, NY",
        time: "Yesterday, 6:45 PM",
        status: "completed" as const
      }
    ];

    // Different scenarios based on tracking number
    if (trackingNum.toLowerCase().includes("delivered")) {
      return [
        ...baseSteps,
        {
          icon: Truck,
          title: "Out for Delivery",
          description: "Package is on the delivery vehicle",
          location: "New York, NY",
          time: "Today, 8:30 AM",
          status: "completed" as const
        },
        {
          icon: CheckCircle,
          title: "Delivered",
          description: "Package delivered to recipient",
          location: "New York, NY",
          time: "Today, 2:30 PM",
          status: "completed" as const
        }
      ];
    } else if (trackingNum.toLowerCase().includes("transit")) {
      return [
        ...baseSteps,
        {
          icon: Truck,
          title: "Out for Delivery",
          description: "Package is on the delivery vehicle",
          location: "New York, NY",
          time: "Today, 8:30 AM",
          status: "current" as const
        },
        {
          icon: CheckCircle,
          title: "Delivered",
          description: "Package will be delivered soon",
          location: "New York, NY",
          time: "Estimated: Today, 5:00 PM",
          status: "pending" as const
        }
      ];
    } else {
      return [
        ...baseSteps,
        {
          icon: Truck,
          title: "Out for Delivery",
          description: "Package is on the delivery vehicle",
          location: "New York, NY",
          time: "Today, 8:30 AM",
          status: "current" as const
        },
        {
          icon: CheckCircle,
          title: "Delivered",
          description: "Package delivered to recipient",
          location: "New York, NY",
          time: "Estimated: Today, 2:30 PM",
          status: "pending" as const
        }
      ];
    }
  };

  const validateTrackingNumber = (num: string): boolean => {
    // Simple validation: at least 8 characters, alphanumeric
    const regex = /^[A-Za-z0-9]{8,}$/;
    return regex.test(num);
  };

  const handleTrack = async () => {
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

    setIsTracking(true);
    setShowResults(false);

    // Simulate API call delay
    setTimeout(() => {
      // Simulate some tracking numbers not found
      if (trackingNumber.toLowerCase().includes("notfound")) {
        setError("Tracking number not found. Please check your tracking number and try again.");
        setIsTracking(false);
        toast({
          title: "Not Found",
          description: "Tracking number not found in our system",
          variant: "destructive"
        });
        return;
      }

      const data = generateTrackingData(trackingNumber);
      setTrackingData(data);
      setIsTracking(false);
      setShowResults(true);
      
      toast({
        title: "Success",
        description: "Package tracking information found!"
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const getEstimatedDelivery = () => {
    const hasDelivered = trackingData.some(step => step.title === "Delivered" && step.status === "completed");
    if (hasDelivered) {
      return "Package has been delivered";
    }
    return "Today by 5:00 PM";
  };

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

          {showResults && trackingData.length > 0 && (
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
