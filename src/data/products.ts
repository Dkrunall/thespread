export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "savory" | "sweet" | "specialty" | "vegan";
  color: string;
  tags: string[];
  imageBg: string; // Tailwind class for the brand colour behind the product
}

export const products: Product[] = [
  {
    id: "herb-garlic",
    name: "Herb & Garlic",
    price: 26,
    description: "Classic, aromatic and perfect on everything.",
    category: "savory",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Herb & Savory", "Everyday"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "spicy-thai",
    name: "Spicy Thai",
    price: 28,
    description: "Bold, zesty and slightly spicy.",
    category: "savory",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Herb & Savory", "Zesty"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "sundried-tomatoes",
    name: "Sundried Tomatoes",
    price: 27,
    description: "Rich, tangy and full of flavour.",
    category: "savory",
    color: "#418764", /* Secondary Green */
    tags: ["Herb & Savory", "Tangy"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "curry-cumin",
    name: "Curry Leaves & Cumin",
    price: 28,
    description: "Fragrant, earthy and deeply comforting.",
    category: "savory",
    color: "#07745B", /* Primary Green */
    tags: ["Herb & Savory", "Earthy"],
    imageBg: "bg-[#07745B]",
  },
  {
    id: "raspberry",
    name: "Raspberry Spread",
    price: 27,
    description: "Fruity, bright and irresistibly smooth.",
    category: "sweet",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Sweet & Indulgent", "Toast"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "chocolate-hazelnut",
    name: "Chocolate Hazelnut",
    price: 33,
    description: "Decadent, creamy and seriously moreish.",
    category: "sweet",
    color: "#418764", /* Secondary Green */
    tags: ["Sweet & Indulgent", "Decadent"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "peanut-butter",
    name: "Classic Peanut",
    price: 28,
    description: "Nutty, creamy and perfectly balanced.",
    category: "sweet",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Sweet & Indulgent", "Snack"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "date-miso",
    name: "Date Miso Butter",
    price: 34,
    description: "Sweet, umami and naturally unique.",
    category: "sweet",
    color: "#04AE97", /* Accent Teal */
    tags: ["Sweet & Indulgent", "Signature"],
    imageBg: "bg-[#04AE97]",
  },
  {
    id: "saffron-honey",
    name: "Saffron Honey",
    price: 32,
    description: "Luxurious, floral and delicately sweet.",
    category: "specialty",
    color: "#8BD2CE", /* Light Aqua Alternative */
    tags: ["Specialty", "Giftable"],
    imageBg: "bg-bag-aqua-alt",
  },
  {
    id: "karak-chai",
    name: "Karak Chai Butter",
    price: 30,
    description: "Warm, spiced and full of nostalgic comfort.",
    category: "specialty",
    color: "#418764", /* Secondary Green */
    tags: ["Specialty", "Cozy"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "vegan-butter",
    name: "Vegan Butter",
    price: 31,
    description: "Creamy, rich and perfectly spreadable.",
    category: "vegan",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "vegan-garlic-butter",
    name: "Vegan Garlic Butter",
    price: 32,
    description: "Buttery, garlicky and full of flavour.",
    category: "vegan",
    color: "#07745B", /* Primary Green */
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-[#07745B]",
  },
  {
    id: "smoked-chilli",
    name: "Smoked Chilli",
    price: 29,
    description: "Smoky, spicy and packed with flavour.",
    category: "savory",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Salt & Smoke", "Bold"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "bourbon",
    name: "Bourbon Butter",
    price: 32,
    description: "Smoky and sweet gourmet infusion.",
    category: "specialty",
    color: "#04AE97", /* Accent Teal */
    tags: ["Salt & Smoke", "Indulgent"],
    imageBg: "bg-[#04AE97]",
  },
];

export type CollectionId = "herb" | "sweet" | "specialty" | "smoke";

export const collections: { id: CollectionId; label: string; tag: string }[] = [
  { id: "herb", label: "Herb & Savory", tag: "Herb & Savory" },
  { id: "sweet", label: "Sweet & Indulgent", tag: "Sweet & Indulgent" },
  { id: "specialty", label: "Specialty", tag: "Specialty" },
  { id: "smoke", label: "Salt & Smoke", tag: "Salt & Smoke" },
];

export const pairings: { id: string; label: string; pairsWith: string[] }[] = [
  {
    id: "toast",
    label: "toast",
    pairsWith: ["herb-garlic", "raspberry", "saffron-honey", "karak-chai", "vegan-butter", "peanut-butter"],
  },
  {
    id: "pancakes",
    label: "pancakes",
    pairsWith: ["saffron-honey", "chocolate-hazelnut", "raspberry", "karak-chai"],
  },
  {
    id: "pasta",
    label: "pasta",
    pairsWith: ["herb-garlic", "vegan-garlic-butter", "smoked-chilli"],
  },
  {
    id: "crackers",
    label: "crackers",
    pairsWith: ["sundried-tomatoes", "date-miso", "herb-garlic", "smoked-chilli"],
  },
  {
    id: "veg",
    label: "roasted veg",
    pairsWith: ["curry-cumin", "herb-garlic", "smoked-chilli", "vegan-garlic-butter"],
  },
];

/** Cut-outs shown around each jar. Names match files in /public/art. */
export const productArt: Record<string, string[]> = {
  "herb-garlic": ["garlic", "basil"],
  "spicy-thai": ["chilli", "lime"],
  "sundried-tomatoes": ["tomato", "basil"],
  "curry-cumin": ["curryleaf", "chilli"],
  raspberry: ["raspberry", "toast"],
  "chocolate-hazelnut": ["hazelnut", "croissant"],
  "peanut-butter": ["peanut", "toast"],
  "date-miso": ["date", "knife"],
  "saffron-honey": ["crocus", "dipper"],
  "karak-chai": ["chai", "croissant"],
  "vegan-butter": ["olive", "toast"],
  "vegan-garlic-butter": ["garlic", "olive"],
  "smoked-chilli": ["chilli", "tomato"],
  bourbon: ["croissant", "date"],
};

export const getProduct = (id: string) => products.find((p) => p.id === id);
