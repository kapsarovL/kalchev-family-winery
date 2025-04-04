export type Testimonial = {
  id: number;
  name: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elena Kovacheva",
    text: "The Reserve Mavrud is simply outstanding. It perfectly captures the essence of Bulgarian winemaking tradition with a modern touch. The rich flavors and elegant finish make it my go-to wine for special occasions.",
    rating: 5,
  },
  {
    id: 2,
    name: "Martin Petrov",
    text: "Visited the winery last summer and was blown away by the hospitality and knowledge of the Kalchev family. Their passion for wine is evident in every sip. The Barrel-Aged Cabernet Sauvignon is world-class.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Laurent",
    text: "As a wine journalist who has tasted wines from across the globe, I can confidently say that Kalchev's wines stand out for their terroir expression and attention to detail. The Dimiat is a hidden gem that deserves recognition.",
    rating: 5,
  },
  {
    id: 4,
    name: "Alexander Dimitrov",
    text: "The wine tasting experience at Kalchev Family Winery was the highlight of our Bulgarian vacation. The scenic vineyard, informative tour, and exceptional wines made for an unforgettable day. Highly recommend their Summer Rosé!",
    rating: 5,
  },
  {
    id: 5,
    name: "Isabella Romano",
    text: "Being an Italian with high standards for wine, I was pleasantly surprised by the quality and character of Kalchev's wines. Their Thracian Valley Merlot has become a staple in my collection. Bravo!",
    rating: 4,
  },
  {
    id: 6,
    name: "Thomas Schmidt",
    text: "I've been a wine collector for over 20 years, and Kalchev's Limited Edition Rubin is one of the most interesting wines I've added to my cellar recently. Complex, age-worthy, and distinctly Bulgarian.",
    rating: 5,
  },
];
