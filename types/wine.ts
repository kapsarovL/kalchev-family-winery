import { StaticImageData } from "next/image";

export type WineTranslation = {
  name: string;
  type: "red" | "white" | "rosé";
  description: string;
};

export interface Wine {
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
}

export type WineStockStatus = "in-stock" | "limited" | "pre-order";
export type WineAwardLevel = "gold" | "silver" | "bronze" | undefined;
