import { Link } from "@tanstack/react-router";

const mainLinks = [
  "Home",
  "Features",
  "About Us",
  "Pricing",
  "Testimonial",
  "FAQ",
  "Contact Us",
];
const bottomLinks = [
  "Blog",
  "Case Studies",
  "Help Center",
  "Privacy Policy",
  "Terms of Service",
  "FAQ",
  "Contact Us",
];

const Footer = () => (
  <footer className="bg-[#FDFDFD] pt-28 pb-20 relative flex flex-col items-center">
    {/* Decorative full-height vertical lines */}
    <div className="absolute inset-0 max-w-6xl mx-auto w-full pointer-events-none">
      <div className="absolute top-0 bottom-0 left-6 lg:left-0 w-[1px] bg-slate-100" />
      <div className="absolute top-0 bottom-0 right-6 lg:right-0 w-[1px] bg-slate-100" />
    </div>

    <div className="w-full max-w-6xl mx-auto px-6 lg:px-0 relative z-10">
      {/* Top Logo Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-2.5 mb-5">
          {/* Mock Logo */}
          <div className="w-9 h-9 bg-slate-900 rounded-[10px] flex items-center justify-center bg-gradient-to-tr from-slate-900 to-slate-800 shadow-md">
            {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 19L19 5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 5v14h14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            Clariva
          </span>
        </div>
        <p className="text-slate-400 text-[15px] max-w-sm mx-auto">
          Transforming HR management through innovative and intelligent
          AI-powered solutions.
        </p>
      </div>

      {/* First Line (Main Links) */}
      <div className="relative border-t border-slate-100 py-10">
        {/* Junction Circles */}
        <div className="absolute -left-[5px] -top-[5px] w-2.5 h-2.5 bg-white border border-slate-200 rounded-full" />
        <div className="absolute -right-[5px] -top-[5px] w-2.5 h-2.5 bg-white border border-slate-200 rounded-full" />

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {mainLinks.map((link) => (
            <Link
              key={link}
              to="/"
              className="text-[15px] font-medium text-slate-700 hover:text-[#20C988] transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="w-full max-w-6xl mx-auto px-6 lg:px-0 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 py-8">
      <div className="text-[14px] text-slate-400 hover:text-slate-900 cursor-pointer transition-colors transition-colors px-4">
        Copyright and Legal
      </div>
      <div className="text-[14px] text-slate-400 px-4">
        © 2025 Clariva. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
