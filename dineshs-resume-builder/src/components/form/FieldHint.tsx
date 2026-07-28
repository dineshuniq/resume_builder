import { Lightbulb } from "lucide-react";

export default function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 flex items-start gap-1 text-[11px] leading-snug text-gray-400">
      <Lightbulb size={11} className="mt-[1px] shrink-0 text-amber-400" />
      <span>{children}</span>
    </p>
  );
}
