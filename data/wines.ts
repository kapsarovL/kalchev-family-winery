import { StaticImageData } from "next/image";
import redwine from "@/public/images/redwine.webp";
import vranec from "@/public/images/vranec.png";
import merlot from "@/public/images/merlot.webp";
import temjanika from "@/public/images/temjanika.webp";
import rozewine from "@/public/images/rozewine.webp";
import rozejpg from "@/public/images/roze.webp";
import alsar from "@/public/images/alsar.png";

export type WineTranslation = {
  name: string;
  type: "red" | "white" | "rosé";
  description: string;
};

export type Wine = {
  id: number;
  key: string;
  year: string;
  price: string;
  image: string | StaticImageData;
  bottleImage: string | StaticImageData;
  label?: string;
  translations: {
    en: WineTranslation;
    mk: WineTranslation;
    gr: WineTranslation;
  };
};

export const wines: Wine[] = [
  {
    id: 1,
    key: "vranec-barrique",
    year: "2018",
    price: "€6.00",
    image: redwine,
    bottleImage: redwine,
    translations: {
      en: {
        name: "Vranec Barrique",
        type: "red",
        description:
          "Our premium Vranec showcases Macedonia's signature grape variety with rich flavors of blackberry, black cherry, and spice, complemented by fine tannins and a long, elegant finish.",
      },
      mk: {
        name: "Вранец Бариќуе",
        type: "red",
        description:
          "Црвеното вино од сортата Вранец, берба од лозов насад. Вино со контролирано потекло (ВКП) Гевгелиско - Валандовско виногорје месност Блатиште Богданци Касна берба и одлежано во француско дабово буре лимитирана количина. Оваа вино има традиција на производство во семејната винарија, и ги  отсликува поднебјето и стилот на вино што се пие во нашиот регион. Богато со ароми и лесно за пиење, се комбинира со црвено месо и традиционална храна. Калчев",
      },
      gr: {
        name: "Vranec Barrique",
        type: "red",
        description:
          "Το premium Vranec μας αναδεικνύει την χαρακτηριστική μακεδονική ποικιλία σταφυλιού με πλούσιες γεύσεις βατόμουρου, μαύρου κερασιού και μπαχαρικών, συμπληρωμένες με λεπτές τανίνες και μια μακρά, κομψή επίγευση.",
      },
    },
  },
  {
    id: 2,
    key: "Вранец Бариќуе",
    year: "2017",
    price: "€28.00",
    image: vranec,
    bottleImage: vranec,
    translations: {
      en: {
        name: "Вранец Бариќуе",
        type: "red",
        description:
          "Црвеното вино од сортата Вранец, берба од лозов насад. Вино со контролирано потекло (ВКП) Гевгелиско - Валандовско виногорје месност Блатиште Богданци Касна берба и одлежано во француско дабово буре лимитирана количина. Оваа вино има традиција на производство во семејната винарија, и ги  отсликува поднебјето и стилот на вино што се пие во нашиот регион. Богато со ароми и лесно за пиење, се комбинира со црвено месо и традиционална храна. Калчев",
      },
      mk: {
        name: "Вранец Бариќуе",
        type: "red",
        description:
          "Одлежан 18 месеци во француски дабови буриња, овој Каберне Совињон нуди комплексни ароми на црна рибизла, кедар и тутун со структуриран вкус и импресивен потенцијал за одлежување.",
      },
      gr: {
        name: "Вранец Бариќуе",
        type: "red",
        description:
          "Παλαιωμένο για 18 μήνες σε γαλλικά δρύινα βαρέλια, αυτό το Cabernet Sauvignon προσφέρει σύνθετα αρώματα μαύρης σταφίδας, κέδρου και καπνού με δομημένη γεύση και εντυπωσιακό δυναμικό παλαίωσης.",
      },
    },
  },
  {
    id: 3,
    key: "thracian-valley-merlot",
    year: "2019",
    price: "€24.00",
    image: merlot,
    bottleImage: merlot,
    translations: {
      en: {
        name: "Thracian Valley Merlot",
        type: "red",
        description:
          "A smooth, medium-bodied Merlot with ripe plum and chocolate notes, showcasing the warm character of our Bogdanci Valley vineyards with subtle oak influence.",
      },
      mk: {
        name: "Тракиска Долина Мерло",
        type: "red",
        description:
          "Нежен, средно-тежок Мерло со ноти на зрела слива и чоколадо, кој го прикажува топлиот карактер на нашите лозја од Богданци со суптилно влијание на даб.",
      },
      gr: {
        name: "Merlot Κοιλάδας Θράκης",
        type: "red",
        description:
          "Ένα απαλό, μέτριου σώματος Merlot με νότες ώριμου δαμάσκηνου και σοκολάτας, που αναδεικνύει τον ζεστό χαρακτήρα των αμπελώνων μας στην κοιλάδα Μπόγκντανσι με λεπτή δρύινη επίδραση.",
      },
    },
  },
  {
    id: 4,
    key: "alsar",
    year: "2018",
    price: "€32.00",
    image: alsar,
    bottleImage: alsar,
    translations: {
      en: {
        name: "Alsar",
        type: "red",
        description:
          "A distinguished red wine from the Tikveš wine region, grown at the foothills of Mount Alsar. This cuvée blends traditional Macedonian grape varieties with careful oak aging, delivering aromas of ripe dark berries, dried herbs, and subtle spices. Full-bodied with silky tannins and a long, mineral-driven finish that reflects the unique terroir of this ancient wine-growing area.",
      },
      mk: {
        name: "Алшар",
        type: "red",
        description:
          "Префинето црвено вино од Тиквешкото виногорје, одгледано во подножјето на планината Алшар. Ова кувее ги спојува традиционалните македонски сорти грозје со внимателно одлежување во даб, нудејќи ароми на зрели темни бобинки, суви билки и суптилни зачини. Полно тело со свиленкасти танини и долг, минерален завршеток што го отсликува уникатниот тероар на овој древен вински регион.",
      },
      gr: {
        name: "Άλσαρ",
        type: "red",
        description:
          "Ένα διακεκριμένο κόκκινο κρασί από την οινοπαραγωγική περιοχή Τίκβες, που καλλιεργείται στους πρόποδες του όρους Άλσαρ. Αυτό το cuvée συνδυάζει παραδοσιακές μακεδονικές ποικιλίες σταφυλιού με προσεκτική παλαίωση σε δρυ, προσφέροντας αρώματα ώριμων σκούρων μούρων, αποξηραμένων βοτάνων και λεπτών μπαχαρικών. Γεμάτο σώμα με μεταξένιες τανίνες και μακρά, ορυκτή επίγευση που αντανακλά το μοναδικό terroir αυτής της αρχαίας οινοπαραγωγικής περιοχής.",
      },
    },
  },
  {
    id: 5,
    key: "Темјаника кувее",
    year: "2020",
    price: "€22.00",
    image: temjanika,
    bottleImage: temjanika,
    translations: {
      en: {
        name: "Темјаника кувее",
        type: "white",
        description:
          "This elegant Chardonnay balances ripe tropical fruit with crisp acidity, enhanced by subtle notes of vanilla and butter from partial oak aging.",
      },
      mk: {
        name: "Темјаника кувее",
        type: "white",
        description:
          "Ова префинето ароматично бело вино е создадено од внимателно избрано грозје од сортите Темјаника и Итанизаника Мускат. Бо чашата откуика светла слеместо-жолт на боја и богат бузет оз бели цветови, багрем, праска и свежи цитрушни нијанса, надополнетисо елекниик мускатен карактер. На непцето е свежо, хармонично е свилен касата, со префинета кичетост и догв, елегантен зав винтож што ја наглакува неговата природна аромантичност. Најдобро се служи разладено на 8-10С",
      },
      gr: {
        name: "Темјаника кувее",
        type: "white",
        description:
          "Αυτό το κομψό Chardonnay εξισορροπεί ώριμα τροπικά φρούτα με τραγανή οξύτητα, ενισχυμένο με λεπτές νότες βανίλιας και βουτύρου από μερική παλαίωση σε δρυ.",
      },
    },
  },
  {
    id: 7,
    key: "Розе Блатисте",
    year: "2021",
    price: "6 €",
    image: rozewine,
    bottleImage: rozewine,
    translations: {
      en: {
        name: "Rosé Blatiste",
        type: "rosé",
        description:
          "Semisweet rosé wine that reflects the tradition and style of wines from our region. This rosé is created from a carefully selected grape blend: 50% Vranec, 25% Merlot, 25% Muscat Hamburg. The grapes come from our own vineyard and are selectively harvested at night to preserve their natural aromas. Rich with fragrant notes of raspberry, rosehip, and red berries. The taste is balanced, fresh, and fruity with soft tannins and pleasant acidity. Pairs excellently with traditional Macedonian cuisine, cold appetizers, fresh cheeses, and fresh salads.",
      },
      mk: {
        name: "Розе Блатисте",
        type: "rosé",
        description:
          "Полусуво розе вино кое ја отсликува традицијата и стилот на вината од нашиот регион.Ова розе е создадено од внимателно избран бренд на грозје, Вранец-50%, Мерлот-25%, Мускат хамбург-25%.Лозјето потекнува од сопствен лозов насад исе бере селективно во ноќни услови за зачувувајне на неговите природни ароми.Богато со мирисни ноти на малина, шипка и црвени зрнести овошја.Вкусот е балансиран, свеж и овошен со нежни танини и пријатна киселост. Одлично се комбинира со традиционална македонска кујна, ладни предјадејна, свежи сирејна и свежи салати.",
      },
      gr: {
        name: "Ροζέ Μπλάτιστε",
        type: "rosé",
        description:
          "Ημίγλυκο ροζέ κρασί που αντανακλά την παράδοση και το στυλ των κρασιών της περιοχής μας. Αυτό το ροζέ δημιουργείται από προσεκτικά επιλεγμένη μίξη σταφυλιών: 50% Vranec, 25% Merlot, 25% Muscat Hamburg. Τα σταφύλια προέρχονται από το δικό μας αμπέλι και συλλέγονται επιλεκτικά τη νύχτα για να διατηρήσουν τα φυσικά τους αρώματα. Πλούσιο με αρωματικές νότες βατόμουρου, τριανταφυλλιάς και κόκκινων μούρων. Η γεύση είναι ισορροπημένη, φρέσκια και φρουτώδης με απαλές τανίνες και ευχάριστη οξύτητα. Συνδυάζεται εξαιρετικά με παραδοσιακή μακεδονική κουζίνα, κρύα ορεκτικά, φρέσκα τυριά και φρέσκες σαλάτες.",
      },
    },
  },
  {
    id: 8,
    key: "sparkling-brut",
    year: "NV",
    price: "€36.00",
    image: rozejpg,
    bottleImage: rozejpg,
    translations: {
      en: {
        name: "Sparkling Brut",
        type: "white",
        description:
          "Made in the traditional method, our sparkling wine spends 24 months on the lees, developing complex brioche and apple notes while maintaining vibrant freshness.",
      },
      mk: {
        name: "Брут Пенливо Вино",
        type: "white",
        description:
          "Направено по традиционален метод, нашето пенливо вино поминува 24 месеци на талог, развивајќи комплексни ноти на бриош и јаболко, задржувајќи живописна свежина.",
      },
      gr: {
        name: "Brut Αφρώδης Οίνος",
        type: "white",
        description:
          "Φτιαγμένο με την παραδοσιακή μέθοδο, ο αφρώδης οίνος μας παραμένει 24 μήνες επί των οινολασπών, αναπτύσσοντας σύνθετες νότες μπριός και μήλου, διατηρώντας ζωντανή φρεσκάδα.",
      },
    },
  },
];

export function getWineByKey(key: string): Wine | undefined {
  return wines.find((w) => w.key === key);
}
