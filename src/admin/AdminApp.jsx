import { useCallback, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaEnvelope,
  FaFacebookF,
  FaFileCsv,
  FaInstagram,
  FaLock,
  FaSearch,
  FaSignOutAlt,
  FaSyncAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { countBy, LEAD_TYPES, lastNDays, normalizeLead, toCsv, dayKey, trialLinkMessage, whatsappLink } from "./leadData";

// Private dashboard at /admin. Access is enforced by Supabase: the `leads` table only returns
// rows to the admin account (row-level security). This page just signs in and displays them.

const TABS = [
  { id: "molarbear_trial", label: "MolarBear trials" },
  { id: "all", label: "All leads" },
  { id: "digital_audit", label: "Digital audits" },
  { id: "project", label: "Project inquiries" },
];

const RANGES = [
  { id: "all", label: "All time", days: null },
  { id: "today", label: "Today", days: 1 },
  { id: "7", label: "Last 7 days", days: 7 },
  { id: "30", label: "Last 30 days", days: 30 },
];

const SOURCE_ICONS = { facebook: FaFacebookF, instagram: FaInstagram };

function useNoIndex() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Admin | Queue Solutions";
    let meta = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    const previousRobots = meta.content;
    meta.content = "noindex, nofollow";
    return () => {
      document.title = previousTitle;
      meta.content = previousRobots;
    };
  }, []);
}

