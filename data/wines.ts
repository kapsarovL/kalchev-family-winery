import { StaticImageData } from "next/image";
import wineImage1 from "@/public/images/redwine.jpg";
import wineImage2 from "@/public/images/temjanika.jpg";
import wineImage3 from "@/public/images/rozewine.jpg";
import wineImage4 from "@/public/images/redwine.jpg";

export type Wine = {
  id: number;
  name: string;
  type: "red" | "white" | "rosé";
  year: string;
  description: string;
  price: string;
  image: string | StaticImageData;
  bottleImage: string | StaticImageData;
  label?: string;
};

export const wines: Wine[] = [
  {
    id: 1,
    name: "Reserve Mavrud",
    type: "red",
    year: "2018",
    description:
      "Our premium Mavrud showcases Macedonia's signature grape variety with rich flavors of blackberry, black cherry, and spice, complemented by fine tannins and a long, elegant finish.",
    price: "€32.00",
    image: wineImage1,
    bottleImage: wineImage1,
  },
  {
    id: 2,
    name: "Barrel-Aged Cabernet Sauvignon",
    type: "red",
    year: "2017",
    description:
      "Aged for 18 months in French oak barrels, this Cabernet Sauvignon offers complex aromas of black currant, cedar, and tobacco with a structured palate and impressive aging potential.",
    price: "€28.00",
    image: wineImage2,
    bottleImage: wineImage2,
  },
  {
    id: 3,
    name: "Thracian Valley Merlot",
    type: "red",
    year: "2019",
    description:
      "A smooth, medium-bodied Merlot with ripe plum and chocolate notes, showcasing the warm character of our Bogdanci Valley vineyards with subtle oak influence.",
    price: "€24.00",
    image: wineImage3,
    bottleImage: wineImage3,
  },
  {
    id: 4,
    name: "Limited Edition Rubin",
    type: "red",
    year: "2018",
    description:
      "Our Rubin, a Macedonian crossing of Nebbiolo and Syrah, displays intense ruby color with aromas of forest fruits, violet, and pepper, supported by velvety tannins.",
    price: "€34.00",
    image: wineImage4,
    bottleImage: wineImage4,
  },
  {
    id: 5,
    name: "Estate Chardonnay",
    type: "white",
    year: "2020",
    description:
      "This elegant Chardonnay balances ripe tropical fruit with crisp acidity, enhanced by subtle notes of vanilla and butter from partial oak aging.",
    price: "€22.00",
    image: wineImage1,
    bottleImage: wineImage1,
  },
  {
    id: 6,
    name: "Dimiat Terroir Selection",
    type: "white",
    year: "2021",
    description:
      "Made from the indigenous Dimiat grape, this aromatic white wine offers fresh citrus, white peach, and floral notes with a refreshing minerality that reflects our limestone soils.",
    price: "€26.00",
    image: wineImage2,
    bottleImage: wineImage2,
  },
  {
    id: 7,
    name: "Summer Rosé",
    type: "rosé",
    year: "2021",
    description:
      "A delicate blend of Mavrud and Cabernet Sauvignon creates this crisp rosé with strawberry, watermelon, and rose petal aromas, perfect for warm summer days.",
    price: "€20.00",
    image: wineImage3,
    bottleImage: wineImage3,
  },
  {
    id: 8,
    name: "Sparkling Brut",
    type: "white",
    year: "NV",
    description:
      "Made in the traditional method, our sparkling wine spends 24 months on the lees, developing complex brioche and apple notes while maintaining vibrant freshness.",
    price: "€36.00",
    image: wineImage4,
    bottleImage: wineImage4,
  },
];
