
import { Package, MapPin, Truck, Box } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-red-400">ExpressShip</span>
            </div>
            <p className="text-gray-300 max-w-sm">
              Leading the way in global logistics with reliable, fast, and secure shipping solutions for businesses and individuals worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/express" className="hover:text-white transition-colors">Express Delivery</Link></li>
              <li><Link to="/standard" className="hover:text-white transition-colors">Standard Shipping</Link></li>
              <li><Link to="/freight" className="hover:text-white transition-colors">Freight Services</Link></li>
              <li><Link to="/international" className="hover:text-white transition-colors">International</Link></li>
              <li><Link to="/ecommerce" className="hover:text-white transition-colors">E-commerce Solutions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/tracking" className="hover:text-white transition-colors">Track Package</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-guide" className="hover:text-white transition-colors">Shipping Guide</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">123 Logistics Ave, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">📞</span>
                <span className="text-sm">1-800-EXPRESS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">✉️</span>
                <span className="text-sm">support@expressship.com</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Business Hours</h4>
              <div className="text-sm text-gray-300">
                <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                <div>Sat: 9:00 AM - 4:00 PM</div>
                <div>Sun: Closed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 ExpressShip. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
