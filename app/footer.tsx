"use client";

import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="footer-terminal mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        {/* Terminal prompt history */}
        <div className="mb-8 font-mono text-xs text-muted-soft space-y-1">
          <p>
            <span className="text-accent-emerald">$</span>{" "}
            <span className="text-muted">history | tail -5</span>
          </p>
          <p className="pl-4 text-muted-soft/60">1 cd ~/wookr</p>
          <p className="pl-4 text-muted-soft/60">2 make install</p>
          <p className="pl-4 text-muted-soft/60">3 make build</p>
          <p className="pl-4 text-muted-soft/60">4 echo 'Hello World'</p>
          <p className="pl-4 text-primary/40">5 # enjoy reading</p>
        </div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-hairline">
          <div className="font-mono text-xs text-muted-soft">
            <span className="text-primary">❯</span>{" "}
            <span className="text-muted">Powered by</span>{" "}
            <span className="text-on-dark font-semibold">Wookr</span>{" "}
            <span className="text-muted-soft">© {year}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-muted-soft">
            <span className="status-indicator">
              <span className="status-dot" />
              <span>System operational</span>
            </span>
            <span className="text-hairline-strong">│</span>
            <span className="text-primary/40">⌘K</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </motion.footer>
  );
}
