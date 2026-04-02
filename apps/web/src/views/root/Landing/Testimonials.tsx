const stats = [
  { label: "Companies Worldwide", value: "1,200+" },
  { label: "Industries Served", value: "35+" },
  { label: "Customer Satisfaction Rate", value: "98%" },
  { label: "Employees Managed", value: "2M+" },
];

const testimonials = Array.from({ length: 6 }, (_, i) => ({
  id: `testimonial-${i}`,
  title: "Hiring Made Simple and Fast",
  content:
    "Clarivacompletely changed the way we recruit. With automated job postings and AI-powered candidate screening, we've cut our hiring time in half. It's the best investment we've made for our HR department!",
  author: "Amanda K., HR Director at InnovateTech",
}));

const Testimonials = () => {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      {/* Header section */}
      <div className="mx-auto max-w-7xl text-center mb-20">
        <div className="inline-flex items-center px-6 py-2 rounded-full border border-slate-200 bg-[#FDFDFD] text-slate-800 text-sm font-medium mb-10 shadow-sm">
          Testimonial
        </div>
        <h2 className="text-4xl md:text-[52px] font-medium text-slate-900 mb-6 tracking-tight leading-[1.1]">
          What Our <span className="text-slate-400">Customers Say</span>
        </h2>
        <p className="max-w-2xl mx-auto text-[17px] text-slate-500 leading-relaxed">
          Over 1000 companies rely on Clarivato streamline their HR operations
          and drive success.
        </p>
      </div>

      {/* Stats container */}
      <div className="mx-auto max-w-7xl mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 py-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center lg:border-r border-slate-100 last:border-0"
            >
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[14px] text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid container */}
      <div className="mx-auto max-w-7xl border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`p-10 bg-white border-slate-100 transition-all duration-300 hover:bg-slate-50/50 
                ${i < testimonials.length - (testimonials.length % 3 || 3) ? "lg:border-b" : ""} 
                ${(i + 1) % 3 !== 0 ? "lg:border-r" : ""}
                ${(i + 1) % 2 !== 0 ? "md:border-r lg:border-r-0" : ""}
                ${i < testimonials.length - (testimonials.length % 2 || 2) ? "md:border-b lg:border-b-0" : ""}
              `}
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-5 tracking-tight line-clamp-1">
                {t.title}
              </h3>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-10">
                {t.content}
              </p>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-slate-900">
                  {t.author.split(",")[0]}
                </span>
                <span className="text-[13px] text-slate-400">
                  {t.author.split(",").slice(1).join(",")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
