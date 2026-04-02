import Navbar from "#/components/navigation/header/Navbar";
import Hero from "./Hero";
import Services from "./Services";
import WhyChoose from "./WhyChoose";
import Testimonials from "./Testimonials";
import Team from "./Team";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const Landing = () => (
  <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-200 overflow-x-hidden">
    <Navbar />
    <Hero />
    <Services />
    <WhyChoose />
    <Testimonials />
    <Team />
    <CallToAction />
    <Footer />
  </div>
);

export default Landing;
