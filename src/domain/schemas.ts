import { z } from "zod";
import { OCCASION_SLUGS } from "./types";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80, "That name is a bit long"),
  eventDate: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value))
    .refine((value) => value === undefined || ISO_DATE.test(value), "Pick a date from the calendar"),
  occasion: z.enum([...OCCASION_SLUGS, "other"], { error: "Choose an occasion" }),
  guestCount: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" || value === undefined ? undefined : Number(value)))
    .refine(
      (value) => value === undefined || (Number.isInteger(value) && value > 0 && value <= 5000),
      "Give a rough number of guests",
    ),
  area: z.string().trim().min(2, "Tell us your postcode or area").max(80, "Keep the area short"),
  message: z
    .string()
    .trim()
    .max(1000, "Keep the message under 1000 characters")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryOutput = z.output<typeof enquirySchema>;
