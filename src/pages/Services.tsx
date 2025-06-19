
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <Footer />
    </div>
  );
};

export default Services;
