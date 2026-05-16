"use client";

import { motion } from "framer-motion";
import { GlitchText } from "@/components/glitch-text";

interface HeroSectionProps {
  siteTitle: string;
  description: string;
}

const ASCII_LOGO = `
 ██╗    ██╗ ██████╗  ██████╗ ██╗  ██╗██████╗
 ██║    ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔══██╗
 ██║ █╗ ██║██║   ██║██║   ██║█████╔╝ ██████╔╝
 ██║███╗██║██║   ██║██║   ██║██╔═██╗ ██╔══██╗
 ╚███╔███╔╝╚██████╔╝╚██████╔╝██║  ██╗██║  ██║
  ╚══╝╚══╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`.trim();

const bootLines = [
  { text: "[BOOT] Initializing wookr v1.0...", delay: 0 },
  { text: "[OK]   Loading configuration", delay: 200 },
  { text: "[OK]   Connecting to data source", delay: 400 },
  { text: "[OK]   Building post index", delay: 600 },
  { text: "[OK]   Rendering complete", delay: 800 },
  { text: "", delay: 1000 },
  { text: "       Welcome to the terminal.", delay: 1200 },
];

export function HeroSection({ siteTitle, description }: HeroSectionProps) {
  return (
    <section className="relative py-16 md:py-24 max-w-[1280px] mx-auto px-4 md:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        {/* ASCII Art */}
        <motion.div
          className="mb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <pre className="text-primary/80 font-mono text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-tight glow-primary select-none whitespace-pre overflow-x-auto">
            {ASCII_LOGO}
          </pre>
        </motion.div>

        {/* Boot sequence */}
        <div className="mb-10">
          {bootLines.map((line, i) => (
            <motion.div
              key={i}
              className="font-mono text-xs sm:text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay / 1000, duration: 0.3 }}
            >
              {line.text ? (
                <span>
                  <span
                    className={
                      line.text.startsWith("[OK]")
                        ? "text-accent-emerald"
                        : line.text.startsWith("[BOOT]")
                          ? "text-primary"
                          : "text-muted"
                    }
                  >
                    {line.text}
                  </span>
                </span>
              ) : (
                <span className="text-transparent">_</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <h1 className="font-mono text-display-sm sm:text-display-md md:text-display-lg font-bold text-on-dark tracking-display-md leading-tight mb-4">
            <GlitchText text={siteTitle} />
          </h1>
          <p className="font-mono text-sm text-muted leading-relaxed">
            <span className="text-primary mr-2">$</span>
            {description}
          </p>
        </motion.div>

        {/* Decorative terminal prompt line */}
        <motion.div
          className="mt-12 font-mono text-xs text-muted-soft flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <span className="text-accent-emerald">❯</span>
          <span className="text-muted">whoami</span>
          <span className="text-muted-soft">→</span>
          <span className="text-primary cursor-blink-dim">visitor@wookr</span>
        </motion.div>
      </div>
    </section>
  );
}
