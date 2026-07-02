import { StaticImageData } from "next/image";
import redwine from "@/public/images/redwine.webp";
import vranec from "@/public/images/vranec.png";
import merlot from "@/public/images/merlot.webp";
import temjanika from "@/public/images/temjanika.webp";
import rozewine from "@/public/images/rozewine.webp";
import rozejpg from "@/public/images/roze.webp";

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
    key: "reserve-mavrud",
    year: "2018",
    price: "€32.00",
    image: redwine,
    bottleImage: redwine,
    translations: {
      en: {
        name: "Reserve Mavrud",
        type: "red",
        description:
          "Our premium Mavrud showcases Macedonia's signature grape variety with rich flavors of blackberry, black cherry, and spice, complemented by fine tannins and a long, elegant finish.",
      },
      mk: {
        name: "Резерва Мавруд",
        type: "red",
        description:
          "Нашиот премиум Мавруд ја прикажува препознатливата македонска сорта грозје со богати вкусови на капина, црна цреша и зачини, надополнети со фини танини и долг, елегантен завршеток.",
      },
      gr: {
        name: "Reserve Mavrud",
        type: "red",
        description:
          "Το premium Mavrud μας αναδεικνύει την χαρακτηριστική μακεδονική ποικιλία σταφυλιού με πλούσιες γεύσεις βατόμουρου, μαύρου κερασιού και μπαχαρικών, συμπληρωμένες με λεπτές τανίνες και μια μακρά, κομψή επίγευση.",
      },
    },
  },
  {
    id: 2,
    key: "barrel-aged-cabernet-sauvignon",
    year: "2017",
    price: "€28.00",
    image: vranec,
    bottleImage: vranec,
    translations: {
      en: {
        name: "Barrel-Aged Cabernet Sauvignon",
        type: "red",
        description:
          "Aged for 18 months in French oak barrels, this Cabernet Sauvignon offers complex aromas of black currant, cedar, and tobacco with a structured palate and impressive aging potential.",
      },
      mk: {
        name: "Одлежан Каберне Совињон",
        type: "red",
        description:
          "Одлежан 18 месеци во француски дабови буриња, овој Каберне Совињон нуди комплексни ароми на црна рибизла, кедар и тутун со структуриран вкус и импресивен потенцијал за одлежување.",
      },
      gr: {
        name: "Cabernet Sauvignon Παλαιωμένο σε Βαρέλι",
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
    id: 5,
    key: "estate-chardonnay",
    year: "2020",
    price: "€22.00",
    image: temjanika,
    bottleImage: temjanika,
    translations: {
      en: {
        name: "Estate Chardonnay",
        type: "white",
        description:
          "This elegant Chardonnay balances ripe tropical fruit with crisp acidity, enhanced by subtle notes of vanilla and butter from partial oak aging.",
      },
      mk: {
        name: "Шардоне Од Винарија",
        type: "white",
        description:
          "Овој елегантен Шардоне балансира зрело тропско овошје со свежа киселост, збогатен со суптилни ноти на ванила и путер од делумно одлежување во даб.",
      },
      gr: {
        name: "Chardonnay Κτήματος",
        type: "white",
        description:
          "Αυτό το κομψό Chardonnay εξισορροπεί ώριμα τροπικά φρούτα με τραγανή οξύτητα, ενισχυμένο με λεπτές νότες βανίλιας και βουτύρου από μερική παλαίωση σε δρυ.",
      },
    },
  },
  {
    id: 7,
    key: "summer-rose",
    year: "2021",
    price: "€20.00",
    image: rozewine,
    bottleImage: rozewine,
    translations: {
      en: {
        name: "Summer Rosé",
        type: "rosé",
        description:
          "A delicate blend of Mavrud and Cabernet Sauvignon creates this crisp rosé with strawberry, watermelon, and rose petal aromas, perfect for warm summer days.",
      },
      mk: {
        name: "Летно Розе",
        type: "rosé",
        description:
          "Деликатен бленд на Мавруд и Каберне Совињон создава свежо розе со ароми на јагода, лубеница и ливчиња од роза, совршено за топли летни денови.",
      },
      gr: {
        name: "Καλοκαιρινή Ροζέ",
        type: "rosé",
        description:
          "Ένας λεπτός συνδυασμός Mavrud και Cabernet Sauvignon δημιουργεί αυτό το δροσερό ροζέ με αρώματα φράουλας, καρπουζιού και ροδοπέταλου, ιδανικό για ζεστές καλοκαιρινές ημέρες.",
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
