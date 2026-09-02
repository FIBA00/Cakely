// Patisserie Postcard: cake cards act like small counter cards—image-led, quickly actionable, never generic.
import { Eye, Heart, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCartStore } from "../store/useCartStore";
import { useAppStore } from "../store/useAppStore";
import { formatPrice } from "../lib/format";
import { useLocale } from "../contexts/LocaleContext";

export default function CakeCard({ cake, compact = false }) {
  const { t } = useLocale();
  const addItem = useCartStore((state) => state.addItem);
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(cake.id);

  function addToCart() {
    if (!cake.available) return;
    addItem({ lineId: `${cake.id}-standard`, id: cake.id, name: cake.name, image: cake.image, price: cake.price, quantity: 1, customization: `${cake.sizes[0].label} · ${cake.flavor}` });
    toast.success(`${cake.name} is in your ${t("nav.cart").toLowerCase()}.`);
  }

  function favorite() {
    toggleFavorite(cake.id);
    toast.success(isFavorite ? t("common.removed") : t("common.saved"));
  }

  return <article className={`cake-card ${compact ? "cake-card-compact" : ""}`}>
    <Link className="block" to={`/shop/${cake.id}`} aria-label={`View ${cake.name}`}>
      <div className="cake-image-wrap">
        <img loading="lazy" src={cake.image} alt={cake.name} onError={(event) => { event.currentTarget.src = "/manus-storage/cakely-hero-cake_77bb3de3.jpg"; }} />
        {cake.badge && <span className="cake-badge"><Sparkles size={13} /> {cake.badge}</span>}
        {!cake.available && <span className="sold-out">{t("common.backSoon")}</span>}
      </div>
      <div className="px-1 pt-4"><p className="eyebrow">{cake.category}</p><div className="mt-1 flex items-start justify-between gap-2"><h3 className="font-display text-[1.55rem] leading-none text-[#30201b]">{cake.name}</h3><span className="price">{formatPrice(cake.price)}</span></div><p className="mt-2 text-sm text-[#7d6258]">{cake.flavor}</p>{cake.dietary?.length > 1 && <div className="dietary-card-tags" aria-label={`Dietary options: ${cake.dietary.join(", ")}`}>{cake.dietary.filter((tag) => tag !== "Vegetarian").map((tag) => <span key={tag}>{tag}</span>)}</div>}</div>
    </Link>
    <div className="cake-card-actions"><button className="icon-button" onClick={favorite} aria-label={isFavorite ? `Remove ${cake.name} from favorites` : `Save ${cake.name} to favorites`}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button><Link className="icon-button" to={`/shop/${cake.id}`} aria-label={`Quick view ${cake.name}`}><Eye size={18} /></Link></div>
    <button disabled={!cake.available} className="card-add" onClick={addToCart}><Plus size={17} /> {cake.available ? t("common.addToCart") : t("common.unavailable")}</button>
  </article>;
}
