import { useState, useMemo, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// Реальные фотографии с Wikimedia Commons (CC лицензия)
const IMG = {
  // Аллея Славы, мемориал Воронеж (реальное фото)
  memorial:   "https://upload.wikimedia.org/wikipedia/commons/0/00/023._Voronezh._Victory_Square._Alley_of_Glory.jpg",
  // Танк Т-34 у диорамы, Воронеж (реальное фото)
  tank:       "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tank_T-34_at_the_memorial_complex_%22Voronezh_-_City_of_Military_Glory%22_next_to_the_Diorama_Museum_in_Patriot_Park.jpg",
  // Музей-заповедник Костёнки (реальное фото)
  museum:     "https://upload.wikimedia.org/wikipedia/commons/2/20/DSC_0205_Kostenki_Museum.jpg",
  // Пейзаж Воронежской области, с. Русаново (реальное фото)
  landscape:  "https://upload.wikimedia.org/wikipedia/commons/0/0a/7506.5._Landscape_near_the_village_of_Rusanovo.jpg",
  // Пейзаж Воронежской области, с. Алфёровка (реальное фото)
  steppe:     "https://upload.wikimedia.org/wikipedia/commons/b/b7/7494.2._Landscape_near_the_village_of_Alfyorovka.jpg",
  // Панорама реки Воронеж (реальное фото)
  river:      "https://upload.wikimedia.org/wikipedia/commons/d/d9/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0_%D1%80%D0%B5%D0%BA%D0%B8_%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6_%D1%81_%D0%BC%D0%BE%D1%81%D1%82%D0%B0_%D0%B2_%D0%A0%D0%B0%D0%BC%D0%BE%D0%BD%D0%B8.jpg",
};

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
  img: string;
}

