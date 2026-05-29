import { MenuItem } from "../types";

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "burgers",
    name: "Burgers & Sandwiches",
    emoji: "🍔",
    items: [
      { name: "Big Mac", price: 6.49, calories: 550 },
      { name: "Quarter Pounder w/ Cheese", price: 6.49, calories: 520 },
      { name: "Double Quarter Pounder w/ Cheese", price: 7.79, calories: 740 },
      { name: "Bacon Quarter Pounder w/ Cheese", price: 7.82, calories: 610 },
      { name: "Double Bacon Quarter Pounder w/ Cheese", price: 9.13, calories: 830 },
      { name: "Cheeseburger", price: 2.79, calories: 300 },
      { name: "Double Cheeseburger", price: 4.79, calories: 450 },
      { name: "Filet-O-Fish", price: 6.27, calories: 390 },
      { name: "Classic Hamburger", price: 3.49, calories: 250 },
      { name: "McChicken Sandwich", price: 4.29, calories: 400 },
      { name: "Spicy McChicken Sandwich", price: 4.49, calories: 420 },
      { name: "Veggie Burger", price: 5.29, calories: 340 },
      { name: "BBQ Bacon Burger", price: 7.25, calories: 670 },
      { name: "Crispy Chicken Sandwich", price: 5.49, calories: 470 },
      { name: "Deluxe Crispy Chicken Sandwich", price: 6.49, calories: 530 },
      { name: "Spicy Crispy Chicken Sandwich", price: 5.49, calories: 490 }
    ]
  },
  {
    id: "chicken",
    name: "Chicken & Nuggets",
    emoji: "🍗",
    items: [
      { name: "3 piece Chicken McNuggets", price: 1.39, calories: 170 },
      { name: "4 piece Chicken McNuggets", price: 2.39, calories: 180 },
      { name: "6 piece Chicken McNuggets", price: 3.39, calories: 270 },
      { name: "10 piece Chicken McNuggets", price: 4.59, calories: 440 },
      { name: "20 piece Chicken McNuggets", price: 7.58, calories: 880 },
      { name: "40 piece Chicken McNuggets", price: 13.99, calories: 1760 },
      { name: "Chicken Tenders (5 pcs)", price: 5.99, calories: 630 },
      { name: "Spicy Chicken Tenders (5 pcs)", price: 6.29, calories: 650 },
      { name: "Chicken Snack Wrap (Grilled)", price: 3.89, calories: 260 },
      { name: "Chicken Snack Wrap (Crispy)", price: 3.99, calories: 330 },
      { name: "Buffalo Wings (6 pcs)", price: 7.99, calories: 540 }
    ]
  },
  {
    id: "breakfast",
    name: "Breakfast",
    emoji: "🥞",
    items: [
      { name: "Egg McMuffin", price: 4.89, calories: 310 },
      { name: "Sausage McMuffin", price: 3.79, calories: 400 },
      { name: "Sausage McMuffin w/ Egg", price: 4.89, calories: 480 },
      { name: "Bacon, Egg & Cheese McGriddles", price: 5.49, calories: 460 },
      { name: "Sausage McGriddles", price: 4.39, calories: 420 },
      { name: "Sausage, Egg & Cheese McGriddles", price: 5.49, calories: 550 },
      { name: "Big Breakfast", price: 6.49, calories: 740 },
      { name: "Big Breakfast w/ Hotcakes", price: 8.49, calories: 1090 },
      { name: "Hotcakes", price: 4.29, calories: 320 },
      { name: "Hotcakes & Sausage", price: 5.29, calories: 520 },
      { name: "Hash Browns", price: 1.89, calories: 150 },
      { name: "Sausage Biscuit", price: 3.49, calories: 460 },
      { name: "Bacon, Egg & Cheese Biscuit", price: 4.79, calories: 460 },
      { name: "Sausage, Egg & Cheese Biscuit", price: 4.79, calories: 520 },
      { name: "Breakfast Burrito", price: 3.99, calories: 305 },
      { name: "Fruit & Maple Oatmeal", price: 3.89, calories: 320 }
    ]
  },
  {
    id: "mccafe",
    name: "McCafe & Beverages",
    emoji: "☕",
    items: [
      { name: "Iced Coffee", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.99, calories: 140 },
        { size: "Medium", price: 2.49, calories: 190 },
        { size: "Large", price: 3.19, calories: 260 }
      ]},
      { name: "Caramel Frappe", price: 0, calories: 0, sizes: [
        { size: "Small", price: 4.79, calories: 420 },
        { size: "Medium", price: 5.79, calories: 550 },
        { size: "Large", price: 6.79, calories: 670 }
      ]},
      { name: "Mocha Frappe", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.79, calories: 410 },
        { size: "Medium", price: 4.79, calories: 510 },
        { size: "Large", price: 5.79, calories: 610 }
      ]},
      { name: "Hot & Iced Lattes", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.29, calories: 150 },
        { size: "Medium", price: 3.29, calories: 190 },
        { size: "Large", price: 4.29, calories: 240 }
      ]},
      { name: "Hot Chocolate", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.49, calories: 370 },
        { size: "Medium", price: 2.49, calories: 440 },
        { size: "Large", price: 3.49, calories: 540 }
      ]},
      { name: "Chai Latte", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.99, calories: 240 },
        { size: "Medium", price: 3.99, calories: 290 },
        { size: "Large", price: 4.99, calories: 350 }
      ]},
      { name: "Espresso Shot", price: 1.99, calories: 5 },
      { name: "Cappuccino", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.49, calories: 120 },
        { size: "Medium", price: 3.49, calories: 160 },
        { size: "Large", price: 4.49, calories: 200 }
      ]},
      { name: "Americano", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.99, calories: 10 },
        { size: "Medium", price: 2.49, calories: 15 },
        { size: "Large", price: 2.99, calories: 20 }
      ]}
    ]
  },
  {
    id: "drinks",
    name: "Soft Drinks",
    emoji: "🥤",
    items: [
      { name: "Coca-Cola", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 150 },
        { size: "Medium", price: 1.89, calories: 210 },
        { size: "Large", price: 2.39, calories: 310 }
      ]},
      { name: "Diet Coke", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 0 },
        { size: "Medium", price: 1.89, calories: 0 },
        { size: "Large", price: 2.39, calories: 0 }
      ]},
      { name: "Sprite", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 140 },
        { size: "Medium", price: 1.89, calories: 200 },
        { size: "Large", price: 2.39, calories: 290 }
      ]},
      { name: "Dr Pepper", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 150 },
        { size: "Medium", price: 1.89, calories: 210 },
        { size: "Large", price: 2.39, calories: 310 }
      ]},
      { name: "Fanta Orange", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 160 },
        { size: "Medium", price: 1.89, calories: 230 },
        { size: "Large", price: 2.39, calories: 330 }
      ]},
      { name: "Hi-C Orange Lavaburst", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.39, calories: 160 },
        { size: "Medium", price: 1.89, calories: 230 },
        { size: "Large", price: 2.39, calories: 330 }
      ]},
      { name: "Minute Maid Lemonade", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.59, calories: 130 },
        { size: "Medium", price: 2.09, calories: 180 },
        { size: "Large", price: 2.59, calories: 260 }
      ]},
      { name: "Bottled Water", price: 1.50, calories: 0 }
    ]
  },
  {
    id: "tea",
    name: "Tea",
    emoji: "🍵",
    items: [
      { name: "Sweet Tea", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.29, calories: 90 },
        { size: "Medium", price: 1.69, calories: 130 },
        { size: "Large", price: 1.99, calories: 180 }
      ]},
      { name: "Unsweetened Iced Tea", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.29, calories: 0 },
        { size: "Medium", price: 1.69, calories: 0 },
        { size: "Large", price: 1.99, calories: 0 }
      ]},
      { name: "Hot Tea", price: 1.49, calories: 0 },
      { name: "Green Tea", price: 1.79, calories: 0 },
      { name: "Peach Tea", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.49, calories: 100 },
        { size: "Medium", price: 1.89, calories: 140 },
        { size: "Large", price: 2.29, calories: 190 }
      ]}
    ]
  },
  {
    id: "icee",
    name: "ICEE & Frozen Beverages",
    emoji: "🧊",
    items: [
      { name: "ICEE Cherry", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.99, calories: 110 },
        { size: "Medium", price: 2.49, calories: 160 },
        { size: "Large", price: 2.99, calories: 220 }
      ]},
      { name: "ICEE Blue Raspberry", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.99, calories: 110 },
        { size: "Medium", price: 2.49, calories: 160 },
        { size: "Large", price: 2.99, calories: 220 }
      ]},
      { name: "ICEE Coke", price: 0, calories: 0, sizes: [
        { size: "Small", price: 1.99, calories: 120 },
        { size: "Medium", price: 2.49, calories: 170 },
        { size: "Large", price: 2.99, calories: 240 }
      ]},
      { name: "Frozen Strawberry Lemonade", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.29, calories: 140 },
        { size: "Medium", price: 2.79, calories: 190 },
        { size: "Large", price: 3.29, calories: 260 }
      ]},
      { name: "Frozen Fanta Wild Cherry", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.29, calories: 130 },
        { size: "Medium", price: 2.79, calories: 180 },
        { size: "Large", price: 3.29, calories: 250 }
      ]}
    ]
  },
  {
    id: "sides",
    name: "Sides & Extras",
    emoji: "🍟",
    items: [
      { name: "French Fries", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.50, calories: 320 },
        { size: "Medium", price: 3.29, calories: 340 },
        { size: "Large", price: 3.79, calories: 365 }
      ]},
      { name: "Basket of Fries", price: 4.99, calories: 540 },
      { name: "Apple Slices", price: 1.89, calories: 15 },
      { name: "Onion Rings", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.10, calories: 150 },
        { size: "Medium", price: 4.10, calories: 240 },
        { size: "Large", price: 5.10, calories: 340 }
      ]},
      { name: "Bacon Strips", price: 2.59, calories: 90 },
      { name: "Mozzarella Sticks (6 pcs)", price: 4.99, calories: 470 },
      { name: "Side Salad", price: 3.99, calories: 15 },
      { name: "Fruit Cup", price: 2.99, calories: 60 },
      { name: "Mac & Cheese", price: 0, calories: 0, sizes: [
        { size: "Small", price: 2.49, calories: 160 },
        { size: "Regular", price: 3.49, calories: 280 },
        { size: "Large", price: 4.49, calories: 420 }
      ]}
    ]
  },
  {
    id: "icecream",
    name: "Ice Cream & Frozen Treats",
    emoji: "🍦",
    items: [
      { name: "Vanilla Cone", price: 1.00, calories: 200 },
      { name: "McFlurry M&M", price: 0, calories: 0, sizes: [
        { size: "Snack", price: 3.00, calories: 430 },
        { size: "Regular", price: 5.00, calories: 640 }
      ]},
      { name: "McFlurry Oreo", price: 0, calories: 0, sizes: [
        { size: "Snack", price: 3.00, calories: 340 },
        { size: "Regular", price: 5.00, calories: 510 }
      ]},
      { name: "Milkshake Strawberry", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.00, calories: 420 },
        { size: "Medium", price: 4.00, calories: 530 },
        { size: "Large", price: 5.00, calories: 690 }
      ]},
      { name: "Milkshake Vanilla", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.00, calories: 410 },
        { size: "Medium", price: 4.00, calories: 520 },
        { size: "Large", price: 5.00, calories: 680 }
      ]},
      { name: "Milkshake Chocolate", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.00, calories: 430 },
        { size: "Medium", price: 4.00, calories: 540 },
        { size: "Large", price: 5.00, calories: 700 }
      ]},
      { name: "Sundae Hot Fudge", price: 4.00, calories: 330 },
      { name: "Sundae Caramel", price: 4.00, calories: 340 },
      { name: "Chocolate Dipped Cone", price: 1.49, calories: 280 },
      { name: "McFlurry Reese's", price: 5.29, calories: 610 }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    emoji: "🧁",
    items: [
      { name: "Apple Pie", price: 2.00, calories: 230 },
      { name: "Cherry Pie", price: 2.00, calories: 240 },
      { name: "Chocolate Chip Cookie", price: 1.50, calories: 160 },
      { name: "Oatmeal Raisin Cookie", price: 1.50, calories: 150 },
      { name: "Apple Fritter", price: 3.00, calories: 510 },
      { name: "Hershey Pie", price: 2.00, calories: 310 },
      { name: "Cinnamon Roll", price: 3.00, calories: 460 },
      { name: "Brownie", price: 2.99, calories: 340 },
      { name: "Strawberry Pie", price: 2.49, calories: 260 },
      { name: "Peach Cobbler", price: 3.79, calories: 350 }
    ]
  },
  {
    id: "smoothies",
    name: "Smoothies",
    emoji: "🥤",
    items: [
      { name: "Strawberry Banana Smoothie", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.49, calories: 190 },
        { size: "Medium", price: 4.29, calories: 250 },
        { size: "Large", price: 4.99, calories: 330 }
      ]},
      { name: "Mango Pineapple Smoothie", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.49, calories: 200 },
        { size: "Medium", price: 4.29, calories: 260 },
        { size: "Large", price: 4.99, calories: 340 }
      ]},
      { name: "Blueberry Pomegranate Smoothie", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.49, calories: 180 },
        { size: "Medium", price: 4.29, calories: 240 },
        { size: "Large", price: 4.99, calories: 320 }
      ]},
      { name: "Mixed Berry Smoothie", price: 0, calories: 0, sizes: [
        { size: "Small", price: 3.49, calories: 185 },
        { size: "Medium", price: 4.29, calories: 245 },
        { size: "Large", price: 4.99, calories: 325 }
      ]}
    ]
  },
  {
    id: "international",
    name: "International Specials",
    emoji: "🌍",
    items: [
      { name: "McSpicy (Singapore)", price: 6.99, calories: 520 },
      { name: "Teriyaki McBurger (Japan)", price: 6.49, calories: 480 },
      { name: "McAloo Tikki (India)", price: 4.99, calories: 350 },
      { name: "Croque McDo (France)", price: 5.49, calories: 420 },
      { name: "McLobster (Canada)", price: 8.99, calories: 380 },
      { name: "Samurai Pork Burger (Thailand)", price: 6.29, calories: 510 },
      { name: "McArabia (Middle East)", price: 7.49, calories: 560 },
      { name: "Prosperity Burger (Malaysia)", price: 6.79, calories: 530 },
      { name: "Chicken Maharaja Mac (India)", price: 7.29, calories: 590 },
      { name: "Ebi Filet-O (Japan)", price: 5.99, calories: 340 }
    ]
  },
  {
    id: "combos",
    name: "Combo Meals",
    emoji: "🍔",
    items: [
      { name: "Big Mac Combo", price: 9.99, calories: 1100, includes: ["Big Mac Burger", "Medium Fries", "Medium Drink"] },
      { name: "Quarter Pounder Combo", price: 10.49, calories: 1080, includes: ["Quarter Pounder with Cheese", "Medium Fries", "Medium Drink"] },
      { name: "Double Quarter Pounder Combo", price: 12.29, calories: 1340, includes: ["Double Quarter Pounder with Cheese", "Medium Fries", "Medium Drink"] },
      { name: "McChicken Combo", price: 8.79, calories: 950, includes: ["McChicken Sandwich", "Medium Fries", "Medium Drink"] },
      { name: "Filet-O-Fish Combo", price: 9.77, calories: 940, includes: ["Filet-O-Fish Sandwich", "Medium Fries", "Medium Drink"] },
      { name: "10 Piece McNuggets Combo", price: 8.99, calories: 990, includes: ["10 Piece McNuggets", "Medium Fries", "Medium Drink"] },
      { name: "Crispy Chicken Sandwich Combo", price: 9.99, calories: 1020, includes: ["Crispy Chicken Sandwich", "Medium Fries", "Medium Drink"] },
      { name: "20 Piece McNuggets Combo", price: 12.49, calories: 1430, includes: ["20 Piece McNuggets", "Large Fries", "Large Drink"] }
    ]
  },
  {
    id: "happymeals",
    name: "Happy Meals",
    emoji: "🎁",
    items: [
      { name: "4 Piece McNuggets Happy Meal", price: 4.99, calories: 475, includes: ["4 Piece McNuggets", "Small Fries or Apple Slices", "Small Drink or Milk", "Toy"] },
      { name: "Hamburger Happy Meal", price: 4.79, calories: 475, includes: ["Hamburger", "Small Fries or Apple Slices", "Small Drink or Milk", "Toy"] },
      { name: "Cheeseburger Happy Meal", price: 5.29, calories: 520, includes: ["Cheeseburger", "Small Fries or Apple Slices", "Small Drink or Milk", "Toy"] },
      { name: "6 Piece McNuggets Happy Meal", price: 5.99, calories: 570, includes: ["6 Piece McNuggets", "Small Fries or Apple Slices", "Small Drink or Milk", "Toy"] }
    ]
  }
];

