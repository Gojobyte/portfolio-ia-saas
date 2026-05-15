"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "./GlitchText";

interface Question {
  question: string;
  hint: string;
  answers: string[];
  difficulty: "facile" | "moyen" | "difficile";
  revelation: string;
}

const allQuestions: Question[] = [
  // ── FACILE (15) ──
  { question: "Quel langage utilise des balises comme <div> et <p> ?", hint: "Le squelette de toute page web...", answers: ["html", "html5"], difficulty: "facile", revelation: "Je m'appelle Adoum Salah, developpeur Full Stack base en Ile-de-France." },
  { question: "Quel langage donne du style aux pages web (couleurs, tailles) ?", hint: "3 lettres, Cascading Style...", answers: ["css", "css3"], difficulty: "facile", revelation: "J'utilise Tailwind CSS au quotidien pour styler mes applications." },
  { question: "Quel langage rend les pages web interactives ?", hint: "Son nom contient 'Script'...", answers: ["javascript", "js"], difficulty: "facile", revelation: "JavaScript est mon langage principal depuis +4 ans." },
  { question: "Quel outil permet de versionner son code ?", hint: "Cree par Linus Torvalds...", answers: ["git"], difficulty: "facile", revelation: "170+ commits sur mes repos GitHub." },
  { question: "Quelle plateforme heberge des repos Git en ligne ?", hint: "Un chat (hub) + git...", answers: ["github"], difficulty: "facile", revelation: "Mon GitHub : github.com/Gojobyte — 24+ repositories." },
  { question: "Quel format de donnees utilise des accolades {} et des cles/valeurs ?", hint: "JavaScript Object...", answers: ["json"], difficulty: "facile", revelation: "JSON et les API REST sont au coeur de tous mes projets backend." },
  { question: "Quelle balise HTML cree un lien cliquable ?", hint: "La premiere lettre de 'anchor'...", answers: ["a", "<a>", "a href"], difficulty: "facile", revelation: "J'ai construit 12+ sites avec des navigations complexes." },
  { question: "Quel mot-cle JS declare une variable qui ne change pas ?", hint: "Le contraire de 'let'...", answers: ["const"], difficulty: "facile", revelation: "J'ecris du code propre avec const par defaut, let quand necessaire." },
  { question: "Quel attribut HTML rend une image accessible ?", hint: "Texte alternatif...", answers: ["alt"], difficulty: "facile", revelation: "L'accessibilite est une priorite dans mes projets." },
  { question: "Comment s'appelle le fichier de config des dependances Node.js ?", hint: "package + json...", answers: ["package.json", "packagejson"], difficulty: "facile", revelation: "Chacun de mes projets a un package.json avec des scripts optimises." },
  { question: "Quel raccourci clavier annule la derniere action (Windows/Linux) ?", hint: "Ctrl + ...", answers: ["ctrl+z", "ctrl z"], difficulty: "facile", revelation: "J'utilise VS Code avec plein de raccourcis pour coder plus vite." },
  { question: "Quel symbole commence un commentaire en ligne en JS ?", hint: "Deux barres obliques...", answers: ["//"], difficulty: "facile", revelation: "Je commente mon code quand c'est necessaire, pas plus." },
  { question: "Quel mot-cle JS permet de creer une condition ?", hint: "Si en anglais...", answers: ["if"], difficulty: "facile", revelation: "La logique conditionnelle est la base de tous mes algorithmes." },
  { question: "Quel element HTML represente un paragraphe ?", hint: "Une seule lettre...", answers: ["p", "<p>"], difficulty: "facile", revelation: "HTML est le premier langage que j'ai appris." },
  { question: "Quelle commande installe les dependances d'un projet Node ?", hint: "npm + un mot de 7 lettres...", answers: ["npm install", "npm i"], difficulty: "facile", revelation: "Je maitrise npm, pnpm et yarn pour la gestion des dependances." },

  // ── MOYEN (15) ──
  { question: "Quel framework React est celebre pour le Server Side Rendering ?", hint: "Son nom commence par 'Next'...", answers: ["next", "nextjs", "next.js"], difficulty: "moyen", revelation: "Next.js est mon framework principal. 8+ projets deployes avec." },
  { question: "Quel ORM TypeScript genere un client type-safe ?", hint: "6 lettres, utilise avec PostgreSQL...", answers: ["prisma"], difficulty: "moyen", revelation: "J'utilise Prisma pour tous mes projets avec base de donnees." },
  { question: "Dans Git, quelle commande envoie les commits au serveur ?", hint: "Le contraire de 'pull'...", answers: ["push", "git push"], difficulty: "moyen", revelation: "Mon workflow Git : branch, commit, push, PR, merge." },
  { question: "Quel superset de JavaScript ajoute le typage statique ?", hint: "Type + Script...", answers: ["typescript", "ts"], difficulty: "moyen", revelation: "Tous mes projets recents sont en TypeScript strict." },
  { question: "Quel framework CSS utilise des classes utilitaires comme 'flex' ou 'p-4' ?", hint: "Son nom evoque le vent...", answers: ["tailwind", "tailwindcss", "tailwind css"], difficulty: "moyen", revelation: "Tailwind CSS est mon outil de styling prefere." },
  { question: "Quelle base de donnees relationnelle est souvent utilisee avec Prisma ?", hint: "Postgre + SQL...", answers: ["postgresql", "postgres"], difficulty: "moyen", revelation: "PostgreSQL est ma base de donnees principale pour les projets SaaS." },
  { question: "Quelle plateforme deploie automatiquement les projets Next.js ?", hint: "Creee par les memes que Next.js...", answers: ["vercel"], difficulty: "moyen", revelation: "10+ projets deployes sur Vercel en production." },
  { question: "Quel hook React gere l'etat local d'un composant ?", hint: "use + State...", answers: ["usestate", "useState"], difficulty: "moyen", revelation: "Je maitrise tous les hooks React : useState, useEffect, useRef, useMemo..." },
  { question: "Quelle methode HTTP est utilisee pour creer une ressource ?", hint: "Envoyer des donnees au serveur...", answers: ["post"], difficulty: "moyen", revelation: "J'ai construit de nombreuses API REST avec Express et Next.js." },
  { question: "Quel outil de containerisation utilise des images et des conteneurs ?", hint: "Un animal marin (baleine)...", answers: ["docker"], difficulty: "moyen", revelation: "J'utilise Docker pour mon projet CHADIA (architecture microservices)." },
  { question: "Quel systeme de cache en memoire est souvent utilise avec Node.js ?", hint: "5 lettres, commence par R...", answers: ["redis"], difficulty: "moyen", revelation: "Redis est utilise dans mon projet CHADIA pour le cache et les sessions." },
  { question: "Quel pattern d'authentification utilise des tokens encodes en base64 ?", hint: "JSON Web...", answers: ["jwt", "json web token"], difficulty: "moyen", revelation: "J'implemente l'auth avec JWT et NextAuth v5 dans mes projets." },
  { question: "Quelle librairie d'animation React est creee par Framer ?", hint: "Framer + ...", answers: ["framer motion", "motion", "framer-motion"], difficulty: "moyen", revelation: "Ce portfolio utilise Framer Motion pour toutes ses animations." },
  { question: "Quel operateur JS verifie l'egalite stricte (type + valeur) ?", hint: "Trois signes egaux...", answers: ["==="], difficulty: "moyen", revelation: "J'ecris du code strict avec === et TypeScript pour eviter les bugs." },
  { question: "Comment s'appelle la technique de rendu cote serveur avec React ?", hint: "SSR = Server Side...", answers: ["ssr", "server side rendering"], difficulty: "moyen", revelation: "J'utilise le SSR avec Next.js pour optimiser les performances et le SEO." },

  // ── DIFFICILE (10) ──
  { question: "Quelle methode JS transforme un tableau en une seule valeur ?", hint: "Elle 'reduit' le tableau...", answers: ["reduce", ".reduce"], difficulty: "difficile", revelation: "J'ai une bonne maitrise des methodes fonctionnelles JS : map, filter, reduce." },
  { question: "Quel hook React declenche des effets secondaires ?", hint: "use + le mot pour 'effet'...", answers: ["useeffect", "useEffect"], difficulty: "difficile", revelation: "Email : sadoumachi@gmail.com | WhatsApp : 07 81 31 15 41" },
  { question: "Quel pattern architectural separe une app en services independants ?", hint: "Micro + services...", answers: ["microservices", "micro-services"], difficulty: "difficile", revelation: "Mon projet CHADIA utilise 3 microservices avec API Gateway." },
  { question: "Quel mecanisme Next.js permet de revalider une page sans rebuild ?", hint: "ISR = Incremental Static...", answers: ["isr", "revalidation", "incremental static regeneration"], difficulty: "difficile", revelation: "Je maitrise ISR, SSR, SSG et CSR — chaque strategie a son usage." },
  { question: "En TypeScript, quel mot-cle definit un type a partir d'un autre ?", hint: "Le mot anglais pour 'etendre'...", answers: ["extends"], difficulty: "difficile", revelation: "J'utilise extends, generics et conditional types dans mes projets." },
  { question: "Quel est le nom du pattern qui differe les evenements dans une table ?", hint: "Outbox...", answers: ["outbox", "outbox pattern"], difficulty: "difficile", revelation: "Le projet CHADIA utilise l'Outbox Pattern pour l'event-driven." },
  { question: "Quelle directive React marque un composant comme client-side ?", hint: "'use ...'", answers: ["use client", "'use client'", "\"use client\""], difficulty: "difficile", revelation: "Je maitrise la frontiere Server/Client Components de Next.js." },
  { question: "Quel algorithme de hachage est recommande pour les mots de passe ?", hint: "Commence par 'b', 6 lettres...", answers: ["bcrypt"], difficulty: "difficile", revelation: "J'utilise bcrypt avec NextAuth v5 pour securiser les mots de passe." },
  { question: "En SQL, quelle clause filtre les resultats d'un GROUP BY ?", hint: "Pas WHERE, mais...", answers: ["having"], difficulty: "difficile", revelation: "Je maitrise SQL avance : JOIN, GROUP BY, HAVING, sous-requetes." },
  { question: "Quel concept React permet d'eviter le prop drilling ?", hint: "Un mot qui signifie 'contexte'...", answers: ["context", "usecontext", "useContext", "react context"], difficulty: "difficile", revelation: "J'utilise Context API et parfois Redux pour le state management." },
];

