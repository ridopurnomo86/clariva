import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 mx-auto container w-full flex flex-col items-center text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-6 md:mb-8 leading-[1.1] md:leading-[1.05] max-w-5xl mx-auto">
        The AI-First Core for
        <br className="hidden md:block" />{" "}
        <span className="text-slate-400">HR & Onboarding.</span>
      </h1>
      <p className="text-slate-500 text-base md:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
        Clariva automates the entire talent lifecycle—from intelligent candidate
        matching to seamless, zero-touch onboarding.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-16 md:mb-20 w-full px-6 sm:px-0">
        <button
          type="button"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 md:py-4 rounded-full font-medium hover:scale-105 transition-transform shadow-xl shadow-black/10 text-sm md:text-base"
        >
          Start Automating <ArrowUpRight size={18} />
        </button>
        <button
          type="button"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-3.5 md:py-4 rounded-full font-medium hover:scale-105 transition-transform hover:bg-slate-50 text-sm md:text-base"
        >
          Watch Demo <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>

    {/* Main Image Container */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full aspect-4/3 sm:aspect-video md:aspect-21/9 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl"
    >
      <img
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        alt="AI Dashboard Interface"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

      <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-2 text-[10px] md:text-sm font-semibold shadow-xl">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        AI Engine Active <ArrowRight size={12} className="hidden sm:block" />
      </div>

      <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-2 text-[10px] md:text-sm font-semibold">
        Smart Matching <ArrowRight size={12} className="hidden sm:block" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row justify-between items-end gap-4 md:gap-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] max-w-xl text-white text-left hidden sm:block">
          <div className="bg-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-0.5 md:px-3 md:py-1 rounded-full w-fit mb-2 md:mb-4">
            New Feature
          </div>
          <h3 className="text-xl md:text-3xl font-medium mb-2 md:mb-3 leading-tight">
            Seamless Onboarding, Automated at Scale.
          </h3>
          <p className="text-white/70 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
            Eliminate manual paperwork with our intelligent workflow engine that
            orchestrates the perfect start for every new hire.
          </p>
        </div>

        <div className="flex gap-2 md:gap-3 bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-2xl ml-auto md:ml-0">
          {[
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
          ].map((src) => (
            <img
              key={src}
              src={src}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-sm"
              alt="Team member"
            />
          ))}
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-[10px] md:text-xs font-bold border-2 border-white text-slate-600">
            +50
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default Hero;
