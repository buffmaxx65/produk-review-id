import { Check, X } from "lucide-react";

type Props = {
  pros: string[];
  cons: string[];
};

export function ProsCons({ pros, cons }: Props) {
  return (
    <div className="my-10 grid gap-px bg-ink-200 sm:grid-cols-2">
      <div className="bg-paper-100 p-6 sm:p-7">
        <p className="kicker-accent">Kelebihan</p>
        <ul className="mt-4 space-y-3">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-800">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                strokeWidth={2.5}
              />
              <span className="text-[15px] leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-paper-100 p-6 sm:p-7">
        <p className="kicker">Kekurangan</p>
        <ul className="mt-4 space-y-3">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-800">
              <X
                className="mt-0.5 h-4 w-4 shrink-0 text-ink-500"
                strokeWidth={2.5}
              />
              <span className="text-[15px] leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
