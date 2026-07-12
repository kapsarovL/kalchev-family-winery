import { StaticImageData } from "next/image";
import redwine from "@/public/images/redwine.webp";
import vranec from "@/public/images/vranec.png";
import merlot from "@/public/images/merlot.webp";
import temjanika from "@/public/images/temjanika.webp";
import rozewine from "@/public/images/rozewine.webp";
import rozejpg from "@/public/images/roze.webp";
import alsar from "@/public/images/alsar.webp";

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
          "Црвеното вино од сортата Вранец, берба од лозов насад. Вино со контролирано потекло (ВКП) Гевгелиско - Валандовско виногорје месност Блатиште Богданци. Касна берба и одлежано во француско дабово буре. Лимитирана количина. Ова вино ги отсликува поднебјето и стилот на вино што се пие во нашиот регион.",
      },
      gr: {
        name: "Vranec Barrique",
        type: "red",
        description:
          "Το premium Vranec μας αναδεικνύει την υπογείη Μακεδονίας με πλούσιες γεύσεις μαύρο μούρο, μαύρο κερασί και μπαχάρι με λεπτές τανίνες και μια μακρά, κομψή επίγευση.",
      },
    },
  },
  {
    id: 2,
    key: "vranec-premium",
    year: "2017",
    price: "€28.00",
    image: vranec,
    bottleImage: vranec,
    translations: {
      en: {
        name: "Vranec Premium",
        type: "red",
        description:
          "Aged 18 months in French oak barrels, this wine offers complex aromas of blackberry, cedar and tobacco with a structured palate and impressive aging potential.",
      },
      mk: {
        name: "Вранец Премиум",
        type: "red",
        description:
          "Одлежан 18 месеци во француски дабови буриња, овој Вранец нуди комплексни ароми на црна рибизла, кедар и тутун со структуриран вкус и импресивен потенцијал за одлежување.",
      },
      gr: {
        name: "Vranec Premium",
        type: "red",
        description:
          "Παλαιωμένο για 18 μήνες σε γαλλικά δρύινα βαρέλια, αυτό το Vranec προσφέρει σύνθετα αρώματα μαύρης σταφίδας, κέδρου και καπνού με δομημένη γεύση και εντυπωσιακό δυναμικό παλαίωσης.",
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
          "Ένα απαλό, μέτριου σώματος Merlot με νότες ώριμου δαμάσκηνου και σοκολάτας, που αναδεικνύει τον ζεστό χαρακτήρα των αμπελώνων μας στην κοιλάδα Μπόγκντανσι με λεπτή δρυινή επίδραση.",
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
    id: 6,
    key: "temjanika-cuvee",
    year: "2020",
    price: "€22.00",
    image: temjanika,
    bottleImage: temjanika,
    translations: {
      en: {
        name: "Temjanika Cuvee",
        type: "white",
        description:
          "An elegant white wine from carefully selected grapes of Temjanika and Italian Riesling. Bright straw-yellow color with a rich bouquet of white flowers, peach and fresh citrus nuances, complemented by a delicate muscat character. Fresh, harmonious palate with fine acidity and elegant finish that enhances its natural aromatics. Best served chilled at 8-10°C.",
      },
      mk: {
        name: "Темјаника кувее",
        type: "white",
        description:
          "Ова префинето ароматично бело вино е создадено од внимателно избрано грозје од сортите Темјаника и Итанизаника Мускат. Бо чашата е светла слеместо-жолт на боја и богат бузет од бели цветови, багрем и свежи цитрушни нијанса, надополнети со елекниик мускатен карактер. Вкусот е свеж, хармоничен со префинета киселост и елегантен завршеток што ја надополнува природната аромантичност. Најдобро се служи разладено на 8-10°C.",
      },
      gr: {
        name: "Τεμψάνικα Cuvee",
        type: "white",
        description:
          "Ένα κομψό αρωματικό λευκό κρασί που δημιουργείται από προσεκτικά επιλεγμένο σταφύλι Temjanika και Italian Riesling. Ανοιξη Φρέσκο-κίτρινο χρώμα με εμπλουρμένο μπουζέτο λευκών λουλουδιών, μήλου και φρέσκο κίτρινο με φρεσκάδα. Ελαστικό στόμα με μικρή οξύτητα και ενυσματική επίγευση που αναδεικνύει τη φυσική αροματικότητά του. Καλύτερο μερίσματα δροσισμένο στα 8-10°C.",
      },
    },
  },
  {
    id: 7,
    key: "rose-blatiste",
    year: "2021",
    price: "€16.00",
    image: rozewine,
    bottleImage: rozewine,
    translations: {
      en: {
        name: "Rosé Blatiste",
        type: "rosé",
        description:
          "Semisweet rosé wine that reflects the tradition and style of wines from our region. Created from a carefully selected grape blend: 50% Vranec, 25% Merlot, 25% Muscat Hamburg. The grapes come from our own vineyard and are selectively harvested at night to preserve their natural aromas. Rich with fragrant notes of raspberry, rosehip, and red berries. The taste is balanced, fresh, and fruity with soft tannins and pleasant acidity. Pairs excellently with traditional Macedonian cuisine, cold appetizers, fresh cheeses, and fresh salads.",
      },
      mk: {
        name: "Розе Блатисте",
        type: "rosé",
        description:
          "Полусуво розе вино кое ја отсликува традицијата и стилот на вината од нашиот регион. Ова розе е создадено од внимателно избран бренд на грозје: Вранец-50%, Мерлот-25%, Мускат хамбург-25%. Лозјето потекнува од сопствен лозов насад и се бере селективно во ноќни услови за да се зачуваат натуралните ароми. Богато со мирисни ноти на малина, шипка и црвени зрнести овошја. Вкусот е балансиран, свеж и овошен со нежни танини и пријатна киселост. Одлично се комбинира со традиционална македонска кујна, ладни предјадејна, свежи сирејна и свежи салати.",
      },
      gr: {
        name: "Ροζέ Μπλάτιστε",
        type: "rosé",
        description:
          "Ημίγλυκο ροζέ κρασί που αντανακλά την παράδοση και το στυλ των κρασιών της περιοχής μας. Δημιουργημένο από προσεκτικά επιλεγμένη μίξη σταφυλιών: 50% Vranec, 25% Merlot, 25% Muscat Hamburg. Τα σταφύλια προέρχονται από το δικό μας αμπέλι και συλλέγονται επιλεκτικά τη νύχτα για να διατηρήσουν τα φυσικά τους αρώματα. Πλούσιο με αρωματικές νότες βατόμουρου, τριανταφυλλιάς και κόκκινων μούρων. Η γεύση είναι ισορροπημένη, φρέσκια και φρουτώδης με απαλές τανίνες και ευχάριστη οξύτητα. Συνδυάζεται εξαιρετικά με παραδοσιακή μακεδονική κουζίνα, κρύα ορεκτικά, φρέσκα τυριά και φρέσκες σαλάτες.",
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
          "Φτιαγμένο με την παραδοσιακή μέθοδο, ο αφρώδης οίνος μας παραμένει 24 μήνες επί των οινολασπών, αναπτύσσοντας σύνθετα αρώματα μπριός και μήλου, διατηρώντας ζωντανή φρεσκάδα.",
      },
    },
  },
];

export function getWineByKey(key: string): Wine | undefined {
  return wines.find((w) => w.key === key);
}