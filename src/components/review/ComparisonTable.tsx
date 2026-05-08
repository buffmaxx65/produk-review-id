type Props = {
  headers: string[];
  rows: string[][];
};

export function ComparisonTable({ headers, rows }: Props) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-ink-200">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-ink-900 text-white">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold first:rounded-tl-2xl last:rounded-tr-2xl"
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
              className={ri % 2 === 0 ? "bg-white" : "bg-ink-50"}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-t border-ink-200 px-4 py-3 align-top text-ink-800"
                >
                  {ci === 0 ? (
                    <span className="font-semibold text-ink-900">{cell}</span>
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
