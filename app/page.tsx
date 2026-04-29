import { HeroSection } from "../components/marketing/HeroSection";
import { FeaturedProducts } from "../components/marketing/FeaturedProducts";
import { FeaturedServices } from "../components/marketing/FeaturedServices";
import { CTASection } from "../components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeaturedServices />
      <CTASection />
    </>
  );
}
