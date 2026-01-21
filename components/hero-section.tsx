"use client";

import { motion, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20">
      <LazyMotion features={domAnimation}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* MAIN HEADING */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2, duration: 0.5 }}
            className="text-balance text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          >
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Hack
            </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Mate
            </span>
          </motion.h1>

          {/* TAGLINE (NO MOTION ON MOBILE) */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Find your perfect hackathon team. Connect with developers who match
            your skills, interests, and building mindset.
          </p>

          {/* ONE LINER */}
          <p className="mt-4 text-muted-foreground/70 text-xl md:text-2xl">
            Discover your hackathon winning team here!
          </p>

          {/* CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.5 }}
            className="mt-10"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group relative overflow-hidden bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Early Access
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Gradient sweep — DISABLED on mobile */}
              {!reduceMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ opacity: 0.25 }}
                />
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* SCROLL INDICATOR — DESKTOP ONLY */}
        {!reduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground/50"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="h-10 w-6 rounded-full border border-muted-foreground/30 p-1">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-full rounded-full bg-primary/50"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </LazyMotion>
    </section>
  );
}
