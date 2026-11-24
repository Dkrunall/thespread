import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Terms of Service | The Daily Spread" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 pt-36 pb-20 md:px-12 md:pt-44">
        <div className="mx-auto max-w-4xl">
          <h1 className="display text-green text-5xl md:text-7xl">Terms of Service</h1>
          <p className="mt-4 font-mono">Last updated: June 21, 2026</p>
          <div className="sheet mt-10 grid gap-9 p-6 text-lg leading-relaxed md:p-12">
            <p className="text-2xl leading-snug">Please read these terms of service carefully before accessing our storefront or placing orders.</p>

            <section className="grid gap-3">
              <h2 className="typed text-xl">1. Acceptance of Terms</h2>
              <p>
                By using our website, placing an order, or interacting with The Daily Spread, you agree to comply with and be bound by these Terms of
                Service. If you do not agree, please refrain from using our services.
              </p>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">2. Gourmet Food Products</h2>
              <p>
                All of our flavored butters and spreads are freshly small-batched and require refrigerated storage. We outline product weight details
                (standard 200g jars) and allergen declarations (contains dairy, tree nuts, and natural honey elements). Consuming raw or paired
                ingredients is at the discretion of the consumer.
              </p>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">3. Deliveries and Dispatch</h2>
              <p>
                We offer daily courier dispatches across Dubai. Orders submitted before 2:00 PM are slated for same-day delivery under our VIP speed
                tier. While we strive to meet all delivery timelines, we are not liable for delayed dispatches due to logistical interruptions or
                environmental conditions.
              </p>
            </section>

            <section className="grid gap-3">
              <h2 className="typed text-xl">4. Returns and Cancellations</h2>
              <p>
                Due to the perishable nature of fresh gourmet products, we do not accept returns. If your jars arrive compromised or fail to meet our
                high satisfaction standards, contact customer care for a prompt refund or fresh replacement batch.
              </p>
            </section>

            <section className="grid gap-3 border-t-2 border-dashed border-ink/25 pt-6">
              <p>
                For further clarification or custom inquiries, please reach out to hello at{" "}
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
