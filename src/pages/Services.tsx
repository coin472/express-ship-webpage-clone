
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Box, MapPin, ArrowRight } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";

const Services = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive shipping solutions designed to meet every logistics need, from express delivery to international freight.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <service.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-6 border-t">
                    <div className="text-2xl font-bold text-red-600">{service.price}</div>
                    <QuoteForm 
                      trigger={
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
