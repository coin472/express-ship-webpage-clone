
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck } from "lucide-react";
import { QuoteForm } from "./QuoteForm";
import { TrackingInput } from "./ui/tracking-input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
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

  const handleTrackButtonClick = () => {
    navigate('/tracking');
  };

  return (
    <section className="bg-gradient-to-br from-red-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Excellence in
                <span className="text-red-600"> Logistics</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect your business to the world with our reliable, fast, and secure shipping solutions. From documents to large freight, we deliver.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <QuoteForm 
                trigger={
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
              <Button size="lg" variant="outline" onClick={handleTrackButtonClick}>
                Track Package
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">220+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">100M+</div>
                <div className="text-sm text-muted-foreground">Packages/Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">99.9%</div>
                <div className="text-sm text-muted-foreground">On-Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-card rounded-2xl p-8 shadow-2xl border">
              <div className="flex items-center space-x-4 mb-6">
                <Truck className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">Track Your Shipment</h3>
                  <p className="text-sm text-muted-foreground">Real-time tracking available</p>
                </div>
              </div>
              
              <TrackingInput
                onTrack={handleTrack}
                isTracking={isTracking}
                placeholder="Enter tracking number"
                buttonText="Track Now"
                showValidation={false}
                className="space-y-4"
              />
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
