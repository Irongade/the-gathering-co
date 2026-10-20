import { Armchair, Heart, MapPin, Truck } from "lucide-react";
import { SITE } from "@/content/site";

const features = [
  { Icon: Armchair, title: "Table & chair hire", body: "Round tables, trestles and chairs for any size of do." },
  { Icon: Truck, title: "Delivery & collection", body: "We drop off before and collect after. No van needed." },
  { Icon: MapPin, title: SITE.area, body: "Local, so we can be flexible on times." },
  { Icon: Heart, title: SITE.promise, body: "One message and the furniture is sorted." },
];

/** "What we offer", four quiet tiles. */
export function FeatureStrip() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map(({ Icon, title, body }) => (
        <li key={title} className="flex gap-4 rounded-xl border border-hairline bg-surface p-5 sm:p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-4xl bg-sage text-sage-ink">
            <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-cocoa-muted">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
