"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Side panel built on <dialog>, which gives us Escape, focus trapping and an inert background. */
export default function Drawer({
  open,
  onClose,
  side,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="drawer shadow-lift"
      data-side={side}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b-2 border-dashed border-ink/25">
          <h2 className="display text-3xl">{title}</h2>
          <button type="button" className="round-btn" onClick={onClose} aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
