
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Package className="h-8 w-8 text-yellow-500" />
      <span className="text-2xl font-bold text-red-600">ExpressShip</span>
    </Link>
  );
};
