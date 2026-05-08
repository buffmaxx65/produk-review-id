type Props = {
  headers: string[];
  rows: string[][];
};

export function ComparisonTable({ headers, rows }: Props) {
  return (
    <div className="my-8 overflow-x-auto border-y border-ink-200">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-ink-900">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-900"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-ink-200 last:border-b-0"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 align-top text-ink-800"
                >
                  {ci === 0 ? (
                    <span className="font-serif text-base font-medium text-ink-900">
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
