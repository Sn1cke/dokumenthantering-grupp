import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";

export default function Home() {
  return (
    <div className="container mx-auto px-12 md:pt-12">
      <Hero />
      <div className="divider lg:divider-vertical py-12"></div>
      <HowToUse />
    </div>
  );
}
