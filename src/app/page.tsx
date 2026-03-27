import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Showcase />
      <Footer />
    </main>
  );
}
