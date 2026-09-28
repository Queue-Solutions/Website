import { FaPlus } from "react-icons/fa";

export default function FaqList({ items }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4 text-start sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-950 [&::-webkit-details-marker]:hidden">
            {item.q}
            <FaPlus className="shrink-0 text-xs text-slate-400 transition group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
