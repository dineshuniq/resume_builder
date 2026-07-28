import { useRef } from "react";
import type { ChangeEvent, KeyboardEvent, TextareaHTMLAttributes } from "react";
import { Bold } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleBold } from "@/lib/boldEditing";

interface BoldableTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function BoldableTextarea({ value, onChange, className, onKeyDown, ...props }: BoldableTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const applyBold = () => {
    const el = ref.current;
    if (!el) return;
    const result = toggleBold(value, el.selectionStart ?? 0, el.selectionEnd ?? 0);
    if (!result) return;
    onChange({ target: { value: result.value } } as ChangeEvent<HTMLTextAreaElement>);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.start, result.end);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyBold();
    }
    onKeyDown?.(e);
  };

  return (
    <div className="relative">
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full rounded-md border border-input bg-background text-sm ring-offset-background resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
          "pr-8"
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        title="Bold selected text (Ctrl/Cmd+B)"
        onMouseDown={(e) => e.preventDefault()}
        onClick={applyBold}
        className="absolute right-1.5 top-1.5 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      >
        <Bold size={12} />
      </button>
    </div>
  );
}
