import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    env: {
      NEXT_PUBLIC_WHATSAPP_NUMBER: "447000000000",
      NEXT_PUBLIC_CONTACT_EMAIL: "hello@example.com",
      NEXT_PUBLIC_INSTAGRAM_URL: "https://instagram.com/thegatheringco",
      NEXT_PUBLIC_FACEBOOK_URL: "https://facebook.com/thegatheringco",
      NEXT_PUBLIC_TIKTOK_URL: "",
      NEXT_PUBLIC_SITE_URL: "https://thegatheringco.co.uk",
    },
  },
});
