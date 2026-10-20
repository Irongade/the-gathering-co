"use client";

import { Copy, Mail, MessageCircle } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/content/site";
import { type EnquiryOutput, enquirySchema } from "@/domain/schemas";
import type { Occasion } from "@/domain/types";
import { cn } from "@/lib/utils";
import { mailtoUrl, whatsappUrl } from "@/lib/whatsapp";

type Field = "name" | "eventDate" | "occasion" | "guestCount" | "area" | "message";
type Errors = Partial<Record<Field, string>>;

const EMPTY = { name: "", eventDate: "", occasion: "", guestCount: "", area: "", message: "" };

export function buildEnquiryMessage(enquiry: EnquiryOutput, occasions: Occasion[]): string {
  const occasionName =
    enquiry.occasion === "other"
      ? "Other"
      : (occasions.find((o) => o.slug === enquiry.occasion)?.name ?? enquiry.occasion);
  const lines = [
    `Hi ${SITE.name.replace(/\.$/, "")}, I'd like to ask about hire.`,
    `Name: ${enquiry.name}`,
    `Event date: ${enquiry.eventDate ?? "Not sure yet"}`,
    `Occasion: ${occasionName}`,
    `Guests: ${enquiry.guestCount ?? "Not sure yet"}`,
    `Area: ${enquiry.area}`,
  ];
  if (enquiry.message) lines.push(`Message: ${enquiry.message}`);
  return lines.join("\n");
}

export function EnquiryForm({ occasions }: { occasions: Occasion[] }) {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): EnquiryOutput | null {
    const result = enquirySchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return result.data;
    }
    const flat = result.error.flatten().fieldErrors;
    const next: Errors = {};
    for (const key of Object.keys(flat) as Field[]) next[key] = flat[key]?.[0];
    setErrors(next);
    toast.error("Check the highlighted fields");
    return null;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = validate();
    if (!data) return;
    setPending(true);
    const text = buildEnquiryMessage(data, occasions);
    setMessage(text);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp");
    window.setTimeout(() => setPending(false), 600);
  }

  async function onCopy() {
    const data = validate();
    if (!data) return;
    const text = buildEnquiryMessage(data, occasions);
    setMessage(text);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy. Select the message below and copy it by hand.");
    }
  }

  const mailto = message
    ? mailtoUrl(`Hire enquiry from ${values.name.trim()}`, message)
    : mailtoUrl("Hire enquiry", SITE.whatsapp.defaultMessage);

  const fieldClass = (field: Field) => cn(errors[field] && "border-brick ring-2 ring-brick/20");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" data-testid="enquiry-form">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-name`}>Your name</Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={fieldClass("name")}
          />
          {errors.name ? <FieldError id={`${id}-name-error`}>{errors.name}</FieldError> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-date`}>Event date</Label>
          <Input
            id={`${id}-date`}
            name="eventDate"
            type="date"
            value={values.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            aria-invalid={!!errors.eventDate}
            aria-describedby={errors.eventDate ? `${id}-date-error` : undefined}
            className={fieldClass("eventDate")}
          />
          {errors.eventDate ? <FieldError id={`${id}-date-error`}>{errors.eventDate}</FieldError> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-occasion`}>Occasion</Label>
          <select
            id={`${id}-occasion`}
            name="occasion"
            value={values.occasion}
            onChange={(e) => update("occasion", e.target.value)}
            aria-invalid={!!errors.occasion}
            aria-describedby={errors.occasion ? `${id}-occasion-error` : undefined}
            className={cn(
              "h-11 w-full rounded-md border border-input bg-surface px-3 text-base text-cocoa outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              values.occasion === "" && "text-cocoa-muted",
              fieldClass("occasion"),
            )}
          >
            <option value="" disabled>
              Choose an occasion
            </option>
            {occasions.map((occasion) => (
              <option key={occasion.slug} value={occasion.slug}>
                {occasion.name}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
          {errors.occasion ? <FieldError id={`${id}-occasion-error`}>{errors.occasion}</FieldError> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-guests`}>Rough guest count</Label>
          <Input
            id={`${id}-guests`}
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            value={values.guestCount}
            onChange={(e) => update("guestCount", e.target.value)}
            aria-invalid={!!errors.guestCount}
            aria-describedby={errors.guestCount ? `${id}-guests-error` : undefined}
            className={fieldClass("guestCount")}
          />
          {errors.guestCount ? <FieldError id={`${id}-guests-error`}>{errors.guestCount}</FieldError> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${id}-area`}>Postcode or area</Label>
        <Input
          id={`${id}-area`}
          name="area"
          autoComplete="postal-code"
          placeholder="NE3, Gosforth"
          value={values.area}
          onChange={(e) => update("area", e.target.value)}
          aria-invalid={!!errors.area}
          aria-describedby={errors.area ? `${id}-area-error` : undefined}
          className={fieldClass("area")}
        />
        {errors.area ? <FieldError id={`${id}-area-error`}>{errors.area}</FieldError> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>What do you need?</Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          placeholder="Ten chairs and two round tables for a garden party, dropped off on the Saturday morning."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={fieldClass("message")}
        />
        {errors.message ? <FieldError id={`${id}-message-error`}>{errors.message}</FieldError> : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          type="submit"
          size="lg"
          pending={pending}
          className="bg-whatsapp text-cocoa hover:bg-[color-mix(in_oklch,var(--whatsapp),var(--cocoa)_12%)] rounded-4xl sm:flex-1"
        >
          {pending ? null : <MessageCircle data-icon="inline-start" aria-hidden="true" />}
          Open WhatsApp
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCopy}>
          <Copy data-icon="inline-start" aria-hidden="true" />
          Copy message
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={mailto}>
            <Mail data-icon="inline-start" aria-hidden="true" />
            Email instead
          </a>
        </Button>
      </div>

      {message ? (
        <div className="rounded-xl border border-hairline bg-surface p-4">
          <p className="eyebrow mb-2">Your message</p>
          <pre className="whitespace-pre-wrap font-sans text-sm text-cocoa" data-testid="enquiry-preview">
            {message}
          </pre>
        </div>
      ) : null}
      <p className="text-sm text-cocoa-muted">Nothing is stored here. The message goes straight to our WhatsApp.</p>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-sm text-brick">
      {children}
    </p>
  );
}
