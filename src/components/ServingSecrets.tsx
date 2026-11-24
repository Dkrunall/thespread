import { Plus } from "lucide-react";
import Cutout from "./Cutout";

const notes = [
  {
    question: "Why should double-whipped butter be served at 21°C room temperature?",
    answer:
      "Whipped butter contains microscopic air pockets. When chilled, these fats contract and tighten. Leaving the jar at room temperature (21°C) for 15-20 minutes allows the air bubbles to expand, releasing aromatic flavor molecules and creating an effortless, creamy spreadability.",
  },
  {
    question: "How long do the artisanal spreads remain fresh?",
    answer:
      "We churn in small batches and add zero chemical preservatives. Sealed jars stay fresh for up to 90 days refrigerated, or up to 6 months frozen. Once opened, we recommend enjoying within 3 weeks for peak sensory flavor.",
  },
  {
    question: "Are the butterfat and ingredients sourced locally in the UAE?",
    answer:
      "Yes! Our high-fat organic dairy base is sourced from premium pasture-fed cows here in the UAE. For flavor infusions, we source organic local herbs, while specialty items like our premium saffron are imported directly from artisan growers in Iran.",
  },
  {
    question: "Do you offer plant-based or dairy-free spread options?",
    answer:
      "Absolutely. We offer Vegan Butter (made from cold-pressed olive oils, organic coconut butter, and cashew milk) and Vegan Garlic Butter. You will find both under Specialty on the daily menu.",
  },
  {
    question: "How are delivery temperature constraints managed during UAE shipping?",
    answer:
      "All orders are hand-batched, labeled, and packed inside custom insulated thermal bags with cold gel packs. Our express delivery courier vehicles are fully temperature-controlled, guaranteeing your jars arrive chilled and ready.",
  },
];

export default function ServingSecrets() {
  return (
    <section id="secrets" className="overflow-x-clip scroll-mt-32">
      <div className="relative mx-auto max-w-[1100px] px-4 md:px-12 pb-20 md:pb-32">
        <Cutout name="art/garlic" className="absolute -right-2 -top-12 z-10 w-28 md:w-40 h-auto rotate-12" sizes="160px" />
        <div className="ruled shadow-paper py-12 pl-11 md:pl-[92px] pr-5 md:pr-14">
          <h2 className="display text-green text-5xl md:text-7xl">Kitchen notes</h2>
          <div className="mt-8">
            {notes.map((n, i) => (
              <details key={n.question} name="notes" open={i === 0} className="group border-b-2 border-dashed border-ink/25 py-5">
                <summary className="flex list-none items-start justify-between gap-5 text-xl md:text-2xl font-semibold leading-snug hover:text-pink-deep [&::-webkit-details-marker]:hidden">
                  {n.question}
                  <Plus aria-hidden className="mt-1 size-6 shrink-0 text-pink-deep transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-[62ch] text-lg leading-relaxed">{n.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
