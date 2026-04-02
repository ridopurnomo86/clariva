import { Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative bg-[#111113] py-32 md:py-44 px-6 overflow-hidden">
      {/* Background decorative vertical trailing lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-evenly opacity-40">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent relative top-[-30%]"></div>
        <div className="w-[1px] h-[150%] bg-gradient-to-b from-transparent via-white/20 to-transparent relative top-[10%]"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent relative top-[-10%]"></div>
        <div className="w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white/30 to-transparent relative top-[40%]"></div>
        <div className="w-[1px] h-[140%] bg-gradient-to-b from-transparent via-white/10 to-transparent relative top-[-20%]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-[64px] font-medium text-white mb-8 tracking-tight leading-[1.05]">
          Ready to Transform{" "}
          <span className="text-[#20C988]">
            Your
            <br className="hidden md:block" /> HR Management?
          </span>
        </h2>

        <p className="text-[17px] text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of businesses leveraging Clariva automate processes,
          enhance employee experiences, and achieve organizational success.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#20C988] hover:bg-[#1BA872] text-white rounded-[10px] font-semibold transition-colors w-full sm:w-auto text-[15px] shadow-lg shadow-[#20C988]/20"
          >
            <Sparkles size={18} fill="currentColor" />
            Get Started for Free
          </button>
          <button
            type="button"
            className="px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-900 rounded-[10px] font-semibold transition-colors w-full sm:w-auto text-[15px]"
          >
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
