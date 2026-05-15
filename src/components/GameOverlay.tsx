"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "./GlitchText";

interface Question {
  question: string;
  hint: string;
  answers: string[];
  revelation: { title: string; content: string };
  difficulty: string;
}

const questions: Question[] = [
  {
    question: "Quel langage utilise des balises comme <div> et <p> ?",
    hint: "C'est le squelette de toute page web...",
    answers: ["html", "html5"],
    revelation: {
      title: "Identite deverrouillee",
      content: "Je m'appelle Adoum Salah. Developpeur Full Stack passionne par le code et les defis techniques. Base en Ile-de-France.",
    },
    difficulty: "Facile",
  },
  {
    question: "Quel framework React est celebre pour le Server Side Rendering ?",
    hint: "Son nom commence par 'Next'...",
    answers: ["next", "nextjs", "next.js"],
    revelation: {
      title: "Stack technique deverrouillee",
      content: "Ma stack : Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS. J'utilise aussi Redis, Docker et Supabase. 12+ technologies maitrisees.",
    },
    difficulty: "Facile",
  },
  {
    question: "Quel ORM TypeScript genere un client type-safe a partir du schema ?",
    hint: "Tres utilise avec PostgreSQL, son nom a 6 lettres...",
    answers: ["prisma"],
    revelation: {
      title: "Projets deverrouilles",
      content: "24+ repos GitHub, 170+ commits, 10+ projets deployes. TaskFlow SaaS, Gost AI, ONG CHADIA, E-Commerce Dashboard... Tous accessibles en ligne.",
    },
    difficulty: "Moyen",
  },
  {
    question: "Dans Git, quelle commande envoie vos commits vers le serveur distant ?",
    hint: "C'est le contraire de 'pull'...",
    answers: ["push", "git push"],
    revelation: {
      title: "Approche deverrouillee",
      content: "Mon approche : livrer vite, iterer souvent. J'utilise l'IA (Claude Code, Copilot, Hermes) pour coder plus vite. Ce portfolio a ete construit avec Claude.",
    },
    difficulty: "Moyen",
  },
  {
    question: "En JavaScript, quelle methode transforme un tableau en une seule valeur ?",
    hint: "Elle 'reduit' le tableau a un accumulateur...",
    answers: ["reduce", ".reduce", "array.reduce"],
    revelation: {
      title: "Architecture deverrouillee",
      content: "J'ai construit une plateforme en microservices : 3 services (Auth, Tender, Notification), API Gateway, event-driven avec Outbox pattern. 112 commits.",
    },
    difficulty: "Difficile",
  },
  {
    question: "Quel hook React permet de declencher des effets secondaires ?",
    hint: "use + le mot anglais pour 'effet'...",
    answers: ["useeffect", "useEffect"],
    revelation: {
      title: "Contact deverrouille !",
      content: "Email : sadoumachi@gmail.com | WhatsApp : 07 81 31 15 41 | GitHub : github.com/Gojobyte | Disponible immediatement pour stage/alternance.",
    },
    difficulty: "Difficile",
  },
];

function TerminalLine({ text, delay, color = "text-green-400" }: { text: string; delay: number; color?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`font-mono text-sm ${color}`}
    >
      {text}
    </motion.div>
  );
}