const objects: HistoricalObject[] = [
  // ВОРОНЕЖ
  {
    id: 1, name: "Диорама «Разгром немецко-фашистских войск под Воронежем»",
    era: "XX век", type: "Музей", region: "Воронеж", year: "1941-1943",
    address: "г. Воронеж, ул. Степана Разина, 43",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.181667%2C51.680000&z=16",
    audioText: "Диорама является крупнейшим живописным полотном Центрального Черноземья. Длина полотна 42 метра, высота более 6 метров. Художники изобразили бои 24 и 25 января 1943 года, когда войска Воронежского фронта окончательно очистили город от оккупантов. Музей открыт в 1985 году к 40-летию Победы.",
    desc: "Крупнейшая диорама Центрального Черноземья. Полотно длиной 42 метра изображает бои за освобождение Воронежа в январе 1943 года.",
    img: IMG.tank,
  },
  {
    id: 2, name: "Чижовский плацдарм",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1942-1943",
    address: "г. Воронеж, Ленинский район, набережная р. Воронеж",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.220000%2C51.650000&z=15",
    audioText: "Чижовский плацдарм является местом одного из самых трагических эпизодов обороны Воронежа. 212 дней советские бойцы удерживали правый берег реки. Здесь погибло около 15 тысяч человек. Сегодня на этом месте мемориал с братскими захоронениями.",
    desc: "212 дней ожесточённых боёв на правом берегу реки Воронеж. Мемориальный комплекс с братскими захоронениями.",
    img: IMG.memorial,
  },
  {
    id: 3, name: "Памятник Славы",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1967",
    address: "г. Воронеж, ул. Ворошилова, 25",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.165000%2C51.705000&z=15",
    audioText: "Памятник Славы является главным военным мемориалом Воронежа. Открыт 25 января 1967 года, в 24-ю годовщину освобождения города. Центром комплекса является 40-метровый обелиск, у подножия которого горит Вечный огонь. Здесь захоронены около 10 тысяч советских воинов.",
    desc: "Главный военный мемориал Воронежа. 40-метровый обелиск с Вечным огнём, открыт в 1967 году. Захоронено около 10 тысяч воинов.",
    img: IMG.memorial,
  },
  {
    id: 4, name: "Воронежская крепость (место основания)",
    era: "XVI-XVII вв.", type: "Крепость", region: "Воронеж", year: "1586",
    address: "г. Воронеж, Петровский сквер",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.198611%2C51.663056&z=16",
    audioText: "В 1586 году по указу царя Фёдора Иоанновича на берегу реки Воронеж была заложена деревянная крепость. Форпост защищал Московское государство от набегов крымских татар. В 1590 году крепость выдержала первый крупный татарский набег.",
    desc: "Место основания Воронежской крепости в 1586 году, первого форпоста Московского государства на южных рубежах.",
    img: IMG.river,
  },
  {
    id: 5, name: "Петровский корабельный арсенал (Адмиралтейство)",
    era: "XVII-XVIII вв.", type: "Крепость", region: "Воронеж", year: "1696",
    address: "г. Воронеж, набережная Массалитинова",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.196944%2C51.660000&z=15",
    audioText: "В 1696 году Пётр I избрал Воронеж местом строительства первого русского военного флота. За несколько лет здесь было построено более 200 кораблей, галер и вспомогательных судов для Азовских походов. Сам царь провёл в Воронеже в общей сложности около трёх лет, лично руководя строительством.",
    desc: "Место рождения первого русского военно-морского флота. По указу Петра I здесь построено более 200 кораблей для Азовских походов 1696-1699 годов.",
    img: IMG.river,
  },
  {
    id: 6, name: "Братская могила на Проспекте Революции",
    era: "XX век", type: "Мемориал", region: "Воронеж", year: "1943",
    address: "г. Воронеж, Проспект Революции, у Кольцовского сквера",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.189722%2C51.670556&z=16",
    audioText: "На главной улице освобождённого Воронежа захоронены советские воины, погибшие при освобождении города 25 января 1943 года. Один из первых мемориалов, появившихся в городе сразу после изгнания оккупантов. Место проведения городских торжеств 9 мая.",
    desc: "Братское захоронение на главной улице города. Воины, павшие при освобождении Воронежа 25 января 1943 года.",
    img: IMG.memorial,
  },
  // ХОХОЛЬСКИЙ РАЙОН
  {
    id: 7, name: "Государственный музей-заповедник «Костёнки»",
    era: "Древняя история", type: "Музей", region: "Хохольский район", year: "ок. 45 000 лет до н.э.",
    address: "Хохольский р-н, с. Костёнки, ул. Кирова, 6а",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.058611%2C51.383056&z=13",
    audioText: "Костёнки являются одним из богатейших в мире мест находок эпохи верхнего палеолита. Древние люди жили здесь около 45 тысяч лет назад. На площади нескольких квадратных километров раскопано более 60 стоянок. В здании музея прямо над раскопом законсервировано жилище древнего человека, построенное из костей мамонта.",
    desc: "Один из крупнейших в мире центров палеолита. Более 60 стоянок древних охотников. В музее сохранено жилище из костей мамонта прямо над раскопом.",
    img: IMG.museum,
  },
  // ОСТРОГОЖСКИЙ РАЙОН
  {
    id: 8, name: "Поле сражений Острогожско-Россошанской операции",
    era: "XX век", type: "Поле сражения", region: "Острогожский район", year: "12-27 января 1943",
    address: "Острогожский р-н, вблизи г. Острогожск",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.060000%2C50.880000&z=11",
    audioText: "Острогожско-Россошанская операция проходила с 12 по 27 января 1943 года. Войска Воронежского фронта под командованием генерала Голикова за 15 дней окружили и уничтожили около 200 тысяч солдат противника: венгерской 2-й армии, итальянского Альпийского корпуса и немецких соединений. Результатом стал разгром группы армий «Б» и освобождение огромной территории.",
    desc: "Место одной из крупнейших операций Великой Отечественной. За 15 дней войска Воронежского фронта окружили около 200 тысяч солдат противника.",
    img: IMG.landscape,
  },
  {
    id: 9, name: "Острогожский историко-художественный музей",
    era: "XX век", type: "Музей", region: "Острогожский район", year: "1918",
    address: "г. Острогожск, ул. Ленина, 25",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.074167%2C50.862500&z=14",
    audioText: "Острогожский историко-художественный музей основан в 1918 году и является одним из старейших в Воронежской области. Собрание включает экспонаты периода оккупации 1942 и 1943 годов, документы и личные вещи участников Острогожско-Россошанской операции, образцы трофейного вооружения.",
    desc: "Один из старейших музеев Воронежской области, основан в 1918 году. Коллекция периода оккупации и Острогожско-Россошанской операции 1943 года.",
    img: IMG.museum,
  },
  // УСМАНСКИЙ РАЙОН
  {
    id: 10, name: "Усманский оборонительный вал",
    era: "XVII век", type: "Укрепление", region: "Усманский район", year: "1636",
    address: "Усманский р-н, окрестности г. Усмань",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.736944%2C51.863333&z=12",
    audioText: "Усманский вал является частью Белгородской засечной черты — оборонительного рубежа XVII века общей протяжённостью более 800 километров. Строительство черты велось с 1635 года при царе Михаиле Фёдоровиче. Земляные валы, рвы, остроги и засеки надёжно защищали воронежские земли от набегов крымских татар более ста лет.",
    desc: "Часть Белгородской засечной черты, оборонительного рубежа XVII века протяжённостью более 800 км против крымских татар.",
    img: IMG.steppe,
  },
  // СЕМИЛУКСКИЙ РАЙОН
  {
    id: 11, name: "Мемориал «Высота 178,0»",
    era: "XX век", type: "Мемориал", region: "Семилукский район", year: "1942",
    address: "Семилукский р-н, вблизи с. Русская Гвоздёвка",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=38.970000%2C51.690000&z=12",
    audioText: "Высота 178,0 стала ключевым опорным пунктом обороны летом 1942 года, когда немецкие войска рвались к Воронежу с запада. Советские бойцы несколько раз отбивали атаки превосходящих сил противника, что дало время для укрепления обороны города. Сегодня здесь мемориальный знак с именами павших защитников.",
    desc: "Ключевая высота в боях за Воронеж летом 1942 года. Советские воины несколько раз отбивали атаки немецких войск, продвигавшихся с запада.",
    img: IMG.landscape,
  },
  // БОБРОВСКИЙ РАЙОН
  {
    id: 12, name: "Хренищенская засека",
    era: "XVII век", type: "Укрепление", region: "Бобровский район", year: "1640-е",
    address: "Бобровский р-н, Хреновской бор, окрестности с. Хреново",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=40.078056%2C51.126111&z=11",
    audioText: "Хренищенская засека является южным участком Белгородской черты. Засека представляла собой широкую полосу специально поваленных деревьев с заострёнными ветвями, непреодолимое препятствие для конного войска. В Хреновском бору сохранились фрагменты этой уникальной системы обороны XVII века.",
    desc: "Южный участок Белгородской засечной черты XVII века. В Хреновском бору частично сохранились фрагменты древних укреплений.",
    img: IMG.steppe,
  },
  // РОССОШАНСКИЙ РАЙОН
  {
    id: 13, name: "Мемориал освободителям Россоши",
    era: "XX век", type: "Мемориал", region: "Россошанский район", year: "1943",
    address: "г. Россошь, пл. Победы, 1",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.573611%2C50.154167&z=14",
    audioText: "Россошь была оккупирована с июля 1942 по январь 1943 года. Здесь располагался штаб итальянского Альпийского корпуса численностью около 60 тысяч человек. В ходе Острогожско-Россошанской операции в январе 1943 года советские войска разгромили корпус. Из всего состава корпуса домой вернулось около 10 тысяч солдат. Память об этой трагедии жива в Италии по сей день.",
    desc: "Место штаба итальянского Альпийского корпуса в 1942-1943 годах. После разгрома из 60 тысяч итальянских солдат домой вернулось около 10 тысяч.",
    img: IMG.memorial,
  },
  {
    id: 14, name: "Мемориал Кантемировской дивизии",
    era: "XX век", type: "Мемориал", region: "Россошанский район", year: "1942",
    address: "г. Кантемировка, пл. Победы",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.893056%2C49.706944&z=13",
    audioText: "В декабре 1942 года советский 17-й танковый корпус прорвал оборону противника под Кантемировкой и был переименован в Кантемировский. Сегодня Кантемировская дивизия является одним из наиболее прославленных бронетанковых соединений России. В городе установлен танк Т-34 на постаменте.",
    desc: "Место рождения прославленной Кантемировской танковой дивизии. Прорыв декабря 1942 года. Монумент — танк Т-34.",
    img: IMG.tank,
  },
  // ПАВЛОВСКИЙ РАЙОН
  {
    id: 15, name: "Павловская крепость (место основания)",
    era: "XVIII век", type: "Крепость", region: "Павловский район", year: "1709",
    address: "г. Павловск, исторический центр",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=40.103056%2C50.455278&z=13",
    audioText: "Павловск основан в 1709 году по указу Петра I как крепость и верфь на реке Дон. Город назван в честь апостола Павла. Здесь строили корабли для Азовской флотилии. Крепость защищала южные рубежи страны и контролировала стратегически важный донской торговый путь.",
    desc: "Крепость-верфь, основанная Петром I в 1709 году на Дону. Строились корабли Азовской флотилии.",
    img: IMG.river,
  },
  {
    id: 16, name: "Братские захоронения в Павловске",
    era: "XX век", type: "Мемориал", region: "Павловский район", year: "1942-1943",
    address: "г. Павловск, ул. Революции, 40",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=40.103056%2C50.455278&z=14",
    audioText: "В декабре 1942 и январе 1943 года Павловский район стал ареной боёв в ходе Острогожско-Россошанской операции. Советские войска прорвали оборону противника и освободили правый берег Дона. В братских захоронениях Павловска покоятся тысячи воинов.",
    desc: "Захоронения воинов, павших в ходе Острогожско-Россошанской операции зимой 1942-1943 годов в боях за правый берег Дона.",
    img: IMG.memorial,
  },
  // ЛИСКИНСКИЙ РАЙОН
  {
    id: 17, name: "Мемориал у Костомаровского плацдарма",
    era: "XX век", type: "Мемориал", region: "Лискинский район", year: "1942",
    address: "Лискинский р-н, вблизи с. Костомарово",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.516667%2C50.983333&z=12",
    audioText: "Костомаровский плацдарм являлся одним из ключевых оборонительных рубежей на Дону в 1942 году. Советские войска удерживали позиции на правом берегу реки, сковывая крупные силы противника. Рядом находится Костомаровский Спасский монастырь, который служил убежищем для мирных жителей в годы оккупации.",
    desc: "Оборонительный плацдарм на Дону, 1942 год. Рядом — Костомаровский Спасский монастырь, служивший убежищем в годы оккупации.",
    img: IMG.landscape,
  },
  {
    id: 18, name: "Мемориальный комплекс в г. Лиски",
    era: "XX век", type: "Мемориал", region: "Лискинский район", year: "1943",
    address: "г. Лиски, ул. Свободы, 1",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.516944%2C51.004167&z=13",
    audioText: "Лиски являлись крупным железнодорожным узлом, имевшим стратегическое значение в годы Великой Отечественной войны: через него осуществлялось снабжение советских войск на воронежском направлении. В 1942 году узел неоднократно подвергался авиационным ударам. Мемориальный комплекс включает Вечный огонь и памятные плиты с именами погибших жителей.",
    desc: "Стратегический железнодорожный узел, за который шли бои в 1942-1943 годах. Мемориал хранит память о погибших жителях и воинах-железнодорожниках.",
    img: IMG.memorial,
  },
  // КАЛАЧЕЕВСКИЙ РАЙОН
  {
    id: 19, name: "Обелиск воинской Славы в Калаче",
    era: "XX век", type: "Мемориал", region: "Калачеевский район", year: "1942-1943",
    address: "г. Калач, пл. Победы",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=41.007500%2C50.422778&z=13",
    audioText: "В ходе Острогожско-Россошанской операции в январе 1943 года советские войска освободили Калачеевский район. Сотни солдат и офицеров погибли в боях за каждый населённый пункт. Обелиск воинской Славы в Калаче был возведён в память об освободителях.",
    desc: "Памятник воинам, освободившим Калач в ходе зимнего наступления 1943 года на юге Воронежской области.",
    img: IMG.memorial,
  },
  {
    id: 20, name: "Урочище «Татарский вал»",
    era: "XVII век", type: "Укрепление", region: "Калачеевский район", year: "1640-е",
    address: "Калачеевский р-н, вблизи с. Новомеловатка",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=41.100000%2C50.350000&z=11",
    audioText: "Татарский вал является ещё одним участком Белгородской засечной черты на юге Воронежской области. Земляной вал протяжённостью несколько километров до сих пор хорошо сохранился в степи. Это уникальный памятник военно-инженерного искусства XVII века, доступный для самостоятельного посещения.",
    desc: "Хорошо сохранившийся участок Белгородской засечной черты. Земляной вал XVII века в степи, доступен для посещения.",
    img: IMG.steppe,
  },
  // БОРИСОГЛЕБСКИЙ РАЙОН
  {
    id: 21, name: "Мемориал лётчикам Борисоглебского авиаучилища",
    era: "XX век", type: "Мемориал", region: "Борисоглебский район", year: "1923-1945",
    address: "г. Борисоглебск, ул. Свободы, 1",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=42.077778%2C51.371111&z=13",
    audioText: "Борисоглебское высшее военное авиационное училище лётчиков является одним из старейших в России. Основано в 1923 году. Среди выпускников — Валерий Чкалов, совершивший в 1937 году беспосадочный перелёт из СССР в США через Северный полюс. В годы Великой Отечественной войны выпускники сражались на всех фронтах.",
    desc: "Мемориал одного из старейших авиаучилищ России. Среди выпускников — Герой Советского Союза Валерий Чкалов.",
    img: IMG.memorial,
  },
  {
    id: 22, name: "Самолёт-памятник у Борисоглебского авиаучилища",
    era: "XX век", type: "Воинская часть", region: "Борисоглебский район", year: "1923",
    address: "г. Борисоглебск, территория БВВАУЛ им. Чкалова",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=42.077778%2C51.371111&z=14",
    audioText: "Самолёт на постаменте у входа в Борисоглебское авиационное училище имени Чкалова является символом преемственности военной авиации России. Здесь с 1923 года прошли подготовку тысячи военных лётчиков. Борисоглебск называют авиационной столицей Воронежской области.",
    desc: "Самолёт-памятник у Борисоглебского авиаучилища им. Чкалова. С 1923 года здесь готовили лётчиков для Вооружённых сил России.",
    img: IMG.tank,
  },
  // НИЖНЕДЕВИЦКИЙ РАЙОН
  {
    id: 23, name: "Белгородская черта в Нижнедевицком районе",
    era: "XVII век", type: "Укрепление", region: "Нижнедевицкий район", year: "1635",
    address: "Нижнедевицкий р-н, вблизи пгт Нижнедевицк",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=38.550000%2C51.550000&z=11",
    audioText: "Нижнедевицкий участок Белгородской засечной черты является одним из наиболее изученных фрагментов этой оборонительной системы XVII века. Вдоль исторического тракта сохранились остатки земляных укреплений. Местные краеведы задокументировали расположение древних острогов и сторожевых вышек.",
    desc: "Один из хорошо изученных участков Белгородской черты XVII века. Сохранились остатки острогов и земляных укреплений.",
    img: IMG.steppe,
  },
  // ПОДГОРЕНСКИЙ РАЙОН
  {
    id: 24, name: "Плацдарм на Дону в районе Подгоренского",
    era: "XX век", type: "Поле сражения", region: "Подгоренский район", year: "1942",
    address: "Подгоренский р-н, берег р. Дон, близ пгт Подгоренский",
    mapsUrl: "https://yandex.ru/maps/193/voronezh/?ll=39.133333%2C50.133333&z=11",
    audioText: "В 1942 году берег Дона в Подгоренском районе стал рубежом обороны советских войск. Части Красной армии сдерживали натиск противника вдоль реки, не давая форсировать Дон на широком фронте. В сохранившихся в степи окопах и остатках укреплений до сих пор ощущается дыхание войны.",
    desc: "Рубеж обороны на Дону, 1942 год. Советские части удерживали берег реки. В степи сохранились остатки окопов и укреплений.",
    img: IMG.landscape,
  },
];

