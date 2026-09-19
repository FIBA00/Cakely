import {
  bakeryTenants,
  cakes,
  ownerFinance,
  starterOrders,
} from "../data/mockData";

let tenantsState = bakeryTenants.map(tenant => ({
  ...tenant,
  cakeIds: [...tenant.cakeIds],
}));
let cakesState = [...cakes];
let ordersState = [...starterOrders];

const wait = value =>
  new Promise(resolve => setTimeout(() => resolve(value), 160));

export async function listPublicTenants(query = "") {
  const normalized = query.trim().toLowerCase();
  return wait(
    tenantsState
      .filter(
        tenant =>
          tenant.isPublished &&
          (!normalized ||
            `${tenant.name} ${tenant.city} ${tenant.tagline}`
              .toLowerCase()
              .includes(normalized))
      )
      .map(tenant => ({
        ...tenant,
        cakeCount: tenant.cakeIds.filter(id =>
          cakesState.some(cake => cake.id === id && cake.available)
        ).length,
      }))
  );
}

export async function getPublicTenant(slug) {
  const tenant = tenantsState.find(
    item => item.slug === slug && item.isPublished
  );
  if (!tenant)
    throw new Error("This bakery is not available on the public counter.");
  const menu = tenant.cakeIds
    .map(id => cakesState.find(cake => cake.id === id))
    .filter(Boolean)
    .filter(cake => cake.available);
  return wait({ ...tenant, menu });
}

export async function getOwnerWorkspace(ownerId) {
  const tenant = tenantsState.find(item => item.ownerId === ownerId);
  if (!tenant)
    throw new Error("No bakery workspace is connected to this account.");
  const menu = tenant.cakeIds
    .map(id => cakesState.find(cake => cake.id === id))
    .filter(Boolean);
  const orders = ordersState.filter(
    order =>
      order.customer?.id === ownerId ||
      tenant.cakeIds.includes(order.items?.[0]?.id)
  );
  return wait({
    tenant,
    menu,
    orders: orders.length ? orders : ordersState,
    finance: ownerFinance,
  });
}

export async function saveOwnerProfile(ownerId, updates) {
  const index = tenantsState.findIndex(item => item.ownerId === ownerId);
  if (index < 0) throw new Error("Owner workspace not found.");
  tenantsState[index] = { ...tenantsState[index], ...updates };
  return wait(tenantsState[index]);
}

export async function saveOwnerCake(ownerId, payload) {
  const tenant = tenantsState.find(item => item.ownerId === ownerId);
  if (!tenant) throw new Error("Owner workspace not found.");
  const next = {
    ...cakesState[0],
    ...payload,
    id: payload.id || `owner-cake-${Date.now()}`,
    available: payload.available !== false,
    featured: Boolean(payload.featured),
    price: Number(payload.price) || 0,
    badge: payload.badge || "Made by this bakery",
  };
  const existing = cakesState.findIndex(cake => cake.id === next.id);
  cakesState =
    existing >= 0
      ? cakesState.map((cake, index) => (index === existing ? next : cake))
      : [next, ...cakesState];
  if (!tenant.cakeIds.includes(next.id))
    tenantsState = tenantsState.map(item =>
      item.id === tenant.id
        ? { ...item, cakeIds: [next.id, ...item.cakeIds] }
        : item
    );
  return wait(next);
}

export async function toggleOwnerCake(ownerId, cakeId, available) {
  const tenant = tenantsState.find(item => item.ownerId === ownerId);
  if (!tenant || !tenant.cakeIds.includes(cakeId))
    throw new Error("You can only change cakes from your own shop.");
  cakesState = cakesState.map(cake =>
    cake.id === cakeId ? { ...cake, available } : cake
  );
  return wait(cakesState.find(cake => cake.id === cakeId));
}

export async function updateOwnerOrder(ownerId, orderId, status) {
  const tenant = tenantsState.find(item => item.ownerId === ownerId);
  if (!tenant) throw new Error("Owner workspace not found.");
  ordersState = ordersState.map(order =>
    order.id === orderId ? { ...order, status } : order
  );
  return wait(ordersState.find(order => order.id === orderId));
}
