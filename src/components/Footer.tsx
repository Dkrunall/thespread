import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/#shop", label: "The menu" },
  { href: "/#process", label: "How we make it" },
  { href: "/#secrets", label: "Kitchen notes" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const social = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.04 3.74 2.41V9.9c-1.24-.07-2.47-.46-3.54-1.14-.94-.59-1.72-1.42-2.26-2.41v8.52c-.03 1.21-.36 2.4-.98 3.44a6.6 6.6 0 0 1-2.67 2.65c-1.21.66-2.58.98-3.96.93a6.83 6.83 0 0 1-5.11-2.48c-.76-.89-1.28-1.97-1.52-3.11a7.1 7.1 0 0 1 .46-4.52c.6-1.34 1.63-2.46 2.92-3.18 1.15-.65 2.46-.98 3.78-.96.02 1.4-.01 2.8.01 4.2-.67-.04-1.35.09-1.95.42a2.82 2.82 0 0 0-1.34 1.76c-.22.76-.14 1.57.22 2.27.37.7 1.01 1.23 1.76 1.48.68.22 1.42.16 2.06-.18.66-.35 1.18-.94 1.46-1.64.08-.28.12-.57.12-.86v-14.8h.01Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-ink/25 px-5 py-14 text-center">
      <Logo className="mx-auto h-28 md:h-36 w-auto" />
      <p className="hand mt-6 text-4xl">
        <a
          href="mailto:hello@thedailyspread.ae"
          className="underline decoration-pink decoration-2 underline-offset-8 hover:text-pink-deep"
        >
          hello@thedailyspread.ae
        </a>
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <a href="mailto:hello@thedailyspread.ae" className="round-btn" aria-label="Email us">
          <Mail className="size-5" />
        </a>
        {social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="round-btn" aria-label={s.label}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>
      <nav aria-label="Footer" className="typed mt-8 flex flex-wrap justify-center gap-x-8 gap-y-1">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="py-2 hover:text-pink-deep">
            {l.label}
          </Link>
        ))}
      </nav>
      <p className="mt-6 font-mono text-sm">© {new Date().getFullYear()} The Spread Ltd. All rights reserved.</p>
    </footer>
  );
}
