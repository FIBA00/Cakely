// Patisserie Postcard: the product page moves from visual appetite to a confident, tailored order.
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getCakeById } from "../services/cakes.service";
import { ErrorState, LoadingState } from "../components/StateViews";
import { useCartStore } from "../store/useCartStore";
import { useAppStore } from "../store/useAppStore";
import { formatPrice } from "../lib/format";
import ProductReviews from "../components/ProductReviews";
import { getCakeReviews } from "../services/reviews.service";
import { useLocale } from "../contexts/LocaleContext";

export default function CakeDetail() {
  const { t, labelOf } = useLocale();
  const { cakeId } = useParams();
  const navigate = useNavigate();
  const {
    data: cake,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cake", cakeId],
    queryFn: () => getCakeById(cakeId),
  });
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["cake-reviews", cakeId],
    queryFn: () => getCakeReviews(cakeId),
  });
  const [image, setImage] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const favorites = useAppStore(state => state.favorites);
  const toggleFavorite = useAppStore(state => state.toggleFavorite);
  if (isLoading)
    return (
      <div className="page-width py-24">
        <LoadingState label={t("product.loading")} />
      </div>
    );
  if (isError)
    return (
      <div className="page-width py-24">
        <ErrorState error={error} retry={refetch} />;
      </div>
    );
  const selectedSize = cake.sizes[sizeIndex];
  const favorite = favorites.includes(cake.id);
  function addToCart(next = false) {
    if (!cake.available) return;
    addItem({
      lineId: `${cake.id}-${selectedSize.label}`,
      id: cake.id,
      name: cake.name,
      image: cake.image,
      price: selectedSize.price,
      quantity,
      customization: `${selectedSize.label} · ${cake.flavor}`,
    });
    toast.success(`${cake.name} is in your cart.`);
    if (next) navigate("/cart");
  }
  return (
    <section className="detail-page page-width">
      <Link className="back-link" to="/shop">
        <ArrowLeft size={16} aria-hidden="true" /> {t("product.back")}
      </Link>
      <div className="detail-layout">
        <div className="gallery">
          <div className="main-cake-image">
            <img
              src={cake.gallery[image]}
              alt={`${cake.name}, ${t("product.view")} ${image + 1}`}
            />
          </div>
          <div className="gallery-thumbs" aria-label={`${cake.name} gallery`}>
            {cake.gallery.map((src, index) => (
              <button
                type="button"
                key={src}
                aria-label={`${t("product.view")} ${index + 1} of ${cake.name}`}
                className={index === image ? "selected" : ""}
                onClick={() => setImage(index)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-topline">
            <p className="eyebrow">{labelOf(cake.category)}</p>
            <button
              type="button"
              className={`favorite-large ${favorite ? "is-favorite" : ""}`}
              aria-pressed={favorite}
              onClick={() => {
                toggleFavorite(cake.id);
                toast.success(
                  favorite ? t("common.removed") : t("common.saved")
                );
              }}
            >
              <Heart
                size={18}
                fill={favorite ? "currentColor" : "none"}
                aria-hidden="true"
              />{" "}
              {favorite ? t("product.saved") : t("product.save")}
            </button>
          </div>
          <h1>{cake.name}</h1>
          <p className="detail-flavour">{labelOf(cake.flavor)}</p>
          <p className="detail-description">{cake.description}</p>
          <div className="detail-rule" />
          <fieldset>
            <legend className="select-label">{t("product.chooseSize")}</legend>
            <div className="size-options">
              {cake.sizes.map((size, index) => (
                <button
                  type="button"
                  key={size.label}
                  className={
                    sizeIndex === index ? "size-choice active" : "size-choice"
                  }
                  aria-pressed={sizeIndex === index}
                  onClick={() => setSizeIndex(index)}
                >
                  <span>{labelOf(size.label)}</span>
                  <strong>{formatPrice(size.price)}</strong>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="order-row">
            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(value => Math.max(1, value - 1))}
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(value => value + 1)}
              >
                <Plus size={15} aria-hidden="true" />
              </button>
            </div>
            <p>
              <span>{t("product.from")}</span>
              <strong>{formatPrice(selectedSize.price * quantity)}</strong>
            </p>
          </div>
          {cake.available ? (
            <div className="detail-actions">
              <button
                type="button"
                className="btn-berry"
                onClick={() => addToCart()}
              >
                <ShoppingBag size={17} aria-hidden="true" /> {t("product.add")}
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => addToCart(true)}
              >
                {t("product.buy")}
              </button>
            </div>
          ) : (
            <p className="unavailable">
              <Sparkles size={16} aria-hidden="true" />{" "}
              {t("product.unavailable")}
            </p>
          )}
          <Link className="customise-note" to={`/custom-cake?base=${cake.id}`}>
            <span>
              <Check size={15} aria-hidden="true" />
            </span>{" "}
            {t("product.customize")} <u>{t("product.customLink")}</u>
          </Link>
          <div className="ingredients-grid">
            <div>
              <p className="eyebrow">{t("product.ingredients")}</p>
              <p>{cake.ingredients.map(labelOf).join(" · ")}</p>
            </div>
            <div>
              <p className="eyebrow">{t("product.dietaryCare")}</p>
              <div className="dietary-detail-tags">
                {cake.dietary.map(tag => (
                  <span key={tag}>{labelOf(tag)}</span>
                ))}
              </div>
              <p className="allergen-line">
                {t("product.contains")}{" "}
                {cake.allergens.map(labelOf).join(", ").toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProductReviews reviews={reviews} isLoading={reviewsLoading} />
    </section>
  );
}
