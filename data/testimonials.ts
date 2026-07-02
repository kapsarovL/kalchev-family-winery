export type TestimonialTranslation = {
  name: string;
  text: string;
};

export type Testimonial = {
  id: number;
  rating: number;
  translations: {
    en: TestimonialTranslation;
    mk: TestimonialTranslation;
    gr: TestimonialTranslation;
  };
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    translations: {
      en: {
        name: "Elena Kovacheva",
        text: "The Reserve Mavrud is simply outstanding. It perfectly captures the essence of Macedonia winemaking tradition with a modern touch.",
      },
      mk: {
        name: "Елена Ковачева",
        text: "Резерва Мавруд е едноставно извонредно. Совршено ја доловува суштината на македонската винска традиција со модерен допир.",
      },
      gr: {
        name: "Έλενα Κοβάτσεβα",
        text: "Το Reserve Mavrud είναι απλά εξαιρετικό. Αποτυπώνει τέλεια την ουσία της μακεδονικής οινοποιητικής παράδοσης με μια σύγχρονη πινελιά.",
      },
    },
  },
  {
    id: 2,
    rating: 5,
    translations: {
      en: {
        name: "Martin Petrov",
        text: "Visited the winery last summer and was blown away by the hospitality and knowledge of the Kalchev family. Their passion for wine is evident in every sip.",
      },
      mk: {
        name: "Мартин Петров",
        text: "Ја посетив винаријата минатото лето и бев воодушевен од гостопримството и знаењето на семејството Калчев. Нивната страст за виното е очигледна во секоја голтка.",
      },
      gr: {
        name: "Μάρτιν Πέτροφ",
        text: "Επισκέφτηκα το οινοποιείο το περασμένο καλοκαίρι και εντυπωσιάστηκα από τη φιλοξενία και τις γνώσεις της οικογένειας Kalchev. Το πάθος τους για το κρασί είναι εμφανές σε κάθε γουλιά.",
      },
    },
  },
  {
    id: 3,
    rating: 5,
    translations: {
      en: {
        name: "Sophie Laurent",
        text: "As a wine journalist who has tasted wines from across the globe, I can confidently say that Kalchev's wines stand out for their terroir expression and attention to detail.",
      },
      mk: {
        name: "Софи Лоран",
        text: "Како вински новинар кој пробав вина од целиот свет, можам со сигурност да кажам дека вината на Калчев се истакнуваат по изразот на тероар и вниманието кон деталите.",
      },
      gr: {
        name: "Σοφί Λοράν",
        text: "Ως οινολογική δημοσιογράφος που έχει δοκιμάσει κρασιά από όλο τον κόσμο, μπορώ με βεβαιότητα να πω ότι τα κρασιά Kalchev ξεχωρίζουν για την έκφραση terroir και την προσοχή στη λεπτομέρεια.",
      },
    },
  },
  {
    id: 4,
    rating: 5,
    translations: {
      en: {
        name: "Alexander Dimitrov",
        text: "The wine tasting experience at Kalchev Family Winery was the highlight of our Macedonian vacation. The scenic vineyard, informative tour, and exceptional wines made for an unforgettable day.",
      },
      mk: {
        name: "Александар Димитров",
        text: "Искуството со дегустација на вина во Винска Визија Калчев беше врвот на нашиот македонски одмор. Сликовитото лозје, информативната турнеја и исклучителните вина создадоа незаборавен ден.",
      },
      gr: {
        name: "Αλέξανδρος Δημητρώφ",
        text: "Η εμπειρία γευσιγνωσίας στο Kalchev Family Winery ήταν το αποκορύφωμα των διακοπών μας στη Μακεδονία. Ο γραφικός αμπελώνας, η ενημερωτική ξενάγηση και τα εξαιρετικά κρασιά δημιούργησαν μια αξέχαστη ημέρα.",
      },
    },
  },
  {
    id: 5,
    rating: 4,
    translations: {
      en: {
        name: "Isabella Romano",
        text: "Being an Italian with high standards for wine, I was pleasantly surprised by the quality and character of Kalchev's wines. Their Bogdanci Valley Merlot has become a staple in my collection.",
      },
      mk: {
        name: "Изабела Романо",
        text: "Како Италијанка со високи стандарди за вино, бев пријатно изненадена од квалитетот и карактерот на вината на Калчев. Нивниот Мерло од Богданци стана задолжителен во мојата колекција.",
      },
      gr: {
        name: "Ιζαμπέλα Ρομάνο",
        text: "Ως Ιταλίδα με υψηλά πρότυπα για το κρασί, έμεινα ευχάριστα έκπληκτη από την ποιότητα και τον χαρακτήρα των κρασιών Kalchev. Το Merlot Κοιλάδας Μπόγκντανσι έχει γίνει βασικό κομμάτι της συλλογής μου.",
      },
    },
  },
  {
    id: 6,
    rating: 5,
    translations: {
      en: {
        name: "Thomas Schmidt",
        text: "I've been a wine collector for over 20 years, and Kalchev's Limited Edition Rubin is one of the most interesting wines I've added to my cellar recently.",
      },
      mk: {
        name: "Томас Шмит",
        text: "Сум колекционер на вина повеќе од 20 години, и Лимитираното Издание Рубин на Калчев е едно од најинтересните вина што ги додадов во мојата визба неодамна.",
      },
      gr: {
        name: "Τόμας Σμιτ",
        text: "Είμαι συλλέκτης κρασιών για πάνω από 20 χρόνια, και το Limited Edition Rubin της Kalchev είναι ένα από τα πιο ενδιαφέροντα κρασιά που έχω προσθέσει στο κελάρι μου πρόσφατα.",
      },
    },
  },
];
