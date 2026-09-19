// Patisserie Postcard: orders persist locally only until a real FastAPI service is connected.
import { starterOrders } from "../data/mockData";
import { wait } from "./api";

const ORDER_KEY = "cakely-orders";

function readOrders() {
  const saved = localStorage.getItem(ORDER_KEY);
  if (!saved) return starterOrders;
  try {
    return JSON.parse(saved);
  } catch {
    return starterOrders;
  }
}

function writeOrders(orders) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

export async function getOrders() {
  return wait(readOrders());
}

export async function getOrderById(id) {
  const order = readOrders().find(item => item.id === id);
  if (!order) throw new Error("Order not found");
  return wait(order);
}

export async function createOrder(payload) {
  const id = `CK-${Math.floor(1000 + Math.random() * 8999)}`;
  const order = {
    ...payload,
    id,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  const orders = [order, ...readOrders()];
  writeOrders(orders);
  return wait(order, 700);
}

export async function updateOrderStatus(id, status) {
  const orders = readOrders().map(order =>
    order.id === id ? { ...order, status } : order
  );
  writeOrders(orders);
  return wait(orders.find(order => order.id === id));
}
