
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText } from "lucide-react";

const Support = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      detail: "1-800-EXPRESS",
      availability: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions",
      detail: "support@expressship.com",
      availability: "Response within 2 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our agents",
      detail: "Start conversation",
      availability: "Mon-Fri 8AM-8PM"
    }
  ];

  const faqItems = [
    {
      question: "How can I track my package?",
      answer: "You can track your package using the tracking number provided in your shipping confirmation email. Visit our tracking page and enter your tracking number."
    },
    {
      question: "What are your delivery timeframes?",
      answer: "Express delivery: Next business day, Standard shipping: 2-5 business days, International: 3-10 business days depending on destination."
    },
    {
      question: "How do I file a claim for damaged packages?",
      answer: "Contact our support team within 48 hours of delivery with your tracking number and photos of the damaged package. We'll process your claim quickly."
    },
    {
      question: "Can I change my delivery address?",
      answer: "You can change your delivery address before the package is out for delivery. Contact our support team or use the tracking page to modify delivery instructions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-xl text-muted-foreground">
              Get support for all your shipping needs. We're here to help 24/7.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <method.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-lg mb-2">{method.detail}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {method.availability}
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Please describe your issue or question..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h3 className="font-semibold mb-2 flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-red-600" />
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground text-sm ml-6">{item.answer}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
