// Patisserie Postcard: auth is intentionally a replaceable mock boundary, never a source of real credentials.
import { demoUser } from "../data/mockData";
import { wait } from "./api";

export async function login(credentials) {
  if (credentials.email === "wrong@example.com")
    throw new Error("We could not match that email and password.");
  if (credentials.email === "admin@cakely.example")
    return wait({
      ...demoUser,
      name: "Cakely Baker",
      email: credentials.email,
      initials: "CB",
      role: "admin",
    });
  return wait({
    ...demoUser,
    name:
      credentials.email === demoUser.email
        ? demoUser.name
        : credentials.email.split("@")[0],
  });
}

export async function register(payload) {
  return wait({
    ...demoUser,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  });
}

export function hasOwnerAccess(user) {
  return Boolean(user && ["owner", "admin"].includes(user.role));
}

export async function updateProfile(payload) {
  return wait(payload);
}