export function GameOverlay({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<"intro" | "playing" | "done">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong" | "hint">("idle");
  const [revelations, setRevelations] = useState<string[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = questions[currentQ];

  const checkAnswer = () => {
    const clean = input.trim().toLowerCase().replace(/[().\s]/g, "");
    const isCorrect = q.answers.some((a) => clean === a.toLowerCase().replace(/[().\s]/g, ""));

    if (isCorrect) {
      setFeedback("correct");
      setRevelations((prev) => [...prev, q.revelation.content]);
      setShowReveal(true);
      setTimeout(() => {
        setShowReveal(false);
        if (currentQ < questions.length - 1) {
          setCurrentQ((c) => c + 1);
          setAttempts(0);
          setInput("");
          setFeedback("idle");
        } else {
          setGameState("done");
        }
      }, 4000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setFeedback("correct");
        setRevelations((prev) => [...prev, q.revelation.content]);
        setShowReveal(true);
        setTimeout(() => {
          setShowReveal(false);
          if (currentQ < questions.length - 1) {
            setCurrentQ((c) => c + 1);
            setAttempts(0);
            setInput("");
            setFeedback("idle");
          } else {
            setGameState("done");
          }
        }, 4000);
      } else if (newAttempts === 2) {
        setFeedback("hint");
      } else {
        setFeedback("wrong");
      }
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) checkAnswer();
  };

  useEffect(() => {
    if (gameState === "playing") inputRef.current?.focus();
  }, [gameState, currentQ, feedback]);

  if (gameState === "done") return <>{children}</>;

  if (gameState === "intro") {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg mx-auto px-6 text-center"
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl border border-accent/30 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-3xl font-mono text-accent-light">{"</>"}</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <GlitchText text="Bienvenue." className="text-foreground" />
          </h1>

          <div className="font-mono text-sm space-y-1 mb-8">
            <TerminalLine text="> Initialisation du portfolio..." delay={500} />
            <TerminalLine text="> Chargement du profil developpeur..." delay={1200} />
            <TerminalLine text="> Securite activee : mode enigme" delay={1900} color="text-amber-400" />
            <TerminalLine text="> 6 enigmes dev = 6 infos deverrouillees" delay={2600} color="text-accent-light" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="space-y-3"
          >
            <p className="text-muted text-sm mb-6">
              Resous des enigmes de dev pour deverrouiller mon profil,<br />
              ou accede directement au portfolio.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState("playing")}
              className="px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium text-lg transition-all mr-4"
            >
              Jouer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState("done")}
              className="px-8 py-4 rounded-full font-medium text-muted border border-card-border hover:text-foreground transition-all"
            >
              Passer
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Playing state
  return (
    <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 w-full">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i < currentQ ? "100%" : i === currentQ ? "50%" : "0%" }}
                className="h-full bg-accent rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          {!showReveal ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: 10 }}
              transition={{ duration: 0.5 }}
              style={{ perspective: 800 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent-light border border-accent/20">
                  {q.difficulty}
                </span>
                <span className="text-xs text-muted font-mono">
                  Question {currentQ + 1}/{questions.length}
                </span>
                <span className="text-xs text-muted font-mono ml-auto">
                  {3 - attempts} tentative{3 - attempts > 1 ? "s" : ""} restante{3 - attempts > 1 ? "s" : ""}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight">
                {q.question}
              </h2>

              {/* Attempts indicators */}
              <div className="flex gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={
                      i < attempts
                        ? { backgroundColor: "rgba(239,68,68,0.3)", borderColor: "rgba(239,68,68,0.4)" }
                        : { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }
                    }
                    className="w-3 h-3 rounded-full border"
                  />
                ))}
              </div>

              {/* Input */}
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-light font-mono text-lg">{">"}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setFeedback("idle"); }}
                  onKeyDown={handleKey}
                  placeholder="Ta reponse..."
                  className="w-full pl-10 pr-4 py-4 rounded-xl bg-[#0a0a18]/90 border border-white/10 text-foreground font-mono text-lg placeholder-white/20 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_-5px_var(--accent-glow)] transition-all"
                  autoComplete="off"
                />
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback === "wrong" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm font-mono mb-4"
                  >
                    ✗ Pas tout a fait... Essaie encore !
                  </motion.p>
                )}
                {feedback === "hint" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-amber-400 text-sm font-mono mb-4"
                  >
                    💡 Indice : {q.hint}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={checkAnswer}
                  disabled={!input.trim()}
                  className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Valider
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setGameState("done")}
                  className="px-6 py-3 rounded-full text-muted border border-card-border hover:text-foreground text-sm transition-all"
                >
                  Passer le jeu
                </motion.button>
              </div>

              {/* Previous revelations */}
              {revelations.length > 0 && (
                <div className="mt-10 space-y-3">
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">Deja deverrouille :</p>
                  {revelations.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/3 border border-white/5 text-xs text-muted">
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`reveal-${currentQ}`}
              initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-12"
              style={{ perspective: 800 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-6"
              >
                🔓
              </motion.div>
              <h3 className="text-2xl font-bold text-accent-light mb-4 font-mono">
                {q.revelation.title}
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted max-w-md mx-auto leading-relaxed"
              >
                {q.revelation.content}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-32 h-px bg-accent/40 mx-auto mt-6"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
