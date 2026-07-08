export type PairingData = {
  foods: string[];
  temperature: string;
  glassType: string;
};

export const pairings: Record<string, PairingData> = {
  "vranec-barrique": {
    foods: ["Lamb chops", "Aged kashkaval", "Beef stew"],
    temperature: "16–18°C",
    glassType: "Bordeaux",
  },
  "barrel-aged-cabernet-sauvignon": {
    foods: ["Ribeye steak", "Truffle pasta", "Hard cheeses"],
    temperature: "17–19°C",
    glassType: "Bordeaux",
  },
  "thracian-valley-merlot": {
    foods: ["Roast duck", "Mushroom risotto", "Brie"],
    temperature: "16–18°C",
    glassType: "Burgundy",
  },
  "limited-edition-rubin": {
    foods: ["Venison", "Dark chocolate", "Charcuterie"],
    temperature: "16–18°C",
    glassType: "Bordeaux",
  },
  "estate-chardonnay": {
    foods: ["Grilled sea bass", "Chicken piccata", "Camembert"],
    temperature: "10–12°C",
    glassType: "White wine",
  },
  "dimiat-terroir-selection": {
    foods: ["Seafood salad", "Goat cheese", "Light pasta"],
    temperature: "8–10°C",
    glassType: "White wine",
  },
  "summer-rose": {
    foods: ["Grilled vegetables", "Salmon tartare", "Fresh cheeses"],
    temperature: "8–10°C",
    glassType: "Rosé",
  },
  alsar: {
    foods: ["Grilled lamb chops", "Aged kashkaval cheese", "Herb-crusted beef"],
    temperature: "16–18°C",
    glassType: "Bordeaux",
  },
  "sparkling-brut": {
    foods: ["Oysters", "Sushi", "Strawberries & cream"],
    temperature: "6–8°C",
    glassType: "Flute",
  },
};

export function getPairings(wineKey: string): PairingData {
  return (
    pairings[wineKey] ?? {
      foods: ["Charcuterie", "Soft cheeses", "Fresh bread"],
      temperature: "12–16°C",
      glassType: "Universal",
    }
  );
}
