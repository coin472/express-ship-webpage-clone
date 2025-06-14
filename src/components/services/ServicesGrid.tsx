
import { Package, Truck, Box, MapPin } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    icon: Package,
    title: "Express Delivery",
    description: "Next-day delivery for urgent documents and packages",
    features: ["Same-day pickup", "Next-day delivery", "Real-time tracking", "Insurance included", "Signature confirmation"],
    price: "From $15.99"
  },
  {
    icon: Truck,
    title: "Standard Shipping",
    description: "Reliable delivery within 2-5 business days",
    features: ["Cost-effective solution", "Tracking included", "Secure handling", "Residential delivery", "Business delivery"],
    price: "From $8.99"
  },
  {
    icon: Box,
    title: "Freight Services",
    description: "Large shipments and bulk cargo solutions",
    features: ["Heavy cargo handling", "Pallet shipping", "LTL & FTL options", "Dedicated support", "Custom solutions"],
    price: "Custom quote"
  },
  {
    icon: MapPin,
    title: "International Shipping",
    description: "Worldwide shipping to over 220 countries",
    features: ["Customs clearance", "Global network", "Duty management", "Documentation support", "Express & economy options"],
    price: "From $24.99"
  }
];

export const ServicesGrid = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
