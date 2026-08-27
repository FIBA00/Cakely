// Patisserie Postcard: cart review is practical yet warm—each cake’s finish remains legible at a glance.
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { EmptyState } from "../components/StateViews";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../lib/format";
import { calculateDelivery } from "../lib/orderMath";
import { useLocale } from "../contexts/LocaleContext";

export default function Cart() {
  const { t } = useLocale();
  const items = useCartStore((state) => state.items); const subtotal = useCartStore((state) => state.subtotal()); const updateQuantity = useCartStore((state) => state.updateQuantity); const removeItem = useCartStore((state) => state.removeItem); const delivery = calculateDelivery(subtotal); const total = subtotal + delivery;
  if (!items.length) return <section className="page-width cart-page"><div className="cart-head"><p className="section-kicker">{t("cart.kicker")}</p><h1>{t("cart.title")}</h1></div><EmptyState title={t("cart.emptyTitle")} description={t("cart.emptyCopy")} /></section>;
  return <section className="page-width cart-page"><div className="cart-head"><div><p className="section-kicker">{t("cart.kicker")}</p><h1>{t("cart.good")}</h1></div><Link className="text-link" to="/shop">{t("cart.continue")} <ArrowRight size={16} /></Link></div><div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={item.lineId}><img src={item.image} alt={item.name} /><div className="cart-item-copy"><p className="eyebrow">{t("cart.made")}</p><h2>{item.name}</h2><p>{item.customization}</p><button className="remove-link" onClick={() => { removeItem(item.lineId); toast.success(t("cart.remove")); }}><Trash2 size={14} /> {t("cart.remove")}</button></div><div className="cart-item-controls"><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.lineId, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.lineId, item.quantity + 1)}><Plus size={14} /></button></div><strong>{formatPrice(item.price * item.quantity)}</strong></div></article>)}</div><aside className="order-summary"><p className="eyebrow">{t("cart.summary")}</p><h2>{t("cart.ready")}</h2><div className="summary-row"><span>{t("cart.subtotal")}</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>{t("cart.delivery")}</span><strong>{delivery ? formatPrice(delivery) : t("cart.included")}</strong></div><p className="delivery-hint">{subtotal < 90 ? `${formatPrice(90 - subtotal)} away from included delivery.` : t("cart.included")}</p><div className="summary-total"><span>{t("cart.total")}</span><strong>{formatPrice(total)}</strong></div><Link className="btn-berry w-full" to="/checkout">{t("cart.checkout")} <ArrowRight size={17} /></Link><p className="summary-safe"><ShoppingBag size={15} /> {t("cart.safe")}</p></aside></div></section>;
}
