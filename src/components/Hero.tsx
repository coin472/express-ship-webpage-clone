
import { useState } from "react";
import { ArrowRight, Truck } from "lucide-react";
import { QuoteForm } from "./QuoteForm";
import { TrackingInput } from "./ui/tracking-input";
import { HeroSection } from "./ui/hero-section";
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

  const handleGetQuote = () => {
    // This will be handled by the QuoteForm component
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <HeroSection
        title="Excellence in"
        highlightedText="Logistics"
        description="Connect your business to the world with our reliable, fast, and secure shipping solutions. From documents to large freight, we deliver."
        primaryAction={{
          text: "Get Quote",
          onClick: handleGetQuote,
          icon: <ArrowRight className="ml-2 h-4 w-4" />
        }}
        secondaryAction={{
          text: "Track Package",
          onClick: handleTrackButtonClick
        }}
        stats={[
          { value: "220+", label: "Countries" },
          { value: "100M+", label: "Packages/Year" },
          { value: "99.9%", label: "On-Time" }
        ]}
        backgroundStyle="none"
        className="py-0"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <QuoteForm 
            trigger={
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-sm font-medium flex items-center">
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            }
          />
        </div>
      </HeroSection>

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
  );
};
