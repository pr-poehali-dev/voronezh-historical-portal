import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contacts = [
    { icon: "MapPin", label: "Адрес", value: "г. Россошь, пл. Октябрьская, 217" },
    { icon: "Phone", label: "Телефон", value: "+7 (930) 405-XX-XX" },
    { icon: "Mail", label: "Email", value: "alenkab0zhko@yandex.ru" },
    { icon: "Clock", label: "Часы работы", value: "Пн-Пт: 8:00 - 17:00" },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="mb-16 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">Связь</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment">КОНТАКТЫ</h1>
          <p className="font-cormorant text-muted-foreground text-lg mt-2 max-w-xl">
            Есть вопросы, предложения или хотите добавить объект в базу? Напишите нам.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-border">
          {/* Contact info */}
          <div className="lg:col-span-2 bg-background p-10 space-y-8">
            <div>
              <h2 className="font-oswald text-lg tracking-[0.15em] uppercase text-parchment mb-6">
                Реквизиты
              </h2>
              <div className="space-y-6">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={c.icon} size={14} className="text-gold" />
                    </div>
                    <div>
                      <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest block mb-1">
                        {c.label}
                      </span>
                      <p className="font-cormorant text-parchment">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="font-oswald text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Мы в сети
              </h3>
              <div className="flex gap-3">
                {["Youtube", "MessageCircle", "Share2"].map((icon) => (
                  <button
                    key={icon}
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    <Icon name={icon} size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <div className="bg-secondary/30 border border-gold/10 p-5">
                <Icon name="Star" size={16} className="text-gold mb-3" />
                <p className="font-cormorant text-sm text-muted-foreground leading-relaxed italic">
                  «Кто не знает своего прошлого, не имеет будущего»
                </p>
                <span className="font-mono-ibm text-xs text-gold/60 mt-2 block">народная мудрость</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-background p-10">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6">
                  <Icon name="Check" size={28} className="text-gold" />
                </div>
                <h2 className="font-oswald text-2xl text-parchment mb-3 tracking-wide">Сообщение отправлено</h2>
                <p className="font-cormorant text-muted-foreground text-lg max-w-xs">
                  Мы ответим в течение 1-2 рабочих дней
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-8 px-6 py-2 border border-gold/50 text-gold font-oswald text-xs tracking-[0.15em] uppercase hover:bg-gold/10 transition-colors"
                >
                  Новое сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-stagger">
                <h2 className="font-oswald text-lg tracking-[0.15em] uppercase text-parchment">
                  Написать нам
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/20 border border-border text-parchment font-cormorant placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/20 border border-border text-parchment font-cormorant placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                    Тема
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/20 border border-border text-parchment font-cormorant placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Добавление нового объекта"
                  />
                </div>

                <div>
                  <label className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                    Сообщение
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/20 border border-border text-parchment font-cormorant placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    placeholder="Опишите ваш запрос..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-3 px-8 py-3 bg-gold text-background font-oswald text-sm tracking-[0.1em] uppercase hover:bg-parchment transition-colors"
                >
                  <Icon name="Send" size={16} />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}