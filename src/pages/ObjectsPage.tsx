import { useState, useMemo, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface HistoricalObject {
  id: number;
  name: string;
  era: string;
  type: string;
  region: string;
  year: string;
  desc: string;
  address: string;
  mapsUrl: string;
  audioText: string;
  img?: string;
}

const objects: HistoricalObject[] = [
  {
    id: 1,
    name: "Диорама «Разгром немецко-фашистских войск под Воронежем»",
    era: "XX век", type: "Музей", region: "Воронеж", year: "1941–1943",
    address: "г. Воронеж, ул. Степана Разина, 43",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%94%D0%B8%D0%BE%D1%80%D0%B0%D0%BC%D0%B0+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.181667%2C51.680000&z=16",
    audioText: "Диорама «Разгром немецко-фашистских войск под Воронежем» — крупнейшее живописное полотно Центрального Черноземья. Его длина составляет 42 метра, высота — более 6 метров. Художники изобразили переломные бои 24–25 января 1943 года, когда советские войска Воронежского фронта окончательно очистили город от оккупантов. На переднем плане — атакующие советские пехотинцы, горящая немецкая техника и освобождённые улицы Воронежа. Музей открыт в 1985 году к 40-летию Победы.",
    desc: "Крупнейшая диорама Центрального Черноземья, посвящённая воронежскому фронту. Полотно длиной 42 метра изображает решающие бои за освобождение Воронежа в январе 1943 года.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/b396bb7c-b515-4892-afaf-d9eb52a922fd.jpg",
  },
  {
    id: 2,
    name: "Чижовский плацдарм",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1942–1943",
    address: "г. Воронеж, ул. Чижовского плацдарма (Ленинский район)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%A7%D0%B8%D0%B6%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%BB%D0%B0%D1%86%D0%B4%D0%B0%D1%80%D0%BC+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.220000%2C51.650000&z=15",
    audioText: "Чижовский плацдарм — место одного из самых трагических и героических эпизодов обороны Воронежа. С августа 1942 по январь 1943 года, на протяжении 212 дней, советские солдаты удерживали небольшой клочок земли на правом берегу реки Воронеж. Плацдарм несколько раз переходил из рук в руки. Здесь полегло более 15 тысяч бойцов. Сегодня на этом месте расположен мемориальный комплекс с братскими захоронениями и памятными стелами.",
    desc: "Место одних из самых ожесточённых боёв за Воронеж. Советские войска удерживали этот плацдарм на протяжении 212 дней. Сегодня здесь мемориальный комплекс с братскими захоронениями.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg",
  },
  {
    id: 3,
    name: "Памятник Славы в Воронеже",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1967",
    address: "г. Воронеж, ул. Ворошилова, 25 (Северный микрорайон)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9F%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA+%D0%A1%D0%BB%D0%B0%D0%B2%D1%8B+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.165000%2C51.705000&z=15",
    audioText: "Памятник Славы — главный военный мемориал Воронежа. Открыт 25 января 1967 года, в 24-ю годовщину освобождения города. Центром комплекса является 40-метровый обелиск, у подножия которого горит Вечный огонь, зажжённый от огня из Москвы. Здесь похоронены 10 тысяч советских воинов. Имена погибших высечены на гранитных плитах. Ежегодно 9 мая сюда приходят тысячи воронежцев, чтобы отдать дань памяти защитникам города.",
    desc: "Главный мемориал города, установленный в честь воинов, павших при обороне и освобождении Воронежа. Вечный огонь горит у подножия обелиска с 1967 года.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg",
  },
  {
    id: 4,
    name: "Государственный исторический музей-заповедник «Костёнки»",
    era: "Древняя история", type: "Музей", region: "Хохольский район", year: "Ок. 45 000 лет до н.э.",
    address: "Хохольский район, с. Костёнки, ул. Кирова, 6",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9A%D0%BE%D1%81%D1%82%D1%91%D0%BD%D0%BA%D0%B8+%D0%BC%D1%83%D0%B7%D0%B5%D0%B9&ll=39.058611%2C51.383056&z=13",
    audioText: "Костёнки — одно из богатейших в мире мест находок эпохи палеолита. Древние люди жили здесь около 45 тысяч лет назад. В 1879 году при строительстве дороги были найдены первые кости мамонта и каменные орудия. С тех пор на площади в несколько квадратных километров раскопано более 60 стоянок. Находки из Костёнок хранятся в Эрмитаже, Историческом музее Москвы и музеях по всему миру. В здании музея прямо над раскопом — законсервированное жилище древнего человека, построенное из костей мамонта.",
    desc: "Одна из важнейших стоянок человека эпохи верхнего палеолита. Найденные здесь артефакты и орудия — свидетельства жизни древних охотников на мамонтов.",
  },
  {
    id: 5,
    name: "Острогожско-Россошанская операция. Урочище Лощиново",
    era: "XX век", type: "Поле сражения", region: "Острогожский район", year: "Январь 1943",
    address: "Острогожский район, вблизи с. Лощиново",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9B%D0%BE%D1%89%D0%B8%D0%BD%D0%BE%D0%B2%D0%BE+%D0%9E%D1%81%D1%82%D1%80%D0%BE%D0%B3%D0%BE%D0%B6%D1%81%D0%BA%D0%B8%D0%B9+%D1%80%D0%B0%D0%B9%D0%BE%D0%BD&ll=39.060000%2C50.880000&z=11",
    audioText: "Острогожско-Россошанская операция, проводившаяся с 12 по 27 января 1943 года, стала одной из крупнейших побед советского оружия на южном крыле советско-германского фронта. Войска Воронежского фронта под командованием генерала Голикова за 15 дней окружили и уничтожили около 200 тысяч солдат противника — венгерской 2-й армии, итальянского Альпийского корпуса и немецких соединений. Результатом операции стал разгром группы армий «Б» и освобождение огромной территории.",
    desc: "Место проведения одной из крупнейших наступательных операций Великой Отечественной войны. В ходе операции была окружена и уничтожена 200-тысячная группировка войск противника.",
  },
  {
    id: 6,
    name: "Бронепоезд «Воронежский железнодорожник»",
    era: "XX век", type: "Воинская часть", region: "Воронеж", year: "1942",
    address: "г. Воронеж (место формирования — локомотивное депо Воронеж-1)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%B8%D0%B9+%D0%B6%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B8%D0%BA+%D0%B1%D1%80%D0%BE%D0%BD%D0%B5%D0%BF%D0%BE%D0%B5%D0%B7%D0%B4&ll=39.243333%2C51.671667&z=14",
    audioText: "В 1942 году воронежские железнодорожники в короткие сроки построили и вооружили бронепоезд, получивший имя «Воронежский железнодорожник». Он был оснащён артиллерийскими орудиями и пулемётами, и использовался для поддержки обороны города вдоль железнодорожных путей. Бронепоезд участвовал в боях за воронежский железнодорожный узел — стратегически важный объект, за который шли ожесточённые бои. В 1942 году в ходе немецкого наступления бронепоезд был уничтожен.",
    desc: "Легендарный бронепоезд, сформированный воронежскими железнодорожниками в 1942 году. Участвовал в обороне города и железнодорожного узла.",
  },
  {
    id: 7,
    name: "Усманский оборонительный вал",
    era: "XVII век", type: "Укрепление", region: "Усманский район", year: "1636",
    address: "Усманский район, окрестности г. Усмань",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%A3%D1%81%D0%BC%D0%B0%D0%BD%D1%8C+%D0%BE%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D0%B2%D0%B0%D0%BB&ll=39.736944%2C51.863333&z=12",
    audioText: "Усманский оборонительный вал — часть грандиозного оборонительного рубежа XVII века, известного как Белгородская засечная черта. Строительство системы началось в 1635 году при царе Михаиле Фёдоровиче. Черта протянулась более чем на 800 километров от Ахтырки до Тамбова. Она включала земляные валы, рвы, деревянные остроги и лесные завалы — засеки. Воронежский участок черты надёжно защищал воронежские земли от набегов крымских и ногайских татар более ста лет.",
    desc: "Земляные укрепления Белгородской засечной черты, защищавшей южные рубежи Московского государства от набегов кочевников. Сохранившийся фрагмент исторической линии обороны.",
  },
  {
    id: 8,
    name: "Воронежская крепость (место основания)",
    era: "XVI–XVII вв.", type: "Крепость", region: "Воронеж", year: "1586",
    address: "г. Воронеж, Петровский сквер (историческое место)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9+%D1%81%D0%BA%D0%B2%D0%B5%D1%80+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.198611%2C51.663056&z=16",
    audioText: "В 1586 году по указу царя Фёдора Иоанновича на высоком правом берегу реки Воронеж была заложена деревянная крепость. Она стала форпостом Московского государства на южных рубежах — для защиты от набегов крымских татар и ногайцев. Крепость занимала площадь около 2 гектаров и была окружена деревянными стенами с башнями. Гарнизон насчитывал несколько сотен стрельцов и казаков. В 1590 году крепость выдержала набег татарского войска — это был первый боевой экзамен молодого города.",
    desc: "Место, где в 1586 году была заложена Воронежская крепость — форпост Московского государства. Отсюда берёт начало история города Воронежа.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/6980446a-bcb9-4da9-ba67-6b1feb348162.jpg",
  },
  {
    id: 9,
    name: "Мемориал «Высота 178,0»",
    era: "XX век", type: "Мемориал", region: "Семилукский район", year: "1942",
    address: "Семилукский район, вблизи с. Русская Гвоздёвка",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%92%D1%8B%D1%81%D0%BE%D1%82%D0%B0+178+%D0%A1%D0%B5%D0%BC%D0%B8%D0%BB%D1%83%D0%BA%D0%B8&ll=38.970000%2C51.690000&z=12",
    audioText: "Высота 178,0 — господствующая над местностью точка в Семилукском районе. Летом 1942 года, когда немецкие войска рвались к Воронежу с запада, эта высота стала ключевым опорным пунктом обороны. Советские бойцы несколько раз отбивали атаки превосходящих сил противника. Удержание высоты позволило выиграть время для укрепления рубежей на подступах к городу. Сегодня здесь установлен мемориальный знак с именами павших защитников.",
    desc: "Мемориальный комплекс на месте ожесточённых боёв за господствующую высоту. В 1942 году советские воины остановили здесь продвижение немецких войск к Воронежу.",
  },
  {
    id: 10,
    name: "Петровский корабельный арсенал (Адмиралтейство)",
    era: "XVII–XVIII вв.", type: "Крепость", region: "Воронеж", year: "1696",
    address: "г. Воронеж, набережная Массалитинова (исторический район Адмиралтейской площади)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%90%D0%B4%D0%BC%D0%B8%D1%80%D0%B0%D0%BB%D1%82%D0%B5%D0%B9%D1%81%D0%BA%D0%B0%D1%8F+%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.196944%2C51.660000&z=15",
    audioText: "В 1696 году Пётр I избрал Воронеж местом строительства первого российского военного флота для похода на турецкую крепость Азов. На берегу реки были возведены верфи, склады и Адмиралтейство. За несколько лет здесь построили более 200 кораблей, галер и вспомогательных судов. Флот, рождённый в Воронеже, обеспечил взятие Азова в 1696 году и выход России к Чёрному морю. Сам Пётр I провёл в Воронеже в общей сложности несколько лет, лично руководя строительством.",
    desc: "Место строительства первого российского военно-морского флота по указу Петра I. В Воронеже в 1696–1711 годах были построены корабли для Азовских походов.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg",
  },
  {
    id: 11,
    name: "Братская могила на Проспекте Революции",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1943",
    address: "г. Воронеж, Проспект Революции (у Кольцовского сквера)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%91%D1%80%D0%B0%D1%82%D1%81%D0%BA%D0%B0%D1%8F+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B0+%D0%9F%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82+%D0%A0%D0%B5%D0%B2%D0%BE%D0%BB%D1%8E%D1%86%D0%B8%D0%B8+%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&ll=39.189722%2C51.670556&z=16",
    audioText: "В центре освобождённого Воронежа, на главной улице города — Проспекте Революции — похоронены советские воины, погибшие при освобождении города 25 января 1943 года. Братская могила стала одним из первых мемориалов, появившихся в городе сразу после изгнания оккупантов. Здесь покоятся офицеры и солдаты, чьи имена удалось установить, и безымянные герои. Мемориал является местом проведения городских торжеств 9 мая.",
    desc: "Братское захоронение советских воинов, павших при освобождении Воронежа 25 января 1943 года. Один из центральных мемориалов города.",
  },
  {
    id: 12,
    name: "Хренищенская засека",
    era: "XVII век", type: "Укрепление", region: "Бобровский район", year: "1640-е",
    address: "Бобровский район, Хреновской бор (окрестности с. Хреново)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%A5%D1%80%D0%B5%D0%BD%D0%BE%D0%B2%D0%BE%D0%B9+%D0%B1%D0%BE%D1%80+%D0%91%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9+%D1%80%D0%B0%D0%B9%D0%BE%D0%BD&ll=40.078056%2C51.126111&z=11",
    audioText: "Хренищенская засека — южный участок Белгородской оборонительной черты на территории нынешнего Бобровского района. Засека представляла собой широкую полосу специально поваленных деревьев с заострёнными ветвями — непреодолимое препятствие для конного войска. Вдоль засеки были устроены земляные валы и сторожевые вышки. В Хреновском бору сохранились фрагменты этой уникальной системы обороны XVII века, которую по масштабу замысла можно сравнить с китайской стеной.",
    desc: "Фрагмент Белгородской черты — системы оборонительных сооружений XVII века на юге Воронежской области. Засека защищала воронежские земли от набегов кочевников.",
  },
  {
    id: 13,
    name: "Мемориал воинам Острогожско-Россошанской операции",
    era: "XX век", type: "Мемориал", region: "Россошанский район", year: "1943",
    address: "г. Россошь, ул. Победы, 1 (площадь Победы)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C+%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B+%D0%A0%D0%BE%D1%81%D1%81%D0%BE%D1%88%D1%8C&ll=39.573611%2C50.154167&z=14",
    audioText: "Россошь в годы Великой Отечественной войны была оккупирована немецкими и итальянскими войсками с июля 1942 по январь 1943 года. Именно здесь располагался штаб итальянского Альпийского корпуса. В январе 1943 года в ходе Острогожско-Россошанской операции город был освобождён. Мемориал на площади Победы включает братские захоронения советских воинов и памятный знак. Ежегодно сюда приходят тысячи жителей района, чтобы почтить память павших освободителей.",
    desc: "Мемориальный комплекс в г. Россошь, посвящённый воинам, освободившим город в январе 1943 года в ходе Острогожско-Россошанской операции.",
    img: "https://cdn.poehali.dev/projects/7f5707bb-d00c-4e46-a06f-57d76191a81b/files/49352788-0eea-46a1-b9dd-39c358a512e1.jpg",
  },
  {
    id: 14,
    name: "Место расположения штаба итальянского Альпийского корпуса",
    era: "XX век", type: "Поле сражения", region: "Россошанский район", year: "1942–1943",
    address: "г. Россошь, ул. Октябрьская (исторический центр)",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%A0%D0%BE%D1%81%D1%81%D0%BE%D1%88%D1%8C+%D0%B8%D1%82%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D1%88%D1%82%D0%B0%D0%B1&ll=39.573611%2C50.154167&z=15",
    audioText: "Россошь в 1942–1943 годах стала местом сосредоточения итальянских войск — союзника нацистской Германии. Здесь располагался штаб Альпийского корпуса — элитного горнострелкового соединения итальянской армии. Итальянцы оккупировали Россошь и Россошанский район почти на полгода. В январе 1943 года в ходе советского контрнаступления Альпийский корпус был окружён и разгромлен. Из 60 тысяч итальянских солдат, воевавших на Дону, домой вернулись лишь около 10 тысяч. Это событие до сих пор является частью национальной памяти Италии.",
    desc: "В 1942–1943 гг. в Россоши располагался штаб итальянского Альпийского корпуса. В январе 1943 года в ходе советского контрнаступления корпус был окружён и разгромлен.",
  },
  {
    id: 15,
    name: "Братские захоронения советских воинов в Кантемировке",
    era: "XX век", type: "Мемориал", region: "Россошанский район", year: "1942–1943",
    address: "Россошанский район, г. Кантемировка, площадь Победы",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?text=%D0%9A%D0%B0%D0%BD%D1%82%D0%B5%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0+%D0%BC%D0%B5%D0%BC%D0%BE%D1%80%D0%B8%D0%B0%D0%BB&ll=39.893056%2C49.706944&z=13",
    audioText: "Кантемировка — небольшой город на юге Воронежской области, прославившийся в годы Великой Отечественной войны. Именно здесь в декабре 1942 года советский 17-й танковый корпус разгромил крупные силы противника. В честь этой победы корпус был переименован в Кантемировский и впоследствии стал гвардейской дивизией. Ныне Кантемировская дивизия — одно из самых известных бронетанковых соединений российской армии. В городе установлен мемориал с танком — символом победы.",
    desc: "Мемориал в Кантемировке — месте знаменитого прорыва советского 17-го танкового корпуса в декабре 1942 года, который дал название прославленной Кантемировской дивизии.",
  },
];

const eras = ["Все эпохи", "Древняя история", "XVI–XVII вв.", "XVII–XVIII вв.", "XVII век", "XX век"];
const types = ["Все типы", "Мемориал", "Музей", "Крепость", "Укрепление", "Поле сражения", "Воинская часть"];
const regions = ["Все районы", "Воронеж", "Хохольский район", "Острогожский район", "Усманский район", "Семилукский район", "Бобровский район", "Россошанский район"];

function AudioGuide({ text, name }: { text: string; name: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalChars = text.length;

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang.startsWith("ru"));
    if (ruVoice) utterance.voice = ruVoice;

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setProgress(0);

    const duration = (text.length / 15) * 1000;
    const step = 100;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += step;
      setProgress(Math.min((elapsed / duration) * 100, 99));
      if (elapsed >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, step);
  };

  return (
    <div className="mt-6 border border-gold/20 bg-gold/5 p-4">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={handlePlay}
          className={`w-10 h-10 flex items-center justify-center border transition-colors ${
            isPlaying
              ? "border-gold bg-gold text-background"
              : "border-gold/50 text-gold hover:bg-gold/10"
          }`}
        >
          <Icon name={isPlaying ? "Square" : "Play"} size={16} />
        </button>
        <div className="flex-1">
          <p className="font-mono-ibm text-xs text-gold uppercase tracking-widest mb-1">Аудиогид</p>
          <p className="font-cormorant text-xs text-muted-foreground line-clamp-1">{name}</p>
        </div>
      </div>
      {isPlaying && (
        <div className="w-full h-0.5 bg-border">
          <div
            className="h-full bg-gold transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {!isPlaying && (
        <p className="font-cormorant text-xs text-muted-foreground/60 italic">
          Нажмите ▶ для прослушивания голосового описания объекта
        </p>
      )}
    </div>
  );
}

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

  const handleSelectObject = (obj: HistoricalObject) => {
    window.speechSynthesis.cancel();
    setSelected(obj);
  };

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
            <FilterGroup label="Район" options={regions} value={region} onChange={setRegion} />
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
                onClick={() => handleSelectObject(obj)}
              >
                {obj.img ? (
                  <div className="h-48 overflow-hidden">
                    <img src={obj.img} alt={obj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                  <h3 className="font-oswald text-lg text-parchment group-hover:text-gold transition-colors mb-2 tracking-wide">{obj.name}</h3>
                  <p className="font-cormorant text-muted-foreground text-sm line-clamp-2 mb-4">{obj.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="MapPin" size={12} />
                      <span className="font-mono-ibm text-xs">{obj.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Headphones" size={12} className="text-gold/50" />
                      <span className="font-mono-ibm text-xs text-gold">{obj.year}</span>
                    </div>
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
          onClick={() => { window.speechSynthesis.cancel(); setSelected(null); }}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.img && (
              <div className="h-56 overflow-hidden">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold font-mono-ibm text-xs">{selected.era}</span>
                    <span className="text-muted-foreground font-mono-ibm text-xs">{selected.type}</span>
                  </div>
                  <h2 className="font-oswald text-2xl text-parchment tracking-wide leading-tight">{selected.name}</h2>
                </div>
                <button onClick={() => { window.speechSynthesis.cancel(); setSelected(null); }} className="text-muted-foreground hover:text-gold transition-colors ml-4 flex-shrink-0">
                  <Icon name="X" size={20} />
                </button>
              </div>

              <p className="font-cormorant text-lg text-foreground leading-relaxed mb-6">{selected.desc}</p>

              {/* Address + Map link */}
              <div className="flex items-start gap-3 mb-6 p-4 border border-border bg-secondary/20">
                <Icon name="MapPin" size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-cormorant text-parchment text-sm">{selected.address}</p>
                  <a
                    href={selected.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 font-mono-ibm text-xs text-gold hover:text-parchment transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="ExternalLink" size={11} />
                    Открыть на Яндекс.Картах
                  </a>
                </div>
              </div>

              {/* Audio guide */}
              <AudioGuide text={selected.audioText} name={selected.name} />

              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-border">
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground tracking-widest uppercase">Год события</span>
                  <p className="font-oswald text-2xl text-gold mt-1">{selected.year}</p>
                </div>
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground tracking-widest uppercase">Район</span>
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
