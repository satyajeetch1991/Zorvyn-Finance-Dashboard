import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function RootLayout({ children }) {
    return (<ThemeProvider defaultTheme="system">
        <div className="min-h-screen antialiased bg-background text-foreground overflow-x-hidden">
          {children}
        </div>
      </ThemeProvider>);
}
