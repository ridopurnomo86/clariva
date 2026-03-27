import { LayoutTemplate } from "lucide-react";

const ImageBranding = () => (
  <div className="hidden lg:flex lg:w-2/5 relative p-12 flex-col justify-between overflow-hidden group">
    <div
      className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
      style={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
    <div className="relative z-20 flex items-center gap-2.5 text-white">
      <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
        <LayoutTemplate className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold tracking-tight">Clariva</span>
    </div>
    <div className="relative z-20 max-w-md">
      <blockquote className="space-y-4">
        <p className="text-3xl font-medium leading-snug text-white tracking-tight">
          &ldquo;The most efficient way to build and manage our digital forms
          and workflows.&rdquo;
        </p>
        <footer className="pt-4">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-white/40" />
            <div>
              <div className="text-lg font-semibold text-white">
                Sarah Jenkins
              </div>
              <div className="text-sm text-white/60">
                Product Director, Creative Flow
              </div>
            </div>
          </div>
        </footer>
      </blockquote>
    </div>
  </div>
);

export default ImageBranding;
