import { Section } from "@/App";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (s: Section) => void;
}

const stats = [
  { value: "24", label: "Объекта в базе данных" },
  { value: "XIII", label: "Районов области охвачено" },
  { value: "212", label: "Дней обороны Воронежа" },
  { value: "XVI–XX", label: "Веков военной истории" },
];

const features = [
  { icon: "Castle", title: "Укреплённые объекты", desc: "Крепости, форты, земляные валы и оборонительные рубежи от XVI до XX века", action: "objects" },
  { icon: "Map", title: "Интерактивная карта", desc: "Реальные координаты всех объектов на карте Яндекса с подробными описаниями", action: "map" },
  { icon: "Headphones", title: "Аудиогиды", desc: "Голосовые рассказы о каждом объекте — слушайте историю в собственном темпе", action: "objects" },
  { icon: "BookOpen", title: "История районов", desc: "Военно-историческое описание каждого района Воронежской области", action: "districts" },
];

const timeline = [
  { year: "1586", event: "Основание Воронежской крепости", desc: "Форпост Московского государства на южных рубежах" },
  { year: "1696", event: "Рождение русского флота", desc: "Пётр I строит первый военный флот России на воронежских верфях" },
  { year: "1709", event: "Полтавская победа", desc: "Воронежские полки участвуют в разгроме армии Карла XII" },
  { year: "1812", event: "Отечественная война", desc: "Воронежская губерния — база снабжения армии Кутузова" },
  { year: "1942", event: "Воронежское сражение", desc: "Линия фронта делит город пополам на 212 дней" },
  { year: "1943", event: "Освобождение", desc: "25 января — советские войска полностью очищают Воронеж от оккупантов" },
];

