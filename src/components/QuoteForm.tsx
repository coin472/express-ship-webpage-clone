
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Package, X } from "lucide-react";

interface QuoteFormProps {
  trigger: React.ReactNode;
}

export const QuoteForm = ({ trigger }: QuoteFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromAddress: "",
    toAddress: "",
    weight: "",
    dimensions: "",
    serviceType: "",
    packageType: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock quote
    const basePrice = 15.99;
    const weightMultiplier = parseFloat(formData.weight) || 1;
    const serviceMultiplier = formData.serviceType === "express" ? 2 : 1;
    const estimatedCost = (basePrice * weightMultiplier * serviceMultiplier).toFixed(2);
    
    console.log('Quote requested:', formData);
    
    toast({
      title: "Quote Generated Successfully!",
      description: `Estimated cost: $${estimatedCost} - Valid for 24 hours`
    });
    
    setIsOpen(false);
    setFormData({
      fromAddress: "",
      toAddress: "",
      weight: "",
      dimensions: "",
      serviceType: "",
      packageType: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-red-600" />
            <span>Get Shipping Quote</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="fromAddress">From Address</Label>
              <Input
                id="fromAddress"
                placeholder="Enter pickup address"
                value={formData.fromAddress}
                onChange={(e) => handleInputChange("fromAddress", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="toAddress">To Address</Label>
              <Input
                id="toAddress"
                placeholder="Enter delivery address"
                value={formData.toAddress}
                onChange={(e) => handleInputChange("toAddress", e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="0.0"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
                <Input
                  id="dimensions"
                  placeholder="12×8×6 inches"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange("dimensions", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (2-5 days)</SelectItem>
                  <SelectItem value="express">Express (Next day)</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="packageType">Package Type</Label>
              <Select value={formData.packageType} onValueChange={(value) => handleInputChange("packageType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="envelope">Envelope</SelectItem>
                  <SelectItem value="small-box">Small Box</SelectItem>
                  <SelectItem value="medium-box">Medium Box</SelectItem>
                  <SelectItem value="large-box">Large Box</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Get Quote
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
