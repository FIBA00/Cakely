// Patisserie Postcard: the admin foundation is a focused operational ledger rather than a generic dark dashboard.
import {
  BarChart3,
  CakeSlice,
  ChevronRight,
  LayoutDashboard,
  Package,
  Pencil,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { toast } from "sonner";
import {
  cakes,
  categories,
  demoUser,
  starterOrders,
  statusMeta,
} from "../data/mockData";
import { formatPrice } from "../lib/format";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/cakes", label: "Cakes", icon: CakeSlice },
  { to: "/admin/categories", label: "Categories", icon: Settings2 },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldCheck },
];

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link className="brand" to="/">
          <CakeSlice size={24} />
          <span>Cakely</span>
        </Link>
        <p className="admin-label">Kitchen ledger</p>
        <nav>
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink end={end} to={to} key={to}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <Link className="admin-return" to="/">
          ← Back to storefront
        </Link>
      </aside>
      <main className="admin-main">
        <header>
          <div>
            <p className="eyebrow">Operations</p>
            <h1>Good morning, baker.</h1>
          </div>
          <Link className="btn-berry" to="/admin/cakes?new=1">
            <Plus size={17} /> Add cake
          </Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <>
      <section className="admin-stats">
        {[
          {
            label: "Orders today",
            value: "12",
            note: "+3 since yesterday",
            icon: Package,
          },
          {
            label: "Revenue",
            value: "$842",
            note: "This week",
            icon: BarChart3,
          },
          {
            label: "Pending orders",
            value: "4",
            note: "Need a kitchen slot",
            icon: Package,
          },
          {
            label: "Active cakes",
            value: "18",
            note: "2 drafts",
            icon: CakeSlice,
          },
        ].map(({ label, value, note, icon: Icon }) => (
          <article key={label}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
            <Icon />
          </article>
        ))}
      </section>
      <section className="admin-panels">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Kitchen queue</p>
              <h2>Orders needing care</h2>
            </div>
            <Link to="/admin/orders">
              All orders <ChevronRight size={15} />
            </Link>
          </div>
          {starterOrders.map(order => (
            <div className="admin-order" key={order.id}>
              <div>
                <strong>#{order.id}</strong>
                <span>{order.items[0].name}</span>
              </div>
              <span className={`status-pill status-${order.status}`}>
                {statusMeta[order.status].label}
              </span>
              <b>{formatPrice(order.total)}</b>
            </div>
          ))}
        </div>
        <div className="admin-panel chart-panel">
          <p className="eyebrow">Seven days</p>
          <h2>Orders coming in</h2>
          <div className="simple-chart">
            {[40, 58, 38, 76, 52, 84, 68].map((height, index) => (
              <div key={index}>
                <span style={{ height: `${height}%` }} />
                <small>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const blankCake = {
  name: "",
  category: "Birthday",
  price: "",
  image: "",
  description: "",
  available: true,
  featured: false,
};
export function AdminCakes() {
  const [menuCakes, setMenuCakes] = useState(cakes);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const filtered = useMemo(
    () =>
      menuCakes.filter(cake =>
        cake.name.toLowerCase().includes(query.toLowerCase())
      ),
    [menuCakes, query]
  );
  function saveCake(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    const price = Number(form.get("price"));
    if (!name || !price) {
      toast.error("Add a cake name and price before saving.");
      return;
    }
    const nextCake = {
      ...cakes[0],
      ...draft,
      id: draft?.id || `cake-${Date.now()}`,
      name,
      category: form.get("category"),
      price,
      image: draft?.image || cakes[0].image,
      description: form.get("description"),
      available: form.get("available") === "on",
      featured: form.get("featured") === "on",
      badge: draft?.badge || "New from the kitchen",
    };
    setMenuCakes(items =>
      draft?.id
        ? items.map(cake => (cake.id === draft.id ? nextCake : cake))
        : [nextCake, ...items]
    );
    setDraft(null);
    toast.success(`${name} is ${draft?.id ? "updated" : "on the menu"}.`);
  }
  function selectImage(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file for the cake.");
      return;
    }
    setDraft(cake => ({ ...cake, image: URL.createObjectURL(file) }));
  }
  function removeCake() {
    setMenuCakes(items => items.filter(cake => cake.id !== confirmDelete.id));
    toast.success(`${confirmDelete.name} was removed from the menu.`);
    setConfirmDelete(null);
  }
  return (
    <section className="admin-panel admin-table-panel">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Cake catalogue</p>
          <h2>Everyday menu</h2>
        </div>
        <button className="btn-berry" onClick={() => setDraft(blankCake)}>
          <Plus size={16} /> Add cake
        </button>
      </div>
      <div className="admin-search">
        <Search size={16} />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search cakes"
        />
      </div>
      <div className="admin-table admin-cakes-table">
        <div className="admin-table-head">
          <span>Cake</span>
          <span>Category</span>
          <span>Price</span>
          <span>Available</span>
          <span>Manage</span>
        </div>
        {filtered.map(cake => (
          <div className="admin-table-row" key={cake.id}>
            <div>
              <img src={cake.image} alt="" />
              <strong>{cake.name}</strong>
            </div>
            <span>{cake.category}</span>
            <span>{formatPrice(cake.price)}</span>
            <label className="tiny-switch">
              <input
                type="checkbox"
                checked={cake.available}
                onChange={event => {
                  setMenuCakes(items =>
                    items.map(item =>
                      item.id === cake.id
                        ? { ...item, available: event.target.checked }
                        : item
                    )
                  );
                  toast.success(
                    `${cake.name} is ${event.target.checked ? "available" : "hidden"}.`
                  );
                }}
              />
              <i />
            </label>
            <span className="admin-row-actions">
              <button
                aria-label={`Edit ${cake.name}`}
                onClick={() => setDraft(cake)}
              >
                <Pencil size={15} />
              </button>
              <button
                aria-label={`Delete ${cake.name}`}
                onClick={() => setConfirmDelete(cake)}
              >
                <Trash2 size={15} />
              </button>
            </span>
          </div>
        ))}
      </div>
      {draft && (
        <CakeEditor
          cake={draft}
          onClose={() => setDraft(null)}
          onSave={saveCake}
          onImage={selectImage}
        />
      )}
      {confirmDelete && (
        <div className="admin-modal">
          <div className="admin-modal-card">
            <p className="eyebrow">Remove cake</p>
            <h2>Take {confirmDelete.name} off the menu?</h2>
            <p>The mock catalogue will update immediately for this session.</p>
            <div>
              <button
                className="btn-outline"
                onClick={() => setConfirmDelete(null)}
              >
                Keep cake
              </button>
              <button className="btn-berry" onClick={removeCake}>
                Remove it
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
function CakeEditor({ cake, onClose, onSave, onImage }) {
  return (
    <div className="admin-modal">
      <form className="admin-modal-card cake-editor" onSubmit={onSave}>
        <button
          type="button"
          className="icon-button editor-close"
          onClick={onClose}
          aria-label="Close cake editor"
        >
          <X size={17} />
        </button>
        <p className="eyebrow">{cake.id ? "Edit cake" : "A fresh addition"}</p>
        <h2>{cake.id ? cake.name : "Add a cake"}</h2>
        <div className="editor-fields">
          <label className="field">
            <span className="form-label">Name</span>
            <input
              name="name"
              defaultValue={cake.name}
              className="form-input"
            />
          </label>
          <label className="field">
            <span className="form-label">Category</span>
            <select
              name="category"
              className="form-select"
              defaultValue={cake.category}
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="form-label">Price</span>
            <input
              name="price"
              type="number"
              min="1"
              defaultValue={cake.price}
              className="form-input"
            />
          </label>
          <label className="field">
            <span className="form-label">Cake image</span>
            <span className="admin-upload">
              <Upload size={16} /> Choose image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={event => onImage(event.target.files[0])}
              />
            </span>
          </label>
          <label className="field editor-full">
            <span className="form-label">Description</span>
            <textarea
              name="description"
              className="form-textarea"
              defaultValue={cake.description}
            />
          </label>
          <label className="admin-check">
            <input
              name="available"
              type="checkbox"
              defaultChecked={cake.available}
            />{" "}
            Available for orders
          </label>
          <label className="admin-check">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={cake.featured}
            />{" "}
            Show as featured
          </label>
        </div>
        <div className="editor-actions">
          <button type="button" className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-berry">Save cake</button>
        </div>
      </form>
    </div>
  );
}

export function AdminOrders() {
  const [status, setStatus] = useState(
    Object.fromEntries(starterOrders.map(order => [order.id, order.status]))
  );
  const [query, setQuery] = useState("");
  const matches = starterOrders.filter(order =>
    `${order.id} ${order.items[0].name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return (
    <section className="admin-panel admin-table-panel">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Order management</p>
          <h2>Kitchen queue</h2>
        </div>
      </div>
      <div className="admin-search">
        <Search size={16} />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search orders"
        />
      </div>
      <div className="admin-table">
        <div className="admin-table-head">
          <span>Order</span>
          <span>For</span>
          <span>Total</span>
          <span>Status</span>
        </div>
        {matches.map(order => (
          <div className="admin-table-row" key={order.id}>
            <div>
              <strong>#{order.id}</strong>
            </div>
            <span>{order.items[0].name}</span>
            <span>{formatPrice(order.total)}</span>
            <select
              className="status-select"
              value={status[order.id]}
              onChange={event => {
                setStatus({ ...status, [order.id]: event.target.value });
                toast.success(
                  `Order ${order.id} marked ${statusMeta[event.target.value].label.toLowerCase()}.`
                );
              }}
            >
              {Object.entries(statusMeta).map(([key, data]) => (
                <option value={key} key={key}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminModeration() {
  const [approved, setApproved] = useState(false);
  return (
    <section className="admin-moderation">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Marketplace trust</p>
          <h2>Moderation desk</h2>
          <p className="admin-muted">
            A safe handoff for bakery approval, customer reports, and verified
            feedback.
          </p>
        </div>
        <ShieldCheck size={24} aria-hidden="true" />
      </div>
      <div className="moderation-grid">
        <article className="admin-panel moderation-card">
          <span className="moderation-icon">
            <ShieldCheck size={18} />
          </span>
          <h3>Tenant approval</h3>
          <p>No bakeries are waiting for review in this frontend preview.</p>
          <button
            className="btn-outline"
            type="button"
            onClick={() => setApproved(true)}
            disabled={approved}
          >
            {approved ? "Approval queue connected" : "Connect approval API"}
          </button>
        </article>
        <article className="admin-panel moderation-card">
          <span className="moderation-icon">
            <Users size={18} />
          </span>
          <h3>Customer reports</h3>
          <p>
            Complaint intake, audit history, and response ownership will appear
            when the support API is connected.
          </p>
          <button
            className="btn-outline"
            type="button"
            onClick={() =>
              toast.info("Connect the support and audit API to manage reports.")
            }
          >
            Connect report API
          </button>
        </article>
        <article className="admin-panel moderation-card">
          <span className="moderation-icon">
            <CakeSlice size={18} />
          </span>
          <h3>Verified reviews</h3>
          <p>
            No customer review content is displayed until it comes from a
            verified order and moderation service.
          </p>
          <button
            className="btn-outline"
            type="button"
            onClick={() =>
              toast.info(
                "Connect the verified-review API to moderate feedback."
              )
            }
          >
            Connect review API
          </button>
        </article>
      </div>
    </section>
  );
}

export function AdminGeneric({ title }) {
  const categoryMode = title === "Categories";
  return (
    <section className="admin-panel admin-generic">
      <p className="eyebrow">
        {categoryMode ? "Occasion catalogue" : "Customer book"}
      </p>
      <h2>{title}</h2>
      {categoryMode ? (
        <div className="admin-categories">
          {categories.map(category => (
            <div key={category.id}>
              <span>{category.name.slice(0, 1)}</span>
              <section>
                <strong>{category.name}</strong>
                <p>{category.note}</p>
              </section>
              <button
                onClick={() =>
                  toast.success(
                    `${category.name} is ready to edit through the category API.`
                  )
                }
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-customers">
          <div>
            <span>Customer</span>
            <span>Orders</span>
            <span>Last order</span>
          </div>
          <section>
            <strong>{demoUser.name}</strong>
            <span>2 orders</span>
            <span>25 Aug 2026</span>
          </section>
        </div>
      )}
    </section>
  );
}
