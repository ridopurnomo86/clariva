import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Team = () => {
  const team = [
    {
      name: "Savannah Nguyen",
      role: "Central African Republic",
      title: "Sales Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&ixlib=rb-4.0.3",
    },
    {
      name: "Esther Howard",
      role: "Aland islands",
      title: "Work Assistant",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&ixlib=rb-4.0.3",
    },
    {
      name: "Darlene Robertson",
      role: "Saint Barthelemy",
      title: "Louis Vuitton",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&ixlib=rb-4.0.3",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-100 rounded-t-[3rem] mt-10">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-slate-200 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-12 max-w-2xl mx-auto">
          The help you Need, When you Need it
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-16">
          <button
            type="button"
            className="px-6 py-2 rounded-full bg-white font-medium shadow-sm border border-slate-200"
          >
            Our best Team
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-full text-slate-500 hover:bg-white/50 transition-colors"
          >
            Customers Support
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-full text-slate-500 hover:bg-white/50 transition-colors"
          >
            Strategy Group
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 text-left">
          {team.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center group"
            >
              <h4 className="font-medium text-lg w-full text-left">
                {member.name}
              </h4>
              <p className="text-slate-400 text-sm w-full text-left mb-6">
                {member.role}
              </p>

              <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-slate-50 group-hover:border-slate-100 transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full flex items-center justify-between mt-auto">
                <span className="font-medium">{member.title}</span>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          <div className="bg-[#B4AC9C] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <p className="text-sm text-white/70 mb-4 tracking-wide uppercase">
                The team together
              </p>
              <h3 className="text-2xl font-medium mb-6">
                Enhancing the Entire Employee and Team Impact Cycle
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 block font-light">
                Lattice People Platform simplifies HR operations across the
                entire employee and team impact cycle, offering a comprehensive
                solution for modern organizations. Built securely from the
                ground up, Lattice ensures your HR functions are efficient and
                empowering.
              </p>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 hover:drop-shadow-md transition-all font-medium text-sm underline underline-offset-4"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
