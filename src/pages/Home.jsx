import Hero from '@sections/Hero';
import TrustStrip from '@sections/TrustStrip';
import FeaturedWork from '@sections/FeaturedWork';
import Services from '@sections/Services';
import Difference from '@sections/Difference';
import Process from '@sections/Process';
import WhyApexGrid from '@sections/WhyApexGrid';
import TechStack from '@sections/TechStack';
import Metrics from '@sections/Metrics';
import Testimonials from '@sections/Testimonials';
import About from '@sections/About';
import Marquee from '@sections/Marquee';
import Insights from '@sections/Insights';
import FAQ from '@sections/FAQ';
import FinalCTA from '@sections/FinalCTA';

export default function Home() {
  return (
    <main id="main-content" aria-label="ApexGrid Homepage">
      <Hero />
      <TrustStrip />
      <FeaturedWork />
      <Services />
      <Difference />
      <Process />
      <WhyApexGrid />
      <Marquee />
      <TechStack />
      <Metrics />
      <Testimonials />
      <About />
      <Insights />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
