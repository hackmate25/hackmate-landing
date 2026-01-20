"use client";

import { useRef } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { HeroSection } from "@/components/hero-section";
import { ValueSection } from "@/components/value-section";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/10 bg-background/50 backdrop-blur-xl">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    
    {/* Logo Section */}
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        src="/Frame 13.png"
        alt="HackMate Logo"
        className="h-7 w-7 sm:h-8 sm:w-8"
      />
      <span className="text-xl sm:text-2xl font-bold">
        <span className="text-foreground">Hack</span>
        <span className="text-primary">Mate</span>
      </span>
    </div>

  </div>
</nav>

      <HeroSection onGetStarted={scrollToForm} />
      <ValueSection />
      <WaitlistForm formRef={formRef} />

      {/* Footer */}
      <footer className="border-t border-border/10 bg-card/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span className="text-foreground">Hack</span>
                <span className="text-primary">Mate</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              
              <a
                href="mailto:hackmate.official@gmail.com"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:scale-110"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-lg">hackmate.official@gmail.com</span>
              </a>
            </div>
            
            <div className=" text-center">
              <p className="text-sm text-muted-foreground">
                Built for developers who believe great teams build great hacks.
              </p>
              <p className="mt-2 text-xs text-muted-foreground/60">
                © {new Date().getFullYear()} HackMate. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
