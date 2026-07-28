import { useRef } from "react";
import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react";
import { Bold } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleBold } from "@/lib/boldEditing";

interface BoldableInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BoldableInput({ value, onChange, className, onKeyDown, ...props }: BoldableInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const applyBold = () => {
    const el = ref.current;
    if (!el) return;
    const result = toggleBold(value, el.selectionStart ?? 0, el.selectionEnd ?? 0);
    if (!result) return;
    onChange({ target: { value: result.value } } as ChangeEvent<HTMLInputElement>);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.start, result.end);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyBold();
    }
    onKeyDown?.(e);
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          className,
          "pr-7"
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        title="Bold selected text (Ctrl/Cmd+B)"
        onMouseDown={(e) => e.preventDefault()}
        onClick={applyBold}
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      >
        <Bold size={11} />
      </button>
    </div>
  );
}
