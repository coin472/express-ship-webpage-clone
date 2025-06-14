
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "../SignInForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface MobileNavigationProps {
  isOpen: boolean;
  onShipNow: () => void;
}

export const MobileNavigation = ({ isOpen, onShipNow }: MobileNavigationProps) => {
  const { user, logout } = useAuth();
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
    onShipNow();
  };

  if (!isOpen) return null;

  return (
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
  );
};
