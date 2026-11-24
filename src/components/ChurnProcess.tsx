import Cutout from "./Cutout";

const steps = [
  {
    title: "Culture",
    text: "High-fat organic cream from local UAE pasture farms, cultured slowly for 24 hours. That gives the butter its mild tang and depth.",
    fact: "82% butterfat",
    art: "butter",
    tilt: "-rotate-2",
    tape: "#f283ae",
  },
  {
    title: "Whip, twice",
    text: "Slow-churned, then double-whipped cold to trap tiny pockets of air. It is why the butter melts the moment it touches warm bread.",
    fact: "14°C, never warmer",
    art: "whisk",
    tilt: "rotate-1 lg:translate-y-8",
    tape: "#87d1cc",
  },
  {
    title: "Fold",
    text: "Clover honey, Iranian saffron or whole garlic, folded through by hand. Real spices and fresh herbs, no flavourings or fillers.",
    fact: "Whole ingredients only",
    art: "crocus",
    tilt: "-rotate-1",
    tape: "#bdd39e",
  },
  {
    title: "Seal",
    text: "Poured into glass by hand, labelled with its batch and sent out in a temperature-controlled box within hours of whipping.",
    fact: "24 jars to a batch",
    art: "stamp",
    tilt: "rotate-2 lg:translate-y-8",
    tape: "#ffdf7e",
  },
];

export default function ChurnProcess() {
  return (
    <section id="process" className="overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-20 md:py-32">
        <h2 className="display text-green text-6xl md:text-8xl max-w-[12ch]">How a jar gets made</h2>
        <ol className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:pb-8">
          {steps.map((s, i) => (
            <li key={s.title} className={`sheet relative ${s.tilt} flex flex-col p-6 transition-transform duration-300 hover:rotate-0`}>
              <span aria-hidden className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 opacity-80" style={{ background: s.tape }} />
              <div className="flex items-baseline justify-between border-b-2 border-pink pb-2">
                <h3 className="typed text-2xl">{s.title}</h3>
                <span className="hand text-4xl text-pink-deep">{i + 1}</span>
              </div>
              <div className="grid h-44 place-items-center py-4">
                <Cutout name={`art/${s.art}`} className="max-h-36 w-auto max-w-full object-contain" sizes="220px" />
              </div>
              <p className="text-lg leading-relaxed">{s.text}</p>
              <p className="hand mt-auto pt-5 text-3xl text-green">{s.fact}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
