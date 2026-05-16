"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NavItem {
  key: string;
  title: string;
  href: string;
}

interface TopNavClientProps {
  siteTitle: string;
  navItems: NavItem[];
}

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-muted-soft">{time}</span>;
}

export function TopNavClient({ siteTitle, navItems }: TopNavClientProps) {
  return (
    <motion.nav
      className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-hairline"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="h-14 flex items-center px-4 md:px-6">
          <motion.a
            href="/"
            className="nav-terminal flex items-center gap-2 mr-6 md:mr-10 shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-primary font-bold text-lg glow-primary">
              ❯
            </span>
            <span className="text-on-dark font-bold text-title-sm tracking-tight">
              {siteTitle}
            </span>
            <span className="hidden sm:inline text-muted-soft text-xs ml-1">
              v1.0
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1 flex-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="nav-link-terminal"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              >
                {item.title}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-muted-soft">
              <span className="status-indicator">
                <span className="status-dot" />
                <span>ONLINE</span>
              </span>
              <span className="text-hairline-strong">│</span>
              <Clock />
            </div>

            <button className="md:hidden p-2 text-muted hover:text-primary transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          className="hidden md:flex h-6 items-center px-6 bg-surface-soft/50 border-t border-hairline text-[0.65rem] font-mono text-muted-soft gap-4 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 24 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span>~/wookr</span>
          <span className="text-hairline-strong">│</span>
          <span>git:main</span>
          <span className="text-hairline-strong">│</span>
          <span className="text-accent-emerald">BLOG</span>
          <span className="text-hairline-strong">│</span>
          <span>main</span>
          <span className="ml-auto text-primary/60">⚡ wookr</span>
        </motion.div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.nav>
  );
}
