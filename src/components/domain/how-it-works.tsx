const steps = [
  {
    title: "Message us",
    body: "Tell us the date, the occasion, roughly how many people and where. WhatsApp is quickest.",
  },
  {
    title: "We confirm",
    body: "We reply with what is available and a price. No forms, no deposits until we have agreed it.",
  },
  { title: "We deliver and collect", body: "We drop everything off before your event and pick it up afterwards." },
];

/** The only numbered sequence on the site. */
export function HowItWorks() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-xl border border-hairline bg-surface p-5 sm:p-6">
          <span className="display text-3xl text-tan" aria-hidden="true">
            {index + 1}
          </span>
          <h3 className="display mt-3 text-2xl">{step.title}</h3>
          <p className="mt-2 text-cocoa-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
