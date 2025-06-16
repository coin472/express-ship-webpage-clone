
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  step?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
}

export const FormInput = ({
  id,
  label,
  type = "text",
  step,
  placeholder,
  value,
  onChange,
  error,
  required = false
}: FormInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(inputValue);
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
