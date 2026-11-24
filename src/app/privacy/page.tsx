import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy Policy | The Daily Spread" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 pt-36 pb-20 md:px-12 md:pt-44">
        <div className="mx-auto max-w-4xl">
          <h1 className="display text-green text-5xl md:text-7xl">Privacy Policy</h1>
          <p className="mt-4 font-mono">Last updated: June 21, 2026</p>
          <div className="sheet mt-10 grid gap-9 p-6 text-lg leading-relaxed md:p-12">
            <p className="text-2xl leading-snug">
              Welcome to The Daily Spread. We respect your privacy and are committed to protecting your personal data.
            </p>

            <section className="grid gap-3">
              <h2 className="typed text-xl">1. Data Collection</h2>
              <p>
                We collect information when you place an order, join our mailing list, or interact with our interactive features (such as the Taste
                Matcher Mood Quiz). This information includes:
              </p>
              <ul className="grid list-disc gap-1.5 pl-6">
                <li>CONTACT DATA: Name, email address, telephone number.</li>
                <li>SHIPPING DATA: Delivery address, Emirate, country.</li>
                <li>TRANSACTION DATA: Details of products purchased and transaction totals.</li>
                <li>TECHNICAL DATA: IP address, browser type, and navigation logs.</li>
              </ul>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">2. How We Use Your Information</h2>
              <p>
                Your data is collected to process orders, schedule delivery runs across the UAE, provide tailored product recommendations, and keep
                you informed of fresh batched collections. We do not sell or trade your data to third parties.
              </p>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">3. Secure Payments</h2>
              <p>
                All transaction details are handled using encrypted Secure Sockets Layer (SSL) technology. Payment gateways like Stripe ensure that
                cardholder credentials are processed securely and are never stored on our servers.
              </p>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">4. Cookies & Analytics</h2>
              <p>
                Our store uses minor functional cookies to persist your shopping cart selection inside your local browser storage. Analytical tags
                help us measure performance, traffic details, and visual story engagement metrics.
              </p>
            </section>

            <section className="grid gap-3 border-t-2 border-dashed border-ink/25 pt-6">
              <p>
                For questions regarding this policy, please reach out to our legal department at{" "}
                <a href="mailto:hello@thedailyspread.ae" className="underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep">
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