const districts = [
  { name: "Воронеж", count: 6, icon: "Building2" },
  { name: "Россошанский", count: 3, icon: "Flag" },
  { name: "Острогожский", count: 2, icon: "Swords" },
  { name: "Борисоглебский", count: 2, icon: "Plane" },
  { name: "Павловский", count: 2, icon: "Ship" },
  { name: "Лискинский", count: 2, icon: "Train" },
];

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="pt-16">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[94vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-transparent" />
        <div className="absolute top-24 left-6 right-6 bottom-0 border border-gold/10 pointer-events-none hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-stagger">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">
                Воронежская область · Военно-исторический портал
              </span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-6 text-parchment">
              ХРОНИКА<br /><span className="text-gold">ВОЙНЫ</span>
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Сохраняем память о военной истории Воронежской области — от крепостей XVI века до мемориалов Великой Отечественной. Каждый объект — свидетель эпохи.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate("objects")}
                className="flex items-center gap-2 px-8 py-3 bg-gold text-background font-oswald text-sm tracking-[0.1em] uppercase hover:bg-parchment transition-colors">
                <Icon name="Search" size={16} /> Исследовать объекты
              </button>
              <button onClick={() => onNavigate("map")}
                className="flex items-center gap-2 px-8 py-3 border border-gold/50 text-parchment font-oswald text-sm tracking-[0.1em] uppercase hover:border-gold hover:text-gold transition-colors">
                <Icon name="Map" size={16} /> Открыть карту
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 opacity-30 hidden md:flex flex-col items-center gap-2">
          <span className="font-mono-ibm text-xs tracking-[0.2em] text-gold" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border animate-stagger">
            {stats.map((s) => (
              <div key={s.label} className="py-10 px-8 text-center">
                <div className="font-oswald text-3xl md:text-4xl text-gold mb-2">{s.value}</div>
                <div className="font-cormorant text-sm text-muted-foreground tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-oswald text-xs tracking-[0.4em] uppercase text-muted-foreground">Возможности портала</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border animate-stagger">
          {features.map((f) => (
            <button key={f.title} onClick={() => onNavigate(f.action as Section)}
              className="bg-background p-8 text-left group hover:bg-secondary/40 transition-colors">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                <Icon name={f.icon} size={18} className="text-gold" />
              </div>
              <h3 className="font-oswald text-base tracking-wide text-parchment mb-3 group-hover:text-gold transition-colors">{f.title}</h3>
              <p className="font-cormorant text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px flex-1 bg-border" />
            <h2 className="font-oswald text-xs tracking-[0.4em] uppercase text-muted-foreground">Хронология событий</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-0 md:space-y-0">
              {timeline.map((t, i) => (
                <div key={t.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 py-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <p className="font-mono-ibm text-xs text-gold tracking-widest mb-1">{t.year}</p>
                    <h3 className="font-oswald text-lg text-parchment tracking-wide mb-1">{t.event}</h3>
                    <p className="font-cormorant text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gold bg-background items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                  {/* Empty side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <button onClick={() => onNavigate("objects")}
              className="inline-flex items-center gap-2 font-oswald text-xs tracking-[0.2em] uppercase text-gold hover:text-parchment transition-colors">
              Все объекты в базе данных <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED OBJECT ── */}
      <section className="py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-72 md:h-[420px] overflow-hidden"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg')`,
              backgroundSize: "cover", backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/5" />
            <div className="relative z-10 h-full flex items-center px-10 md:px-16">
              <div>
                <p className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase mb-4">Объект месяца</p>
                <h3 className="font-oswald text-3xl md:text-5xl text-parchment mb-3 leading-tight">
                  ЧИЖОВСКИЙ<br />ПЛАЦДАРМ<br />
                  <span className="text-gold">212 дней обороны</span>
                </h3>
                <p className="font-cormorant text-muted-foreground text-lg mb-6 max-w-sm hidden md:block">
                  Место одного из самых трагических эпизодов борьбы за Воронеж. 1942–1943 гг.
                </p>
                <button onClick={() => onNavigate("objects")}
                  className="flex items-center gap-2 text-gold font-oswald text-xs tracking-[0.2em] uppercase hover:gap-4 transition-all">
                  Читать подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTRICTS PREVIEW ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase mb-2">География портала</p>
            <h2 className="font-oswald text-2xl md:text-3xl text-parchment">РАЙОНЫ ВОРОНЕЖСКОЙ ОБЛАСТИ</h2>
          </div>
          <button onClick={() => onNavigate("districts")}
            className="hidden md:flex items-center gap-2 font-oswald text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors">
            Все районы <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border animate-stagger">
          {districts.map((d) => (
            <button key={d.name} onClick={() => onNavigate("districts")}
              className="bg-background p-6 text-center group hover:bg-secondary/40 transition-colors">
              <div className="w-10 h-10 border border-border group-hover:border-gold/50 flex items-center justify-center mx-auto mb-3 transition-colors">
                <Icon name={d.icon} size={18} className="text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
              <p className="font-oswald text-xs tracking-wide text-parchment group-hover:text-gold transition-colors leading-tight mb-1">{d.name}</p>
              <p className="font-mono-ibm text-xs text-gold/60">{d.count} объ.</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── ABOUT / CTA ── */}
      <section className="border-t border-border bg-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold" />
                <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">О проекте</span>
              </div>
              <h2 className="font-oswald text-3xl md:text-4xl text-parchment mb-6 leading-tight">
                ХРОНИКА ВОЙНЫ —<br />ЖИВАЯ ПАМЯТЬ ОБЛАСТИ
              </h2>
              <p className="font-cormorant text-lg text-muted-foreground leading-relaxed mb-6">
                Проект создан для систематизации и популяризации военно-исторического наследия Воронежской области. Мы собираем данные об исторических объектах, готовим аудиогиды, публикуем архивные материалы.
              </p>
              <p className="font-cormorant text-lg text-muted-foreground leading-relaxed mb-8">
                Если вы знаете о забытом мемориале, неизвестном укреплении или хотите поделиться семейными архивами — напишите нам. Каждый вклад важен.
              </p>
              <button onClick={() => onNavigate("contacts")}
                className="flex items-center gap-2 px-8 py-3 border border-gold/50 text-parchment font-oswald text-sm tracking-[0.1em] uppercase hover:border-gold hover:text-gold transition-colors">
                <Icon name="Mail" size={16} /> Связаться с нами
              </button>
            </div>
            <div className="space-y-4">
              {[
                { icon: "Database", title: "24 объекта в базе данных", desc: "И постоянно пополняется новыми находками" },
                { icon: "MapPin", title: "13 районов области", desc: "Полный охват воронежского региона" },
                { icon: "Headphones", title: "Аудиогиды к каждому объекту", desc: "Голосовые рассказы на основе исторических источников" },
                { icon: "Map", title: "Реальные координаты на карте", desc: "Интеграция с Яндекс.Картами для каждого объекта" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 border border-border hover:border-gold/30 transition-colors">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-oswald text-sm text-parchment tracking-wide">{item.title}</p>
                    <p className="font-cormorant text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 border border-gold flex items-center justify-center">
                  <span className="text-gold text-xs">★</span>
                </div>
                <span className="font-oswald text-sm tracking-[0.2em] uppercase text-parchment">Хроника Войны</span>
              </div>
              <p className="font-cormorant text-sm text-muted-foreground leading-relaxed max-w-xs">
                Военно-исторический портал Воронежской области. Сохраняем память о боевом прошлом воронежской земли для будущих поколений.
              </p>
            </div>
            <div>
              <p className="font-oswald text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Разделы</p>
              <div className="space-y-2">
                {[
                  { label: "Объекты", id: "objects" },
                  { label: "Карта", id: "map" },
                  { label: "Галерея", id: "gallery" },
                  { label: "Районы", id: "districts" },
                ].map((l) => (
                  <button key={l.id} onClick={() => onNavigate(l.id as Section)}
                    className="block font-cormorant text-sm text-muted-foreground hover:text-gold transition-colors">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-oswald text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Контакты</p>
              <div className="space-y-2">
                <p className="font-cormorant text-sm text-muted-foreground">info@khronika-voiny.ru</p>
                <p className="font-cormorant text-sm text-muted-foreground">г. Воронеж</p>
                <button onClick={() => onNavigate("contacts")}
                  className="flex items-center gap-1.5 font-mono-ibm text-xs text-gold hover:text-parchment transition-colors mt-3">
                  Написать нам <Icon name="ArrowRight" size={11} />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono-ibm text-xs text-muted-foreground/50">© 2024 Хроника Войны. Все права защищены.</p>
            <p className="font-cormorant text-xs text-muted-foreground/40 italic">«Никто не забыт, ничто не забыто»</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
