import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  PackageCheck,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCartStore } from "../store/useCartStore";
import { useMemo, useState } from "react";
import { ErrorState, LoadingState } from "../components/StateViews";
import { getOrderById, getOrders } from "../services/orders.service";
import { formatDate, formatPrice } from "../lib/format";
import { statusMeta } from "../data/mockData";
import { useLocale } from "../contexts/LocaleContext";

const stages = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
];
const stageIcons = [
  ShoppingBag,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Truck,
  Check,
];

function localizedStatus(t, status) {
  const notes = {
    pending: "notePending",
    confirmed: "noteConfirmed",
    preparing: "notePreparing",
    ready: "noteReady",
    out_for_delivery: "noteOut",
    delivered: "noteDelivered",
    cancelled: "noteCancelled",
  };
  return {
    label: t(`status.${status}`),
    note: t(`status.${notes[status] || "notePending"}`),
    step: statusMeta[status]?.step ?? 0,
  };
}

export function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { t } = useLocale();
  const {
    data: queriedOrder,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    initialData: location.state?.order,
  });
  const order = queriedOrder;
  if (isLoading)
    return (
      <div className="page-width py-24">
        <LoadingState label={t("status.loadingSuccess")} />
      </div>
    );
  if (isError)
    return (
      <div className="page-width py-24">
        <ErrorState error={error} retry={refetch} />
      </div>
    );
  return (
    <section className="success-page page-width">
      <div className="success-mark">
        <Check size={31} />
      </div>
      <p className="section-kicker justify-center">
        {t("status.confirmedTitle")}
      </p>
      <h1>
        {t("status.successHeadlineA")} <em>{t("status.successHeadlineB")}</em>
      </h1>
      <p className="success-intro">
        {t("status.successCopy")} <strong>#{order.id}</strong>.{" "}
        {t("status.successFollowup")}
      </p>
      <div className="success-order-card">
        <div>
          <p className="eyebrow">{t("status.moment")}</p>
          <h2>{order.date}</h2>
          <p>
            {order.time} · {order.fulfilment}
          </p>
        </div>
        <div>
          <p className="eyebrow">{t("status.total")}</p>
          <h2>{formatPrice(order.total)}</h2>
          <p>
            {order.items.length} {t("status.cakesOnCard")}
          </p>
        </div>
        <div className="success-order-action">
          <Link className="btn-outline" to={`/orders/${order.id}`}>
            {t("status.trackOrder")} <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      <div className="success-actions">
        <Link className="btn-berry" to="/shop">
          {t("status.keepBrowsing")}
        </Link>
        <Link className="text-link" to={`/orders/${order.id}`}>
          {t("status.viewFull")} <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export function OrderTracking() {
  const { orderId } = useParams();
  const { t } = useLocale();
  const {
    data: order,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
  });
  if (isLoading)
    return (
      <div className="page-width py-24">
        <LoadingState label={t("status.loadingTracking")} />
      </div>
    );
  if (isError)
    return (
      <div className="page-width py-24">
        <ErrorState error={error} retry={refetch} />
      </div>
    );
  const meta = localizedStatus(t, order.status);
  const currentStep = meta.step;
  return (
    <section className="tracking-page page-width">
      <div className="tracking-head">
        <div>
          <p className="section-kicker">
            {t("status.orderNumber")} #{order.id}
          </p>
          <h1>
            {t("status.yourCake")} <em>{meta.label.toLowerCase()}.</em>
          </h1>
          <p>{meta.note}</p>
        </div>
        <span className={`status-pill status-${order.status}`}>
          {meta.label}
        </span>
      </div>
      <div className="tracking-layout">
        <section className="timeline-card">
          <h2>{t("status.timelineTitle")}</h2>
          {order.status === "cancelled" ? (
            <div className="cancelled-order">
              <XCircle />
              <div>
                <h3>{t("status.cancelled")}</h3>
                <p>{meta.note}</p>
              </div>
            </div>
          ) : (
            <ol className="order-timeline">
              {stages.map((status, index) => {
                const Icon = stageIcons[index];
                const isDone = index <= currentStep;
                const isCurrent = index === currentStep;
                const stepMeta = localizedStatus(t, status);
                return (
                  <li className={isDone ? "done" : ""} key={status}>
                    <span
                      className={
                        isCurrent ? "timeline-icon current" : "timeline-icon"
                      }
                    >
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3>{stepMeta.label}</h3>
                      <p>{isDone ? stepMeta.note : t("status.next")}</p>
                      {isCurrent && (
                        <time>
                          {formatDate(order.createdAt, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
        <aside className="track-order-card">
          <p className="eyebrow">{t("status.details")}</p>
          {order.items.map(item => (
            <div className="review-item" key={item.lineId || item.id}>
              <img src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <span>{item.customization}</span>
              </div>
            </div>
          ))}
          <div className="track-rule" />
          <p>
            <b>{order.fulfilment}</b>
            <br />
            {order.address}
          </p>
          <p>
            <b>
              {t("status.for")} {order.date}
            </b>
            <br />
            {order.time}
          </p>
          <strong className="track-total">{formatPrice(order.total)}</strong>
          <Link className="text-link" to="/support">
            {t("status.deliveryHelp")}
          </Link>
        </aside>
      </div>
    </section>
  );
}

export function OrdersList() {
  const { t } = useLocale();
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({ queryKey: ["orders"], queryFn: getOrders });
  const addItem = useCartStore(state => state.addItem);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const results = useMemo(
    () =>
      (orders || []).filter(
        order =>
          `${order.id} ${order.items.map(item => item.name).join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "all" || order.status === status)
      ),
    [orders, query, status]
  );
  if (isLoading) return <LoadingState label={t("status.loadingOrders")} />;
  if (isError) return <ErrorState error={error} retry={refetch} />;
  function reorder(order) {
    order.items.forEach(item =>
      addItem({
        ...item,
        lineId: `${item.lineId || item.id}-reorder-${Date.now()}`,
      })
    );
    toast.success(t("account.reordered"));
  }
  return (
    <>
      <div className="orders-filter">
        <label>
          <span className="sr-only">{t("account.searchOrders")}</span>
          <input
            className="form-input"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t("account.searchOrders")}
          />
        </label>
        <label>
          <span className="sr-only">{t("account.filterStatus")}</span>
          <select
            className="form-select"
            value={status}
            onChange={event => setStatus(event.target.value)}
          >
            <option value="all">{t("account.allStatuses")}</option>
            {Object.keys(statusMeta).map(key => (
              <option key={key} value={key}>
                {localizedStatus(t, key).label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {results.length ? (
        <div className="orders-list">
          {results.map(order => (
            <article className="order-row-card" key={order.id}>
              <Link to={`/orders/${order.id}`} className="order-row-card-link">
                <div>
                  <p className="eyebrow">
                    {t("status.orderNumber")} #{order.id}
                  </p>
                  <h3>{order.items.map(item => item.name).join(", ")}</h3>
                  <p>
                    {formatDate(order.createdAt)} · {order.fulfilment}
                  </p>
                </div>
                <div>
                  <span className={`status-pill status-${order.status}`}>
                    {localizedStatus(t, order.status).label}
                  </span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
                <ChevronRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="text-link reorder-button"
                onClick={() => reorder(order)}
              >
                {t("account.reorder")}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="order-filter-empty">{t("account.noOrder")}</div>
      )}
    </>
  );
}
