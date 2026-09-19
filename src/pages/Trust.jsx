import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";

const sections = [
  [
    "terms",
    "Terms of service",
    "Orders are accepted by the selected bakery and are subject to its confirmed availability, lead time, and fulfilment method. Customers should review the order summary before confirming.",
  ],
  [
    "privacyPolicy",
    "Privacy policy",
    "Cakely uses the information supplied during browsing, account setup, customization, and checkout to provide the requested service. We do not display private customer information publicly.",
  ],
  [
    "refunds",
    "Refunds and cancellations",
    "Cancellation, refund, and replacement decisions depend on order status, preparation progress, and the bakery’s published policy. Contact support as soon as an issue appears.",
  ],
  [
    "allergy",
    "Allergy and food safety",
    "Cake descriptions and customer notes are not a guarantee of an allergen-free environment. Tell the bakery about allergies before ordering and contact the bakery directly when ingredients are critical.",
  ],
  [
    "deliveryPolicy",
    "Delivery and pickup",
    "Delivery windows are estimates until confirmed by the bakery. Customers should provide accurate address and contact details and be available during the selected window.",
  ],
];

export function PoliciesPage() {
  const { t, locale } = useLocale();
  const isAm = locale === "am";
  const translated = {
    terms: t("account.terms"),
    privacyPolicy: t("account.privacyPolicy"),
    refunds: t("account.refunds"),
    allergy: t("account.allergy"),
    deliveryPolicy: t("account.deliveryPolicy"),
  };
  return (
    <section className="trust-page page-width">
      <Link className="back-link" to="/">
        {" "}
        <ArrowLeft size={15} aria-hidden="true" />{" "}
        {isAm ? "ወደ መነሻ" : "Back to home"}
      </Link>
      <div className="trust-hero">
        <div>
          <p className="section-kicker">{t("account.policy")}</p>
          <h1>{t("account.legalTitle")}</h1>
          <p>{t("account.legalIntro")}</p>
        </div>
        <ShieldCheck size={52} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <div className="trust-grid">
        {sections.map(([key, _title, body], index) => (
          <article className="trust-card" key={key}>
            <span className="trust-number">0{index + 1}</span>
            <h2>{translated[key]}</h2>
            <p>{isAm ? amBodies[key] : body}</p>
          </article>
        ))}
      </div>
      <div className="trust-callout">
        <UtensilsCrossed size={22} aria-hidden="true" />
        <div>
          <h2>{t("account.shareData")}</h2>
          <p>
            {isAm
              ? "የትዕዛዝ መረጃ ኬክዎን ከሚያዘጋጅ ዳቦ ቤት ጋር ብቻ ይጋራል።"
              : "Your order details are shared only with the bakery preparing your cake and the service partners needed to fulfil it."}
          </p>
        </div>
      </div>
    </section>
  );
}

const amBodies = {
  terms:
    "ትዕዛዞች የሚቀበሉት በመረጡት ዳቦ ቤት ነው፤ በተረጋገጠ መገኘት፣ የዝግጅት ጊዜ እና የማድረሻ መንገድ ይመራሉ። ከማረጋገጥዎ በፊት የትዕዛዝ ማጠቃለያውን ይመልከቱ።",
  privacyPolicy:
    "ካክሊ በማሰስ፣ መለያ በመፍጠር፣ በማበጀት እና በክፍያ ጊዜ የሚሰጡትን መረጃ የጠየቁትን አገልግሎት ለመስጠት ይጠቀማል። የግል መረጃዎን በህዝብ ላይ አናሳይም።",
  refunds:
    "የስረዛ፣ የመመለሻ እና የመተካት ውሳኔ በትዕዛዝ ሁኔታ፣ በዝግጅት ሂደት እና በዳቦ ቤቱ መመሪያ ይወሰናል። ችግር ሲከሰት በፍጥነት ድጋፍን ያግኙ።",
  allergy:
    "የኬክ መግለጫዎች እና የደንበኛ ማስታወሻዎች ከአለርጂ ነፃ አካባቢ ዋስትና አይደሉም። ከማዘዝዎ በፊት ስለ አለርጂ ለዳቦ ቤቱ ይንገሩ።",
  deliveryPolicy:
    "የማድረሻ ጊዜዎች ዳቦ ቤቱ እስኪያረጋግጥ ድረስ ግምታዊ ናቸው። ትክክለኛ አድራሻና ስልክ ይስጡ እና በተመረጠው ጊዜ ይገኙ።",
};

export function SupportPage() {
  const { t, locale } = useLocale();
  const isAm = locale === "am";
  const [mailReady, setMailReady] = useState(false);
  function prepareEmail(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Cakely support${form.get("order") ? ` — ${form.get("order")}` : ""}`;
    const body = `Reply-to: ${form.get("email")}\\nOrder: ${form.get("order") || "Not supplied"}\\n\\n${form.get("details")}`;
    window.location.href = `mailto:hello@cakely.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailReady(true);
  }
  return (
    <section className="support-page page-width">
      <div className="support-hero">
        <div>
          <p className="section-kicker">{t("account.support")}</p>
          <h1>{t("account.supportTitle")}</h1>
          <p>{t("account.supportCopy")}</p>
        </div>
        <Mail size={48} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <div className="support-options">
        <a className="support-option" href="mailto:hello@cakely.example">
          <Mail size={20} aria-hidden="true" />
          <span>
            <strong>{t("account.emailSupport")}</strong>
            <small>hello@cakely.example</small>
          </span>
        </a>
        <a className="support-option" href="tel:+251911234567">
          <Truck size={20} aria-hidden="true" />
          <span>
            <strong>{isAm ? "የማድረሻ ጥያቄ" : "Delivery question"}</strong>
            <small>+251 91 123 4567</small>
          </span>
        </a>
      </div>
      <section className="support-form-card">
        <h2>{t("account.supportFormTitle")}</h2>
        <p>{t("account.supportMailNote")}</p>
        <form className="support-form" onSubmit={prepareEmail}>
          <label className="field">
            <span className="form-label">{t("account.supportEmail")}</span>
            <input
              className="form-input"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="field">
            <span className="form-label">{t("account.supportOrder")}</span>
            <input className="form-input" name="order" autoComplete="off" />
          </label>
          <label className="field">
            <span className="form-label">{t("account.supportDetails")}</span>
            <textarea className="form-textarea" name="details" required />
          </label>
          <button className="btn-berry" type="submit">
            {t("account.supportSubmit")}
          </button>
          {mailReady && (
            <p className="field-success" role="status">
              {t("account.supportMailNote")}
            </p>
          )}
        </form>
      </section>
      <div className="support-note">
        <p>
          {isAm
            ? "ስለ አለርጂ፣ የተወሰነ ቀን ወይም የነባር ትዕዛዝ በተቻለ ፍጥነት ይጻፉልን።"
            : "For allergies, a time-sensitive celebration, or an existing order, contact us as early as possible so the bakery has time to help."}
        </p>
        <Link className="btn-berry" to="/policies">
          {t("account.policy")}
        </Link>
      </div>
    </section>
  );
}
