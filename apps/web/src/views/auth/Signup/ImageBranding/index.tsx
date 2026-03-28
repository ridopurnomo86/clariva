const ImageBranding = () => (
  <div className="hidden lg:flex lg:w-3/5 relative p-12 flex-col justify-between overflow-hidden group">
    <div
      className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
      style={{
        backgroundImage: "url('/register-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/90 via-indigo-900/20 to-transparent z-10" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -mr-40 -mt-20 z-10 animate-pulse" />
    <div className="relative z-20 flex items-center gap-2.5 text-white">
      <span className="text-2xl font-bold tracking-tight">Clariva</span>
    </div>
    <div className="relative z-20 max-w-md">
      <div className="space-y-6">
        <div className="inline-flex px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-white/90">
          Start Your Journey
        </div>
        <blockquote className="space-y-4">
          <p className="text-4xl font-bold leading-[1.15] text-white tracking-tight drop-shadow-md">
            Unleash your creativity with zero constraints.
          </p>
          <footer className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-10 bg-indigo-500" />
              <div>
                <div className="text-xl font-bold text-white">Join 10,000+ creators</div>
                <div className="text-sm text-white/70">Building the future of workflows.</div>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
    <div className="relative z-20 text-xs text-white/40 font-medium tracking-wide">
      © 2026 clariva Technologies. All rights reserved.
    </div>
  </div>
);

export default ImageBranding;
