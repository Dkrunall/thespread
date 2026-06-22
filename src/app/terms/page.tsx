"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-[#FAF6F2] py-16 px-6 md:px-12 custom-hairline-grid min-h-[75vh] text-left">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Back Nav */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-midnight-slate/60 hover:text-brass-gold uppercase tracking-widest transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Return to Storefront
            </Link>
          </div>

          {/* Heading */}
          <div className="border-b border-midnight-slate/10 pb-6">
            <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block mb-2">
              Brand Guidelines
            </span>
            <h1 className="font-serif-display text-4xl md:text-5xl font-normal text-midnight-slate tracking-tight">
              Terms of Service
            </h1>
            <p className="text-[10px] font-mono text-midnight-slate/40 uppercase mt-2">
              Last Updated: June 21, 2026 • Document ID: DS-TOS-2026
            </p>
          </div>

          {/* Terms Text */}
          <div className="space-y-8 font-serif text-sm text-midnight-slate/85 leading-relaxed">
            <p className="font-sans font-bold text-xs uppercase tracking-wider text-brass-gold">
              Please read these terms of service carefully before accessing our storefront or placing orders.
            </p>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                1. Acceptance of Terms
              </h2>
              <p>
                By using our website, placing an order, or interacting with The Daily Spread, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                2. Gourmet Food Products
              </h2>
              <p>
                All of our flavored butters and spreads are freshly small-batched and require refrigerated storage. We outline product weight details (standard 200g jars) and allergen declarations (contains dairy, tree nuts, and natural honey elements). Consuming raw or paired ingredients is at the discretion of the consumer.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                3. Deliveries and Dispatch
              </h2>
              <p>
                We offer daily courier dispatches across Dubai. Orders submitted before 2:00 PM are slated for same-day delivery under our VIP speed tier. While we strive to meet all delivery timelines, we are not liable for delayed dispatches due to logistical interruptions or environmental conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                4. Returns and Cancellations
              </h2>
              <p>
                Due to the perishable nature of fresh gourmet products, we do not accept returns. If your jars arrive compromised or fail to meet our high satisfaction standards, contact customer care for a prompt refund or fresh replacement batch.
              </p>
            </section>

            <section className="space-y-3 border-t border-midnight-slate/10 pt-6 font-sans text-xs text-midnight-slate/50">
              <p>
                For further clarification or custom inquiries, please reach out to hello at{" "}
                <a href="mailto:hello@thedailyspread.ae" className="text-brass-gold underline">
                  hello@thedailyspread.ae
                </a>
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