const revelationsAboutMe = [
  "Je m'appelle Adoum Salah, developpeur Full Stack base en Ile-de-France.",
  "Ma stack : Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS.",
  "24+ repos GitHub, 170+ commits, 10+ projets deployes en production.",
  "J'utilise l'IA (Claude Code, Copilot, Hermes) pour coder plus vite.",
  "Disponible immediatement pour stage/alternance — 6 mois.",
  "Email : sadoumachi@gmail.com | WhatsApp : 07 81 31 15 41",
];

type Difficulty = "facile" | "moyen" | "difficile" | "mixte";
type GamePhase = "intro" | "setup" | "playing" | "result" | "done";

interface QResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  passed: boolean;
  skipped: boolean;
}

function TerminalLine({ text, delay, color = "text-green-400" }: { text: string; delay: number; color?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  if (!visible) return null;
  return <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`font-mono text-sm ${color}`}>{text}</motion.div>;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function GameOverlay({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("mixte");
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong" | "hint" | "failed">("idle");
  const [showReveal, setShowReveal] = useState(false);
  const [results, setResults] = useState<QResult[]>([]);
  const [revIndex, setRevIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const score = results.filter((r) => r.passed).length;
  const q = gameQuestions[currentQ];

  const startGame = () => {
    let pool: Question[];
    if (difficulty === "mixte") {
      pool = shuffle(allQuestions);
    } else {
      pool = shuffle(allQuestions.filter((q) => q.difficulty === difficulty));
    }
    setGameQuestions(pool.slice(0, Math.min(questionCount, pool.length)));
    setPhase("playing");
  };

  const nextQuestion = () => {
    setShowReveal(false);
    if (currentQ < gameQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setAttempts(0);
      setInput("");
      setFeedback("idle");
    } else {
      setPhase("result");
    }
  };

  const handleCorrect = () => {
    setFeedback("correct");
    setResults((prev) => [...prev, { question: q.question, userAnswer: input, correctAnswer: q.answers[0], passed: true, skipped: false }]);
    setRevIndex((i) => Math.min(i + 1, revelationsAboutMe.length - 1));
    setShowReveal(true);
    setTimeout(nextQuestion, 3000);
  };

  const handleFailed = () => {
    setFeedback("failed");
    setResults((prev) => [...prev, { question: q.question, userAnswer: input || "(aucune)", correctAnswer: q.answers[0], passed: false, skipped: false }]);
    setShowReveal(true);
    setTimeout(nextQuestion, 3500);
  };

  const handleSkip = () => {
    setResults((prev) => [...prev, { question: q.question, userAnswer: "(passee)", correctAnswer: q.answers[0], passed: false, skipped: true }]);
    setShowReveal(false);
    if (currentQ < gameQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setAttempts(0);
      setInput("");
      setFeedback("idle");
    } else {
      setPhase("result");
    }
  };

  const checkAnswer = () => {
    const clean = input.trim().toLowerCase().replace(/[().'"\s]/g, "");
    const isCorrect = q.answers.some((a) => clean === a.toLowerCase().replace(/[().'"\s]/g, ""));
    if (isCorrect) {
      handleCorrect();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        handleFailed();
      } else if (newAttempts === 2) {
        setFeedback("hint");
      } else {
        setFeedback("wrong");
      }
    }
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && input.trim() && !showReveal) checkAnswer(); };

  useEffect(() => { if (phase === "playing" && !showReveal) inputRef.current?.focus(); }, [phase, currentQ, feedback, showReveal]);

  if (phase === "done") return <>{children}</>;

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-20 h-20 mx-auto mb-8 rounded-2xl border border-accent/30 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <span className="text-3xl font-mono text-accent-light">{"</>"}</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4"><GlitchText text="Bienvenue." className="text-foreground" /></h1>
          <div className="font-mono text-sm space-y-1 mb-8">
            <TerminalLine text="> Initialisation du portfolio..." delay={500} />
            <TerminalLine text="> Chargement du profil developpeur..." delay={1200} />
            <TerminalLine text="> Securite activee : mode enigme" delay={1900} color="text-amber-400" />
            <TerminalLine text="> Resous des enigmes pour deverrouiller mon profil" delay={2600} color="text-accent-light" />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }} className="space-x-3">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.95 }} onClick={() => setPhase("setup")} className="px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium text-lg transition-all">Jouer</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPhase("done")} className="px-8 py-4 rounded-full font-medium text-muted border border-card-border hover:text-foreground transition-all">Passer</motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ── SETUP ──
  if (phase === "setup") {
    const counts = [5, 10, 15, 20];
    const diffs: { key: Difficulty; label: string; desc: string }[] = [
      { key: "facile", label: "Facile", desc: "Questions de base (HTML, CSS, JS)" },
      { key: "moyen", label: "Moyen", desc: "Frameworks et outils (Next.js, Git, Docker)" },
      { key: "difficile", label: "Difficile", desc: "Concepts avances (patterns, hooks, SQL)" },
      { key: "mixte", label: "Mixte", desc: "Un peu de tout, difficulte progressive" },
    ];
    return (
      <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-lg mx-auto px-6 py-12 w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">Configure ton defi</h2>
          <p className="text-muted text-sm text-center mb-10">Choisis le nombre de questions et la difficulte.</p>

          <div className="mb-8">
            <p className="text-sm font-mono text-accent-light mb-3">// Nombre de questions</p>
            <div className="flex gap-3">
              {counts.map((c) => (
                <motion.button key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setQuestionCount(c)}
                  className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${questionCount === c ? "bg-accent text-white shadow-[0_0_20px_-5px_var(--accent)]" : "bg-[#0a0a18] border border-white/10 text-muted hover:text-foreground"}`}
                >{c}</motion.button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <p className="text-sm font-mono text-accent-light mb-3">// Difficulte</p>
            <div className="grid grid-cols-2 gap-3">
              {diffs.map((d) => (
                <motion.button key={d.key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setDifficulty(d.key)}
                  className={`p-4 rounded-xl text-left transition-all ${difficulty === d.key ? "bg-accent/15 border border-accent/40 shadow-[0_0_15px_-5px_var(--accent)]" : "bg-[#0a0a18] border border-white/10"}`}
                >
                  <p className={`font-semibold text-sm mb-1 ${difficulty === d.key ? "text-accent-light" : "text-foreground"}`}>{d.label}</p>
                  <p className="text-xs text-muted">{d.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.95 }} onClick={startGame}
              className="px-10 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium text-lg transition-all">
              Lancer ({questionCount} questions)
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPhase("done")}
              className="px-6 py-4 rounded-full text-muted border border-card-border hover:text-foreground text-sm transition-all">Passer</motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── RESULT ──
  if (phase === "result") {
    const total = results.length;
    const pct = Math.round((score / total) * 100);
    const failed = results.filter((r) => !r.passed);
    const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const msg = pct === 100 ? "Parfait ! Tu es un vrai dev !" : pct >= 70 ? "Bravo, excellent score !" : pct >= 40 ? "Pas mal ! Continue a apprendre." : "Tu as du potentiel, revise un peu !";

    return (
      <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-2xl mx-auto px-6 py-12 w-full">
          <div className="text-center mb-10">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 0.8 }} className="text-6xl mb-4">{emoji}</motion.div>
            <h2 className="text-3xl font-bold mb-2">{msg}</h2>
            <p className="text-muted">Voici ton bilan :</p>
          </div>

          {/* Score card */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="p-5 rounded-xl bg-[#0a0a18] border border-white/10 text-center">
              <div className="text-3xl font-black text-gradient">{score}/{total}</div>
              <div className="text-xs text-muted mt-1">Bonnes reponses</div>
            </div>
            <div className="p-5 rounded-xl bg-[#0a0a18] border border-white/10 text-center">
              <div className="text-3xl font-black text-gradient">{pct}%</div>
              <div className="text-xs text-muted mt-1">Score</div>
            </div>
            <div className="p-5 rounded-xl bg-[#0a0a18] border border-white/10 text-center">
              <div className="text-3xl font-black text-gradient">{results.filter((r) => r.skipped).length}</div>
              <div className="text-xs text-muted mt-1">Passees</div>
            </div>
          </div>

          {/* A propos deverrouille */}
          <div className="p-5 rounded-xl bg-accent/5 border border-accent/20 mb-8">
            <p className="text-xs font-mono text-accent-light mb-3 uppercase tracking-wider">Profil deverrouille :</p>
            <div className="space-y-2 text-sm text-muted">
              {revelationsAboutMe.slice(0, Math.max(1, Math.ceil(score / total * revelationsAboutMe.length))).map((r, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}>
                  <span className="text-accent-light mr-2">▸</span>{r}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Failed questions */}
          {failed.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-mono text-red-400/70 mb-3 uppercase tracking-wider">Questions manquees — les bonnes reponses :</p>
              <div className="space-y-3">
                {failed.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-xl bg-[#0a0a18] border border-red-500/10">
                    <p className="text-sm text-foreground mb-1">{f.question}</p>
                    <div className="flex gap-4 text-xs mt-2">
                      <span className="text-red-400">Ta reponse : {f.userAnswer}</span>
                      <span className="text-green-400">Bonne reponse : {f.correctAnswer}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.95 }} onClick={() => setPhase("done")}
              className="px-10 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium text-lg transition-all">
              Voir le portfolio
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setPhase("setup"); setResults([]); setCurrentQ(0); setRevIndex(0); }}
              className="px-6 py-4 rounded-full text-muted border border-card-border hover:text-foreground text-sm transition-all">Rejouer</motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── PLAYING ──
  if (!q) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center noise overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 w-full">
        {/* Progress */}
        <div className="flex items-center gap-1.5 mb-2">
          {gameQuestions.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div animate={{ width: i < currentQ ? "100%" : i === currentQ ? "50%" : "0%" }}
                className={`h-full rounded-full ${i < currentQ ? (results[i]?.passed ? "bg-green-500" : "bg-red-500/60") : "bg-accent"}`} transition={{ duration: 0.4 }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted font-mono mb-8">
          <span>Score : {score}/{results.length}</span>
          <span>{currentQ + 1}/{gameQuestions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          {!showReveal ? (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 60, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -60, rotateY: 8 }} transition={{ duration: 0.4 }} style={{ perspective: 800 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${q.difficulty === "facile" ? "bg-green-500/10 text-green-400 border-green-500/20" : q.difficulty === "moyen" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>{q.difficulty}</span>
                <span className="text-xs text-muted font-mono ml-auto">{3 - attempts} essai{3 - attempts > 1 ? "s" : ""}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-tight">{q.question}</h2>

              <div className="flex gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={i < attempts ? { backgroundColor: "rgba(239,68,68,0.4)", scale: 1.1 } : {}} className="w-3 h-3 rounded-full border border-white/10 bg-white/3" />
                ))}
              </div>

              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-light font-mono text-lg">{">"}</span>
                <input ref={inputRef} type="text" value={input} onChange={(e) => { setInput(e.target.value); if (feedback === "wrong") setFeedback("idle"); }} onKeyDown={handleKey} placeholder="Ta reponse..." autoComplete="off"
                  className="w-full pl-10 pr-4 py-4 rounded-xl bg-[#0a0a18]/90 border border-white/10 text-foreground font-mono text-lg placeholder-white/20 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_-5px_var(--accent-glow)] transition-all" />
              </div>

              <AnimatePresence>
                {feedback === "wrong" && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-sm font-mono mb-4">
                    ✗ Mauvaise reponse. {3 - attempts} essai{3 - attempts > 1 ? "s" : ""} restant{3 - attempts > 1 ? "s" : ""}.
                  </motion.p>
                )}
                {feedback === "hint" && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-amber-400 text-sm font-mono mb-4">
                    💡 Indice : {q.hint}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={checkAnswer} disabled={!input.trim()}
                  className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed">Valider</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSkip}
                  className="px-6 py-3 rounded-full text-muted border border-card-border hover:text-foreground text-sm transition-all">Passer</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setPhase("done")}
                  className="px-6 py-3 rounded-full text-muted/50 text-xs hover:text-muted transition-all ml-auto">Quitter</motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`reveal-${currentQ}`} initial={{ opacity: 0, scale: 0.8, rotateX: 15 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-center py-8">
              {feedback === "correct" ? (
                <>
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }} className="text-5xl mb-4">🔓</motion.div>
                  <h3 className="text-xl font-bold text-green-400 mb-3 font-mono">Bonne reponse !</h3>
                  <p className="text-muted max-w-md mx-auto text-sm">{revelationsAboutMe[revIndex]}</p>
                </>
              ) : (
                <>
                  <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }} className="text-5xl mb-4">🔒</motion.div>
                  <h3 className="text-xl font-bold text-red-400 mb-3 font-mono">3 echecs — la reponse etait :</h3>
                  <p className="text-accent-light font-mono text-lg mb-3">{q.answers[0]}</p>
                  <p className="text-muted text-sm">Question suivante dans un instant...</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