export default function AdminApp() {
  useNoIndex();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="ltr" lang="en">
      {session ? <Dashboard session={session} /> : <LoginScreen />}
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!supabase) {
      setError("Supabase is not configured on this build.");
      return;
    }
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (signInError) setError("Incorrect email or password.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-3">
          <img src="/queue-logo.png" alt="" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-bold text-slate-950">Queue Solutions</p>
            <p className="text-xs text-slate-500">Admin · Leads dashboard</p>
          </div>
        </div>
        <label className="mt-8 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-slate-400 focus:bg-white focus:outline-none"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-slate-400 focus:bg-white focus:outline-none"
          />
        </label>
        {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          <FaLock className="text-xs" /> {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ session }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("molarbear_trial");
  const [range, setRange] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: loadError } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5000);
    if (loadError) {
      setError(loadError.message);
      setLeads([]);
    } else {
      setLeads(data.map(normalizeLead));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetching on mount is the purpose of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const today = dayKey(new Date());
  const last7 = lastNDays(7);
  const trials = leads.filter((lead) => lead.type === "molarbear_trial");

  const rangeDays = RANGES.find((item) => item.id === range)?.days;
  const allowedDays = rangeDays ? new Set(lastNDays(rangeDays)) : null;
  const needle = query.trim().toLowerCase();
  const filtered = leads.filter((lead) => {
    if (tab !== "all" && lead.type !== tab) return false;
    if (allowedDays && !allowedDays.has(lead.day)) return false;
    if (!needle) return true;
    return [lead.name, lead.clinic, lead.city, lead.phone, lead.email, lead.source, lead.message].some((value) =>
      value.toLowerCase().includes(needle),
    );
  });

  const stats = [
    { label: "Trial downloads", value: trials.length, hint: "All time", accent: true },
    { label: "Downloads today", value: trials.filter((lead) => lead.day === today).length, hint: today },
    { label: "Last 7 days", value: trials.filter((lead) => last7.includes(lead.day)).length, hint: "Trial downloads" },
    { label: "All leads", value: leads.length, hint: "Trials, audits, projects" },
    { label: "Digital audits", value: leads.filter((lead) => lead.type === "digital_audit").length, hint: "Free audit requests" },
    { label: "Project inquiries", value: leads.filter((lead) => lead.type === "project").length, hint: "Contact form" },
  ];

  const chartDays = lastNDays(30);
  const perDay = chartDays.map((day) => ({ day, count: trials.filter((lead) => lead.day === day).length }));
  const maxPerDay = Math.max(1, ...perDay.map((item) => item.count));
  const sources = countBy(trials, "source");
  const cities = countBy(trials.filter((lead) => lead.city), "city").slice(0, 6);
  const follows = {
    facebook: trials.filter((lead) => lead.followed.includes("facebook")).length,
    instagram: trials.filter((lead) => lead.followed.includes("instagram")).length,
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `queue-leads-${tab}-${today}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <img src="/queue-logo.png" alt="" className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <p className="font-bold text-slate-950">Leads dashboard</p>
              <p className="text-xs text-slate-500">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FaSyncAlt className={`text-xs ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <FaSignOutAlt className="text-xs" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            Could not load leads: {error}
          </div>
        ) : null}
        {!loading && !error && leads.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            No leads are visible to this account yet. If you expected some, check that the admin read policy in Supabase uses{" "}
            <strong>{session.user.email}</strong>.
          </div>
        ) : null}

        {/* KPI cards */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border p-4 ${stat.accent ? "border-teal-200 bg-teal-600 text-white" : "border-slate-200 bg-white"}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${stat.accent ? "text-teal-100" : "text-slate-500"}`}>{stat.label}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums">{loading ? "–" : stat.value}</p>
              <p className={`mt-1 text-xs ${stat.accent ? "text-teal-100" : "text-slate-400"}`}>{stat.hint}</p>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-slate-950">Trial downloads · last 30 days</h2>
              <span className="text-xs text-slate-400">{perDay.reduce((sum, item) => sum + item.count, 0)} total</span>
            </div>
            <div className="mt-5 flex h-40 items-end gap-1">
              {perDay.map((item) => (
                <div key={item.day} className="group relative flex h-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t ${item.count ? "bg-teal-500 group-hover:bg-teal-600" : "bg-slate-100"}`}
                    style={{ height: `${item.count ? Math.max(8, (item.count / maxPerDay) * 100) : 4}%` }}
                  />
                  <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white group-hover:block">
                    {item.day.slice(5)}: {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>{chartDays[0].slice(5)}</span>
              <span>Today</span>
            </div>
          </div>

          <div className="grid gap-4">
            <BreakdownCard title="Where trials come from" rows={sources} total={trials.length} iconFor={(name) => SOURCE_ICONS[name]} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold text-slate-950">Social follows from the form</h2>
              <div className="mt-3 flex gap-3">
                <FollowStat icon={FaFacebookF} color="#1877f2" label="Facebook" value={follows.facebook} />
                <FollowStat icon={FaInstagram} color="#e1306c" label="Instagram" value={follows.instagram} />
              </div>
            </div>
          </div>
        </section>

        {cities.length ? <BreakdownCard title="Top cities (trials)" rows={cities} total={trials.length} horizontal /> : null}

        {/* Leads table */}
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {TABS.map((item) => {
                const count = item.id === "all" ? leads.length : leads.filter((lead) => lead.type === item.id).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      tab === item.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                    <span className={`rounded-md px-1.5 text-xs ${tab === item.id ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, clinic, phone..."
                  className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm focus:border-slate-400 focus:bg-white focus:outline-none"
                />
              </div>
              <select
                value={range}
                onChange={(event) => setRange(event.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700"
              >
                {RANGES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={exportCsv}
                disabled={!filtered.length}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
              >
                <FaFileCsv /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Clinic / Company</th>
                  <th className="px-4 py-3 font-semibold">City</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="w-8 px-2 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-slate-400">Loading leads...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-slate-400">No leads match these filters.</td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} open={openId === lead.id} onToggle={() => setOpenId(openId === lead.id ? null : lead.id)} />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
            Showing {filtered.length} of {leads.length} leads · times in Cairo time
          </p>
        </section>
      </main>
    </>
  );
}

function LeadRow({ lead, onToggle, open }) {
  const type = LEAD_TYPES[lead.type];
  const SourceIcon = SOURCE_ICONS[lead.source];

  return (
    <>
      <tr onClick={onToggle} className={`cursor-pointer transition hover:bg-slate-50 ${open ? "bg-slate-50" : ""}`}>
        <td className="whitespace-nowrap px-4 py-3 text-slate-500">{lead.dateLabel}</td>
        <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">{lead.name || "—"}</td>
        <td className="px-4 py-3 text-slate-700">{lead.clinic || "—"}</td>
        <td className="px-4 py-3 text-slate-700">{lead.city || "—"}</td>
        <td className="whitespace-nowrap px-4 py-3" onClick={(event) => event.stopPropagation()}>
          {lead.phone ? (
            <span className="inline-flex items-center gap-2">
              <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="font-medium text-slate-800 hover:underline" dir="ltr">
                {lead.phone}
              </a>
              <a href={whatsappLink(lead.phone)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-emerald-500 hover:text-emerald-600">
                <FaWhatsapp />
              </a>
            </span>
          ) : (
            "—"
          )}
        </td>
        <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
          {lead.email ? (
            <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-slate-700 hover:underline">
              <FaEnvelope className="text-xs text-slate-400" /> {lead.email}
            </a>
          ) : (
            "—"
          )}
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${type.tone}`}>{type.short}</span>
        </td>
        <td className="px-4 py-3 text-slate-600">
          {lead.source ? (
            <span className="inline-flex items-center gap-1.5 capitalize">
              {SourceIcon ? <SourceIcon className="text-xs" /> : null} {lead.source}
            </span>
          ) : (
            "—"
          )}
        </td>
        <td className="px-2 py-3 text-slate-400">
          <FaChevronDown className={`text-xs transition ${open ? "rotate-180" : ""}`} />
        </td>
      </tr>
      {open ? (
        <tr className="bg-slate-50">
          <td colSpan={9} className="px-4 pb-5 pt-1">
            <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_2fr]">
              <dl className="space-y-2 text-sm">
                <Detail label="Type" value={type.label} />
                <Detail label="Campaign" value={[lead.source, lead.medium, lead.campaign].filter(Boolean).join(" / ")} />
                <Detail label="Followed" value={lead.followed.join(", ")} />
                <Detail label="Version downloaded" value={lead.version} />
                <Detail label="Signed up on" value={lead.device} />
                <Detail label="Page" value={lead.pageUrl} />
              </dl>
              <div>
                {lead.type === "molarbear_trial" && lead.phone ? (
                  <a
                    href={whatsappLink(lead.phone, trialLinkMessage(lead))}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3.5 py-2 text-sm font-semibold text-white hover:brightness-105"
                  >
                    <FaWhatsapp /> Send download link on WhatsApp
                  </a>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full message</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{lead.message || "—"}</p>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex gap-3">
      <dt className="w-36 shrink-0 text-slate-400">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-slate-800">{value || "—"}</dd>
    </div>
  );
}

function BreakdownCard({ horizontal = false, iconFor, rows, title, total }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-bold text-slate-950">{title}</h2>
      {rows.length ? (
        <ul className={`mt-3 ${horizontal ? "grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2.5"}`}>
          {rows.map(([name, count]) => {
            const Icon = iconFor?.(name);
            return (
              <li key={name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 font-medium capitalize text-slate-700">
                    {Icon ? <Icon className="text-xs text-slate-400" /> : null}
                    {name}
                  </span>
                  <span className="tabular-nums text-slate-500">
                    {count} · {Math.round((count / Math.max(total, 1)) * 100)}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: `${(count / Math.max(total, 1)) * 100}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-400">No data yet.</p>
      )}
    </div>
  );
}

function FollowStat({ color, icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <Icon style={{ color }} />
      <div>
        <p className="text-xl font-bold tabular-nums">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

