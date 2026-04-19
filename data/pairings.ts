export type PairingData = {
  foods: string[];
  temperature: string;
  glassType: string;
};

export const pairings: Record<string, PairingData> = {
  "Reserve Mavrud": {
    foods: ["Lamb chops", "Aged kashkaval", "Beef stew"],
    temperature: "16–18°C",
    glassType: "Bordeaux",
  },
  "Barrel-Aged Cabernet Sauvignon": {
    foods: ["Ribeye steak", "Truffle pasta", "Hard cheeses"],
    temperature: "17–19°C",
    glassType: "Bordeaux",
  },
  "Thracian Valley Merlot": {
    foods: ["Roast duck", "Mushroom risotto", "Brie"],
    temperature: "16–18°C",
    glassType: "Burgundy",
  },
  "Limited Edition Rubin": {
    foods: ["Venison", "Dark chocolate", "Charcuterie"],
    temperature: "16–18°C",
    glassType: "Bordeaux",
  },
  "Estate Chardonnay": {
    foods: ["Grilled sea bass", "Chicken piccata", "Camembert"],
    temperature: "10–12°C",
    glassType: "White wine",
  },
  "Dimiat Terroir Selection": {
    foods: ["Seafood salad", "Goat cheese", "Light pasta"],
    temperature: "8–10°C",
    glassType: "White wine",
  },
  "Summer Rosé": {
    foods: ["Grilled vegetables", "Salmon tartare", "Fresh cheeses"],
    temperature: "8–10°C",
    glassType: "Rosé",
  },
  "Sparkling Brut": {
    foods: ["Oysters", "Sushi", "Strawberries & cream"],
    temperature: "6–8°C",
    glassType: "Flute",
  },
};

export function getPairings(wineName: string): PairingData {
  return (
    pairings[wineName] ?? {
      foods: ["Charcuterie", "Soft cheeses", "Fresh bread"],
      temperature: "12–16°C",
      glassType: "Universal",
    }
  );
}
