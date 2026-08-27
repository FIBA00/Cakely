// Patisserie Postcard: display only verified, persisted customer feedback; never invent social proof.
import { MessageCircleHeart, Star } from "lucide-react";
import { useLocale } from "../contexts/LocaleContext";

export default function ProductReviews({ reviews, isLoading }) {
  const { t } = useLocale();
  return <section className="product-reviews" aria-labelledby="reviews-heading"><div className="reviews-heading"><div><p className="eyebrow">{t("product.reviewEyebrow")}</p><h2 id="reviews-heading">{t("product.reviewTitle")}</h2></div><span className="verified-review-note"><Star size={14} aria-hidden="true" /> {t("product.verifiedOnly")}</span></div>{isLoading ? <p className="reviews-loading" aria-live="polite">{t("product.loadingReviews")}</p> : reviews?.length ? <div className="reviews-list">{reviews.map((review) => <article key={review.id}><strong>{review.customerName}</strong><p>{review.body}</p></article>)}</div> : <div className="reviews-empty"><MessageCircleHeart size={24} aria-hidden="true" /><div><h3>{t("product.noReviews")}</h3><p>{t("product.noReviewsCopy")}</p></div></div>}</section>;
}
