type Props = {
  specs: { label: string; value: string }[];
};

export function SpecsTable({ specs }: Props) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-ink-200">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {specs.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-ink-50"}
            >
              <th className="w-1/3 border-b border-ink-200 px-5 py-3 text-left font-medium text-ink-700">
                {row.label}
              </th>
              <td className="border-b border-ink-200 px-5 py-3 text-ink-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
