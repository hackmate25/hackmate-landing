"use client";

import {
  motion,
  useReducedMotion,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import { Users, Target, Zap, Code2 } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Skill-Based Discovery",
    description:
      "Find teammates with complementary skills. Frontend meets backend, design meets code.",
  },
  {
    icon: Users,
    title: "Mindset Matching",
    description:
      "Connect with builders who share your hackathon energy and collaboration style.",
  },
  {
    icon: Zap,
    title: "Fast Team Formation",
    description:
      "Form balanced teams in hours, not days. Start building sooner, ship faster.",
  },
  {
    icon: Code2,
    title: "Hackathon-Focused",
    description:
      "Built for the unique dynamics of hackathons. Not just networking—team building.",
  },
];

export function ValueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <LazyMotion features={domAnimation}>
          {/* SECTION HEADER */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How HackMate Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Intentional matchmaking for hackathon success
            </p>
          </motion.div>

          {/* FEATURE CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                {/* CARD */}
                <div
                  className="
                    relative h-full rounded-2xl border border-border/50
                    bg-card p-6 transition-colors
                    hover:border-primary/50
                  "
                >
                  {/* ICON */}
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>

                  {/* CONTENT */}
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Decorative line — DESKTOP ONLY */}
                  {!reduceMotion && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
}
