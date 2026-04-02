import { Brain, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "ai-efficiency",
    title: "AI-Powered Efficiency",
    description:
      "Leverage automation to handle routine HR tasks, enabling your team to focus on strategic initiatives.",
    icon: Brain,
    iconBg: "bg-blue-600",
    iconColor: "text-white",
  },
  {
    id: "data-decisions",
    title: "Data-Driven Decisions",
    description:
      "Make informed decisions with advanced analytics and actionable insights.",
    icon: BarChart3,
    iconBg: "bg-emerald-600",
    iconColor: "text-white",
  },
  {
    id: "scalable-secure",
    title: "Scalable & Secure",
    description:
      "Clarivagrows with your business while maintaining the highest standards of data security.",
    icon: ShieldCheck,
    iconBg: "bg-sky-500",
    iconColor: "text-white",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 px-6 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <div className="inline-flex items-center px-6 py-2 rounded-full border border-slate-200 bg-white text-slate-800 text-sm font-medium mb-10 shadow-sm">
          Why Choose
        </div>
        <h2 className="text-4xl md:text-[52px] font-medium text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Smarter HR Solutions with{" "}
          <span className="text-slate-400 font-normal">Transformative AI</span>
        </h2>
        <p className="text-[17px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Empower Your HR Team with Smarter Tools and Transformative AI
          Solutions
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 cursor-default relative overflow-hidden"
          >
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-slate-100/50 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-50/30 rounded-full blur-2xl -ml-12 -mb-12 group-hover:bg-slate-100/30 transition-colors duration-500"></div>

            <div className="relative z-10">
              <div className="mb-10 inline-block">
                <div
                  className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center shadow-lg shadow-${feature.iconBg.split("-")[1]}-200/50 group-hover:scale-110 transition-transform duration-500`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
              </div>
              <h3 className="text-[22px] font-semibold text-slate-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[15.5px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
