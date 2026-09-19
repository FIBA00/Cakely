// Patisserie Postcard: catalogue services mimic the FastAPI boundary and support real filtering inputs.
import { cakes, categories } from "../data/mockData";
import { wait } from "./api";

export async function getCakes(params = {}) {
  const {
    query = "",
    category = "all",
    availability = "all",
    sort = "featured",
    price = "all",
    dietary = "all",
  } = params;
  let result = [...cakes];
  const term = query.trim().toLowerCase();
  if (term)
    result = result.filter(cake =>
      `${cake.name} ${cake.category} ${cake.flavor}`
        .toLowerCase()
        .includes(term)
    );
  if (category !== "all")
    result = result.filter(cake => cake.category === category);
  if (availability === "available")
    result = result.filter(cake => cake.available);
  if (dietary !== "all")
    result = result.filter(cake => cake.dietary?.includes(dietary));
  if (price === "under-60") result = result.filter(cake => cake.price < 60);
  if (price === "60-80")
    result = result.filter(cake => cake.price >= 60 && cake.price <= 80);
  if (price === "over-80") result = result.filter(cake => cake.price > 80);
  if (sort === "price-low") result.sort((a, b) => a.price - b.price);
  if (sort === "price-high") result.sort((a, b) => b.price - a.price);
  if (sort === "newest") result.reverse();
  if (sort === "featured")
    result.sort((a, b) => Number(b.featured) - Number(a.featured));
  return wait({ items: result, total: result.length });
}

export async function getCakeById(id) {
  const cake = cakes.find(item => item.id === id);
  if (!cake) throw new Error("Cake not found");
  return wait(cake);
}

export async function getCategories() {
  return wait(categories);
}
