"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Cutout from "./Cutout";

/**
 * Every object on the breakfast table. Positions are the object's centre, as a
 * percentage of the table; widths are a percentage of the table's width.
 * d = desktop [x, y, width], m = mobile [x, y, width] where y is in vw, r = rotation.
 */
interface TableItem {
  name: string;
  d: [number, number, number];
  m: [number, number, number];
  r: number;
  href?: string;
  label?: string;
}

const items: TableItem[] = [
  // around the headline
  { name: "art/napkin", d: [4, 10, 25], m: [22, 146, 56], r: -12 },
  { name: "jars/saffron-honey", d: [9, 10.5, 12], m: [25, 147, 30], r: -8, href: "/spreads/saffron-honey", label: "Saffron Honey" },
  { name: "art/toast", d: [92, 10, 15], m: [79, 137, 36], r: 14 },
  { name: "art/crocus", d: [24, 23.2, 8.5], m: [90, 178, 17], r: -20 },
  { name: "art/flower", d: [78.5, 22.5, 11], m: [58, 166, 24], r: 10 },
  // beside the story
  { name: "art/knife", d: [48, 33, 25], m: [89, 226, 44], r: 62 },
  { name: "art/postcard", d: [52.5, 39.5, 22], m: [66, 335, 52], r: -7 },
  { name: "jars/karak-chai", d: [44, 46.5, 11.5], m: [89, 281, 22], r: 7, href: "/spreads/karak-chai", label: "Karak Chai Butter" },
  { name: "art/chai", d: [91, 28.3, 10], m: [21, 330, 22], r: 5 },
  { name: "art/chilli", d: [73, 29, 13], m: [30, 446, 32], r: 24 },
  { name: "art/garlic", d: [33.5, 49, 8.5], m: [10, 353, 17], r: -10 },
  // along the swoosh
  { name: "art/recipe", d: [11.5, 55.5, 22], m: [31, 540, 56], r: -9 },
  { name: "art/raspberry", d: [36, 64.5, 10], m: [79, 448, 24], r: 12 },
  { name: "art/butter", d: [85, 55.5, 18], m: [79, 531, 38], r: 6 },
  { name: "art/lime", d: [72, 68.5, 6.5], m: [67, 555, 14], r: 0 },
  { name: "art/stamp", d: [93, 66.5, 8], m: [90, 556, 16], r: 12 },
  // by the method
  { name: "art/dipper", d: [53.5, 73.5, 8.5], m: [82, 632, 15], r: 34 },
  { name: "art/list", d: [9, 75.5, 14], m: [17, 644, 31], r: -6 },
  { name: "jars/smoked-chilli", d: [26, 81, 11.5], m: [50, 636, 27], r: 9, href: "/spreads/smoked-chilli", label: "Smoked Chilli" },
  { name: "art/olive", d: [40, 85, 11], m: [26, 683, 20], r: -16 },
  { name: "art/whisk", d: [93.5, 85.5, 7], m: [92, 674, 14], r: 38 },
  { name: "art/belief", d: [80.5, 88, 13], m: [62, 674, 31], r: 6 },
  { name: "art/croissant", d: [15, 92.5, 15], m: [30, 741, 38], r: -10 },
  { name: "art/hazelnut", d: [60, 96, 7.5], m: [74, 742, 20], r: 8 },
];

/** Butter, from the shadowed underside up to the highlight. */
const SMEAR = [
  { d: "M-80 255 C120 95 340 115 540 205 C760 305 900 325 1090 235 C1250 161 1400 175 1540 225", stroke: "#E5B94E", strokeWidth: 142 },
  { d: "M-80 250 C120 90 340 110 540 200 C760 300 900 320 1090 230 C1250 156 1400 170 1540 220", stroke: "#FFDF7E", strokeWidth: 130 },
  { d: "M-80 206 C120 46 340 66 540 156 C760 256 900 276 1090 186 C1250 112 1400 126 1540 176", stroke: "#FFF3BF", strokeWidth: 10 },
];

