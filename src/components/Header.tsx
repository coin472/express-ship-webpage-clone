
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { ShipmentForm } from "./ShipmentForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShipmentFormOpen, setIsShipmentFormOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleShipNow = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to create a shipment",
        variant: "destructive"
      });
      return;
    }
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
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-red-600">ExpressShip</span>
            </Link>
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
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-red-600">ExpressShip</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/services" className="text-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/tracking" className="text-foreground hover:text-primary transition-colors">
                Tracking
              </Link>
              <Link to="/support" className="text-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'admin' ? (
                    <Link to="/admin-panel">
                      <Button variant="outline">Admin Panel</Button>
                    </Link>
                  ) : (
                    <Link to="/dashboard">
                      <Button variant="outline" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <SignInForm 
                    trigger={<Button variant="outline">Sign In</Button>}
                  />
                  <Link to="/admin-login">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Admin
                    </Button>
                  </Link>
                </>
              )}
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleShipNow}
              >
                Ship Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <Link to="/services" className="text-foreground hover:text-primary transition-colors">
                  Services
                </Link>
                <Link to="/tracking" className="text-foreground hover:text-primary transition-colors">
                  Tracking
                </Link>
                <Link to="/support" className="text-foreground hover:text-primary transition-colors">
                  Support
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  {user ? (
                    <>
                      {user.role === 'admin' ? (
                        <Link to="/admin-panel">
                          <Button variant="outline" className="w-full">Admin Panel</Button>
                        </Link>
                      ) : (
                        <Link to="/dashboard">
                          <Button variant="outline" className="w-full">Dashboard</Button>
                        </Link>
                      )}
                      <Button variant="outline" onClick={handleLogout} className="w-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <SignInForm 
                        trigger={<Button variant="outline" className="w-full">Sign In</Button>}
                      />
                      <Link to="/admin-login">
                        <Button variant="ghost" className="w-full">
                          Admin Login
                        </Button>
                      </Link>
                    </>
                  )}
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleShipNow}
                  >
                    Ship Now
                  </Button>
                </div>
              </nav>
            </div>
          )}
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
