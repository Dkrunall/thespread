import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToBasket from "@/components/AddToBasket";
import Cutout from "@/components/Cutout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { collections, getProduct, pairings, productArt, products } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const product = getProduct((await params).id);
  if (!product) return {};
  return {
    title: `${product.name} | The Daily Spread`,
    description: `${product.description} A 200g jar, double-whipped in Dubai. AED ${product.price}.`,
  };
}

export default async function SpreadPage({ params }: { params: Promise<{ id: string }> }) {
  const product = getProduct((await params).id);
  if (!product) notFound();

  const collection = collections.find((c) => product.tags.includes(c.tag));
  const goesOn = pairings.filter((p) => p.pairsWith.includes(product.id)).map((p) => p.label);
  const art = productArt[product.id];
  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.tags.includes(collection?.tag ?? "")) - Number(a.tags.includes(collection?.tag ?? "")))
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pt-32 pb-20 md:px-12 md:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-28">
          <div className="relative aspect-square overflow-hidden rounded-sm lg:sticky lg:top-32 lg:self-start" style={{ background: product.color }}>
            <Cutout name={`art/${art[0]}`} eager sizes="(min-width: 1024px) 20vw, 40vw" className="absolute -left-[3%] bottom-[5%] w-[40%] h-auto -rotate-12" />
            <Cutout name={`art/${art[1]}`} eager sizes="(min-width: 1024px) 20vw, 40vw" className="absolute -right-[4%] top-[7%] w-[36%] h-auto rotate-12" />
            <Cutout
              name={`jars/${product.id}`}
              alt={`Jar of ${product.name}`}
              eager
              sizes="(min-width: 1024px) 32vw, 62vw"
              className="absolute left-1/2 top-1/2 h-[78%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-2"
            />
          </div>

          <div>
            {collection && (
              <Link href="/#shop" className="typed text-green hover:text-pink-deep">
                {collection.label}
              </Link>
            )}
            <h1 className="display text-green mt-3 text-6xl md:text-8xl">{product.name}</h1>
            <p className="mt-5 text-2xl leading-snug">{product.description}</p>
            <p className="typed mt-6 text-2xl">
              AED {product.price} <span className="font-normal text-lg">/ 200g jar</span>
            </p>

            <AddToBasket product={product} />

            <dl className="ruled mt-10 grid gap-0 pl-11 pr-5 py-5 text-lg shadow-paper md:pl-[92px]">
              {goesOn.length > 0 && (
                <div className="py-3">
                  <dt className="typed">Good on</dt>
                  <dd className="hand text-4xl text-pink-deep">{goesOn.join(", ")}</dd>
                </div>
              )}
              <div className="py-3">
                <dt className="typed">Serve it</dt>
                <dd>At 21°C. Leave the jar out for 15 to 20 minutes first.</dd>
              </div>
              <div className="py-3">
                <dt className="typed">Keep it</dt>
                <dd>Up to 90 days in the fridge sealed, or 6 months frozen. Three weeks once opened.</dd>
              </div>
              <div className="py-3">
                <dt className="typed">Delivery</dt>
                <dd>Chilled, across the UAE. Dubai express is free.</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="bg-card border-t-2 border-dashed border-ink/20">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-12 md:py-24">
            <h2 className="display text-green text-5xl md:text-7xl">Also on the table</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-7 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
