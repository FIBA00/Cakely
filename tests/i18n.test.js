import { describe, expect, it } from "vitest";
import { localeMessages } from "./contexts/LocaleContext";
import { hasOwnerAccess } from "./services/auth.service";

describe("Cakely localization contract", () => {
  it("provides every order status in English and Amharic", () => {
    const statusKeys = Object.keys(localeMessages.en.status);
    expect(statusKeys.length).toBeGreaterThan(0);
    for (const key of statusKeys) {
      expect(
        localeMessages.am.status[key],
        `missing Amharic status: ${key}`
      ).toBeTruthy();
      expect(localeMessages.am.status[key]).not.toBe(
        localeMessages.en.status[key]
      );
    }
  });

  it("provides every validation message in both locales", () => {
    const validationKeys = Object.keys(localeMessages.en.validation);
    for (const key of validationKeys) {
      expect(
        localeMessages.am.validation[key],
        `missing Amharic validation: ${key}`
      ).toBeTruthy();
    }
  });
});

describe("owner access boundary", () => {
  it("allows owners and admins but denies guests and missing sessions", () => {
    expect(hasOwnerAccess({ role: "owner" })).toBe(true);
    expect(hasOwnerAccess({ role: "admin" })).toBe(true);
    expect(hasOwnerAccess({ role: "user" })).toBe(false);
    expect(hasOwnerAccess(null)).toBe(false);
  });
});
