import { useState } from "react";
import { Section } from "@/App";
import Icon from "@/components/ui/icon";

interface NavProps {
  activeSection: Section;
  onNavigate: (s: Section) => void;
}

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "objects", label: "Объекты" },
  { id: "map", label: "Карта" },
  { id: "districts", label: "Районы" },
  { id: "contacts", label: "Контакты" },
];

export default function Navigation({ activeSection, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 border border-gold flex items-center justify-center">
            <span className="text-gold text-xs font-mono-ibm">★</span>
          </div>
          <span className="font-oswald text-sm tracking-[0.2em] uppercase text-parchment group-hover:text-gold transition-colors">
            Хроника Войны
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link font-oswald text-xs tracking-[0.15em] uppercase transition-colors ${
                activeSection === item.id
                  ? "text-gold active"
                  : "text-muted-foreground hover:text-parchment"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-muted-foreground hover:text-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`px-6 py-4 text-left font-oswald text-sm tracking-[0.15em] uppercase border-b border-border/50 transition-colors ${
                  activeSection === item.id
                    ? "text-gold bg-secondary/50"
                    : "text-muted-foreground hover:text-parchment hover:bg-secondary/30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}