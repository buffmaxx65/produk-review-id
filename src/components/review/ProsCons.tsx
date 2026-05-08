import { Check, X } from "lucide-react";

type Props = {
  pros: string[];
  cons: string[];
};

export function ProsCons({ pros, cons }: Props) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
          Kelebihan
        </h3>
        <ul className="mt-3 space-y-2">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-ink-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-rose-800">
          Kekurangan
        </h3>
        <ul className="mt-3 space-y-2">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-ink-800">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
