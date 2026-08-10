import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Sparkles,
  Heart,
  Star,
  Flower2,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Download,
  ArrowRight,
  GraduationCap,
  Code2,
  Brain,
  Palette,
  Trophy,
  Award,
  Rocket,
  ExternalLink,
  Send,
  Menu,
  X,
  Sun,
  Moon,
  MessageSquare,
  Bot,
  User,
} from "lucide-react";
import avatarImg from "@/assets/avatar.png";
import projectSkin from "@/assets/project-skin.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const TYPING_PHRASES = ["AI/ML Enthusiast", "Creative Problem Solver", "Future Tech Professional"];

function useTyping() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = phrase.slice(0, text.length + 1);
        setText(next);
        if (next === phrase) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = phrase.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  return text;
}

function TypingText() {
  const text = useTyping();
  return (
    <div className="mt-6 h-8 flex items-center gap-1 text-primary font-medium">
      <span>{text}</span>
      <span className="inline-block w-[2px] h-5 bg-primary animate-caret" />
    </div>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { theme, toggleTheme };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const NAV = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#experience", label: "Experience" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingDecor />
      <Chatbot />

      {/* NAV */}
      <header className="fixed top-4 left-1/2 z-50 w-[min(1100px,94%)] -translate-x-1/2 glass-strong rounded-full px-5 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="text-gradient">Aditi</span>
          <Star className="h-4 w-4 fill-primary text-primary" />
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 text-sm text-foreground/70 hover:text-primary rounded-full hover:bg-accent/40 transition"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Switcher */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-accent/50 transition text-primary"
            aria-label="Toggle light/dark theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            className="lg:hidden rounded-full p-2 hover:bg-accent/50 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 glass-strong rounded-2xl p-2 lg:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm rounded-xl hover:bg-accent/50 transition"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-36 pb-24 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" /> AI/ML Student &amp; Builder
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05]">
              Hi, I'm <span className="text-gradient italic">Aditi</span>
              <span className="inline-block ml-2 text-primary">✦</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/70 max-w-lg">
              CSE (AI &amp; ML) Student · Aspiring AI/ML Professional. I build thoughtful,
              user-focused technology with a passion for creativity, aesthetics, and clean code.
            </p>

            <TypingText />

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#resume"
                className="btn-primary-pink inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                View Resume <Download className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition"
              >
                Explore My Journey <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-foreground/60">
              <a
                href="https://github.com/aditiasundi"
                className="hover:text-primary transition"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/aditi-c-asundi-b1034037a"
                className="hover:text-primary transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:aditiasundi@gmail.com"
                className="hover:text-primary transition"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-[var(--gradient-soft)] blur-3xl opacity-70 rounded-full" />
            <div className="relative glass-strong rounded-[2.5rem] p-6 animate-float">
              <img
                src={avatarImg}
                alt="Illustration of Aditi coding with a laptop"
                width={1024}
                height={1024}
                className="w-full h-auto rounded-3xl"
                {...({ fetchPriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
              />
              <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-primary animate-twinkle" />
              <Star
                className="absolute -bottom-2 -left-3 h-6 w-6 text-primary/70 fill-primary/40 animate-twinkle"
                style={{ animationDelay: "0.4s" }}
              />
              <Flower2
                className="absolute top-6 -left-4 h-7 w-7 text-primary/60 animate-twinkle"
                style={{ animationDelay: "0.8s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About Me" title="My story" icon={<Heart className="h-4 w-4" />}>
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 glass-card rounded-3xl p-8 reveal">
            <p className="text-foreground/80 leading-relaxed">
              I'm a passionate <b>B.E. Computer Science &amp; Engineering (AI &amp; ML)</b> student
              at SKSVMACET, Laxmeshwar. I love where creativity meets computation — spending my time
              exploring <b>Artificial Intelligence, Machine Learning, and Generative AI</b>. I
              combine strong technical skills with design sensibility and clear communication to
              build products that feel as good as they work.
            </p>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              When I'm not coding, you'll find me dancing, reading, or sketching new ideas for my
              next project.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4 reveal">
            <Stat n="8.05" label="Current CGPA" />
            <Stat n="5+" label="Projects Built" />
            <Stat n="2029" label="Graduating" />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold mb-8 reveal">Academic Journey</h3>
          <Timeline
            items={[
              {
                year: "2025 – 2029",
                title: "B.E. — CSE (AI & ML)",
                place: "SKSVMACET, Laxmeshwar",
                detail: "CGPA\u00a0 8.05\u00a0· Ongoing",
              },
              {
                year: "PUC",
                title: "Pre-University · Science",
                place: "Vidya Chetan PU College, Lingsugur",
                detail: "Completed · 84.6%",
              },
              {
                year: "Class X",
                title: "Secondary School (CBSE)",
                place: "Kendriya Vidyalaya, Hatti gold mines",
                detail: "Completed · 75%",
              },
            ]}
          />
        </div>
      </Section>

      {/* EDUCATION */}
      <Section
        id="education"
        eyebrow="Education"
        title="Academic background"
        icon={<GraduationCap className="h-4 w-4" />}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <EduCard
            year="2025 – 2029"
            title="B.E. — Computer Science & Engineering"
            spec="Artificial Intelligence & Machine Learning"
            place="SKSVMACET, Laxmeshwar, Karnataka"
            score="CGPA · 8.05"
            highlight
          />
          <EduCard
            year="PUC — Science"
            title="Pre-University Certificate"
            spec={"Physics · Chemistry · Maths · biology\n\n"}
            place="Vidya Chetan PU College, Lingsugur"
            score="84.6%"
          />
          <EduCard
            year="Class X · CBSE"
            title="Secondary School Certificate"
            spec="Central Board of Secondary Education"
            place="Kendriya Vidyalaya, Hatti gold mines"
            score="75%"
          />
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        id="skills"
        eyebrow="Skills"
        title="Technical toolkit"
        icon={<Brain className="h-4 w-4" />}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillGroup
            icon={<Code2 className="h-5 w-5" />}
            title="Languages"
            skills={[
              ["Python", 88],
              ["C", 75],
              ["HTML & CSS", 85],
            ]}
          />
          <SkillGroup
            icon={<Brain className="h-5 w-5" />}
            title="AI / ML"
            skills={[
              ["Generative AI", 82],
              ["Prompt Engineering", 85],
              ["TensorFlow", 70],
            ]}
          />
          <SkillGroup
            icon={<Rocket className="h-5 w-5" />}
            title="Frameworks"
            skills={[
              ["Flask", 78],
              ["FastAPI", 72],
              ["MySQL", 74],
            ]}
          />
          <SkillGroup
            icon={<Sparkles className="h-5 w-5" />}
            title="Data & Tools"
            skills={[
              ["Pandas", 80],
              ["Jupyter Notebook", 82],
              ["Figma", 78],
            ]}
          />
          <SkillGroup
            icon={<Palette className="h-5 w-5" />}
            title="Creative"
            skills={[
              ["Editing & Marketing", 80],
              ["UI Aesthetics", 84],
            ]}
          />
          <SkillGroup
            icon={<Heart className="h-5 w-5" />}
            title="Soft Skills"
            skills={[
              ["Communication", 90],
              ["Team Collaboration", 88],
            ]}
          />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        eyebrow="Projects"
        title="Selected work"
        icon={<Sparkles className="h-4 w-4" />}
      >
        <ProjectsSection />
      </Section>

      {/* ACHIEVEMENTS */}
      <Section
        id="achievements"
        eyebrow="Certifications & Achievements"
        title="Milestones"
        icon={<Trophy className="h-4 w-4" />}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Badge
            icon={<Award />}
            title="Deloitte AI & Cybersecurity"
            sub="Job Simulation Certification"
          />
          <Badge icon={<Award />} title="SkillUp Certification" sub="Verified Program" />
          <Badge
            icon={<Trophy />}
            title="2nd Place — Tech Byte"
            sub="Gameathon, Melanze-2026"
            glow
          />
          <Badge icon={<Sparkles />} title="Ultimate Python Guide" sub="Unstop Online Course" />
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section
        id="experience"
        eyebrow="Experience & Activities"
        title="Where I've contributed"
        icon={<Rocket className="h-4 w-4" />}
      >
        <Timeline
          items={[
            {
              year: "2026",
              title: "Hackathons & Innovation Challenges",
              place: "Departmental & Inter-college",
              detail: "Actively participates in tech fests and innovation challenges.",
            },
            {
              year: "2025",
              title: "AI/ML Team Hackathon",
              place: "Collaborative Project",
              detail:
                "Collaborated in a team-based hackathon applying AI/ML concepts to real problems.",
            },
            {
              year: "Ongoing",
              title: "Independent Game Development",
              place: "Personal Projects",
              detail: "Designed and built independent game projects end-to-end.",
            },
            {
              year: "Ongoing",
              title: "Workshops & Tech Events",
              place: "Community",
              detail: "Regularly attends and volunteers at workshops on AI, Web & Design.",
            },
          ]}
        />
      </Section>

      {/* RESUME */}
      <Section
        id="resume"
        eyebrow="Resume"
        title="Download my resume"
        icon={<Download className="h-4 w-4" />}
      >
        <div className="glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center reveal">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass-card px-3 py-1 text-xs text-primary mb-4">
              <Sparkles className="h-3 w-3" /> Updated · 2026
            </div>
            <h3 className="font-display text-3xl font-semibold">One page, all of me</h3>
            <p className="mt-3 text-foreground/70">
              Education, projects, skills, and achievements — neatly designed. Download below or
              preview on the right.
            </p>
            <a
              href="/resume.pdf"
              download
              className="btn-primary-pink mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Download My Resume <Download className="h-4 w-4" />
            </a>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--gradient-soft)] blur-2xl opacity-60 rounded-3xl" />
            <div className="relative aspect-[3/4] glass-card rounded-2xl p-6 text-xs leading-relaxed shadow-[var(--shadow-soft)]">
              <div className="text-center border-b border-border pb-3">
                <div className="font-display text-primary text-xl font-semibold">
                  Aditi C. Asundi
                </div>
                <div className="text-[10px] text-foreground/60 mt-1">
                  B.E. — CSE (AI & ML) · Batch of 2029
                </div>
              </div>
              <div className="mt-3">
                <div className="text-primary font-semibold text-[11px]">CAREER OBJECTIVE</div>
                <p className="text-foreground/70 text-[10px] mt-1">
                  Motivated CSE (AI & ML) student with strong academic record (CGPA 8.05)…
                </p>
              </div>
              <div className="mt-3">
                <div className="text-primary font-semibold text-[11px]">EDUCATION</div>
                <p className="text-foreground/70 text-[10px] mt-1">
                  B.E. — CSE (AI & ML) · SKSVMACET
                </p>
              </div>
              <div className="mt-3">
                <div className="text-primary font-semibold text-[11px]">TECHNICAL SKILLS</div>
                <p className="text-foreground/70 text-[10px] mt-1">
                  Python · C · HTML/CSS · TensorFlow · Flask · FastAPI…
                </p>
              </div>
              <div className="mt-3">
                <div className="text-primary font-semibold text-[11px]">PROJECTS</div>
                <p className="text-foreground/70 text-[10px] mt-1">
                  AI Skin Analysis · AI Emergency App · Memory Pulse…
                </p>
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-twinkle" />
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="Let's build something amazing together"
        icon={<Mail className="h-4 w-4" />}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-8 reveal space-y-4">
            <p className="text-foreground/70">
              Whether it's a collaboration, hackathon team, or just to say hi — my inbox is always
              open.
            </p>
            <ContactItem
              icon={<Mail />}
              label="Email"
              value="aditiasundi@gmail.com"
              href="mailto:aditiasundi@gmail.com"
            />
            <ContactItem
              icon={<Linkedin />}
              label="LinkedIn"
              value="aditi-c-asundi"
              href="https://linkedin.com/in/aditi-c-asundi-b1034037a"
            />
            <ContactItem
              icon={<Github />}
              label="GitHub"
              value="aditiasundi"
              href="https://github.com/aditiasundi"
            />
            <ContactItem icon={<Instagram />} label="Instagram" value="@aditi" href="#" />
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="glass-strong rounded-3xl p-8 reveal space-y-4"
          >
            <div>
              <label className="text-xs font-medium text-foreground/70">Your name</label>
              <input
                required
                className="mt-1 w-full rounded-xl bg-white/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/70">Email</label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-xl bg-white/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/70">Message</label>
              <textarea
                required
                rows={4}
                className="mt-1 w-full rounded-xl bg-white/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none"
                placeholder="Tell me about your idea"
              />
            </div>
            <button
              type="submit"
              className="btn-primary-pink w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              {sent ? (
                "Sent successfully"
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative mt-20 pb-10 px-6 text-center">
        <div className="mx-auto max-w-4xl glass-card rounded-3xl p-8 relative overflow-hidden">
          <Sparkles className="absolute top-4 left-6 h-4 w-4 text-primary animate-twinkle" />
          <Star
            className="absolute top-6 right-8 h-3 w-3 text-primary/70 fill-primary/40 animate-twinkle"
            style={{ animationDelay: "0.6s" }}
          />
          <Flower2
            className="absolute bottom-4 left-10 h-4 w-4 text-primary/50 animate-twinkle"
            style={{ animationDelay: "1s" }}
          />
          <p className="font-display text-lg">Designed & Built by Aditi</p>
          <div className="mt-4 flex justify-center gap-4 text-foreground/60">
            <a
              href="https://github.com/aditiasundi"
              className="hover:text-primary transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/aditi-c-asundi-b1034037a"
              className="hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:aditiasundi@gmail.com"
              className="hover:text-primary transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-foreground/50">
            © {new Date().getFullYear()} Aditi C. Asundi · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* -------- Chatbot component -------- */

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const BOT_REPLIES: { keywords: string[]; text: string }[] = [
  {
    keywords: ["hi", "hello", "hey", "greet"],
    text: "Hi there! I am Aditi's AI Assistant. How can I assist you in exploring her portfolio today? 😊",
  },
  {
    keywords: ["skills", "toolkit", "programming", "languages", "tech"],
    text: "Aditi has a rich technical toolkit! 💻\n• **Languages:** Python, C, HTML/CSS, JS\n• **AI/ML:** Generative AI, Prompt Engineering, TensorFlow, Computer Vision\n• **Frameworks & Tools:** Flask, FastAPI, MySQL, Pandas, Jupyter, Figma, Git",
  },
  {
    keywords: ["projects", "selected work", "skincare", "skin", "apps", "game"],
    text: "She has built awesome projects! 🚀\n• **AI Skin Analysis:** A skincare concept predicting concerns and proposing customized skincare.\n• **VidNote AI:** Transforming video content into beautiful structured learning notes.\n• **AI Emergency App:** Connected helper matching app.\n• **Memory Pulse & Anime Word Duel:** Fun web-based games!",
  },
  {
    keywords: ["cgpa", "education", "score", "college", "marks", "gpa", "school"],
    text: "Aditi is a stellar student! 🎓\n• **B.E. CSE (AI & ML)** at SKSVMACET, Laxmeshwar with an ongoing CGPA of **8.05**.\n• **PUC (Science):** Vidya Chetan PU College (84.6%).\n• **Class X (CBSE):** Kendriya Vidyalaya (75%).",
  },
  {
    keywords: ["contact", "email", "linkedin", "github", "social"],
    text: "You can reach out to Aditi via:\n• **Email:** aditiasundi@gmail.com 📧\n• **LinkedIn:** linkedin.com/in/aditi-c-asundi-b1034037a 💼\n• **GitHub:** github.com/aditiasundi 🐙",
  },
  {
    keywords: ["achievements", "prize", "certifications", "certificate", "awards"],
    text: "Here are some highlights! 🏆\n• **2nd Place** in Tech Byte Gameathon at Melanze 2026.\n• **Deloitte** AI & Cybersecurity certifications.\n• **SkillUp** and **Unstop** Ultimate Python Guide certified!",
  },
  {
    keywords: ["interests", "hobbies", "dancing", "sketching", "reading"],
    text: "In her free time, Aditi loves: 🎨\n• Sketching & Designing UI aesthetics\n• Dancing\n• Reading & exploring emerging technologies!",
  },
];

const PRESETS = [
  { label: "What are her skills? 💡", query: "skills" },
  { label: "Tell me about her projects! 🚀", query: "projects" },
  { label: "What is her CGPA & background? 🎓", query: "cgpa" },
  { label: "How can I contact her? ✉️", query: "contact" },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! I am Aditi's virtual assistant. Ask me anything about her skills, projects, achievements, or academic background! 🤖✨",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const normalized = textToSend.toLowerCase();
      let matchedReply =
        "I am a simple AI portfolio assistant! If you want to know more details, you can view the specific sections of this portfolio or email Aditi directly at aditiasundi@gmail.com! ✉️";

      for (const item of BOT_REPLIES) {
        if (item.keywords.some((keyword) => normalized.includes(keyword))) {
          matchedReply = item.text;
          break;
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: matchedReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] glass-strong rounded-3xl overflow-hidden flex flex-col shadow-[var(--shadow-glow)] animate-fade-up">
          {/* Header */}
          <div className="p-4 bg-[var(--gradient-primary)] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/20 rounded-xl">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold font-display">Aditi's Assistant</div>
                <div className="text-[10px] opacity-80">AI Portfolio Companion</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/40 dark:bg-black/20">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div
                  className={`p-2 bg-accent/40 rounded-lg ${m.sender === "bot" ? "text-primary bg-primary/10" : ""}`}
                >
                  {m.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-[var(--gradient-primary)] text-white rounded-tr-none"
                      : "glass-card text-foreground rounded-tl-none border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 max-w-[85%]">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="glass-card text-foreground rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-1 border border-border">
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preset options */}
          <div className="p-2.5 bg-white/50 dark:bg-black/10 border-t border-border flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handleSend(p.query)}
                className="px-2.5 py-1 text-[10px] font-medium rounded-full glass-card hover:bg-primary hover:text-white transition cursor-pointer text-foreground/80"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-white/80 dark:bg-zinc-900/80 border-t border-border flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-accent/40 border border-border rounded-xl px-3 py-1.5 text-xs outline-none focus:border-primary transition text-foreground"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[var(--gradient-primary)] text-white hover:opacity-90 transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-[var(--gradient-primary)] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-[var(--shadow-glow)] transition-transform duration-300 relative cursor-pointer"
        aria-label="Open portfolio chatbot assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 animate-pulse" />}
      </button>
    </div>
  );
}

/* -------- helper components -------- */

const SECTION_ANIM: Record<string, string> = {
  about: "anim-tilt-l",
  education: "anim-flip",
  skills: "anim-zoom",
  projects: "anim-tilt-r",
  achievements: "anim-swing",
  experience: "anim-cube",
  resume: "anim-rise",
  contact: "anim-flip",
};

function Section({
  id,
  eyebrow,
  title,
  icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const anim = SECTION_ANIM[id] ?? "";
  return (
    <section id={id} className="relative px-6 py-20 stage-3d">
      <div className="mx-auto max-w-6xl">
        <div className={`reveal ${anim} mb-10`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1 text-xs font-medium text-primary">
            {icon} {eyebrow}
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold">{title}</h2>
        </div>
        <div className={`reveal ${anim}`} style={{ transitionDelay: "120ms" }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="font-display text-3xl font-semibold text-gradient">{n}</div>
      <div className="text-xs text-foreground/60 mt-1">{label}</div>
    </div>
  );
}

function Timeline({
  items,
}: {
  items: { year: string; title: string; place: string; detail: string }[];
}) {
  return (
    <div className="relative pl-6 md:pl-8">
      <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
      <div className="space-y-8">
        {items.map((it, i) => (
          <div key={i} className="relative reveal">
            <div className="absolute -left-[22px] md:-left-[26px] top-1.5 h-4 w-4 rounded-full bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)] ring-4 ring-background" />
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs text-primary font-semibold">{it.year}</div>
              <div className="font-display text-lg font-semibold mt-0.5">{it.title}</div>
              <div className="text-sm text-foreground/70">{it.place}</div>
              <div className="text-xs text-foreground/60 mt-1">{it.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EduCard({
  year,
  title,
  spec,
  place,
  score,
  highlight,
}: {
  year: string;
  title: string;
  spec: string;
  place: string;
  score: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`reveal rounded-3xl p-6 transition hover:-translate-y-1 ${highlight ? "glass-strong ring-1 ring-primary/30" : "glass-card"}`}
    >
      <div className="text-xs font-semibold text-primary">{year}</div>
      <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
      <p className="text-sm text-foreground/70">{spec}</p>
      <p className="text-xs text-foreground/60 mt-2">{place}</p>
      <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold text-accent-foreground">
        <Star className="h-3 w-3 fill-primary text-primary" /> {score}
      </div>
    </div>
  );
}

function SkillGroup({
  icon,
  title,
  skills,
}: {
  icon: React.ReactNode;
  title: string;
  skills: [string, number][];
}) {
  return (
    <div className="glass-card tilt-card rounded-3xl p-6 reveal">
      <div className="flex items-center gap-2 text-primary">
        <span className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--gradient-soft)]">
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-5 space-y-3">
        {skills.map(([name, val]) => (
          <div key={name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80">{name}</span>
              <span className="text-foreground/50">{val}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--gradient-primary)] transition-[width] duration-1000"
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECTS_DATA = [
  {
    emoji: "🧴",
    image: projectSkin,
    title: "AI-Powered Skin Analysis Platform",
    desc: "Skincare platform that analyses skin conditions from images and recommends personalised routines.",
    tech: ["Python", "ML", "Flask", "OpenCV"],
    category: "ai-ml",
  },
  {
    emoji: "🚨",
    title: "AI Emergency App",
    desc: "Smart emergency-response app connecting users to help quickly via AI-driven decision support.",
    tech: ["Python", "AI", "FastAPI"],
    category: "ai-ml",
  },
  {
    emoji: "🎮",
    title: "Memory Pulse Game",
    desc: "Fast-paced memory matching game with increasing difficulty and a clean, minimal UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web-games",
  },
  {
    emoji: "⚔️",
    title: "Anime Word Duel",
    desc: "Anime-themed word battle game combining vocabulary, speed, and strategy.",
    tech: ["JavaScript", "HTML/CSS"],
    category: "web-games",
  },
  {
    emoji: "☀️",
    title: "Solar Energy Calculator",
    desc: "Calculator estimating solar panel output and savings from usage & location data.",
    tech: ["Python", "Data Analysis"],
    category: "other",
  },
];

function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "ai-ml" | "web-games" | "other">("all");

  const filteredProjects = PROJECTS_DATA.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(["all", "ai-ml", "web-games", "other"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              filter === cat
                ? "bg-[var(--gradient-primary)] text-white shadow-[var(--shadow-glow)] scale-[1.03]"
                : "glass-card text-foreground/70 hover:text-primary hover:bg-accent/40"
            }`}
          >
            {cat === "all" && "All Projects ✨"}
            {cat === "ai-ml" && "AI & Machine Learning 🤖"}
            {cat === "web-games" && "Web & Games 🎮"}
            {cat === "other" && "Data & Other ☀️"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6 transition-all duration-500">
        {filteredProjects.map((proj, idx) => (
          <div
            key={proj.title}
            className="animate-fade-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <ProjectCard
              emoji={proj.emoji}
              image={proj.image}
              title={proj.title}
              desc={proj.desc}
              tech={proj.tech}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  emoji,
  title,
  desc,
  tech,
  image,
}: {
  emoji: string;
  title: string;
  desc: string;
  tech: string[];
  image?: string;
}) {
  return (
    <div className="group glass-card tilt-card rounded-3xl p-6 reveal">
      {image && (
        <div className="mb-5 overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={1024}
            height={768}
            className="w-full h-40 object-cover group-hover:scale-105 transition duration-700"
          />
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="grid place-items-center h-11 w-11 rounded-2xl bg-[var(--gradient-soft)] text-xl">
          {emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-foreground/70">{desc}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-accent/50 px-2.5 py-1 text-[11px] font-medium text-accent-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <a
          href="https://github.com/aditiasundi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full glass-strong px-4 py-2 text-xs font-semibold hover:scale-[1.02] transition"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
        <a
          href="https://github.com/aditiasundi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full btn-primary-pink px-4 py-2 text-xs font-semibold"
        >
          Live Demo <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Badge({
  icon,
  title,
  sub,
  glow,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`reveal rounded-3xl p-6 text-center transition hover:-translate-y-1 ${glow ? "glass-strong ring-1 ring-primary/40" : "glass-card"}`}
    >
      <div
        className={`mx-auto grid place-items-center h-14 w-14 rounded-2xl ${glow ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-[var(--gradient-soft)] text-primary"}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-foreground/60">{sub}</p>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-2xl p-3 hover:bg-accent/40 transition"
    >
      <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--gradient-soft)] text-primary">
        {icon}
      </span>
      <div>
        <div className="text-[11px] text-foreground/60 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </a>
  );
}

function FloatingDecor() {
  const items = [
    { top: "8%", left: "6%", size: "h-4 w-4", delay: "0s" },
    { top: "18%", right: "10%", size: "h-3 w-3", delay: "0.6s" },
    { top: "42%", left: "3%", size: "h-3 w-3", delay: "1.2s" },
    { top: "60%", right: "5%", size: "h-4 w-4", delay: "0.3s" },
    { top: "78%", left: "8%", size: "h-3 w-3", delay: "0.9s" },
    { top: "88%", right: "12%", size: "h-4 w-4", delay: "1.5s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {items.map((it, i) => (
        <Sparkles
          key={i}
          className={`absolute text-primary/50 animate-twinkle ${it.size}`}
          style={{ top: it.top, left: it.left, right: it.right, animationDelay: it.delay }}
        />
      ))}
    </div>
  );
}
