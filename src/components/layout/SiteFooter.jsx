import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getPathForPageId } from "../../lib/routes";
import Reveal from "../ui/Reveal";

const socialIcons = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

const iconButtonClassNames = {
  email:
    "bg-white text-slate-600 shadow-[0_12px_28px_rgba(239,68,68,0.12)] hover:bg-red-50 hover:text-red-600 hover:shadow-[0_16px_34px_rgba(239,68,68,0.2)]",
  whatsapp:
    "bg-white text-slate-600 shadow-[0_12px_28px_rgba(34,197,94,0.14)] hover:bg-green-50 hover:text-green-600 hover:shadow-[0_16px_34px_rgba(34,197,94,0.22)]",
  instagram:
    "bg-white text-slate-600 shadow-[0_12px_28px_rgba(236,72,153,0.14)] hover:bg-pink-50 hover:text-pink-600 hover:shadow-[0_16px_34px_rgba(236,72,153,0.22)]",
  facebook:
    "bg-white text-slate-600 shadow-[0_12px_28px_rgba(59,130,246,0.14)] hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_16px_34px_rgba(59,130,246,0.22)]",
};

export default function SiteFooter({ content }) {
  const isRtl = content.direction === "rtl";
  const whatsappHref = content.siteDetails.whatsappHref ?? "https://wa.me/201127435060";
  const logoSrc = `${import.meta.env.BASE_URL}queue-logo.png`;
  const desktopAlign = "md:text-start";
  const year = new Date().getFullYear();
  const footerLegalLine = `© ${year} ${content.siteDetails.name}. ${content.ui.footerRights}`;

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,1)_100%)] px-5 py-14 text-slate-900 sm:px-6 sm:py-16">
      <Reveal className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white/86 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 md:p-10">
        <div className={`grid gap-10 ${desktopAlign} lg:grid-cols-[1.1fr_0.6fr_0.7fr]`}>
          <div className={`space-y-5 text-center ${desktopAlign}`}>
            <div className={"flex items-center justify-center gap-3 md:justify-start"}>
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_34px_rgba(15,23,42,0.08)]">
                <img src={logoSrc} alt={content.siteDetails.name} className="h-full w-full object-contain p-1.5" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-slate-950">{content.siteDetails.name}</p>
                <p className={`text-sm text-slate-400 ${isRtl ? "" : "uppercase tracking-[0.22em]"}`}>{content.siteDetails.shortTagline}</p>
              </div>
            </div>
            <p className="mx-auto max-w-xl text-base leading-7 text-slate-600 md:mx-0">
              {content.ui.footerSummary}
            </p>
          </div>

          <div className={`text-center ${desktopAlign}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{content.ui.footerNavigate}</p>
            <div className="mt-4 grid gap-2">
              {content.navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={getPathForPageId(item.id, content.locale)}
                  end={item.id === "home"}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 transition text-start ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className={"text-center md:text-start"}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{content.ui.footerConnect}</p>
            <div className="mt-4 flex flex-col items-center justify-center md:items-start">
              <div className={"flex gap-4"}>
                <a
                  href={`mailto:${content.siteDetails.email}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${iconButtonClassNames.email}`}
                  title={content.siteDetails.email}
                >
                  <FaEnvelope size={20} />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${iconButtonClassNames.whatsapp}`}
                  title="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
                {content.socialLinks.map((link) => {
                  const Icon = socialIcons[link.id];
                  const isExternal = link.href.startsWith("http");

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        iconButtonClassNames[link.id] ?? "bg-white text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.12)] hover:bg-slate-100 hover:text-slate-900"
                      }`}
                      title={link.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 ${
            "sm:flex-row sm:items-center sm:justify-between"
          } ${desktopAlign}`}
        >
          <p>{footerLegalLine}</p>
          <p>{content.siteDetails.shortTagline}</p>
        </div>
      </Reveal>
    </footer>
  );
}
