import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MapPoint {
  id: number;
  name: string;
  type: string;
  era: string;
  year: string;
  address: string;
  lat: number;
  lng: number;
  desc: string;
}

const points: MapPoint[] = [
  {
    id: 1, name: "Диорама «Разгром немецко-фашистских войск под Воронежем»",
    type: "Музей", era: "XX век", year: "1941–1943",
    address: "ул. Степана Разина, 43, Воронеж",
    lat: 51.6822, lng: 39.1817,
    desc: "Крупнейшая диорама Центрального Черноземья. Полотно 42 м изображает бои за освобождение Воронежа в январе 1943 года.",
  },
  {
    id: 2, name: "Чижовский плацдарм",
    type: "Мемориал", era: "XX век", year: "1942–1943",
    address: "Ленинский район, Воронеж",
    lat: 51.6478, lng: 39.2198,
    desc: "212 дней ожесточённых боёв. Советские войска удерживали плацдарм на правом берегу реки Воронеж.",
  },
  {
    id: 3, name: "Памятник Славы",
    type: "Мемориал", era: "XX век", year: "1967",
    address: "ул. Ворошилова, 25, Воронеж",
    lat: 51.7045, lng: 39.1650,
    desc: "Главный мемориал города. 40-метровый обелиск, Вечный огонь, захоронения 10 тысяч воинов.",
  },
  {
    id: 4, name: "Воронежская крепость (место основания)",
    type: "Крепость", era: "XVI–XVII вв.", year: "1586",
    address: "Петровский сквер, Воронеж",
    lat: 51.6631, lng: 39.1986,
    desc: "Место основания Воронежской крепости в 1586 году — первого форпоста Московского государства на юге.",
  },
  {
    id: 5, name: "Петровский корабельный арсенал",
    type: "Крепость", era: "XVII–XVIII вв.", year: "1696",
    address: "Набережная Массалитинова, Воронеж",
    lat: 51.6600, lng: 39.1969,
    desc: "Место строительства первого российского военно-морского флота по указу Петра I для Азовских походов.",
  },
  {
    id: 6, name: "Братская могила на Проспекте Революции",
    type: "Мемориал", era: "XX век", year: "1943",
    address: "Проспект Революции, Воронеж",
    lat: 51.6706, lng: 39.1897,
    desc: "Захоронение советских воинов, павших при освобождении Воронежа 25 января 1943 года.",
  },
  {
    id: 7, name: "Усманский оборонительный вал",
    type: "Укрепление", era: "XVII век", year: "1636",
    address: "Окрестности г. Усмань, Липецкая обл.",
    lat: 51.8633, lng: 39.7369,
    desc: "Часть Белгородской засечной черты. Земляные укрепления защищали южные рубежи Московского государства от кочевников.",
  },
  {
    id: 8, name: "Хренищенская засека",
    type: "Укрепление", era: "XVII век", year: "1640-е",
    address: "Хреновской бор, Бобровский район",
    lat: 51.1261, lng: 40.0781,
    desc: "Южный участок Белгородской черты. Лесные завалы и земляные валы — уникальный памятник фортификации XVII века.",
  },
  {
    id: 9, name: "Музей-заповедник «Костёнки»",
    type: "Музей", era: "Древняя история", year: "45 000 лет до н.э.",
    address: "с. Костёнки, Хохольский район",
    lat: 51.3831, lng: 39.0586,
    desc: "Одно из богатейших мест находок палеолита в мире. Стоянки древних охотников на мамонтов.",
  },
  {
    id: 10, name: "Мемориал «Высота 178,0»",
    type: "Мемориал", era: "XX век", year: "1942",
    address: "Вблизи с. Русская Гвоздёвка, Семилукский район",
    lat: 51.6900, lng: 38.9700,
    desc: "Место ожесточённых боёв за господствующую высоту. Советские воины остановили продвижение немцев к Воронежу.",
  },
  {
    id: 11, name: "Урочище Лощиново (Острогожско-Россошанская операция)",
    type: "Поле сражения", era: "XX век", year: "Январь 1943",
    address: "Вблизи с. Лощиново, Острогожский район",
    lat: 50.8800, lng: 39.0600,
    desc: "Место одной из крупнейших операций ВОВ. Окружена и уничтожена 200-тысячная группировка противника.",
  },
  {
    id: 12, name: "Мемориал в Россоши",
    type: "Мемориал", era: "XX век", year: "1943",
    address: "Площадь Победы, г. Россошь",
    lat: 50.1542, lng: 39.5736,
    desc: "Мемориал воинам, освободившим Россошь. Место расположения штаба итальянского Альпийского корпуса в 1942–1943 гг.",
  },
  {
    id: 13, name: "Мемориал в Кантемировке",
    type: "Мемориал", era: "XX век", year: "1942",
    address: "Площадь Победы, г. Кантемировка",
    lat: 49.7069, lng: 39.8931,
    desc: "Место прорыва 17-го танкового корпуса в декабре 1942 года — будущей Кантемировской гвардейской дивизии.",
  },
];

