// Patisserie Postcard: route groups share one accessible counter shell, with practical escapes and page-title updates.
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import AppShell from "./components/AppShell";
import { LoadingState } from "./components/StateViews";
import { useAppStore } from "./store/useAppStore";
import { hasOwnerAccess } from "./services/auth.service";
import { LocaleProvider, useLocale } from "./contexts/LocaleContext";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const CakeDetail = lazy(() => import("./pages/CakeDetail"));
const CustomCake = lazy(() => import("./pages/CustomCake"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderPages").then((module) => ({ default: module.OrderSuccess })));
const OrderTracking = lazy(() => import("./pages/OrderPages").then((module) => ({ default: module.OrderTracking })));
const AccountLayout = lazy(() => import("./pages/Account").then((module) => ({ default: module.AccountLayout })));
const AccountOrdersPage = lazy(() => import("./pages/Account").then((module) => ({ default: module.AccountOrdersPage })));
const AccountPlaceholder = lazy(() => import("./pages/Account").then((module) => ({ default: module.AccountPlaceholder })));
const AddressesPage = lazy(() => import("./pages/Account").then((module) => ({ default: module.AddressesPage })));
const FavoritesPage = lazy(() => import("./pages/Account").then((module) => ({ default: module.FavoritesPage })));
const SettingsPage = lazy(() => import("./pages/Account").then((module) => ({ default: module.SettingsPage })));
const ProfilePage = lazy(() => import("./pages/Account").then((module) => ({ default: module.ProfilePage })));
const AuthPage = lazy(() => import("./pages/Auth").then((module) => ({ default: module.AuthPage })));
const PasswordPage = lazy(() => import("./pages/Auth").then((module) => ({ default: module.PasswordPage })));
const AboutPage = lazy(() => import("./pages/PublicPages").then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import("./pages/PublicPages").then((module) => ({ default: module.ContactPage })));
const PoliciesPage = lazy(() => import("./pages/Trust").then((module) => ({ default: module.PoliciesPage })));
const SupportPage = lazy(() => import("./pages/Trust").then((module) => ({ default: module.SupportPage })));
const AdminCakes = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminCakes })));
const AdminDashboard = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminDashboard })));
const AdminGeneric = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminGeneric })));
const AdminLayout = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminLayout })));
const AdminOrders = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminOrders })));
const AdminModeration = lazy(() => import("./pages/Admin").then((module) => ({ default: module.AdminModeration })));
const OwnerWorkspace = lazy(() => import("./pages/Owner"));
const BakeryMarketplace = lazy(() => import("./pages/Marketplace").then((module) => ({ default: module.BakeryMarketplace })));
const BakeryStorefront = lazy(() => import("./pages/Marketplace").then((module) => ({ default: module.BakeryStorefront })));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollAndTitle() {
  const { pathname } = useLocation(); const { locale } = useLocale();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const copy = locale === "am" ? { title: "Cakely — ለወቅትዎ ኬኮች", description: "ለማይረሱ ወቅቶች በእጅ የሚዘጋጁ የበዓል ኬኮች።" } : { title: "Cakely — Cakes for your moments", description: "Thoughtful celebration cakes made to order by independent bakery counters." };
    const titles = { "/": copy.title, "/shop": locale === "am" ? "ኬኮች — Cakely" : "Shop cakes — Cakely", "/custom-cake": locale === "am" ? "ኬክዎን ይፍጠሩ — Cakely" : "Create your cake — Cakely", "/cart": locale === "am" ? "ቅርጫት — Cakely" : "Your cart — Cakely", "/checkout": locale === "am" ? "ክፍያ — Cakely" : "Checkout — Cakely", "/about": locale === "am" ? "የእኛ ኩሽና — Cakely" : "Our kitchen — Cakely", "/contact": locale === "am" ? "ያግኙን — Cakely" : "Contact — Cakely", "/policies": locale === "am" ? "መመሪያዎች — Cakely" : "Policies — Cakely", "/support": locale === "am" ? "ድጋፍ — Cakely" : "Support — Cakely" };
    document.title = titles[pathname] || copy.title;
    document.documentElement.lang = locale === "am" ? "am" : "en";
    const canonical = document.querySelector('link[rel="canonical"]'); if (canonical) canonical.href = `${window.location.origin}${pathname}`;
    const description = document.querySelector('meta[name="description"]'); if (description) description.content = copy.description;
    const ogTitle = document.querySelector('meta[property="og:title"]'); if (ogTitle) ogTitle.content = document.title;
    const ogDescription = document.querySelector('meta[property="og:description"]'); if (ogDescription) ogDescription.content = copy.description;
  }, [pathname, locale]);
  return null;
}

function PublicFrame() { return <AppShell><Outlet /></AppShell>; }
function NotFoundFrame() { return <AppShell><NotFound /></AppShell>; }
function RequireUser() { const user = useAppStore((state) => state.user); const location = useLocation(); return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />; }
function RequireOwner() { const user = useAppStore((state) => state.user); const location = useLocation(); return hasOwnerAccess(user) ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />; }
function RequireAdmin() { const user = useAppStore((state) => state.user); return user?.role === "admin" ? <Outlet /> : <Navigate to="/account" replace />; }
function Fallback() { return <div className="page-width py-24"><LoadingState /></div>; }

export default function App() {
  return <LocaleProvider><ScrollAndTitle /><Toaster position="top-center" richColors closeButton /><Suspense fallback={<Fallback />}><Routes>
    <Route element={<PublicFrame />}>
      <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/shop/:cakeId" element={<CakeDetail />} /><Route path="/bakeries" element={<BakeryMarketplace />} /><Route path="/bakeries/:slug" element={<BakeryStorefront />} /><Route path="/custom-cake" element={<CustomCake />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/order/success/:orderId" element={<OrderSuccess />} /><Route path="/orders/:orderId" element={<OrderTracking />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/policies" element={<PoliciesPage />} /><Route path="/support" element={<SupportPage />} /><Route path="/login" element={<AuthPage />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route path="/forgot-password" element={<PasswordPage />} /><Route path="/reset-password" element={<PasswordPage reset />} />
      <Route element={<RequireUser />}><Route path="/account" element={<AccountLayout />}><Route index element={<ProfilePage />} /><Route path="orders" element={<AccountOrdersPage />} /><Route path="favorites" element={<FavoritesPage />} /><Route path="addresses" element={<AddressesPage />} /><Route path="settings" element={<SettingsPage />} /></Route></Route>
    </Route>
    <Route element={<RequireOwner />}><Route path="/owner" element={<OwnerWorkspace />} /></Route>
    <Route element={<RequireAdmin />}><Route path="/admin" element={<AdminLayout />}><Route index element={<AdminDashboard />} /><Route path="cakes" element={<AdminCakes />} /><Route path="categories" element={<AdminGeneric title="Categories" />} /><Route path="orders" element={<AdminOrders />} /><Route path="customers" element={<AdminGeneric title="Customers" />} /><Route path="moderation" element={<AdminModeration />} /></Route></Route>
    <Route path="*" element={<NotFoundFrame />} />
  </Routes></Suspense></LocaleProvider>;
}
