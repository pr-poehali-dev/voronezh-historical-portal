import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Photo {
  id: number;
  title: string;
  era: string;
  category: string;
  img: string;
  desc: string;
}

const photos: Photo[] = [
  { id: 1, title: "Оборонительные рубежи", era: "XX век", category: "Фронт", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg", desc: "Крепостные стены и башни, выдержавшие многолетние осады" },
  { id: 2, title: "Монумент Победы", era: "XX век", category: "Мемориалы", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg", desc: "Вечный огонь у мемориала павшим героям" },
  { id: 3, title: "Музейная экспозиция", era: "XX век", category: "Музеи", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/b396bb7c-b515-4892-afaf-d9eb52a922fd.jpg", desc: "Экспонаты военного времени в музейных витринах" },
  { id: 4, title: "Крепостные бастионы", era: "XVIII век", category: "Архитектура", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg", desc: "Мощные каменные укрепления петровской эпохи" },
  { id: 5, title: "Поле боя. Рассвет", era: "XIX век", category: "Фронт", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg", desc: "Место сражения на рассвете нового дня" },
  { id: 6, title: "Военные реликвии", era: "XX век", category: "Музеи", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/b396bb7c-b515-4892-afaf-d9eb52a922fd.jpg", desc: "Предметы военного быта и снаряжения" },
];

const categories = ["Все", "Фронт", "Мемориалы", "Музеи", "Архитектура"];

export default function GalleryPage() {
  const [category, setCategory] = useState("Все");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = category === "Все" ? photos : photos.filter((p) => p.category === category);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">Архив</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment">ГАЛЕРЕЯ</h1>
          <p className="font-cormorant text-muted-foreground text-lg mt-2">Визуальная летопись военной истории</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 text-xs font-oswald tracking-wide uppercase border transition-colors ${
                category === c
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-parchment"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-px space-y-px animate-stagger">
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className="break-inside-avoid bg-border group cursor-pointer relative overflow-hidden"
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.img}
                alt={photo.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 3 === 0 ? "h-64" : i % 3 === 1 ? "h-48" : "h-72"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-mono-ibm text-xs text-gold mb-1 block">{photo.category} · {photo.era}</span>
                <h3 className="font-oswald text-base text-parchment tracking-wide">{photo.title}</h3>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-background/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Expand" size={14} className="text-gold" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-mono-ibm text-xs text-muted-foreground/40 mt-8 mb-12">
          {filtered.length} из {photos.length} фотографий
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-muted-foreground hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={24} />
          </button>

          <div
            className="max-w-4xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.img}
              alt={lightbox.title}
              className="w-full max-h-[70vh] object-cover"
            />
            <div className="bg-card border border-border p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono-ibm text-xs text-gold">{lightbox.category}</span>
                  <div className="w-px h-3 bg-border" />
                  <span className="font-mono-ibm text-xs text-muted-foreground">{lightbox.era}</span>
                </div>
                <h2 className="font-oswald text-2xl text-parchment tracking-wide mb-2">{lightbox.title}</h2>
                <p className="font-cormorant text-muted-foreground">{lightbox.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
