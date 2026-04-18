import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MapPoint {
  id: number;
  name: string;
  type: string;
  era: string;
  x: number;
  y: number;
  year: string;
}

const points: MapPoint[] = [
  { id: 1, name: "Диорама «Разгром немецко-фашистских войск под Воронежем»", type: "Музей", era: "XX век", x: 48, y: 34, year: "1941–1943" },
  { id: 2, name: "Чижовский плацдарм", type: "Мемориал", era: "XX век", x: 50, y: 40, year: "1942–1943" },
  { id: 3, name: "Памятник Славы", type: "Мемориал", era: "XX век", x: 46, y: 38, year: "1967" },
  { id: 4, name: "Воронежская крепость (место основания)", type: "Крепость", era: "XVI–XVII вв.", x: 47, y: 35, year: "1586" },
  { id: 5, name: "Петровский корабельный арсенал", type: "Крепость", era: "XVII–XVIII вв.", x: 49, y: 36, year: "1696" },
  { id: 6, name: "Братская могила на Проспекте Революции", type: "Мемориал", era: "XX век", x: 47, y: 37, year: "1943" },
  { id: 7, name: "Усманский оборонительный вал", type: "Укрепление", era: "XVII век", x: 38, y: 22, year: "1636" },
  { id: 8, name: "Хренищенская засека", type: "Укрепление", era: "XVII век", x: 55, y: 62, year: "1640-е" },
  { id: 9, name: "Костёнки — стоянка древнего человека", type: "Музей", era: "Древняя история", x: 44, y: 48, year: "45 000 лет до н.э." },
  { id: 10, name: "Мемориал «Высота 178,0»", type: "Мемориал", era: "XX век", x: 40, y: 36, year: "1942" },
  { id: 11, name: "Острогожско-Россошанская операция", type: "Поле сражения", era: "XX век", x: 42, y: 72, year: "Январь 1943" },
];

const typeColors: Record<string, string> = {
  "Крепость": "#C9973A",
  "Поле сражения": "#8B1A1A",
  "Укрепление": "#4A6741",
  "Мемориал": "#5B6FA8",
  "Музей": "#7A6020",
};

export default function MapPage() {
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");

  const types = ["Все", "Мемориал", "Крепость", "Укрепление", "Поле сражения", "Музей"];

  const visiblePoints = filter === "Все" ? points : points.filter((p) => p.type === filter);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">Интерактивная карта</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment">КАРТА ОБЪЕКТОВ</h1>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 text-xs font-oswald tracking-wide uppercase border transition-colors ${
                filter === t
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-border">
          {/* Map area */}
          <div className="lg:col-span-3 relative bg-secondary/20 overflow-hidden" style={{ minHeight: "560px" }}>
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9973A" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized map silhouette of Russia */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="font-oswald text-[20rem] text-gold leading-none select-none">ВО</span>
            </div>

            {/* Border decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />

            {/* Legend */}
            <div className="absolute bottom-6 left-6 space-y-2">
              {Object.entries(typeColors).map(([t, color]) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: color, backgroundColor: `${color}33` }} />
                  <span className="font-mono-ibm text-xs" style={{ color }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Points */}
            {visiblePoints.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelected(selected?.id === point.id ? null : point)}
                onMouseEnter={() => setHovered(point.id)}
                onMouseLeave={() => setHovered(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                {/* Pulse ring */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: typeColors[point.type] || "#C9973A" }}
                />
                {/* Dot */}
                <div
                  className="relative w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-150"
                  style={{
                    borderColor: typeColors[point.type] || "#C9973A",
                    backgroundColor: `${typeColors[point.type] || "#C9973A"}44`,
                    transform: selected?.id === point.id ? "scale(1.5)" : undefined,
                  }}
                />
                {/* Tooltip */}
                {(hovered === point.id || selected?.id === point.id) && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 pointer-events-none">
                    <div className="bg-background border border-gold/30 px-3 py-1.5 text-xs font-oswald text-parchment tracking-wide">
                      {point.name}
                      <div className="text-gold font-mono-ibm text-xs">{point.year}</div>
                    </div>
                    <div className="w-px h-3 bg-gold mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Sidebar */}
          <div className="border-l border-border bg-background">
            <div className="p-5 border-b border-border">
              <h3 className="font-oswald text-sm tracking-[0.15em] uppercase text-muted-foreground">
                {selected ? "Объект" : "Выберите точку"}
              </h3>
            </div>

            {selected ? (
              <div className="p-5 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[selected.type] || "#C9973A" }} />
                  <span className="font-mono-ibm text-xs text-muted-foreground">{selected.type}</span>
                </div>
                <h2 className="font-oswald text-xl text-parchment mb-2 leading-tight">{selected.name}</h2>
                <div className="text-gold font-mono-ibm text-2xl mb-4">{selected.year}</div>
                <div className="space-y-3 pt-4 border-t border-border">
                  <div>
                    <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest">Эпоха</span>
                    <p className="font-cormorant text-parchment mt-1">{selected.era}</p>
                  </div>
                  <div>
                    <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest">Тип</span>
                    <p className="font-cormorant text-parchment mt-1">{selected.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full py-2 border border-border text-muted-foreground hover:border-gold hover:text-gold font-oswald text-xs tracking-wide uppercase transition-colors"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="p-5 space-y-2 scrollbar-thin overflow-y-auto" style={{ maxHeight: "480px" }}>
                {visiblePoints.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => setSelected(point)}
                    className="w-full text-left p-3 border border-border/50 hover:border-gold/30 hover:bg-secondary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColors[point.type] || "#C9973A" }} />
                      <span className="font-mono-ibm text-xs text-gold">{point.year}</span>
                    </div>
                    <p className="font-oswald text-sm text-parchment group-hover:text-gold transition-colors">{point.name}</p>
                    <p className="font-mono-ibm text-xs text-muted-foreground mt-0.5">{point.type}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center font-mono-ibm text-xs text-muted-foreground/40 mt-4">
          Схематичное расположение объектов. Координаты условные.
        </p>
      </div>
    </div>
  );
}