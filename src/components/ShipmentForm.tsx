
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Package, Truck, Clock, DollarSign } from "lucide-react";

const shipmentSchema = z.object({
  // Sender Information
  senderName: z.string().min(2, "Sender name must be at least 2 characters"),
  senderPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  senderAddress: z.string().min(10, "Address must be at least 10 characters"),
  senderCity: z.string().min(2, "City is required"),
  senderState: z.string().min(2, "State is required"),
  senderZip: z.string().min(5, "ZIP code must be at least 5 digits"),
  
  // Recipient Information
  recipientName: z.string().min(2, "Recipient name must be at least 2 characters"),
  recipientPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  recipientAddress: z.string().min(10, "Address must be at least 10 characters"),
  recipientCity: z.string().min(2, "City is required"),
  recipientState: z.string().min(2, "State is required"),
  recipientZip: z.string().min(5, "ZIP code must be at least 5 digits"),
  
  // Package Information
  packageDescription: z.string().min(5, "Package description must be at least 5 characters"),
  weight: z.number().min(0.1, "Weight must be at least 0.1 lbs"),
  length: z.number().min(1, "Length must be at least 1 inch"),
  width: z.number().min(1, "Width must be at least 1 inch"),
  height: z.number().min(1, "Height must be at least 1 inch"),
  value: z.number().min(1, "Package value must be at least $1"),
  
  // Service Options
  serviceType: z.enum(["express", "standard", "economy"]),
  signatureRequired: z.boolean().default(false),
  insurance: z.boolean().default(false),
});

type ShipmentFormData = z.infer<typeof shipmentSchema>;

interface ShipmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShipmentFormData & { cost: number; trackingId: string }) => void;
}

