"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Code,
  Palette,
  Server,
  Brain,
  Loader2,
} from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intent: "",
  });

  const isValidSrmEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@srmist\.edu\.in$/.test(email);

  const canProceedToStep2 =
    formData.name.trim() !== "" && isValidSrmEmail(formData.email);

  const canSubmit = canProceedToStep2 && formData.intent !== "";

  const handleSubmit = async () => {
    if (isLoading) return;

    // Single, clean validation
    if (!isValidSrmEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Use your @srmist.edu.in email only.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // SAFE PARSING — prevents the "<!DOCTYPE" crash
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: "Server error occurred" };
      }

      if (!res.ok) {
        if (res.status === 409) {
          toast({
            title: "Already Registered",
            description: "You're already on the waitlist.",
            variant: "destructive",
          });
        } else if (res.status === 400) {
          toast({
            title: "Invalid Details",
            description: "Check name, email, or intent.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Server Error (500)",
            description: "Backend failed — check your terminal logs.",
            variant: "destructive",
          });
        }
        return;
      }

      // SUCCESS CASE
      setIsSubmitted(true);
      toast({
        title: "Welcome to HackMate!",
        description: "You've successfully joined the waitlist.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Request Failed",
        description: "Server unreachable or crashed. Check backend.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- SUCCESS SCREEN ----------
  if (isSubmitted) {
    return (
      <section ref={formRef} className="relative px-4 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-primary/30 bg-card/80 p-8 backdrop-blur-xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
              <Check className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mb-4 text-3xl font-bold">Early Access Secured</h2>

            <p className="mb-6 text-muted-foreground">
              Welcome aboard, {formData.name}! You&apos;re now on the list.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border bg-accent/10 px-4 py-2 text-sm text-accent">
              <Sparkles className="h-4 w-4" />
              <span>Get ready to find your perfect team</span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ---------- FORM UI (UNCHANGED VISUALLY) ----------
  return (
    <section ref={formRef} className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Join HackMate Early</h2>
          <p className="mt-4 text-muted-foreground">
            Be the first to find your perfect hackathon team
          </p>
        </motion.div>

        <div className="rounded-3xl border bg-card/50 p-8 backdrop-blur-xl md:p-10">
          <div className="mb-8 flex items-center justify-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <motion.div
                  animate={{
                    backgroundColor: step >= s ? "var(--primary)" : "var(--muted)",
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                >
                  {step > s ? <Check className="h-4 w-4 text-white" /> : <span>{s}</span>}
                </motion.div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" className="space-y-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="you@srmist.edu.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="w-full"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" className="space-y-6">
                <Label>What brings you to hackathons?</Label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {intents.map((intent) => (
                    <motion.button
                      key={intent.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, intent: intent.id })
                      }
                      className={`rounded-xl border p-4 text-left ${
                        formData.intent === intent.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <intent.icon className="h-5 w-5" />
                        <span>{intent.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {intent.description}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !canSubmit}
                    className="flex-[2]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Enter HackMate <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}