import { describe, expect, it } from "vitest";
import {
  getOwnerWorkspace,
  listPublicTenants,
  getPublicTenant,
  toggleOwnerCake,
} from "./tenant.service";

describe("tenant marketplace contracts", () => {
  it("returns only published tenant counters to public visitors", async () => {
    const tenants = await listPublicTenants();
    expect(tenants.length).toBeGreaterThan(0);
    expect(tenants.every(tenant => tenant.isPublished)).toBe(true);
    expect(tenants[0]).toHaveProperty("slug");
  });

  it("returns a published menu without requiring a customer session", async () => {
    const tenant = await getPublicTenant("cakely-counter");
    expect(tenant.name).toBe("Cakely Counter");
    expect(tenant.menu.length).toBeGreaterThan(0);
  });

  it("allows the connected owner to read their workspace", async () => {
    const workspace = await getOwnerWorkspace("u-eden");
    expect(workspace.tenant.ownerId).toBe("u-eden");
    expect(workspace.finance.grossSales).toBeGreaterThan(0);
    expect(workspace.menu.length).toBeGreaterThan(0);
  });

  it("blocks an owner from changing another bakery's cake", async () => {
    await expect(
      toggleOwnerCake("u-rose", "raspberry-veil", false)
    ).rejects.toThrow("own shop");
  });
});