export const condimentsData = [
  { id: "ketchup", name: "Ketchup Packets", calories: 10 },
  { id: "mustard", name: "Mustard Packets", calories: 5 },
  { id: "mayo", name: "Mayo Packets", calories: 90 },
  { id: "bbq", name: "BBQ Sauce", calories: 15 },
  { id: "ranch", name: "Ranch Dressing", calories: 110 },
  { id: "hotsauce", name: "Hot Sauce", calories: 0 },
  { id: "sweetsour", name: "Sweet & Sour Sauce", calories: 50 },
  { id: "honeymustard", name: "Honey Mustard", calories: 60 },
  { id: "spicymayo", name: "Spicy Mayo", calories: 100 },
  { id: "buffalo", name: "Buffalo Sauce", calories: 5 },
  { id: "chipotle", name: "Chipotle Sauce", calories: 25 },
  { id: "aioli", name: "Garlic Aioli", calories: 120 },
  { id: "teriyaki", name: "Teriyaki Sauce", calories: 35 },
  { id: "thousandisland", name: "Thousand Island", calories: 80 },
  { id: "sriracha", name: "Sriracha", calories: 5 }
];

export const users: Record<string, { username: string; avatar: string; theme: string; displayName: string }> = {
  sav: {
    username: "sav",
    avatar: "https://i.pinimg.com/474x/b5/51/ec/b551ec41dcbc51a686e482dc2113ad3b.jpg",
    theme: "sav",
    displayName: "Savannah"
  },
  kir: {
    username: "kir",
    avatar: "https://c.pxhere.com/photos/88/8a/cat_lying_blue_eye_small_ginger_fur_heal_pet_animal-609263.jpg!d",
    theme: "kir",
    displayName: "Kirsten"
  }
};

export function itemHasSizes(item: MenuItem): boolean {
  return Boolean(item.sizes && item.sizes.length > 0);
}
