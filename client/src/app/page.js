import FAQ from "@/components/HomePageComponents/Faq";
import Feedback from "@/components/HomePageComponents/Feedback";
import Footer from "@/components/HomePageComponents/Footer";
import Hero from "@/components/HomePageComponents/Hero";
import HowItWorks from "@/components/HomePageComponents/HowItWorks";
import Navbar from "@/components/HomePageComponents/Navbar";
import Testimonials from "@/components/HomePageComponents/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Feedback />
      <FAQ />
      <Footer />
    </div>
  );
}
