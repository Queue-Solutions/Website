import { FaQuoteLeft } from "react-icons/fa";

// Renders nothing until at least one testimonial is approved in content/testimonials.js.
export default function Testimonials({ items, title }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {title ? <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2> : null}
      <div className={`mx-auto grid gap-5 ${items.length > 1 ? "max-w-6xl md:grid-cols-2" : "max-w-3xl"}`}>
        {items.map((item) => (
          <figure key={item.quote} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-start shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:p-7">
            <FaQuoteLeft className="text-xl text-purple-300 rtl:-scale-x-100" />
            <blockquote className="mt-4 text-[17px] leading-8 text-slate-800">{item.quote}</blockquote>
            <figcaption className="mt-5 border-t border-slate-100 pt-4">
              <p className="font-semibold text-slate-950">{item.author}</p>
              <p className="text-sm text-slate-500">{item.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
