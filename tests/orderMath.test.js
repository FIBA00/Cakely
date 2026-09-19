import { describe, expect, it } from "vitest";
import {
  calculateDelivery,
  calculateSubtotal,
  calculateTotal,
} from "./orderMath";

describe("Cakely order calculations", () => {
  const items = [
    { price: 58, quantity: 1 },
    { price: 16, quantity: 2 },
  ];
  it("calculates a quantity-aware subtotal", () =>
    expect(calculateSubtotal(items)).toBe(90));
  it("includes delivery below the free-delivery threshold", () =>
    expect(calculateDelivery(89)).toBe(6));
  it("includes delivery at and above the free-delivery threshold", () =>
    expect(calculateDelivery(90)).toBe(0));
  it("returns a customer-facing total breakdown", () =>
    expect(calculateTotal([{ price: 58, quantity: 1 }])).toEqual({
      subtotal: 58,
      delivery: 6,
      total: 64,
    }));
});
