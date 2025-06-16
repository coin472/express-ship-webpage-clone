
import { LucideIcon } from "lucide-react";

interface RadioOption {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const FormRadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  error
}: FormRadioGroupProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">{label}</h4>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg">
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4"
          />
          <option.icon className={`h-5 w-5 ${option.color}`} />
          <label htmlFor={option.value} className="flex-1 cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
