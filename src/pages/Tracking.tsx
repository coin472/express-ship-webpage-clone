
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { TrackingHero } from "@/components/tracking/TrackingHero";
import { TrackingForm } from "@/components/tracking/TrackingForm";
import { TrackingResults } from "@/components/tracking/TrackingResults";
import { generateTrackingData } from "@/components/tracking/TrackingLogic";
import { FetchShipment, getShipmentByTrackingId } from "@/lib/pocketbase";

interface TrackingStep {
  icon: any;
  title: string;
  description: string;
  location: string;
  time: string;
  status: "delivered" | "in transit" | "processing";
}

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState<FetchShipment | null>(null);
  const [currentTrackingNumber, setCurrentTrackingNumber] = useState("");
  const { toast } = useToast();

  // Check for tracking number in URL parameters
  useEffect(() => {
    const trackingNumber = searchParams.get('number');
    if (trackingNumber) {
      handleTrack(trackingNumber);
    }
  }, [searchParams]);

  const handleTrack = async (trackingNumber: string) => {
    setIsTracking(true);
    setShowResults(false);
    setCurrentTrackingNumber(trackingNumber);
    getShipmentByTrackingId(trackingNumber)
    const data = await getShipmentByTrackingId(trackingNumber);
    setTimeout(()=>{
        if(data){
          setTrackingData(data);
          setIsTracking(false);
          setShowResults(true);
          toast({
            title: "Success",
            description: "Package tracking information found!"
          });
        }else{
          setIsTracking(false)
          toast({
            title: "Error",
            description: "Package tracking information not found."
          });
        }
    },800)
      

  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <TrackingHero />
          <TrackingForm onTrack={handleTrack} isTracking={isTracking} />
          
          {showResults && trackingData.length > 0 && (
            <TrackingResults 
              trackingNumber={currentTrackingNumber}
              trackingData={trackingData}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
