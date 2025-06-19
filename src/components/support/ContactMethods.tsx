
import { Phone, Mail, MessageCircle } from "lucide-react";
import { ContactMethod } from "@/components/ui/contact-method";

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

export const ContactMethods = () => {
  const handleContact = (method: string) => {
    console.log(`Contacting via ${method}`);
    // Add specific contact logic here
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {contactMethods.map((method, index) => (
        <ContactMethod
          key={index}
          icon={method.icon}
          title={method.title}
          description={method.description}
          detail={method.detail}
          availability={method.availability}
          onContact={() => handleContact(method.title)}
        />
      ))}
    </div>
  );
};
