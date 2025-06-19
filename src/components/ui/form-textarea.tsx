
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const FormTextarea = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false
}: FormTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
