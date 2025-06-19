
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, FileText } from "lucide-react";

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

export const FAQSection = () => {
  return (
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
  );
};
