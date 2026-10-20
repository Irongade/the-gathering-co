import { describe, expect, it } from "vitest";
import { SITE } from "@/content/site";
import { itemMessage, mailtoUrl, occasionMessage, whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("uses the configured number without a plus sign", () => {
    expect(whatsappUrl()).toMatch(/^https:\/\/wa\.me\/447000000000\?text=/);
  });

  it("prefills the default message when none is given", () => {
    const url = new URL(whatsappUrl());
    expect(url.searchParams.get("text")).toBe(SITE.whatsapp.defaultMessage);
  });

  it("encodes a custom message", () => {
    const url = new URL(whatsappUrl("Hi, I'm interested in hiring: Round table, 6 ft."));
    expect(url.searchParams.get("text")).toBe("Hi, I'm interested in hiring: Round table, 6 ft.");
    expect(whatsappUrl("a b&c")).toContain("text=a%20b%26c");
  });
});

describe("message builders", () => {
  it("names the item", () => {
    expect(itemMessage("White folding chair")).toBe("Hi, I'm interested in hiring: White folding chair.");
  });
  it("names the occasion", () => {
    expect(occasionMessage("garden party")).toBe("Hi, I'm planning a garden party and would like to ask about hire.");
  });
  it("builds a mailto with subject and body", () => {
    const url = mailtoUrl("Hire enquiry", "Line one\nLine two");
    expect(url).toBe("mailto:hello@example.com?subject=Hire%20enquiry&body=Line%20one%0ALine%20two");
  });
});
