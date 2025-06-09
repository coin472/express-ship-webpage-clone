
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Box, MapPin } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Express Delivery",
    description: "Next-day delivery for urgent documents and packages",
    features: ["Door-to-door", "Real-time tracking", "Insurance included"],
    price: "From $15.99"
  },
  {
    icon: Truck,
    title: "Standard Shipping",
    description: "Reliable delivery within 2-5 business days",
    features: ["Cost-effective", "Tracking included", "Secure handling"],
    price: "From $8.99"
  },
  {
    icon: Box,
    title: "Freight Services",
    description: "Large shipments and bulk cargo solutions",
    features: ["Heavy cargo", "Custom solutions", "Dedicated support"],
    price: "Custom quote"
  },
  {
    icon: MapPin,
    title: "International",
    description: "Worldwide shipping to over 220 countries",
    features: ["Customs clearance", "Global network", "Duty management"],
    price: "From $24.99"
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of shipping solutions designed to meet your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <service.icon className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t">
                  <div className="text-lg font-semibold text-red-600 mb-3">{service.price}</div>
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
