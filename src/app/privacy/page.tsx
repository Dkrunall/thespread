"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              Legal Framework
            </span>
            <h1 className="font-serif-display text-4xl md:text-5xl font-normal text-midnight-slate tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-[10px] font-mono text-midnight-slate/40 uppercase mt-2">
              Last Updated: June 21, 2026 • Document ID: DS-PP-2026
            </p>
          </div>

          {/* Policy Text */}
          <div className="space-y-8 font-serif text-sm text-midnight-slate/85 leading-relaxed">
            <p className="font-sans font-bold text-xs uppercase tracking-wider text-brass-gold">
              Welcome to The Daily Spread. We respect your privacy and are committed to protecting your personal data.
            </p>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                1. Data Collection
              </h2>
              <p>
                We collect information when you place an order, join our mailing list, or interact with our interactive features (such as the Taste Matcher Mood Quiz). This information includes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-midnight-slate/75">
                <li>CONTACT DATA: Name, email address, telephone number.</li>
                <li>SHIPPING DATA: Delivery address, Emirate, country.</li>
                <li>TRANSACTION DATA: Details of products purchased and transaction totals.</li>
                <li>TECHNICAL DATA: IP address, browser type, and navigation logs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                2. How We Use Your Information
              </h2>
              <p>
                Your data is collected to process orders, schedule delivery runs across the UAE, provide tailored product recommendations, and keep you informed of fresh batched collections. We do not sell or trade your data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                3. Secure Payments
              </h2>
              <p>
                All transaction details are handled using encrypted Secure Sockets Layer (SSL) technology. Payment gateways like Stripe ensure that cardholder credentials are processed securely and are never stored on our servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold text-midnight-slate">
                4. Cookies & Analytics
              </h2>
              <p>
                Our store uses minor functional cookies to persist your shopping cart selection inside your local browser storage. Analytical tags help us measure performance, traffic details, and visual story engagement metrics.
              </p>
            </section>

            <section className="space-y-3 border-t border-midnight-slate/10 pt-6 font-sans text-xs text-midnight-slate/50">
              <p>
                For questions regarding this policy, please reach out to our legal department at{" "}
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
