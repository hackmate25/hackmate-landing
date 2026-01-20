"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check, Sparkles, Code, Palette, Server, Brain, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistFormProps {
  formRef: React.RefObject<HTMLDivElement | null>;
}

const intents = [
  { id: "frontend", label: "Frontend", icon: Code, description: "I love to build user interfaces" },
  { id: "backend", label: "Backend", icon: Palette, description: "I love to work with API's" },
  { id: "AI/ML", label: "AI/ML", icon: Server, description: "I talk to machines" },
  { id: "explorer", label: "Explorer", icon: Brain, description: "I'm here to learn" },
];

export function WaitlistForm({ formRef }: WaitlistFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intent: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast({
            title: "Already Registered",
            description: "You're already on the waitlist! We'll notify you when we launch.",
            variant: "destructive",
          });
        } else if (res.status === 400) {
          toast({
            title: "Invalid Information",
            description: "Please check your name, email, and intent selection.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Something Went Wrong",
            description: data.message || "Please try again later.",
            variant: "destructive",
          });
        }
        return;
      }

      setIsSubmitted(true);
      toast({
        title: "Welcome to HackMate!",
        description: "You've successfully joined the waitlist.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description: "Unable to connect. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const canProceedToStep2 = formData.name.trim() && formData.email.trim() && formData.email.includes("@");
  const canSubmit = canProceedToStep2 && formData.intent;

  if (isSubmitted) {
    return (
      <section ref={formRef} className="relative px-4 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/80 p-8 text-center backdrop-blur-xl md:p-12"
          >
            {/* Success glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20"
            >
              <Check className="h-10 w-10 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-3xl font-bold"
            >
              Early Access Secured
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-muted-foreground"
            >
              Welcome aboard, {formData.name}! You&apos;re now on the list.
              <br />
              We&apos;ll notify you when matching goes live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get ready to find your perfect team</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={formRef} className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join HackMate Early
          </h2>
          <p className="mt-4 text-muted-foreground">
            Be the first to find your perfect hackathon team
          </p>
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl md:p-10"
        >
          {/* Glassmorphism glow effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-2 -top-4 h-32 w-32 rounded-full bg-primary/60 blur-3xl" />
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-accent/60 blur-3xl" />
             <div className="absolute -right-2 -top-4 h-32 w-32 rounded-full bg-primary/80 blur-3xl" />
            <div className="absolute bottom-10 -left-4 h-32 w-32 rounded-full bg-accent/80 blur-3xl" />
          </div>

          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <motion.div
                  animate={{
                    backgroundColor: step >= s ? "var(--primary)" : "var(--muted)",
                    scale: step === s ? 1.1 : 1,
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
                >
                  {step > s ? (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <span className={step >= s ? "text-primary-foreground" : "text-muted-foreground"}>
                      {s}
                    </span>
                  )}
                </motion.div>
                {s < 2 && (
                  <div className="h-0.5 w-12 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      animate={{ width: step > 1 ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    What should we call you?
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="border-border/50 bg-input/50 py-6 text-foreground 0"
                    />
                    <motion.div
                      animate={{
                        opacity: focusedField === "name" ? 1 : 0,
                        scale: focusedField === "name" ? 1 : 0.95,
                      }}
                      className="absolute -inset-0.5 -z-10 rounded-lg   blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Where should we reach you?
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="border-border/50 bg-input/50 py-6 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <motion.div
                      animate={{
                        opacity: focusedField === "email" ? 1 : 0,
                        scale: focusedField === "email" ? 1 : 0.95,
                      }}
                      className="absolute -inset-0.5 -z-10 rounded-lg "
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="group w-full bg-primary py-6 text-md font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    Continue
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-foreground">What brings you to hackathons?</Label>
                  <p className="text-sm text-muted-foreground">
                    This helps us find your ideal teammates
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {intents.map((intent) => (
                    <motion.button
                      key={intent.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, intent: intent.id })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${
                        formData.intent === intent.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/50 bg-input/30 text-muted-foreground hover:border-primary/30 hover:bg-input/50"
                      }`}
                    >
                      {formData.intent === intent.id && (
                        <motion.div
                          layoutId="intent-selected"
                          className="absolute inset-0 -z-10 rounded-xl bg-primary/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <intent.icon className={`h-5 w-5 ${formData.intent === intent.id ? "text-primary" : ""}`} />
                        <span className="font-medium">{intent.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{intent.description}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-border/50 py-6 text-foreground hover:bg-secondary"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !canSubmit}
                    aria-busy={isLoading}
                    className="group flex-[2] bg-primary py-6 text-lg font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          Enter HackMate
                          <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
