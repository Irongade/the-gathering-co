import { expect, test } from "@playwright/test";

const NUMBER = "447000000000";

test.describe("smoke: land, open item, enquire", () => {
  test("landing renders and the floating WhatsApp link is prefilled", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Event hire for life's special moments");
    const floating = page.getByTestId("floating-whatsapp");
    await expect(floating).toBeVisible();
    const href = await floating.getAttribute("href");
    expect(href).toContain(`https://wa.me/${NUMBER}?text=`);
    expect(decodeURIComponent(href ?? "")).toContain("Hi The Gathering Co, I'd like to ask about hiring for an event.");
    expect(errors).toEqual([]);
  });

  test("open an item from the catalogue and enquire with the item name", async ({ page }) => {
    await page.goto("/hire");
    await page.getByRole("button", { name: "Chairs" }).click();
    await page.getByRole("link", { name: "White folding chair" }).first().click();
    await expect(page).toHaveURL(/\/hire\/white-folding-chair$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("White folding chair");
    const enquire = page.getByTestId("enquire-link").first();
    await expect(enquire).toHaveAttribute("target", "_blank");
    await expect(enquire).toHaveAttribute("rel", "noopener noreferrer");
    const href = await enquire.getAttribute("href");
    expect(href).toContain(`https://wa.me/${NUMBER}?text=`);
    expect(decodeURIComponent(href ?? "")).toBe(
      `https://wa.me/${NUMBER}?text=Hi, I'm interested in hiring: White folding chair.`,
    );
  });

  test("enquiry form validates and builds a structured WhatsApp message", async ({ page, context }) => {
    await page.goto("/contact");
    await expect(page.getByTestId("floating-whatsapp")).toHaveCount(0);
    await page.getByRole("button", { name: "Open WhatsApp" }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();

    await page.getByLabel("Your name").fill("Sam Robson");
    await page.getByLabel("Event date").fill("2026-12-05");
    await page.getByLabel("Occasion").selectOption("garden-parties");
    await page.getByLabel("Rough guest count").fill("30");
    await page.getByLabel("Postcode or area").fill("NE3");
    await page.getByLabel("What do you need?").fill("Four trestles and thirty chairs.");

    // Keep the popup on wa.me so the prefilled text can be read before WhatsApp redirects it.
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, body: "ok" }));
    const popup = context.waitForEvent("page");
    await page.getByRole("button", { name: "Open WhatsApp" }).click();
    const opened = await popup;
    await opened.waitForLoadState();
    const url = decodeURIComponent(opened.url());
    await opened.close();
    expect(url).toContain(`wa.me/${NUMBER}`);
    expect(url).toContain("Name: Sam Robson");
    expect(url).toContain("Occasion: Garden parties");
    expect(url).toContain("Guests: 30");
    expect(url).toContain("Area: NE3");
    await expect(page.getByTestId("enquiry-preview")).toContainText("Event date: 2026-12-05");
  });
});
