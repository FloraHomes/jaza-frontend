import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import PropertyListings from "./components/PropertyListings";
import Reviews from "./components/Reviews";
import HowItWorks from "./components/HowItWorks";
import WhyChoose from "./components/WhyChoose";
import Problems from "./components/Problems";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <PropertyListings />
        <Reviews />
        <HowItWorks />
        <WhyChoose />
        <Problems />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
