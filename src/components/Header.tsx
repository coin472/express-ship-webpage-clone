
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ShipmentForm } from "./ShipmentForm";
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { UserActions } from "./header/UserActions";
import { MobileNavigation } from "./header/MobileNavigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const { isLoading } = useAuth();
  const { toast } = useToast();

  const handleShipNow = () => {
    setIsShipmentFormOpen(true);
  };

  const handleShipmentSubmit = (shipmentData: any) => {
    console.log('New shipment created:', shipmentData);
    toast({
      title: "Shipment Created Successfully!",
      description: `Tracking ID: ${shipmentData.trackingId} - Estimated cost: $${shipmentData.cost.toFixed(2)}`
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <DesktopNavigation />
            <UserActions onShipNow={handleShipNow} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <MobileNavigation isOpen={isMenuOpen} onShipNow={handleShipNow} />
        </div>
      </header>

      <ShipmentForm
        isOpen={isShipmentFormOpen}
        onClose={() => setIsShipmentFormOpen(false)}
        onSubmit={handleShipmentSubmit}
      />
    </>
  );
};
