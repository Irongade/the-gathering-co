import { describe, expect, it } from "vitest";
import { absoluteUrl, pageMetadata, pageTitle } from "./seo";

describe("seo", () => {
  it("builds absolute urls on the site origin", () => {
    expect(absoluteUrl("/hire")).toBe("https://thegatheringco.co.uk/hire");
    expect(absoluteUrl()).toBe("https://thegatheringco.co.uk/");
  });

  it("formats titles with the site name", () => {
    expect(pageTitle("Hire")).toBe("Hire | The Gathering Co.");
    expect(pageTitle()).toContain("The Gathering Co.");
  });

  it("sets a canonical for page metadata", () => {
    const meta = pageMetadata({ title: "About", description: "d", path: "/about" });
    expect(meta.alternates?.canonical).toBe("https://thegatheringco.co.uk/about");
    expect(meta.title).toBe("About");
  });
});
