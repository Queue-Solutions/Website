import { FaCheck, FaStar } from "react-icons/fa";
import { trackLeadClick } from "../../lib/analytics";
import { PRICING } from "../../content/products";
import { formatPrice } from "../../lib/format";

export default function PricingPlans({ accent, copy, locale, productId, productTitle, setShowForm, ui }) {
  const plans = PRICING[productId];
  const single = plans.length === 1;

  return (
    <div className={`mx-auto grid gap-5 ${single ? "max-w-md" : "max-w-5xl md:grid-cols-3"}`}>
      {plans.map((plan) => {
        const planCopy = copy.plans[plan.id];
        const featured = plan.featured && !single;

        return (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[1.75rem] border bg-white p-6 text-start sm:p-7 ${
              featured ? "border-transparent shadow-[0_28px_70px_rgba(15,23,42,0.18)] md:-translate-y-3" : "border-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
            }`}
            style={featured ? { boxShadow: `0 0 0 2px ${accent}, 0 28px 70px rgba(15,23,42,0.16)` } : undefined}
          >
            {featured ? (
              <span
                className="absolute -top-3 start-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: accent }}
              >
                <FaStar className="text-[9px]" /> {ui.pricing.popular}
              </span>
            ) : null}

            <h3 className="text-lg font-bold text-slate-950">{planCopy.name}</h3>
            <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-500">{planCopy.audience}</p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-500">{ui.pricing.currency}</span>
              <span className="text-4xl font-bold tracking-tight text-slate-950">{formatPrice(plan.price, locale)}</span>
              <span className="text-sm font-medium text-slate-500">{plan.period === "year" ? ui.pricing.perYear : ui.pricing.oneTime}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
              {planCopy.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                  <FaCheck className="mt-1.5 shrink-0 text-[11px]" style={{ color: accent }} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                trackLeadClick("pricing_plan", `${productId}:${plan.id}`);
                setShowForm(`${ui.modal.demoPrefix} ${productTitle} (${planCopy.name}).`);
              }}
              className={`mt-7 inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
                featured || single ? "text-white hover:brightness-110" : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              }`}
              style={featured || single ? { backgroundColor: accent } : undefined}
            >
              {ui.pricing.choose}
            </button>
          </div>
        );
      })}
    </div>
  );
}
