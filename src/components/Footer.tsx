import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-card-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; 2025 Adoum Salah. Tous droits reserves.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Gojobyte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent-light transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/adoum-salah-101221232/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent-light transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="mailto:sadoumachi@gmail.com"
            className="text-muted hover:text-accent-light transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
