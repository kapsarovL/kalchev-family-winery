import { StaticImageData } from "next/image";

export interface Wine {
  id: number;
  name: string;
  type: "red" | "white" | "rosé";
  year: string;
  description: string;
  price: string;
  image: string | StaticImageData;
  bottleImage: string | StaticImageData;
  label?: string;
}

export type WineStockStatus = "in-stock" | "limited" | "pre-order";
export type WineAwardLevel = "gold" | "silver" | "bronze" | undefined;
