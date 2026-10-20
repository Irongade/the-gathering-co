import { z } from "zod";

/**
 * Site config. The only place a contact detail or social URL exists.
 * NEXT_PUBLIC_* values are inlined at build time, so each one is referenced by its full name below.
 */

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .pipe(z.url("must be a full URL starting with https://").optional());

const envSchema = z.object({
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string({ error: "NEXT_PUBLIC_WHATSAPP_NUMBER is missing" })
    .trim()
    .regex(/^\+?[1-9]\d{7,14}$/, "NEXT_PUBLIC_WHATSAPP_NUMBER must be an E.164 number, for example 447700900123"),
  NEXT_PUBLIC_CONTACT_EMAIL: z.email("NEXT_PUBLIC_CONTACT_EMAIL must be an email address"),
  NEXT_PUBLIC_INSTAGRAM_URL: optionalUrl,
  NEXT_PUBLIC_FACEBOOK_URL: optionalUrl,
  NEXT_PUBLIC_TIKTOK_URL: optionalUrl,
  NEXT_PUBLIC_SITE_URL: z.url().optional().default("https://thegatheringco.co.uk"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  const problems = parsed.error.issues.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`).join("\n");
  throw new Error(`Site config is invalid. Check .env.local against .env.example:\n${problems}`);
}

const env = parsed.data;

export const SITE = {
  name: "The Gathering Co.",
  tagline: "Event hire for life's special moments",
  area: "Newcastle & surrounding areas",
  promise: "Making your gatherings easier",
  closingLine: "We'd love to hear from you!",
  url: env.NEXT_PUBLIC_SITE_URL,
  whatsapp: {
    number: env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/^\+/, ""),
    defaultMessage: "Hi The Gathering Co, I'd like to ask about hiring for an event.",
  },
  email: env.NEXT_PUBLIC_CONTACT_EMAIL,
  socials: {
    instagram: env.NEXT_PUBLIC_INSTAGRAM_URL,
    facebook: env.NEXT_PUBLIC_FACEBOOK_URL,
    tiktok: env.NEXT_PUBLIC_TIKTOK_URL,
  },
} as const;

export type SiteConfig = typeof SITE;
