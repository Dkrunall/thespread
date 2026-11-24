import ChurnProcess from "@/components/ChurnProcess";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MoodQuiz from "@/components/MoodQuiz";
import ProductGrid from "@/components/ProductGrid";
import ServingSecrets from "@/components/ServingSecrets";
import UseItEverywhere from "@/components/UseItEverywhere";
import VideoStories from "@/components/VideoStories";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <ChurnProcess />
        <UseItEverywhere />
        <VideoStories />
        <ServingSecrets />
      </main>
      <Footer />
      <MoodQuiz />
    </>
  );
}
