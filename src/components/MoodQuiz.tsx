"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Cutout from "./Cutout";
import { useCart } from "@/context/CartContext";
import { getProduct, products } from "@/data/products";

const questions: { text: string; options: { text: string; points: Record<string, number> }[] }[] = [
  {
    text: "What describes your current vibe?",
    options: [
      { text: "Cozy, wrapped in a blanket watching movies", points: { "karak-chai": 3, "chocolate-hazelnut": 2 } },
      { text: "Bold, adventurous, and ready to experiment", points: { "date-miso": 3, "spicy-thai": 2, "smoked-chilli": 2 } },
      { text: "Elegant, luxurious, and treat-yourself style", points: { "saffron-honey": 3, raspberry: 2 } },
      { text: "Clean, organic, and plant-powered", points: { "vegan-butter": 3, "herb-garlic": 2, "peanut-butter": 1 } },
    ],
  },
  {
    text: "What are you planning to spread it on?",
    options: [
      { text: "A warm, crusty piece of sourdough toast", points: { "saffron-honey": 2, "herb-garlic": 3, "date-miso": 2 } },
      { text: "Freshly baked croissants or sweet pastries", points: { "karak-chai": 2, "chocolate-hazelnut": 3, raspberry: 2 } },
      { text: "Stir-fried noodles, rice, or pan-fried eggs", points: { "smoked-chilli": 3, "spicy-thai": 3, "herb-garlic": 1 } },
      { text: "Crackers, apples, or straight off the spoon!", points: { "peanut-butter": 3, "vegan-butter": 2, "saffron-honey": 1 } },
    ],
  },
  {
    text: "Choose a flavor profile that speaks to you:",
    options: [
      { text: "Sweet, spiced, and warm", points: { "karak-chai": 3, "chocolate-hazelnut": 2 } },
      { text: "Zesty, hot, and savory", points: { "smoked-chilli": 3, "spicy-thai": 3 } },
      { text: "Salty-sweet, umami blend", points: { "date-miso": 3, "peanut-butter": 1 } },
      { text: "Fresh herbs, garlic, and pure dairy goodness", points: { "herb-garlic": 3, "vegan-butter": 2 } },
    ],
  },
];

function bestMatch(answers: Record<string, number>[]) {
  const totals: Record<string, number> = {};
  for (const points of answers) for (const [id, n] of Object.entries(points)) totals[id] = (totals[id] ?? 0) + n;
  const [id] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0] ?? [];
  return getProduct(id ?? "") ?? products[0];
}

export default function MoodQuiz() {
  const { addToCart } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);

  useEffect(() => {
    const open = () => {
      setAnswers([]);
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    window.addEventListener("open-mood-quiz", open);
    if (new URLSearchParams(window.location.search).get("open-quiz") === "true") {
      window.history.replaceState({}, "", window.location.pathname);
      window.dispatchEvent(new CustomEvent("open-mood-quiz"));
    }
    return () => window.removeEventListener("open-mood-quiz", open);
  }, []);

  const close = () => dialog.current?.close();
  const question = questions[answers.length];
  const match = question ? null : bestMatch(answers);

  return (
    <dialog
      ref={dialog}
      aria-label="Which spread are you?"
      className="m-auto w-[min(620px,calc(100vw-2rem))] max-h-[92dvh] overflow-y-auto bg-card p-7 md:p-10 shadow-lift rounded-sm"
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="typed pt-3">{question ? `Question ${answers.length + 1} of ${questions.length}` : "You are"}</p>
        <button type="button" className="round-btn shrink-0" onClick={close} aria-label="Close quiz">
          <X className="size-5" />
        </button>
      </div>

      {question && (
        <>
          <h2 className="display text-green mt-4 text-4xl md:text-5xl">{question.text}</h2>
          <div className="mt-7 grid gap-3">
            {question.options.map((o) => (
              <button
                key={o.text}
                type="button"
                className="min-h-14 border-2 border-ink/25 bg-white px-5 py-3 text-left text-lg leading-snug rounded-sm transition-colors hover:border-green hover:bg-butter"
                onClick={() => setAnswers([...answers, o.points])}
              >
                {o.text}
              </button>
            ))}
          </div>
        </>
      )}

      {match && (
        <div className="mt-4 text-center">
          <div className="grid place-items-center rounded-sm py-6" style={{ background: match.color }}>
            <Cutout name={`jars/${match.id}`} className="h-56 w-auto -rotate-3" sizes="220px" />
          </div>
          <h2 className="display text-green mt-6 text-5xl md:text-6xl">{match.name}</h2>
          <p className="mt-3 text-xl">{match.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="btn"
              onClick={() => {
                close();
                addToCart(match);
              }}
            >
              Add a jar, AED {match.price}
            </button>
            <button type="button" className="btn btn-line" onClick={() => setAnswers([])}>
              Ask me again
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
