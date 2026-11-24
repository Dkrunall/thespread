import { Minus, Plus } from "lucide-react";

export default function Quantity({
  name,
  value,
  onChange,
  min = 0,
}: {
  name: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border-2 border-ink/25 bg-white">
      <button
        type="button"
        className="grid place-items-center size-10 disabled:opacity-35 disabled:cursor-default"
        aria-label={`One less ${name}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-4" />
      </button>
      <span className="typed min-w-6 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className="grid place-items-center size-10" aria-label={`One more ${name}`} onClick={() => onChange(value + 1)}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}
