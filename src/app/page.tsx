import { ScatteredParts } from "@/components/motion/scattered-parts";
import { BootWrapper } from "@/components/sections/boot-wrapper";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HorizontalGallery } from "@/components/sections/horizontal-gallery";
import { Showcase } from "@/components/sections/showcase";
import { VideoScroll } from "@/components/sections/video-scroll";

export default function Home() {
  return (
    <BootWrapper>
      <ScatteredParts />
      <main>
        <Hero />
        <Features />
        <HorizontalGallery />
        <Showcase />
        <VideoScroll />
        <Footer />
      </main>
    </BootWrapper>
  );
}
