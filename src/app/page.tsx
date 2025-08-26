import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Demo } from "@/components/demo";
import { Benefits } from "@/components/benefits";
import { About } from "@/components/about";
import { Suggestions } from "@/components/suggestions";
import { CtaGenerate } from "@/components/cta-generate";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Demo />
      <Benefits />
      <About />
      <Suggestions />
      <CtaGenerate />
      <Footer />
    </main>
  );
}
