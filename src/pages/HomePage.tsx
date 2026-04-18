import { Section } from "@/App";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (s: Section) => void;
}

const stats = [
  { value: "1 200+", label: "Исторических объектов" },
  { value: "XVIII–XX", label: "Века охвата" },
  { value: "47", label: "Регионов России" },
  { value: "3 800+", label: "Архивных фотографий" },
];

const features = [
  {
    icon: "Castle",
    title: "Укреплённые объекты",
    desc: "Крепости, форты, доты и оборонительные рубежи на интерактивной карте",
  },
  {
    icon: "Sword",
    title: "Поля сражений",
    desc: "Детальные сведения о ключевых битвах с хронологией и схемами",
  },
  {
    icon: "BookOpen",
    title: "Архивные материалы",
    desc: "Документы, карты и фотографии из военных архивов",
  },
  {
    icon: "Users",
    title: "Мемориалы",
    desc: "Памятники и места увековечения памяти павших воинов",
  },
];

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Декоративная рамка */}
        <div className="absolute top-24 left-6 right-6 bottom-0 border border-gold/10 pointer-events-none hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-stagger">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">
                Военно-исторический портал
              </span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-6 text-parchment">
              ХРОНИКА
              <br />
              <span className="text-gold">ВОЙНЫ</span>
            </h1>

            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Сохраняем память о военной истории России. Каждый объект — свидетель эпохи, каждый факт — часть нашего наследия.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("objects")}
                className="flex items-center gap-2 px-8 py-3 bg-gold text-background font-oswald text-sm tracking-[0.1em] uppercase hover:bg-parchment transition-colors"
              >
                <Icon name="Search" size={16} />
                Исследовать объекты
              </button>
              <button
                onClick={() => onNavigate("map")}
                className="flex items-center gap-2 px-8 py-3 border border-gold/50 text-parchment font-oswald text-sm tracking-[0.1em] uppercase hover:border-gold hover:text-gold transition-colors"
              >
                <Icon name="Map" size={16} />
                Открыть карту
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono-ibm text-xs tracking-[0.2em] text-gold rotate-90 mb-4">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border animate-stagger">
            {stats.map((s) => (
              <div key={s.value} className="py-10 px-8 text-center">
                <div className="font-oswald text-3xl md:text-4xl text-gold mb-2">{s.value}</div>
                <div className="font-cormorant text-sm text-muted-foreground tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-oswald text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Что вы найдёте
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border animate-stagger">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-background p-8 group hover:bg-secondary/40 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                <Icon name={f.icon} size={18} className="text-gold" />
              </div>
              <h3 className="font-oswald text-base tracking-wide text-parchment mb-3 group-hover:text-gold transition-colors">
                {f.title}
              </h3>
              <p className="font-cormorant text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured image band */}
      <section className="py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative h-64 md:h-96 overflow-hidden"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/10" />
            <div className="relative z-10 h-full flex items-center px-12">
              <div>
                <p className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase mb-4">
                  Объект месяца
                </p>
                <h3 className="font-oswald text-3xl md:text-5xl text-parchment mb-4 leading-tight">
                  КУРСКАЯ ДУГА
                  <br />
                  <span className="text-gold">1943 год</span>
                </h3>
                <button
                  onClick={() => onNavigate("objects")}
                  className="flex items-center gap-2 text-gold font-oswald text-xs tracking-[0.2em] uppercase hover:gap-4 transition-all"
                >
                  Подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-gold/50 flex items-center justify-center">
              <span className="text-gold text-xs">★</span>
            </div>
            <span className="font-oswald text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Хроника Войны © 2024
            </span>
          </div>
          <p className="font-cormorant text-xs text-muted-foreground/60 text-center">
            Сохраняем историческую память для будущих поколений
          </p>
        </div>
      </footer>
    </div>
  );
}