export const ShipmentForm = ({ isOpen, onClose, onSubmit }: ShipmentFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      serviceType: "standard",
      signatureRequired: false,
      insurance: false,
    },
  });

  const watchedValues = watch();

  // Calculate estimated cost based on weight, dimensions, and service type
  const calculateCost = () => {
    const { weight, length, width, height, serviceType, insurance } = watchedValues;
    
    if (!weight || !length || !width || !height) return 0;
    
    const dimensionalWeight = (length * width * height) / 166; // Standard dimensional weight divisor
    const billableWeight = Math.max(weight, dimensionalWeight);
    
    let baseCost = 0;
    switch (serviceType) {
      case "express":
        baseCost = billableWeight * 8.5;
        break;
      case "standard":
        baseCost = billableWeight * 5.2;
        break;
      case "economy":
        baseCost = billableWeight * 3.8;
        break;
    }
    
    if (insurance) baseCost += watchedValues.value * 0.02; // 2% of package value for insurance
    
    return Math.max(baseCost, 15); // Minimum shipping cost
  };

  // Update cost estimate when relevant fields change
  useState(() => {
    const cost = calculateCost();
    setEstimatedCost(cost);
  });

  const generateTrackingId = () => {
    return "ES" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleFormSubmit = (data: ShipmentFormData) => {
    const cost = calculateCost();
    const trackingId = generateTrackingId();
    onSubmit({ ...data, cost, trackingId });
    
    toast({
      title: "Shipment Created Successfully!",
      description: `Your tracking ID is ${trackingId}. Estimated cost: $${cost.toFixed(2)}`,
    });
    
    reset();
    setStep(1);
    onClose();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const serviceOptions = [
    { value: "express", label: "Express (1-2 days)", icon: Clock, color: "text-red-600" },
    { value: "standard", label: "Standard (3-5 days)", icon: Truck, color: "text-blue-600" },
    { value: "economy", label: "Economy (7-10 days)", icon: Package, color: "text-green-600" },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Full Name</Label>
                <Input id="senderName" {...register("senderName")} />
                {errors.senderName && <p className="text-sm text-red-600">{errors.senderName.message}</p>}
              </div>
              <div>
                <Label htmlFor="senderPhone">Phone Number</Label>
                <Input id="senderPhone" {...register("senderPhone")} />
                {errors.senderPhone && <p className="text-sm text-red-600">{errors.senderPhone.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="senderAddress">Street Address</Label>
              <Input id="senderAddress" {...register("senderAddress")} />
              {errors.senderAddress && <p className="text-sm text-red-600">{errors.senderAddress.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="senderCity">City</Label>
                <Input id="senderCity" {...register("senderCity")} />
                {errors.senderCity && <p className="text-sm text-red-600">{errors.senderCity.message}</p>}
              </div>
              <div>
                <Label htmlFor="senderState">State</Label>
                <Input id="senderState" {...register("senderState")} />
                {errors.senderState && <p className="text-sm text-red-600">{errors.senderState.message}</p>}
              </div>
              <div>
                <Label htmlFor="senderZip">ZIP Code</Label>
                <Input id="senderZip" {...register("senderZip")} />
                {errors.senderZip && <p className="text-sm text-red-600">{errors.senderZip.message}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Full Name</Label>
                <Input id="recipientName" {...register("recipientName")} />
                {errors.recipientName && <p className="text-sm text-red-600">{errors.recipientName.message}</p>}
              </div>
              <div>
                <Label htmlFor="recipientPhone">Phone Number</Label>
                <Input id="recipientPhone" {...register("recipientPhone")} />
                {errors.recipientPhone && <p className="text-sm text-red-600">{errors.recipientPhone.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="recipientAddress">Street Address</Label>
              <Input id="recipientAddress" {...register("recipientAddress")} />
              {errors.recipientAddress && <p className="text-sm text-red-600">{errors.recipientAddress.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="recipientCity">City</Label>
                <Input id="recipientCity" {...register("recipientCity")} />
                {errors.recipientCity && <p className="text-sm text-red-600">{errors.recipientCity.message}</p>}
              </div>
              <div>
                <Label htmlFor="recipientState">State</Label>
                <Input id="recipientState" {...register("recipientState")} />
                {errors.recipientState && <p className="text-sm text-red-600">{errors.recipientState.message}</p>}
              </div>
              <div>
                <Label htmlFor="recipientZip">ZIP Code</Label>
                <Input id="recipientZip" {...register("recipientZip")} />
                {errors.recipientZip && <p className="text-sm text-red-600">{errors.recipientZip.message}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Package Details</h3>
            <div>
              <Label htmlFor="packageDescription">Package Description</Label>
              <Textarea id="packageDescription" {...register("packageDescription")} placeholder="Describe the contents of your package" />
              {errors.packageDescription && <p className="text-sm text-red-600">{errors.packageDescription.message}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" step="0.1" {...register("weight", { valueAsNumber: true })} />
                {errors.weight && <p className="text-sm text-red-600">{errors.weight.message}</p>}
              </div>
              <div>
                <Label htmlFor="length">Length (in)</Label>
                <Input id="length" type="number" {...register("length", { valueAsNumber: true })} />
                {errors.length && <p className="text-sm text-red-600">{errors.length.message}</p>}
              </div>
              <div>
                <Label htmlFor="width">Width (in)</Label>
                <Input id="width" type="number" {...register("width", { valueAsNumber: true })} />
                {errors.width && <p className="text-sm text-red-600">{errors.width.message}</p>}
              </div>
              <div>
                <Label htmlFor="height">Height (in)</Label>
                <Input id="height" type="number" {...register("height", { valueAsNumber: true })} />
                {errors.height && <p className="text-sm text-red-600">{errors.height.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="value">Package Value ($)</Label>
              <Input id="value" type="number" step="0.01" {...register("value", { valueAsNumber: true })} />
              {errors.value && <p className="text-sm text-red-600">{errors.value.message}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Options</h3>
            <div className="space-y-3">
              {serviceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    {...register("serviceType")}
                    className="h-4 w-4"
                  />
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="signatureRequired"
                  {...register("signatureRequired")}
                  className="h-4 w-4"
                />
                <label htmlFor="signatureRequired" className="cursor-pointer">
                  Signature Required (+$5.00)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="insurance"
                  {...register("insurance")}
                  className="h-4 w-4"
                />
                <label htmlFor="insurance" className="cursor-pointer">
                  Insurance (2% of package value)
                </label>
              </div>
            </div>
            {estimatedCost > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Estimated Cost:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${estimatedCost.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step > stepNum ? "bg-red-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {renderStep()}
          
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Create Shipment
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
