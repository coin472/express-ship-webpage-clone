
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
            <Button variant="outline">Sign In</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
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
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Ship Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
