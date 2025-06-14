
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrackingInputProps {
  onTrack: (trackingNumber: string) => void;
  isTracking?: boolean;
  placeholder?: string;
  buttonText?: string;
  showValidation?: boolean;
  className?: string;
}

export const TrackingInput = ({ 
  onTrack, 
  isTracking = false, 
  placeholder = "Enter tracking number",
  buttonText = "Track",
  showValidation = true,
  className = ""
}: TrackingInputProps) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateTrackingNumber = (num: string): boolean => {
    if (!showValidation) return true;
    const regex = /^[A-Za-z0-9]{8,}$/;
    return regex.test(num);
  };

  const handleTrack = () => {
    setError("");
    
    if (!trackingNumber.trim()) {
      const errorMsg = "Please enter a tracking number";
      setError(errorMsg);
      if (showValidation) {
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive"
        });
      }
      return;
    }

    if (showValidation && !validateTrackingNumber(trackingNumber)) {
      const errorMsg = "Invalid tracking number format. Please enter at least 8 alphanumeric characters.";
      setError(errorMsg);
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
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            className={error ? "border-red-500" : ""}
          />
          {error && showValidation && (
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
          {isTracking ? "Tracking..." : buttonText}
        </Button>
      </div>
    </div>
  );
};
