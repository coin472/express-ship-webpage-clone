
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "../SignInForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface UserActionsProps {
  onShipNow: () => void;
}

export const UserActions = ({ onShipNow }: UserActionsProps) => {
  const { user, logout, isAdmin } = useAuth();
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

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <>
              <Link to="/admin-panel">
                <Button variant="outline">Admin Panel</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </>
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
  );
};
