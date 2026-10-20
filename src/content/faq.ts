import type { FaqEntry } from "@/domain/types";

/**
 * FAQ content. Every answer is Open and marked [TODO] until the owner confirms the terms.
 */

const faq: FaqEntry[] = [
  {
    id: "delivery",
    question: "Where do you deliver?",
    answer:
      "We deliver and collect across Newcastle and surrounding areas, within roughly 20 miles of the city. [TODO] Tell us your postcode when you message and we will confirm.",
  },
  {
    id: "minimums",
    question: "Is there a minimum order?",
    answer: "No minimum at the moment. [TODO] A handful of chairs for a birthday is as welcome as a full garden party.",
  },
  {
    id: "damage",
    question: "What happens if something gets damaged?",
    answer:
      "Normal wear is expected and we never charge for it. If an item is broken or lost we ask for the cost of replacing it, which we will agree with you before the event. [TODO]",
  },
  {
    id: "weather",
    question: "What if the weather turns?",
    answer:
      "Our tables and chairs are happy outdoors in a light shower, but we ask that they come under cover overnight. If the forecast means you need to change the plan, message us and we will do what we can. [TODO]",
  },
];

export function listFaq(): FaqEntry[] {
  return faq;
}
