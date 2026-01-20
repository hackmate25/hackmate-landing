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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          
          <div className="flex items-center gap-5">
            <img src="/Frame 13.png" alt="" 
              className="h-8 w-8 -ml-20"/>
            <span className="text-2xl font-bold">
              
              <span className="text-foreground">Hack</span>
              <span className="text-primary">Mate</span>
            </span>
          </div>
          <button 
            onClick={scrollToForm}
            className="rounded-full bg-primary/10 px-4 py-2 -mr-20 text-md font-medium text-primary transition-colors hover:bg-primary/20"
          >
            Get Early Access
          </button>
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
                href="https://instagram.com/hackmate"
                target="_blank"
                rel="noopener noreferrer"
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
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-lg">@hackmate</span>
              </a>
              
              <a
                href="mailto:team@hackmate.dev"
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
