import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqEntry } from "@/domain/types";
import { EmptyState } from "./empty-state";

export function Faq({ entries }: { entries: FaqEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="No questions yet" body="Ask us anything on WhatsApp and we will answer straight away." />;
  }
  return (
    <Accordion type="single" collapsible className="rounded-xl border border-hairline bg-surface px-5 sm:px-6">
      {entries.map((entry) => (
        <AccordionItem key={entry.id} value={entry.id}>
          <AccordionTrigger>{entry.question}</AccordionTrigger>
          <AccordionContent>{entry.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
