import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({name, placeholder, type, ...props}: React.ComponentProps<"input">) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{placeholder}</Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        required={props.required!!}
      />
    </div>
  );
}
