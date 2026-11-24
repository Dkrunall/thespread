"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cutout from "@/components/Cutout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Receipt from "@/components/Receipt";
import { useCart } from "@/context/CartContext";

const steps = ["Details", "Delivery", "Payment"];
const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];
const deliveryOptions = [
  { id: "express", name: "Dubai express", note: "Delivered in 24 to 48 hours", cost: 0 },
  { id: "vip", name: "VIP same-day", note: "Freshly churned to order", cost: 15 },
] as const;

function Field({ label, className, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="typed mb-1.5 block">{label}</span>
      <input className="field" {...input} />
    </label>
  );
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const form = useRef<HTMLFormElement>(null);
  const confirmation = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [shippingMethod, setShippingMethod] = useState<"express" | "vip">("express");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (orderPlaced) confirmation.current?.showModal();
  }, [orderPlaced]);

  const shippingCost = deliveryOptions.find((o) => o.id === shippingMethod)!.cost;
  const digits = (v: string) => v.replace(/\D/g, "");

  // Only the current step's fields are mounted, so the form validates one step at a time.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
    } else {
      setOrderPlaced(true);
    }
  };

  const finish = () => {
    clearCart();
    window.location.href = "/";
  };

  const submitLabel = ["Continue to delivery", "Continue to payment", "Place order"][step - 1];

  return (
    <>
      <Header />
      <main className="flex-1 px-5 pt-36 pb-20 md:px-12 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <h1 className="display text-green text-6xl md:text-8xl">Check out</h1>

          {cart.length === 0 && !orderPlaced ? (
            <div className="grid justify-items-center gap-6 py-20 text-center">
              <Cutout name="art/toast" className="w-56 h-auto -rotate-6" sizes="224px" />
              <p className="hand text-5xl">Your basket is empty.</p>
              <Link href="/#shop" className="btn">
                See the menu
              </Link>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit} className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
              <div>
                <ol className="typed flex flex-wrap gap-x-8 gap-y-2 border-b-2 border-dashed border-ink/25 pb-5">
                  {steps.map((name, i) => (
                    <li
                      key={name}
                      aria-current={step === i + 1 ? "step" : undefined}
                      className={step === i + 1 ? "text-pink-deep" : step > i + 1 ? "text-green" : "text-ink/75"}
                    >
                      {step > i + 1 ? "✓" : `${i + 1}.`} {name}
                    </li>
                  ))}
                </ol>

                {step === 1 && (
                  <div className="sheet mt-7 grid gap-5 p-6 sm:grid-cols-2 md:p-8">
                    <h2 className="display text-4xl sm:col-span-2">Where should it go?</h2>
                    <Field label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Field
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, "").substring(0, 15))}
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Full name"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Field label="Street address" autoComplete="address-line1" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Field
                      label="Apartment or unit (optional)"
                      autoComplete="address-line2"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                    <label className="block">
                      <span className="typed mb-1.5 block">Emirate</span>
                      <select className="field cursor-pointer" value={emirate} onChange={(e) => setEmirate(e.target.value)}>
                        {emirates.map((name) => (
                          <option key={name}>{name}</option>
                        ))}
                      </select>
                    </label>
                    <Field label="Country" disabled value="United Arab Emirates" />
                  </div>
                )}

                {step === 2 && (
                  <fieldset className="sheet mt-7 p-6 md:p-8">
                    <legend className="display float-left mb-6 text-4xl">How fast?</legend>
                    <div className="clear-both grid gap-4 sm:grid-cols-2">
                      {deliveryOptions.map((o) => (
                        <label
                          key={o.id}
                          className="flex cursor-pointer gap-4 rounded-sm border-2 border-ink/25 bg-white p-5 has-checked:border-green has-checked:bg-butter/45"
                        >
                          <input
                            type="radio"
                            name="delivery"
                            className="mt-1 size-5 accent-green"
                            checked={shippingMethod === o.id}
                            onChange={() => setShippingMethod(o.id)}
                          />
                          <span className="flex-1">
                            <span className="flex justify-between gap-3 text-xl font-semibold leading-tight">
                              {o.name}
                              <span className="typed whitespace-nowrap text-base">{o.cost ? `AED ${o.cost}` : "Free"}</span>
                            </span>
                            <span className="mt-1 block">{o.note}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <div className="sheet mt-7 grid gap-5 p-6 sm:grid-cols-2 md:p-8">
                    <h2 className="display text-4xl sm:col-span-2">Card details</h2>
                    <Field
                      className="sm:col-span-2"
                      label="Name on card"
                      autoComplete="cc-name"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Card number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      required
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          digits(e.target.value)
                            .replace(/(\d{4})(?=\d)/g, "$1 ")
                            .substring(0, 19)
                        )
                      }
                    />
                    <Field
                      label="Expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        const v = digits(e.target.value);
                        setCardExpiry(v.length > 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v);
                      }}
                    />
                    <Field
                      label="CVV"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(digits(e.target.value).substring(0, 4))}
                    />
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {step > 1 && (
                    <button type="button" className="btn btn-line" onClick={() => setStep(step - 1)}>
                      Back
                    </button>
                  )}
                  <button type="submit" className="btn flex-1">
                    {submitLabel}
                  </button>
                </div>
              </div>

              <Receipt
                lines={[
                  ["Items", `AED ${cartTotal}`],
                  ["Delivery", shippingCost ? `AED ${shippingCost}` : "Free"],
                ]}
                total={cartTotal + shippingCost}
              >
                <Link href="/cart" className="btn btn-line">
                  Edit basket
                </Link>
              </Receipt>
            </form>
          )}
        </div>
      </main>

      <dialog
        ref={confirmation}
        aria-label="Order confirmed"
        onCancel={(e) => e.preventDefault()}
        className="m-auto w-[min(520px,calc(100vw-2rem))] rounded-sm bg-card p-8 text-center shadow-lift md:p-10"
      >
        <Cutout name="art/flower" className="mx-auto w-40 h-auto -rotate-6" sizes="160px" />
        <h2 className="display text-green mt-5 text-5xl">Order confirmed</h2>
        <p className="mt-4 text-xl leading-snug">Thank you, {fullName}. Your order is being double-whipped in our Dubai kitchen and will go to:</p>
        <p className="mt-4 font-mono">
          {address}, {apartment ? `${apartment}, ` : ""}
          {emirate}, UAE
        </p>
        <button type="button" className="btn mt-7 w-full" onClick={finish}>
          Back to the table
        </button>
      </dialog>

      <Footer />
    </>
  );
}
