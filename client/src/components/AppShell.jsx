// Patisserie Postcard: global navigation behaves like a calm bakery counter—sticky, context-aware, and direct.
import { CakeSlice, CircleUserRound, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assetUrls } from "../data/mockData";
import { useCartStore } from "../store/useCartStore";
import { useAppStore } from "../store/useAppStore";
import { registerSW } from "virtual:pwa-register";
import { useLocale } from "../contexts/LocaleContext";

function Brand() {
  return <Link className="brand" to="/" aria-label="Cakely home"><span className="brand-mark"><img src={assetUrls.logo} alt="" /><CakeSlice aria-hidden="true" /></span><span>Cakely</span></Link>;
}

export default function AppShell({ children }) {
  const { locale, setLocale, t } = useLocale();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const updateServiceWorker = useRef(null);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => { try { return localStorage.getItem("cakely-analytics-consent"); } catch { return null; } });
  const [installPrompt, setInstallPrompt] = useState(null);
  const [search, setSearch] = useState("");
  const itemCount = useCartStore((state) => state.itemCount());
  const user = useAppStore((state) => state.user);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    const goOffline = () => setOffline(true); const goOnline = () => setOffline(false);
    window.addEventListener("scroll", handleScroll); window.addEventListener("offline", goOffline); window.addEventListener("online", goOnline);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("offline", goOffline); window.removeEventListener("online", goOnline); };
  }, []);
  useEffect(() => {
    updateServiceWorker.current = registerSW({ onNeedRefresh() { setUpdateAvailable(true); } });
  }, []);
  useEffect(() => {
    const captureInstall = (event) => { event.preventDefault(); setInstallPrompt(event); }; const installed = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", captureInstall); window.addEventListener("appinstalled", installed);
    return () => { window.removeEventListener("beforeinstallprompt", captureInstall); window.removeEventListener("appinstalled", installed); };
  }, []);
  useEffect(() => {
    if (analyticsConsent !== "accepted" || document.querySelector("[data-cakely-analytics]")) return;
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT; const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
    if (!endpoint || !websiteId) return;
    const script = document.createElement("script"); script.defer = true; script.src = endpoint.replace(/\/$/, "") + "/umami"; script.dataset.websiteId = websiteId; script.dataset.cakelyAnalytics = "true"; document.head.appendChild(script);
  }, [analyticsConsent]);
  function chooseAnalytics(value) { try { if (value) localStorage.setItem("cakely-analytics-consent", value); else localStorage.removeItem("cakely-analytics-consent"); } catch { /* Consent remains session-only when storage is unavailable. */ } setAnalyticsConsent(value); }
  async function installApp() { if (!installPrompt) return; await installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null); }
  useEffect(() => {
    if (!menuOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    const drawer = drawerRef.current;
    const focusable = () => drawer?.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])') || [];
    function handleKeyDown(event) {
      if (event.key === "Escape") { setMenuOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = [...focusable()];
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => focusable()[0]?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => (previousFocusRef.current instanceof HTMLElement ? previousFocusRef.current : menuButtonRef.current)?.focus());
    };
  }, [menuOpen]);
  function submitSearch(event) { event.preventDefault(); navigate(`/shop${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`); setMenuOpen(false); }
  const navItems = [{ to: "/", label: t("nav.home") }, { to: "/shop", label: t("nav.shop") }, { to: "/bakeries", label: t("nav.bakeries") }, { to: "/custom-cake", label: t("nav.custom") }, { to: "/about", label: t("nav.kitchen") }, { to: "/contact", label: t("nav.contact") }];
  return <div className={`min-h-screen bg-[#fffaf5] text-[#30201b] locale-${locale}`}>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    {offline && <div className="offline-bar">{t("common.offline")}</div>}
    {updateAvailable && <div className="update-bar"><span>{t("common.updateReady")}</span><button onClick={() => updateServiceWorker.current?.(true)}>{t("common.refresh")}</button></div>}
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "nav-active" : ""}>{item.label}</NavLink>)}</nav>
        <div className="header-actions"><form className="header-search" onSubmit={submitSearch}><Search size={17} /><input aria-label={t("common.search")} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("common.search")} /></form><LanguageSwitcher locale={locale} setLocale={setLocale} label={t("common.language")} /><Link className="header-icon desktop-account" to={user ? "/account" : "/login"} aria-label={t("nav.account")}><CircleUserRound size={21} /></Link><Link className="header-icon cart-link" to="/cart" aria-label={`${t("nav.cart")} with ${itemCount} item${itemCount === 1 ? "" : "s"}`}><ShoppingBag size={21} />{itemCount > 0 && <span>{itemCount}</span>}</Link><button ref={menuButtonRef} className="header-icon mobile-menu" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation-drawer" onClick={() => setMenuOpen(true)}><Menu size={22} /></button></div>
      </div>
    </header>
    <AnimatePresence>{menuOpen && <motion.div ref={drawerRef} id="mobile-navigation-drawer" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" tabIndex={-1} initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}><div className="flex items-center justify-between"><Brand /><button className="header-icon" onClick={() => setMenuOpen(false)} aria-label={t("common.close")}><X /></button></div><LanguageSwitcher locale={locale} setLocale={setLocale} label={t("common.language")} mobile /><form className="drawer-search" onSubmit={submitSearch}><Search size={18} /><input autoFocus aria-label={t("common.search")} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("common.search")} /></form><nav aria-label="Mobile navigation">{navItems.map((item, index) => <NavLink key={item.to} onClick={() => setMenuOpen(false)} style={{ transitionDelay: `${index * 30}ms` }} to={item.to}>{item.label}</NavLink>)}<NavLink onClick={() => setMenuOpen(false)} to={user ? "/account" : "/login"}>{user ? t("nav.account") : t("common.signIn")}</NavLink>{user && ["owner", "admin"].includes(user.role) && <NavLink onClick={() => setMenuOpen(false)} to="/owner">{t("owner.workspace")}</NavLink>}</nav><Link to="/custom-cake" className="btn-berry mt-8" onClick={() => setMenuOpen(false)}>{t("nav.custom")} <CakeSlice size={17} /></Link></motion.div>}</AnimatePresence>
    <main id="main-content" tabIndex="-1">{children}</main>
    {installPrompt && <aside className="install-prompt" aria-label={t("common.installTitle")}><div><strong>{t("common.installTitle")}</strong><p>{t("common.installCopy")}</p></div><div className="install-prompt-actions"><button type="button" className="btn-soft" onClick={() => setInstallPrompt(null)}>{t("common.installLater")}</button><button type="button" className="btn-berry" onClick={installApp}>{t("common.installButton")}</button></div></aside>}
    <footer className="site-footer"><div className="footer-grid"><div><Brand /><p className="mt-5 max-w-xs text-sm leading-6 text-[#a58c80]">{t("footer.copy")}</p></div><div><p className="footer-label">{t("footer.explore")}</p><Link to="/shop">{t("nav.shop")}</Link><Link to="/custom-cake">{t("footer.custom")}</Link><Link to="/account/orders">{t("footer.orders")}</Link></div><div><p className="footer-label">{t("footer.studio")}</p><Link to="/about">{t("nav.kitchen")}</Link><Link to="/contact">{t("nav.contact")}</Link><Link to="/policies">{t("account.policy")}</Link><Link to="/support">{t("account.support")}</Link><a href="mailto:hello@cakely.example">hello@cakely.example</a></div><div><p className="footer-label">{t("footer.note")}</p><p className="text-sm leading-6 text-[#a58c80]">{t("footer.question")}</p><Link to="/custom-cake" className="footer-link-strong">{t("footer.start")} <span>→</span></Link></div></div><div className="footer-bottom"><span>© 2026 Cakely</span><span>{t("footer.made")}</span><button type="button" className="privacy-settings-link" onClick={() => chooseAnalytics(null)}>{t("common.analyticsSettings")}</button></div></footer>{analyticsConsent === null && <aside className="analytics-consent" aria-label={t("common.analyticsTitle")}><div><strong>{t("common.analyticsTitle")}</strong><p>{t("common.analyticsCopy")}</p></div><div className="analytics-consent-actions"><button type="button" className="btn-soft" onClick={() => chooseAnalytics("declined")}>{t("common.analyticsDecline")}</button><button type="button" className="btn-berry" onClick={() => chooseAnalytics("accepted")}>{t("common.analyticsAccept")}</button></div></aside>}
    <nav className="mobile-bottom-nav" aria-label="Quick navigation"><NavLink to="/"><CakeSlice size={18} /><span>{t("nav.home")}</span></NavLink><NavLink to="/shop"><Search size={18} /><span>{t("nav.shop")}</span></NavLink><NavLink to="/custom-cake" className="custom-nav"><span>+</span><small>{t("nav.custom")}</small></NavLink><NavLink to="/account/orders"><ShoppingBag size={18} /><span>{t("nav.orders")}</span></NavLink><NavLink to="/account"><CircleUserRound size={18} /><span>{t("nav.account")}</span></NavLink></nav>
  </div>;
}

function LanguageSwitcher({ locale, setLocale, label, mobile = false }) { return <div className={`language-switcher ${mobile ? "language-switcher-mobile" : ""}`} aria-label={label}><button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button><button aria-pressed={locale === "am"} onClick={() => setLocale("am")}>አማ</button></div>; }
