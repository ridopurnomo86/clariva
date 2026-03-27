import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/images/carousel/slide1.png",
    title: "Everything You Need, At a Glance!",
    description:
      "Welcome to your smart school recruitment dashboard. Track candidates, interviews, upcoming tasks, and compliance — all in one place.",
  },
  {
    image: "/images/carousel/slide2.png",
    title: "Insightful Analytics & Reporting",
    description:
      "Make data-driven decisions with our powerful reporting tools. Understand your recruitment pipeline better than ever with real-time insights.",
  },
  {
    image: "/images/carousel/slide3.png",
    title: "Seamless Team Collaboration",
    description:
      "Connect your entire team and streamline communication throughout the hiring process. Assign tasks, share feedback, and hire faster together.",
  },
];

const ImageBranding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="hidden lg:flex lg:w-3/5 relative flex-col justify-end overflow-hidden bg-[#EFEEFF]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-0 flex flex-col pt-24"
        >
          <div className="relative flex-1 w-full overflow-hidden px-12">
            <div className="w-full h-full rounded-tl-3xl shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden border-t border-l border-white/40 bg-white p-2">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover rounded-tl-2xl rounded-br-2xl"
              />
            </div>
          </div>

          <div className="relative z-10 w-full p-12 pt-16">
            <div className="max-w-xl mx-auto text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold tracking-tight text-slate-900"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-slate-600/90 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <div className="flex justify-center gap-2 pt-6">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 bg-indigo-600"
                        : "w-2 bg-indigo-200 hover:bg-indigo-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageBranding;
