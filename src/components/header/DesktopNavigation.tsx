
import { Link } from "react-router-dom";

export const DesktopNavigation = () => {
  return (
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
  );
};
