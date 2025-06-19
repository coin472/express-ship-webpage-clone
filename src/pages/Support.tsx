
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupportHero } from "@/components/support/SupportHero";
import { ContactMethods } from "@/components/support/ContactMethods";
import { ContactForm } from "@/components/support/ContactForm";
import { FAQSection } from "@/components/support/FAQSection";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <SupportHero />
          <ContactMethods />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <ContactForm />
            <FAQSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
