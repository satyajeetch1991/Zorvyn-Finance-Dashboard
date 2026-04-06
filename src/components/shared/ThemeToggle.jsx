import { useTheme } from "@/components/shared/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted)
        return <div className="h-9 w-9"/>;
  const toggle = () => setTheme(resolvedTheme === "light" ? "dark" : "light");
  const isDark = resolvedTheme === "dark";
    return (<Button variant="ghost" size="icon" onClick={toggle} title="Toggle theme" className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (<motion.span key="moon" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">
            <Moon className="h-4 w-4"/>
          </motion.span>) : (<motion.span key="sun" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">
            <Sun className="h-4 w-4"/>
          </motion.span>)}
      </AnimatePresence>
    </Button>);
}
