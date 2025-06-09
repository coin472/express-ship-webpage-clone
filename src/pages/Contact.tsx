
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our logistics experts. We're here to help with all your shipping needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Shipping Quote</option>
                    <option>Track Package</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"></textarea>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-red-600" />
                    Our Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Headquarters</h4>
                    <p className="text-muted-foreground">123 Logistics Avenue<br />New York, NY 10001</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">West Coast Hub</h4>
                    <p className="text-muted-foreground">456 Shipping Blvd<br />Los Angeles, CA 90210</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">International Center</h4>
                    <p className="text-muted-foreground">789 Global Way<br />Miami, FL 33101</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-red-600" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Customer Service</h4>
                    <p className="text-muted-foreground">1-800-EXPRESS (1-800-397-7377)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Business Solutions</h4>
                    <p className="text-muted-foreground">1-800-BUSINESS (1-800-287-4637)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">International</h4>
                    <p className="text-muted-foreground">1-800-GLOBAL-1 (1-800-456-2251)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-red-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-red-600" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold">General Support</h4>
                    <p className="text-muted-foreground">support@expressship.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sales Inquiries</h4>
                    <p className="text-muted-foreground">sales@expressship.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Technical Support</h4>
                    <p className="text-muted-foreground">tech@expressship.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