const eras = ["Все эпохи", "Древняя история", "XVI-XVII вв.", "XVII-XVIII вв.", "XVII век", "XVIII век", "XX век"];
const types = ["Все типы", "Мемориал", "Музей", "Крепость", "Укрепление", "Поле сражения", "Воинская часть"];
const regions = [
  "Все районы", "Воронеж", "Хохольский район", "Острогожский район",
  "Усманский район", "Семилукский район", "Бобровский район",
  "Россошанский район", "Павловский район", "Лискинский район",
  "Калачеевский район", "Борисоглебский район", "Нижнедевицкий район", "Подгоренский район",
];

// ── AUDIO GUIDE ──
function AudioGuide({ text, name }: { text: string; name: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false); setProgress(0); return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU"; utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang.startsWith("ru"));
    if (ruVoice) utterance.voice = ruVoice;
    utterance.onend = () => { setIsPlaying(false); setProgress(0); if (intervalRef.current) clearInterval(intervalRef.current); };
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true); setProgress(0);
    const duration = (text.length / 15) * 1000;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / duration) * 100, 99));
      if (elapsed >= duration && intervalRef.current) clearInterval(intervalRef.current);
    }, 100);
  };

  return (
    <div className="mt-5 border border-gold/20 bg-gold/5 p-4">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={handlePlay}
          className={`w-9 h-9 flex items-center justify-center border transition-colors flex-shrink-0 ${isPlaying ? "border-gold bg-gold text-background" : "border-gold/50 text-gold hover:bg-gold/10"}`}>
          <Icon name={isPlaying ? "Square" : "Play"} size={14} />
        </button>
        <div>
          <p className="font-mono-ibm text-xs text-gold uppercase tracking-widest">Аудиогид</p>
          <p className="font-cormorant text-xs text-muted-foreground">{isPlaying ? "Воспроизводится..." : "Нажмите ▶ для прослушивания"}</p>
        </div>
      </div>
      <div className="w-full h-0.5 bg-border">
        <div className="h-full bg-gold transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function ObjectsPage() {
  const [era, setEra] = useState("Все эпохи");
  const [type, setType] = useState("Все типы");
  const [region, setRegion] = useState("Все районы");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<HistoricalObject | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return objects.filter((o) => {
      const matchEra = era === "Все эпохи" || o.era === era;
      const matchType = type === "Все типы" || o.type === type;
      const matchRegion = region === "Все районы" || o.region === region;
      const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.desc.toLowerCase().includes(search.toLowerCase()) || o.region.toLowerCase().includes(search.toLowerCase());
      return matchEra && matchType && matchRegion && matchSearch;
    });
  }, [era, type, region, search]);

  const handleSelect = (obj: HistoricalObject) => {
    window.speechSynthesis.cancel();
    setSelected(obj);
  };
  const handleClose = () => {
    window.speechSynthesis.cancel();
    setSelected(null);
  };

  const FilterGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2">
      <span className="font-mono-ibm text-xs text-muted-foreground tracking-[0.2em] uppercase">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button key={opt} onClick={() => onChange(opt)}
            className={`px-2.5 py-1 text-xs font-oswald tracking-wide uppercase border transition-colors ${value === opt ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/50 hover:text-parchment"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const hasFilters = era !== "Все эпохи" || type !== "Все типы" || region !== "Все районы" || search;

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <div className="mb-10 animate-stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-mono-ibm text-xs text-gold tracking-[0.3em] uppercase">База данных · {objects.length} объектов</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-parchment mb-2">ИСТОРИЧЕСКИЕ ОБЪЕКТЫ</h1>
          <p className="font-cormorant text-muted-foreground text-lg">
            Найдено: <span className="text-gold">{filtered.length}</span> из {objects.length} объектов
            {region !== "Все районы" && <span className="ml-2 text-parchment">· {region}</span>}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 border border-border bg-secondary/20 space-y-5 animate-fade-in">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Поиск по названию, описанию, району..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background border border-border text-parchment font-cormorant text-base placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FilterGroup label="Эпоха" options={eras} value={era} onChange={setEra} />
            <FilterGroup label="Тип объекта" options={types} value={type} onChange={setType} />
            <FilterGroup label="Район" options={regions} value={region} onChange={setRegion} />
          </div>
          <div className="flex items-center justify-between">
            {hasFilters ? (
              <button onClick={() => { setEra("Все эпохи"); setType("Все типы"); setRegion("Все районы"); setSearch(""); }}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold font-mono-ibm tracking-wide transition-colors">
                <Icon name="X" size={12} /> Сбросить фильтры
              </button>
            ) : <div />}
            <div className="flex items-center gap-1 border border-border p-0.5">
              <button onClick={() => setView("grid")} className={`px-3 py-1 transition-colors ${view === "grid" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-parchment"}`}>
                <Icon name="LayoutGrid" size={14} />
              </button>
              <button onClick={() => setView("list")} className={`px-3 py-1 transition-colors ${view === "list" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-parchment"}`}>
                <Icon name="List" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-oswald text-lg tracking-wide">Объекты не найдены</p>
            <p className="font-cormorant text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border animate-stagger">
            {filtered.map((obj) => (
              <div key={obj.id} className="bg-background group cursor-pointer card-hover" onClick={() => handleSelect(obj)}>
                <div className="h-52 overflow-hidden relative">
                  <img src={obj.img} alt={obj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-background/80 backdrop-blur-sm border border-gold/30 text-gold font-mono-ibm text-xs">{obj.type}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Icon name="Headphones" size={14} className="text-gold/70" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono-ibm text-xs text-gold/70">{obj.era}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="font-mono-ibm text-xs text-gold">{obj.year}</span>
                  </div>
                  <h3 className="font-oswald text-base text-parchment group-hover:text-gold transition-colors mb-2 tracking-wide leading-tight">{obj.name}</h3>
                  <p className="font-cormorant text-muted-foreground text-sm line-clamp-2 mb-4">{obj.desc}</p>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="MapPin" size={11} />
                    <span className="font-mono-ibm text-xs">{obj.region}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border border border-border animate-stagger">
            {filtered.map((obj) => (
              <div key={obj.id} className="flex gap-0 group cursor-pointer hover:bg-secondary/20 transition-colors" onClick={() => handleSelect(obj)}>
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
                  <img src={obj.img} alt={obj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-ibm text-xs text-gold">{obj.year}</span>
                      <span className="font-mono-ibm text-xs text-muted-foreground">{obj.type}</span>
                    </div>
                    <h3 className="font-oswald text-sm text-parchment group-hover:text-gold transition-colors tracking-wide">{obj.name}</h3>
                    <p className="font-cormorant text-xs text-muted-foreground mt-1">{obj.region}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-background/92 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-card border border-border max-w-2xl w-full max-h-[92vh] overflow-y-auto scrollbar-thin animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="h-60 overflow-hidden relative flex-shrink-0">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                <Icon name="X" size={16} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-2 py-0.5 bg-background/80 border border-gold/30 text-gold font-mono-ibm text-xs">{selected.era}</span>
                <span className="ml-2 text-muted-foreground font-mono-ibm text-xs">{selected.type}</span>
              </div>
            </div>
            <div className="p-7">
              <h2 className="font-oswald text-2xl text-parchment tracking-wide leading-tight mb-4">{selected.name}</h2>
              <p className="font-cormorant text-lg text-foreground leading-relaxed mb-5">{selected.desc}</p>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 border border-border bg-secondary/20 mb-1">
                <Icon name="MapPin" size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-cormorant text-parchment text-sm">{selected.address}</p>
                  <a href={selected.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1.5 font-mono-ibm text-xs text-gold hover:text-parchment transition-colors"
                    onClick={(e) => e.stopPropagation()}>
                    <Icon name="ExternalLink" size={11} /> Открыть на Яндекс.Картах
                  </a>
                </div>
              </div>

              {/* Audio */}
              <AudioGuide text={selected.audioText} name={selected.name} />

              {/* Meta */}
              <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-border">
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest">Год</span>
                  <p className="font-oswald text-xl text-gold mt-1">{selected.year}</p>
                </div>
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest">Район</span>
                  <p className="font-oswald text-sm text-parchment mt-1 leading-tight">{selected.region}</p>
                </div>
                <div>
                  <span className="font-mono-ibm text-xs text-muted-foreground uppercase tracking-widest">Тип</span>
                  <p className="font-oswald text-sm text-parchment mt-1">{selected.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}