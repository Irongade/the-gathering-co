import { describe, expect, it } from "vitest";
import { enquirySchema } from "./schemas";

const valid = {
  name: "Sam Robson",
  eventDate: "2026-12-05",
  occasion: "birthdays",
  guestCount: "24",
  area: "NE3",
  message: "Two round tables and twenty chairs.",
};

describe("enquirySchema", () => {
  it("accepts a complete enquiry and coerces the guest count", () => {
    const result = enquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.guestCount).toBe(24);
      expect(result.data.eventDate).toBe("2026-12-05");
    }
  });

  it("treats empty optional fields as undefined", () => {
    const result = enquirySchema.safeParse({ ...valid, eventDate: "", guestCount: "", message: "" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.eventDate).toBeUndefined();
      expect(result.data.guestCount).toBeUndefined();
      expect(result.data.message).toBeUndefined();
    }
  });

  it("reports per-field errors", () => {
    const result = enquirySchema.safeParse({ ...valid, name: "A", area: "", occasion: "", guestCount: "-3" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.name?.[0]).toBe("Tell us your name");
      expect(fields.area?.[0]).toBe("Tell us your postcode or area");
      expect(fields.occasion?.[0]).toBe("Choose an occasion");
      expect(fields.guestCount?.[0]).toBe("Give a rough number of guests");
    }
  });

  it("rejects a malformed date", () => {
    const result = enquirySchema.safeParse({ ...valid, eventDate: "5/12/2026" });
    expect(result.success).toBe(false);
  });
});
