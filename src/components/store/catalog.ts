import pFashion from "@/assets/p-fashion.jpg";
import pLaptop from "@/assets/p-laptop.jpg";
import pCookware from "@/assets/p-cookware.jpg";
import pWatch from "@/assets/p-watch.jpg";
import pBeauty from "@/assets/p-beauty.jpg";
import pShoes from "@/assets/p-shoes.jpg";

export type Product = {
  id: string;
  image: string;
  title: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: string;
  category: string;
};

export const categories = [
  "For You",
  "Fashion",
  "Mobiles",
  "Electronics",
  "Beauty",
  "Home",
  "Appliances",
  "Toys & Baby",
  "Grocery",
  "Sports",
  "Furniture",
  "Books",
];

export const products: Product[] = [
  {
    id: "nexon-air-14",
    image: pLaptop,
    brand: "Nexon",
    title: "Nexon Air 14 Thin & Light Laptop, 16GB RAM, 512GB SSD",
    price: 54990,
    mrp: 72990,
    rating: 4.4,
    reviews: "12,480",
    category: "Electronics",
  },
  {
    id: "pulseform-active-2",
    image: pWatch,
    brand: "Pulseform",
    title: "Pulseform Active 2 Smartwatch with AMOLED Display",
    price: 2199,
    mrp: 5999,
    rating: 4.2,
    reviews: "38,102",
    category: "Electronics",
  },
  {
    id: "loomwear-tee-3",
    image: pFashion,
    brand: "Loomwear",
    title: "Loomwear Solid Cotton Round Neck T-Shirt (Pack of 3)",
    price: 649,
    mrp: 1999,
    rating: 4.1,
    reviews: "9,354",
    category: "Fashion",
  },
  {
    id: "stridr-glide",
    image: pShoes,
    brand: "Stridr",
    title: "Stridr Glide Lightweight Running Shoes for Men",
    price: 1499,
    mrp: 3999,
    rating: 4.3,
    reviews: "21,870",
    category: "Sports",
  },
  {
    id: "ferra-triply-3pc",
    image: pCookware,
    brand: "Ferra",
    title: "Ferra Triply Stainless Steel Cookware Set, 3 Pieces",
    price: 2749,
    mrp: 4600,
    rating: 4.5,
    reviews: "5,612",
    category: "Home",
  },
  {
    id: "cleanleaf-combo",
    image: pBeauty,
    brand: "Cleanleaf",
    title: "Cleanleaf Rice Water Face Wash + Glow Serum Combo",
    price: 449,
    mrp: 799,
    rating: 4.0,
    reviews: "44,209",
    category: "Beauty",
  },
  {
    id: "nexon-note-5g",
    image: pLaptop,
    brand: "Nexon",
    title: "Nexon Note 12 5G, 8GB RAM, 128GB, 50MP Camera",
    price: 13499,
    mrp: 18999,
    rating: 4.3,
    reviews: "76,431",
    category: "Mobiles",
  },
  {
    id: "loomwear-kurta",
    image: pFashion,
    brand: "Loomwear",
    title: "Loomwear Handloom Cotton Straight Kurta for Women",
    price: 899,
    mrp: 2499,
    rating: 4.2,
    reviews: "6,018",
    category: "Fashion",
  },
  {
    id: "ferra-mixer",
    image: pCookware,
    brand: "Ferra",
    title: "Ferra 750W Mixer Grinder with 3 Stainless Steel Jars",
    price: 2299,
    mrp: 3999,
    rating: 4.1,
    reviews: "31,204",
    category: "Appliances",
  },
  {
    id: "cleanleaf-shampoo",
    image: pBeauty,
    brand: "Cleanleaf",
    title: "Cleanleaf Onion Hair Shampoo 300ml, No Sulphates",
    price: 329,
    mrp: 599,
    rating: 4.0,
    reviews: "18,776",
    category: "Beauty",
  },
  {
    id: "stridr-yoga-mat",
    image: pShoes,
    brand: "Stridr",
    title: "Stridr Anti-Skid 6mm Yoga & Exercise Mat",
    price: 599,
    mrp: 1499,
    rating: 4.4,
    reviews: "4,120",
    category: "Sports",
  },
  {
    id: "pulseform-buds",
    image: pWatch,
    brand: "Pulseform",
    title: "Pulseform Beat 40 Wireless Earbuds, 40h Playback",
    price: 1099,
    mrp: 3499,
    rating: 4.2,
    reviews: "52,908",
    category: "Electronics",
  },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
