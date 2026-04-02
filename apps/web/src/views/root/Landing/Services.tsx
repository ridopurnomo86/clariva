import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const Service = () => (
  <section className="py-24 px-6 max-w-[1400px] mx-auto overflow-hidden">
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
      
      {/* Left Column */}
      <div className="flex-1 text-left lg:max-w-md w-full">
        <h2 className="text-5xl font-medium tracking-tight mb-6 leading-[1.15]">
          Quickly Expand your Workforce.
        </h2>
        <p className="text-slate-500 text-[17px] mb-12 leading-relaxed max-w-sm">
          Take advantage of our global employment products to hire who you want,
          wherever you want - starting in just minutes
        </p>

        {/* Small Cards Row */}
        <div className="flex gap-4 mb-8 h-[240px]">
          {/* Box 1 (Employees) */}
          <div className="flex-1 bg-slate-50 p-5 rounded-[2rem] border border-slate-100 flex flex-col justify-between relative hover:shadow-md transition-shadow">
            <div className="flex justify-start">
              <span className="text-[13px] font-medium px-4 py-1.5 rounded-full border border-slate-300 bg-transparent text-slate-700">
                Employees
              </span>
            </div>
            <div>
              <div className="flex -space-x-2 mb-4">
                {[
                  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                ].map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    className={`w-10 h-10 rounded-full border-2 border-white object-cover ${i === 2 ? "z-10" : "relative"}`}
                    alt="Employee"
                  />
                ))}
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-[19px] font-medium leading-tight">
                  Hire an<br />Employees
                </h3>
                <button
                  type="button"
                  className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Box 2 (Contractor) */}
          <div className="flex-1 rounded-[2rem] overflow-hidden relative flex flex-col justify-between p-5 hover:shadow-lg transition-shadow group">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Contractor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            <div className="relative z-10 flex justify-start">
              <span className="text-[13px] font-medium px-4 py-1.5 rounded-full border border-white/60 text-white backdrop-blur-sm bg-white/10">
                Force
              </span>
            </div>
            
            <div className="relative z-10 flex items-end justify-between text-white mt-auto">
              <h3 className="text-[19px] font-medium leading-tight text-shadow-sm">
                Hire a<br />Contractor
              </h3>
              <button
                type="button"
                className="w-10 h-10 shrink-0 rounded-full bg-black/80 backdrop-blur flex items-center justify-center hover:bg-black transition-colors"
              >
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button type="button" className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <button type="button" className="w-11 h-11 rounded-full bg-black flex items-center justify-center hover:bg-slate-800 transition-colors shadow-md">
            <ArrowRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Right Column (Large Cards) */}
      <div className="flex-1 flex gap-5 w-full min-w-0">
        
        {/* Card 1: Savannah */}
        <div className="flex-1 min-w-[320px] max-w-[420px] bg-[#9A9890] p-6 lg:p-8 rounded-[2.5rem] flex flex-col relative shadow-xl hover:-translate-y-2 transition-transform duration-500 h-[520px]">
          <div className="flex justify-end relative z-10">
             <span className="text-[13px] font-medium px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/10">
               Meeting <ArrowUpRight size={14} />
             </span>
          </div>

          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[45%] rounded-[2rem] overflow-hidden shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=800&fit=crop" 
               alt="Savannah" 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="flex items-end justify-between text-white mt-auto relative z-10 w-full pb-2">
            <div>
              <h3 className="text-2xl font-medium tracking-tight">Savannah Nguyen</h3>
              <p className="text-white/60 text-[15px] mt-1">CEO, Los Angeles, USA</p>
            </div>
            <a href="/" className="text-[13px] text-white/80 hover:text-white underline underline-offset-[5px] decoration-white/30 hover:decoration-white transition-colors mb-1">
              Read More
            </a>
          </div>
        </div>

        {/* Card 2: Courtney */}
        <div className="flex-1 min-w-[320px] max-w-[420px] rounded-[2.5rem] flex flex-col relative shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 h-[520px]">
          <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=800&q=80" 
               alt="Courtney" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-6 lg:p-8 flex justify-start">
             <span className="text-[13px] font-medium px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 shadow-sm">
               HR & manager
             </span>
          </div>

          <div className="relative z-10 p-6 lg:p-8 flex items-end justify-between text-white mt-auto w-full pb-8">
            <div>
              <h3 className="text-2xl font-medium tracking-tight">Courtney Henry</h3>
              <p className="text-white/70 text-[15px] mt-1">SM, London, Great Britain</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Service;
