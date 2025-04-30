import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaWithLabel({
  name,
  placeholder,
  id,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{id}</Label>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={props.required!!}
        {...props}
      />
    </div>
  );
}
