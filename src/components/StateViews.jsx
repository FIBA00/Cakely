// Patisserie Postcard: state surfaces keep every transition helpful, warm, and visually grounded.
import { AlertCircle, CakeSlice, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext";

export function LoadingState({ label, cards = false }) {
  const { t } = useLocale();
  const resolvedLabel = label || t("common.loading");
  if (cards)
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div
            className="h-[390px] animate-pulse rounded-[1.7rem] bg-[#f1e6da]"
            key={item}
          />
        ))}
      </div>
    );
  return (
    <div className="state-view">
      <div className="spinner" />
      <p>{resolvedLabel}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo = "/shop",
}) {
  const { t } = useLocale();
  return (
    <div className="state-view border border-dashed border-[#d8baa7] bg-[#fffaf5]">
      <CakeSlice aria-hidden="true" className="mb-4 text-[#c93f63]" size={32} />
      <h2 className="font-display text-3xl">
        {title || t("common.emptyTitle")}
      </h2>
      <p>{description || t("common.emptyCopy")}</p>
      <Link className="btn-berry mt-2" to={actionTo}>
        {actionLabel || t("common.browseCakes")}
      </Link>
    </div>
  );
}

export function ErrorState({ error, retry }) {
  const { t } = useLocale();
  return (
    <div className="state-view border border-[#efc1c1] bg-[#fff8f7]">
      <AlertCircle
        aria-hidden="true"
        className="mb-4 text-[#bc3b3b]"
        size={32}
      />
      <h2 className="font-display text-3xl">{t("common.kitchenError")}</h2>
      <p>{error?.message || t("common.somethingWrong")}</p>
      <button className="btn-outline mt-2" onClick={retry}>
        <RefreshCw size={16} /> {t("common.tryAgain")}
      </button>
    </div>
  );
}