const typeColors: Record<string, string> = {
  "Крепость": "#C9973A",
  "Поле сражения": "#8B1A1A",
  "Укрепление": "#4A6741",
  "Мемориал": "#5B6FA8",
  "Музей": "#7A5C20",
};

const typeEmoji: Record<string, string> = {
  "Крепость": "🏰",
  "Поле сражения": "⚔️",
  "Укрепление": "🛡️",
  "Мемориал": "🕯️",
  "Музей": "🏛️",
};

function buildYmapsUrl(points: MapPoint[], filter: string): string {
  const visible = filter === "Все" ? points : points.filter((p) => p.type === filter);
  const center = visible.length > 0
    ? `${visible.reduce((s, p) => s + p.lng, 0) / visible.length},${visible.reduce((s, p) => s + p.lat, 0) / visible.length}`
    : "39.2,51.5";

  const ptParam = visible
    .map((p) => `${p.lng},${p.lat},pm2rdm`)
    .join("~");

  return `https://yandex.ru/map-widget/v1/?ll=${center}&z=8&pt=${ptParam}&l=map`;
}

export default function MapPage() {
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [filter, setFilter] = useState("Все");

  const types = ["Все", "Мемориал", "Крепость", "Укрепление", "Поле сражения", "Музей"];
  const visible = filter === "Все" ? points : points.filter((p) => p.type === filter);
  const mapUrl = buildYmapsUrl(points, filter);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Header */}
        <div className="mb-8 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">Интерактивная карта</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment">КАРТА ОБЪЕКТОВ</h1>
          <p className="font-cormorant text-muted-foreground text-lg mt-2">
            {visible.length} объектов на карте · Воронежская область
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => { setFilter(t); setSelected(null); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-oswald tracking-wide uppercase border transition-colors ${
                filter === t
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-parchment"
              }`}
            >
              {t !== "Все" && <span>{typeEmoji[t]}</span>}
              {t}
            </button>
          ))}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-border" style={{ minHeight: "600px" }}>

          {/* Yandex Map iframe */}
          <div className="lg:col-span-3 relative bg-secondary/30">
            <iframe
              key={filter}
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ minHeight: "560px", border: "none", display: "block" }}
              frameBorder="0"
              allowFullScreen
              title="Карта исторических объектов Воронежской области"
            />
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/40 pointer-events-none" />
          </div>

          {/* Sidebar — object list */}
          <div className="border-l border-border bg-background flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
              <p className="font-oswald text-xs tracking-[0.15em] uppercase text-muted-foreground mb-0.5">
                Список объектов
              </p>
              <p className="font-mono-ibm text-xs text-gold">{visible.length} на карте</p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ maxHeight: "520px" }}>
              {visible.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelected(selected?.id === point.id ? null : point)}
                  className={`w-full text-left px-4 py-4 border-b border-border/40 transition-all group ${
                    selected?.id === point.id
                      ? "bg-secondary/50 border-l-2 border-l-gold"
                      : "hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base flex-shrink-0 mt-0.5">{typeEmoji[point.type] || "📍"}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-oswald text-sm leading-tight mb-1 transition-colors ${
                        selected?.id === point.id ? "text-gold" : "text-parchment group-hover:text-gold"
                      }`}>
                        {point.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-ibm text-xs text-gold/60">{point.year}</span>
                        <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                        <span className="font-mono-ibm text-xs text-muted-foreground truncate">{point.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded info */}
                  {selected?.id === point.id && (
                    <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
                      <p className="font-cormorant text-sm text-muted-foreground leading-relaxed mb-3">
                        {point.desc}
                      </p>
                      <div className="flex items-start gap-1.5 mb-3">
                        <Icon name="MapPin" size={11} className="text-gold flex-shrink-0 mt-0.5" />
                        <p className="font-mono-ibm text-xs text-muted-foreground leading-relaxed">{point.address}</p>
                      </div>
                      <a
                        href={`https://yandex.ru/maps/?pt=${point.lng},${point.lat}&z=16&l=map`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono-ibm text-xs text-gold hover:text-parchment transition-colors border border-gold/30 hover:border-gold/60 px-3 py-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon name="ExternalLink" size={10} />
                        Открыть в Яндекс.Картах
                      </a>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-border flex-shrink-0 bg-secondary/10">
              <p className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest mb-3">Типы объектов</p>
              <div className="space-y-1.5">
                {Object.entries(typeColors).map(([t, color]) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="text-sm">{typeEmoji[t]}</span>
                    <span className="font-cormorant text-xs text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="font-mono-ibm text-xs text-muted-foreground/40 text-center mt-4">
          Карта предоставлена Яндекс.Картами · Отметки на карте соответствуют реальным координатам объектов
        </p>
      </div>
    </div>
  );
}
