
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormRadioGroup } from "@/components/ui/form-radio-group";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { useToast } from "@/hooks/use-toast";
import { Package, Truck, Clock } from "lucide-react";

export interface ShipmentData {
  // Sender Information
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  
  // Recipient Information
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  
  // Package Information
  packageDescription: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  value: number;
  cost?: number;
  trackingId?: string;
  // Service Options
  serviceType: string;
  signatureRequired: boolean;
  insurance: boolean;
}

interface ShipmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShipmentData) => void;
}

export const ShipmentForm = ({ isOpen, onClose, onSubmit }: ShipmentFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ShipmentData>({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderZip: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "",
    recipientZip: "",
    packageDescription: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    value: 0,
    serviceType: "standard",
    signatureRequired: false,
    insurance: false,
  });

  const updateField = (field: keyof ShipmentData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.senderName || formData.senderName.length < 2) {
        newErrors.senderName = "Sender name must be at least 2 characters";
      }
      if (!formData.senderPhone || formData.senderPhone.length < 10) {
        newErrors.senderPhone = "Phone number must be at least 10 digits";
      }
      if (!formData.senderAddress || formData.senderAddress.length < 10) {
        newErrors.senderAddress = "Address must be at least 10 characters";
      }
      if (!formData.senderCity || formData.senderCity.length < 2) {
        newErrors.senderCity = "City is required";
      }
      if (!formData.senderState || formData.senderState.length < 2) {
        newErrors.senderState = "State is required";
      }
      if (!formData.senderZip || formData.senderZip.length < 5) {
        newErrors.senderZip = "ZIP code must be at least 5 digits";
      }
    }

    if (currentStep === 2) {
      if (!formData.recipientName || formData.recipientName.length < 2) {
        newErrors.recipientName = "Recipient name must be at least 2 characters";
      }
      if (!formData.recipientPhone || formData.recipientPhone.length < 10) {
        newErrors.recipientPhone = "Phone number must be at least 10 digits";
      }
      if (!formData.recipientAddress || formData.recipientAddress.length < 10) {
        newErrors.recipientAddress = "Address must be at least 10 characters";
      }
      if (!formData.recipientCity || formData.recipientCity.length < 2) {
        newErrors.recipientCity = "City is required";
      }
      if (!formData.recipientState || formData.recipientState.length < 2) {
        newErrors.recipientState = "State is required";
      }
      if (!formData.recipientZip || formData.recipientZip.length < 5) {
        newErrors.recipientZip = "ZIP code must be at least 5 digits";
      }
    }

    if (currentStep === 3) {
      if (!formData.packageDescription || formData.packageDescription.length < 5) {
        newErrors.packageDescription = "Package description must be at least 5 characters";
      }
      if (!formData.weight || formData.weight < 0.1) {
        newErrors.weight = "Weight must be at least 0.1 lbs";
      }
      if (!formData.length || formData.length < 1) {
        newErrors.length = "Length must be at least 1 inch";
      }
      if (!formData.width || formData.width < 1) {
        newErrors.width = "Width must be at least 1 inch";
      }
      if (!formData.height || formData.height < 1) {
        newErrors.height = "Height must be at least 1 inch";
      }
      if (!formData.value || formData.value < 1) {
        newErrors.value = "Package value must be at least $1";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCost = (): number => {
    const { weight, length, width, height, serviceType, insurance, signatureRequired } = formData;
    
    if (!weight || !length || !width || !height) return 0;
    
    const dimensionalWeight = (length * width * height) / 166;
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
    
    if (insurance) baseCost += formData.value * 0.02;
    if (signatureRequired) baseCost += 5;
    
    return Math.max(baseCost, 15);
  };

  const generateTrackingId = (): string => {
    return "ES" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    const cost = calculateCost();
    const trackingId = generateTrackingId();
    
    onSubmit({ ...formData, cost, trackingId });
    toast({
      title: "Shipment Created Successfully!",
      description: `Your tracking ID is ${trackingId}. Estimated cost: $${cost.toFixed(2)}`,
    });
    
    // Reset form
    setFormData({
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      senderCity: "",
      senderState: "",
      senderZip: "",
      recipientName: "",
      recipientPhone: "",
      recipientAddress: "",
      recipientCity: "",
      recipientState: "",
      recipientZip: "",
      packageDescription: "",
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      value: 0,
      serviceType: "standard",
      signatureRequired: false,
      insurance: false,
    });
    setStep(1);
    setErrors({});
    onClose();
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const serviceOptions = [
    { value: "express", label: "Express (1-2 days)", icon: Clock, color: "text-red-600" },
    { value: "standard", label: "Standard (3-5 days)", icon: Truck, color: "text-blue-600" },
    { value: "economy", label: "Economy (7-10 days)", icon: Package, color: "text-green-600" },
  ];

  const estimatedCost = calculateCost();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="senderName"
                label="Full Name"
                value={formData.senderName}
                onChange={(value) => updateField("senderName", value)}
                error={errors.senderName}
              />
              <FormInput
                id="senderPhone"
                label="Phone Number"
                value={formData.senderPhone}
                onChange={(value) => updateField("senderPhone", value)}
                error={errors.senderPhone}
              />
            </div>
            <FormInput
              id="senderAddress"
              label="Street Address"
              value={formData.senderAddress}
              onChange={(value) => updateField("senderAddress", value)}
              error={errors.senderAddress}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                id="senderCity"
                label="City"
                value={formData.senderCity}
                onChange={(value) => updateField("senderCity", value)}
                error={errors.senderCity}
              />
              <FormInput
                id="senderState"
                label="State"
                value={formData.senderState}
                onChange={(value) => updateField("senderState", value)}
                error={errors.senderState}
              />
              <FormInput
                id="senderZip"
                label="ZIP Code"
                value={formData.senderZip}
                onChange={(value) => updateField("senderZip", value)}
                error={errors.senderZip}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="recipientName"
                label="Full Name"
                value={formData.recipientName}
                onChange={(value) => updateField("recipientName", value)}
                error={errors.recipientName}
              />
              <FormInput
                id="recipientPhone"
                label="Phone Number"
                value={formData.recipientPhone}
                onChange={(value) => updateField("recipientPhone", value)}
                error={errors.recipientPhone}
              />
            </div>
            <FormInput
              id="recipientAddress"
              label="Street Address"
              value={formData.recipientAddress}
              onChange={(value) => updateField("recipientAddress", value)}
              error={errors.recipientAddress}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                id="recipientCity"
                label="City"
                value={formData.recipientCity}
                onChange={(value) => updateField("recipientCity", value)}
                error={errors.recipientCity}
              />
              <FormInput
                id="recipientState"
                label="State"
                value={formData.recipientState}
                onChange={(value) => updateField("recipientState", value)}
                error={errors.recipientState}
              />
              <FormInput
                id="recipientZip"
                label="ZIP Code"
                value={formData.recipientZip}
                onChange={(value) => updateField("recipientZip", value)}
                error={errors.recipientZip}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Package Details</h3>
            <FormTextarea
              id="packageDescription"
              label="Package Description"
              placeholder="Describe the contents of your package"
              value={formData.packageDescription}
              onChange={(value) => updateField("packageDescription", value)}
              error={errors.packageDescription}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormInput
                id="weight"
                label="Weight (lbs)"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(value) => updateField("weight", value)}
                error={errors.weight}
              />
              <FormInput
                id="length"
                label="Length (in)"
                type="number"
                value={formData.length}
                onChange={(value) => updateField("length", value)}
                error={errors.length}
              />
              <FormInput
                id="width"
                label="Width (in)"
                type="number"
                value={formData.width}
                onChange={(value) => updateField("width", value)}
                error={errors.width}
              />
              <FormInput
                id="height"
                label="Height (in)"
                type="number"
                value={formData.height}
                onChange={(value) => updateField("height", value)}
                error={errors.height}
              />
            </div>
            <FormInput
              id="value"
              label="Package Value ($)"
              type="number"
              step="0.01"
              value={formData.value}
              onChange={(value) => updateField("value", value)}
              error={errors.value}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Options</h3>
            <FormRadioGroup
              name="serviceType"
              label="Service Type"
              options={serviceOptions}
              value={formData.serviceType}
              onChange={(value) => updateField("serviceType", value)}
            />
            <div className="space-y-3">
              <FormCheckbox
                id="signatureRequired"
                label="Signature Required (+$5.00)"
                checked={formData.signatureRequired}
                onChange={(checked) => updateField("signatureRequired", checked)}
              />
              <FormCheckbox
                id="insurance"
                label="Insurance (2% of package value)"
                checked={formData.insurance}
                onChange={(checked) => updateField("insurance", checked)}
              />
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

        <form onSubmit={handleSubmit}>
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
            
            {step < 4 && (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
            {step === 4 && (
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