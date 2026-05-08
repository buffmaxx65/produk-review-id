type Props = {
  specs: { label: string; value: string }[];
};

export function SpecsTable({ specs }: Props) {
  return (
    <div className="my-8 border-y border-ink-200">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {specs.map((row, i) => (
            <tr
              key={i}
              className="border-b border-ink-200 last:border-b-0"
            >
              <th className="w-1/3 py-3 pr-5 text-left text-xs font-semibold uppercase tracking-wider text-ink-500">
                {row.label}
              </th>
              <td className="py-3 text-ink-900">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