export default function Hero() {
  const table = useRef<HTMLElement>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const topZ = useRef(items.length + 1);
  const [messy, setMessy] = useState(false);

  // Butter spreads across the page as you scroll past it.
  const swoosh = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: swoosh, offset: ["start 95%", "end 45%"] });
  const spreadLength = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  const cutouts = useCallback(() => Array.from(table.current?.querySelectorAll<HTMLElement>(".cutout") ?? []), []);

  const setTable = useCallback(() => {
    cutouts().forEach((el, i) => {
      el.dataset.glide = "";
      el.style.setProperty("--delay", `${i * 12}ms`);
      el.style.left = el.style.top = "";
      el.style.setProperty("--r", `${items[i].r}deg`);
    });
    setMessy(false);
  }, [cutouts]);

  const shuffle = () => {
    const el = table.current;
    if (!el) return;
    const rows = Math.ceil(items.length / 4);
    const slots = items.map((_, i) => i).sort(() => Math.random() - 0.5);
    cutouts().forEach((node, i) => {
      const slot = slots[i];
      const x = 12 + (slot % 4) * 25 + (Math.random() - 0.5) * 18;
      const y = 8 + Math.floor(slot / 4) * (86 / rows) + Math.random() * 10;
      node.dataset.glide = "";
      node.style.setProperty("--delay", `${Math.random() * 180}ms`);
      node.style.left = `${Math.min(93, Math.max(7, x))}%`;
      node.style.top = `${Math.min(95, y)}%`;
      node.style.setProperty("--r", `${Math.round((Math.random() - 0.5) * 70)}deg`);
    });
    setMessy(true);
  };

  // Desktop and mobile have different layouts, so start fresh when crossing over.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", setTable);
    return () => mq.removeEventListener("change", setTable);
  }, [setTable]);

  const pickUp = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const el = e.currentTarget;
    const rect = table.current!.getBoundingClientRect();
    const startLeft = (el.offsetLeft / rect.width) * 100;
    const startTop = (el.offsetTop / rect.height) * 100;
    const { clientX, clientY, pointerId } = e;
    let moved = false;
    // Capture straight away so a fast flick cannot outrun the object.
    el.setPointerCapture(pointerId);

    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      const dx = ev.clientX - clientX;
      const dy = ev.clientY - clientY;
      if (!moved) {
        if (Math.hypot(dx, dy) < 5) return;
        moved = true;
        delete el.dataset.glide;
        el.dataset.held = "";
        el.style.setProperty("--z", String(topZ.current++));
      }
      el.style.left = `${Math.min(98, Math.max(2, startLeft + (dx / rect.width) * 100))}%`;
      el.style.top = `${Math.min(99, Math.max(1, startTop + (dy / rect.height) * 100))}%`;
    };
    const drop = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", drop);
      el.removeEventListener("pointercancel", drop);
      delete el.dataset.held;
      if (moved) {
        el.dataset.moved = "";
        setMessy(true);
        // The click that follows a drag must not open the product.
        setTimeout(() => delete el.dataset.moved, 0);
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", drop);
    el.addEventListener("pointercancel", drop);
  };

  return (
    <section ref={table} id="hero" className="relative overflow-x-clip" aria-label="The breakfast table">
      {/* ---- printed on the paper ---- */}
      <div className="px-[5vw] md:px-[6vw] pt-[30vw] md:pt-[max(170px,15vw)] pb-[56vw] md:pb-40">
        <div className="text-center">
          <h1 className="display text-green text-[18.5vw] md:text-[8.6vw]">
            Butter, but <br className="md:hidden" />
            make it <br />
            <em className="text-pink-deep">cinematic.</em>
          </h1>
          <p className="mx-auto mt-[6vw] md:mt-8 max-w-[28ch] md:max-w-[38ch] text-[5.4vw] md:text-[clamp(1.15rem,1.75vw,1.9rem)] leading-snug">
            Double-whipped flavoured butters and sweet spreads, made in small batches in Dubai.
          </p>
        </div>

        <div className="mt-[70vw] md:mt-[14vw] grid md:grid-cols-12 gap-y-[58vw] md:gap-y-0 md:gap-x-[2vw]">
          <div className="md:col-span-4 max-md:pr-[21vw]">
            <h2 className="typed text-[5.4vw] leading-tight md:text-[clamp(1.1rem,1.7vw,1.9rem)]">Made in Dubai. Eaten at 21°C.</h2>
            <div className="mt-[5vw] md:mt-6 grid gap-[4vw] md:gap-5 text-[4.7vw] md:text-[clamp(1rem,1.25vw,1.4rem)] leading-relaxed">
              <p>It starts with high-fat organic cream from UAE pasture farms, cultured slowly for a full day until it tastes like something.</p>
              <p>Then we whip it. Then we whip it again, cold, so it holds enough air to melt the second it meets warm toast.</p>
              <p>Honey, saffron, garlic and chilli go in last, folded through by hand. No powders, no flavourings.</p>
            </div>
          </div>
          <dl className="md:col-span-4 md:col-start-9 font-mono grid gap-[4vw] md:gap-5 content-start md:pt-[12vw]">
            {[
              ["24 jars", "the most we make in one churn"],
              ["82%", "butterfat, and proud of it"],
              ["0", "preservatives"],
              ["14", "spreads to argue over"],
            ].map(([n, t]) => (
              <div
                key={t}
                className="grid grid-cols-[30vw_1fr] md:grid-cols-[9vw_1fr] items-baseline gap-[3vw] md:gap-4 border-b-2 border-dashed border-ink/25 pb-3"
              >
                <dt className="typed text-[6.4vw] md:text-[clamp(1.2rem,1.9vw,2.1rem)] leading-none whitespace-nowrap">{n}</dt>
                <dd className="text-[4.3vw] md:text-[clamp(.95rem,1.1vw,1.2rem)] leading-snug">{t}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* butter swoosh */}
        <div ref={swoosh} className="-mx-[5vw] md:-mx-[6vw] mt-[46vw] md:mt-[9vw]">
          <svg viewBox="0 0 1440 420" className="w-full overflow-visible max-md:scale-[1.35]" role="img" aria-label="Spread a little happiness">
            <defs>
              <path id="swoosh" d="M-80 250 C120 90 340 110 540 200 C760 300 900 320 1090 230 C1250 156 1400 170 1540 220" />
            </defs>
            {SMEAR.map((layer) => (
              <motion.path key={layer.d} {...layer} fill="none" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : spreadLength }} />
            ))}
            <text className="display" fill="#07745B" fontSize="88" dy="28" aria-hidden>
              <textPath href="#swoosh" startOffset="53%" textAnchor="middle">
                spread a little happiness
              </textPath>
            </text>
          </svg>
        </div>

        <div className="mt-[62vw] md:mt-[10vw] grid md:grid-cols-12 gap-x-[2vw]">
          <ol className="md:col-span-5 md:col-start-8 display text-[9.6vw] md:text-[3.7vw] whitespace-nowrap grid gap-[2.4vw] md:gap-[1vw] text-green">
            <li>Cultured for a day.</li>
            <li className="md:pl-[4vw]">Whipped twice, cold.</li>
            <li>Folded by hand.</li>
            <li className="text-pink-deep md:pl-[4vw]">Gone by Thursday.</li>
          </ol>
        </div>

        <p className="typed text-center mt-[84vw] md:mt-[15vw] text-[5vw] md:text-[clamp(1.1rem,1.6vw,1.8rem)] max-md:px-[8vw]">
          Stir it in. Melt it down. Eat it off the spoon.
        </p>
      </div>

      {/* ---- sitting on top of it ---- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {items.map((it, i) => {
          const style = {
            "--dx": `${it.d[0]}%`,
            "--dy": `${it.d[1]}%`,
            "--dw": `${it.d[2]}%`,
            "--mx": `${it.m[0]}%`,
            "--my": `${it.m[1]}vw`,
            "--mw": `${it.m[2]}%`,
            "--r": `${it.r}deg`,
            "--z": i + 1,
          } as React.CSSProperties;
          const picture = <Cutout name={it.name} sizes={`(min-width: 768px) ${it.d[2]}vw, ${it.m[2]}vw`} eager={i < 5} />;
          return it.href ? (
            <a
              key={it.name}
              href={it.href}
              aria-label={it.label}
              className="cutout"
              style={style}
              draggable={false}
              onPointerDown={pickUp}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                if (e.currentTarget.dataset.moved === undefined) router.push(it.href!);
              }}
            >
              {picture}
            </a>
          ) : (
            <div key={it.name} className="cutout" style={style} onPointerDown={pickUp}>
              {picture}
            </div>
          );
        })}
      </div>

      {/* ---- controls ---- */}
      <div className="sticky bottom-5 z-30 flex justify-center gap-2 md:gap-2.5 px-3 max-md:[&_.btn]:px-4 pb-5 pointer-events-none">
        <button type="button" className="btn shadow-lift pointer-events-auto" onClick={shuffle}>
          Shuffle<span className="max-md:hidden"> the table</span>
        </button>
        {messy && (
          <button type="button" className="btn btn-line shadow-lift pointer-events-auto" onClick={setTable}>
            Tidy up
          </button>
        )}
        <a href="#shop" className="btn btn-line shadow-lift pointer-events-auto whitespace-nowrap">
          Shop the spreads
        </a>
      </div>
    </section>
  );
}
