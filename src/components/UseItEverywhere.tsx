import Cutout from "./Cutout";

const uses = [
  { title: "Spread", text: "Toast, bagels, croissants, crackers.", art: "toast", r: "-rotate-6" },
  { title: "Melt", text: "Pasta, noodles, rice, corn, eggs.", art: "chilli", r: "rotate-6" },
  { title: "Finish", text: "Salmon, steak, chicken, roasted veg.", art: "basil", r: "-rotate-3" },
  { title: "Gift", text: "Butter boards, brunch boxes, press kits.", art: "postcard", r: "rotate-6" },
];

export default function UseItEverywhere() {
  return (
    <section id="use-everywhere" className="gingham">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-16 md:py-24">
        <div className="sheet px-6 py-12 md:px-14 md:py-16">
          <h2 className="display text-center text-green text-5xl md:text-7xl">It goes on everything</h2>
          <ul className="mt-12 grid gap-y-12 gap-x-8 grid-cols-2 lg:grid-cols-4">
            {uses.map((u) => (
              <li key={u.title} className="text-center">
                <div className="grid h-36 md:h-44 place-items-center">
                  <Cutout name={`art/${u.art}`} className={`max-h-36 md:max-h-44 w-auto max-w-[85%] object-contain ${u.r}`} sizes="200px" />
                </div>
                <h3 className="display mt-5 text-4xl text-pink-deep">{u.title}</h3>
                <p className="mx-auto mt-2 max-w-[20ch] text-lg leading-snug">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
