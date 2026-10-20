// Generates placeholder item and occasion images (SVG) and PNG icons from the round logo.
// Run: pnpm brand:assets. Replace the outputs with real photography when the owner supplies it. [TODO]
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");

const palette = {
  cream: "#f7f1ea",
  linen: "#efe3d6",
  hairline: "#e3d6c6",
  cocoa: "#3b2a1e",
  cocoaMuted: "#7a6755",
  tan: "#a8865f",
  sage: "#e4e8db",
  sageInk: "#5f6f4e",
  blush: "#f5e1dc",
};

const items = [
  ["round-table-6ft", "Round table", palette.linen],
  ["trestle-table-6ft", "Trestle table", palette.sage],
  ["white-folding-chair", "Folding chair", palette.blush],
  ["cross-back-chair", "Cross back chair", palette.linen],
  ["cream-tablecloth-round", "Cream tablecloth", palette.sage],
  ["sage-table-runner", "Sage runner", palette.blush],
  ["balloon-stand", "Balloon stand", palette.linen],
  ["linen-backdrop", "Linen backdrop", palette.sage],
];

const occasions = [
  ["birthdays", "Birthdays", palette.blush],
  ["baby-showers", "Baby showers", palette.sage],
  ["garden-parties", "Garden parties", palette.linen],
  ["family-celebrations", "Family celebrations", palette.blush],
];

const leaf = (x, y, s, colour) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${colour}" stroke-width="1.4" stroke-linecap="round">
    <path d="M8 40c6-16 16-26 32-32"/><path d="M14 30c-4-5-4-11-1-16 5 2 8 7 8 13"/>
    <path d="M22 21c-2-6 0-11 4-14 4 3 5 8 3 14"/><path d="M31 14c0-5 3-9 8-10 1 5-1 9-5 12"/>
    <path d="M12 36c-6-1-9-5-9-10 5 0 9 3 11 8"/><path d="M21 27c-6 0-10-3-11-8 5-1 9 1 12 6"/>
  </g>`;

function placeholder(label, bg, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <!-- [TODO] placeholder image; swap for real photography -->
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${palette.hairline}" stroke-width="2" rx="24"/>
  ${leaf(w * 0.08, h * 0.08, w / 140, palette.sageInk)}
  ${leaf(w * 0.62, h * 0.62, w / 140, palette.tan)}
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 16)}" fill="${palette.cocoa}">${label}</text>
  <text x="${w / 2}" y="${h / 2 + w / 12}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(w / 40)}" letter-spacing="4" fill="${palette.cocoaMuted}">PHOTO TO FOLLOW</text>
</svg>`;
}

await mkdir(path.join(pub, "items"), { recursive: true });
await mkdir(path.join(pub, "occasions"), { recursive: true });

for (const [slug, label, bg] of items) {
  await writeFile(path.join(pub, "items", `${slug}.svg`), placeholder(label, bg, 800, 1000));
}
for (const [slug, label, bg] of occasions) {
  await writeFile(path.join(pub, "occasions", `${slug}.svg`), placeholder(label, bg, 800, 800));
}

// PNG icons rasterised from the round logo for the PWA manifest and Apple touch icon.
const logo = path.join(pub, "brand", "logo-round.svg");
for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["logo-round.png", 800],
]) {
  await sharp(logo, { density: 300 })
    .resize(size, size)
    .flatten({ background: palette.cream })
    .png()
    .toFile(path.join(pub, "brand", name));
}
await sharp(logo, { density: 300 })
  .resize(180, 180)
  .flatten({ background: palette.cream })
  .png()
  .toFile(path.join(root, "src", "app", "apple-icon.png"));

console.log("Brand placeholders written to public/items, public/occasions, public/brand and src/app/apple-icon.png");
