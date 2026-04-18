import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

interface HistoricalObject {
  id: number;
  name: string;
  era: string;
  type: string;
  region: string;
  year: string;
  desc: string;
  img?: string;
}

const objects: HistoricalObject[] = [
  { id: 1, name: "Диорама «Разгром немецко-фашистских войск под Воронежем»", era: "XX век", type: "Музей", region: "Воронеж", year: "1941–1943", desc: "Крупнейшая диорама Центрального Черноземья, посвящённая воронежскому фронту. Полотно длиной 42 метра изображает решающие бои за освобождение Воронежа в январе 1943 года.", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/b396bb7c-b515-4892-afaf-d9eb52a922fd.jpg" },
  { id: 2, name: "Чижовский плацдарм", era: "XX век", type: "Мемориал", region: "Воронеж", year: "1942–1943", desc: "Место одних из самых ожесточённых боёв за Воронеж. Советские войска удерживали этот плацдарм на правом берегу реки Воронеж на протяжении 212 дней. Сегодня здесь мемориальный комплекс с братскими захоронениями.", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg" },
  { id: 3, name: "Памятник Славы в Воронеже", era: "XX век", type: "Мемориал", region: "Воронеж", year: "1967", desc: "Главный мемориал города, установленный в честь воинов, павших при обороне и освобождении Воронежа. Вечный огонь горит у подножия обелиска с 1967 года.", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg" },
  { id: 4, name: "Государственный исторический музей-заповедник «Костёнки»", era: "Древняя история", type: "Музей", region: "Хохольский район", year: "Ок. 45 000 лет до н.э.", desc: "Одна из важнейших стоянок человека эпохи верхнего палеолита. Найденные здесь артефакты, оружие и украшения — свидетельства жизни древних охотников на мамонтов на воронежской земле." },
  { id: 5, name: "Острогожско-Россошанская операция. Урочище Лощиново", era: "XX век", type: "Поле сражения", region: "Острогожский район", year: "Январь 1943", desc: "Место проведения одной из крупнейших наступательных операций Великой Отечественной войны. В ходе операции была окружена и уничтожена 200-тысячная группировка немецко-фашистских войск и их союзников." },
  { id: 6, name: "Бронепоезд «Воронежский железнодорожник»", era: "XX век", type: "Воинская часть", region: "Воронеж", year: "1942", desc: "Легендарный бронепоезд, сформированный воронежскими железнодорожниками в годы Великой Отечественной войны. Участвовал в обороне города и был уничтожен в боях 1942 года." },
  { id: 7, name: "Усманский оборонительный вал", era: "XVII век", type: "Укрепление", region: "Усманский район", year: "1636", desc: "Земляные укрепления Белгородской засечной черты, защищавшей южные рубежи Московского государства от набегов крымских татар и ногайцев. Один из сохранившихся фрагментов исторической линии обороны." },
  { id: 8, name: "Воронежская крепость (место основания)", era: "XVI–XVII вв.", type: "Крепость", region: "Воронеж", year: "1586", desc: "Место, где в 1586 году была заложена Воронежская крепость — форпост Московского государства для защиты от кочевников. Отсюда начался город Воронеж.", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg" },
  { id: 9, name: "Мемориал «Высота 178,0»", era: "XX век", type: "Мемориал", region: "Семилукский район", year: "1942", desc: "Мемориальный комплекс на месте ожесточённых боёв за господствующую высоту в Семилукском районе. Здесь в 1942 году советские воины остановили продвижение немецких войск к Воронежу с запада." },
  { id: 10, name: "Петровский корабельный арсенал (Адмиралтейство)", era: "XVII–XVIII вв.", type: "Крепость", region: "Воронеж", year: "1696", desc: "Место строительства первого российского военно-морского флота по указу Петра I. Именно в Воронеже в 1696–1711 годах были построены корабли, обеспечившие победу в Азовских походах.", img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg" },
  { id: 11, name: "Братская могила на Проспекте Революции", era: "XX век", type: "Мемориал", region: "Воронеж", year: "1943", desc: "Место захоронения советских воинов, павших при освобождении Воронежа 25 января 1943 года. Один из центральных мемориалов города-героя." },
  { id: 12, name: "Хренищенская засека", era: "XVII век", type: "Укрепление", region: "Бобровский район", year: "1640-е", desc: "Фрагмент Белгородской черты — системы оборонительных сооружений XVII века. Засека состояла из лесных завалов, земляных валов и острогов, защищавших воронежские земли." },
];

const eras = ["Все эпохи", "Древняя история", "XVI–XVII вв.", "XVII–XVIII вв.", "XVII век", "XX век"];
const types = ["Все типы", "Мемориал", "Музей", "Крепость", "Укрепление", "Поле сражения", "Воинская часть"];
const regions = ["Все районы", "Воронеж", "Хохольский район", "Острогожский район", "Усманский район", "Семилукский район", "Бобровский район"];

export default function ObjectsPage() {
  const [era, setEra] = useState("Все эпохи");
  const [type, setType] = useState("Все типы");
  const [region, setRegion] = useState("Все районы");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<HistoricalObject | null>(null);

  const filtered = useMemo(() => {
    return objects.filter((o) => {
      const matchEra = era === "Все эпохи" || o.era === era;
      const matchType = type === "Все типы" || o.type === type;
      const matchRegion = region === "Все районы" || o.region === region;
      const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.desc.toLowerCase().includes(search.toLowerCase());
      return matchEra && matchType && matchRegion && matchSearch;
    });
  }, [era, type, region, search]);

  const FilterGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2">
      <span className="font-mono-ibm text-xs text-muted-foreground tracking-[0.2em] uppercase">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 text-xs font-oswald tracking-wide uppercase border transition-colors ${
              value === opt
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/50 hover:text-parchment"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">База данных</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment mb-2">ИСТОРИЧЕСКИЕ ОБЪЕКТЫ</h1>
          <p className="font-cormorant text-muted-foreground text-lg">
            {filtered.length} {filtered.length === 1 ? "объект найден" : filtered.length < 5 ? "объекта найдено" : "объектов найдено"}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 p-6 border border-border bg-secondary/20 space-y-6 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background border border-border text-parchment font-cormorant text-base placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterGroup label="Эпоха" options={eras} value={era} onChange={setEra} />
            <FilterGroup label="Тип" options={types} value={type} onChange={setType} />
            <FilterGroup label="Регион" options={regions} value={region} onChange={setRegion} />
          </div>

          {(era !== "Все эпохи" || type !== "Все типы" || region !== "Все районы" || search) && (
            <button
              onClick={() => { setEra("Все эпохи"); setType("Все типы"); setRegion("Все районы"); setSearch(""); }}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold font-mono-ibm tracking-wide transition-colors"
            >
              <Icon name="X" size={12} /> Сбросить фильтры
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-oswald text-lg tracking-wide">Объекты не найдены</p>
            <p className="font-cormorant text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border animate-stagger">
            {filtered.map((obj) => (
              <div
                key={obj.id}
                className="bg-background group cursor-pointer card-hover"
                onClick={() => setSelected(obj)}
              >
                {obj.img ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={obj.img}
                      alt={obj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-secondary/50 flex items-center justify-center">
                    <Icon name="Castle" size={40} className="text-border" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold font-mono-ibm text-xs">{obj.era}</span>
                    <span className="text-muted-foreground font-mono-ibm text-xs">{obj.type}</span>
                  </div>
                  <h3 className="font-oswald text-lg text-parchment group-hover:text-gold transition-colors mb-2 tracking-wide">
                    {obj.name}
                  </h3>
                  <p className="font-cormorant text-muted-foreground text-sm line-clamp-2 mb-4">{obj.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="MapPin" size={12} />
                      <span className="font-mono-ibm text-xs">{obj.region}</span>
                    </div>
                    <span className="font-mono-ibm text-xs text-gold">{obj.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.img && (
              <div className="h-64 overflow-hidden">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold font-mono-ibm text-xs">{selected.era}</span>
                    <span className="text-muted-foreground font-mono-ibm text-xs">{selected.type}</span>
                  </div>
                  <h2 className="font-oswald text-3xl text-parchment tracking-wide">{selected.name}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-gold transition-colors ml-4"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <p className="font-cormorant text-lg text-foreground leading-relaxed mb-6">{selected.desc}</p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground tracking-widest uppercase">Год события</span>
                  <p className="font-oswald text-2xl text-gold mt-1">{selected.year}</p>
                </div>
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground tracking-widest uppercase">Регион</span>
                  <p className="font-oswald text-lg text-parchment mt-1">{selected.region}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}