"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Code2 } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Skill-Based Discovery",
    description: "Find teammates with complementary skills. Frontend meets backend, design meets code.",
  },
  {
    icon: Users,
    title: "Mindset Matching",
    description: "Connect with builders who share your hackathon energy and collaboration style.",
  },
  {
    icon: Zap,
    title: "Fast Team Formation",
    description: "Form balanced teams in hours, not days. Start building sooner, ship faster.",
  },
  {
    icon: Code2,
    title: "Hackathon-Focused",
    description: "Built for the unique dynamics of hackathons. Not just networking—team building.",
  },
];

export function ValueSection() {
  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How HackMate Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Intentional matchmaking for hackathon success
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card/80"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
