export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  rating: number; // 0 to 5
  reviewCount: number;
  isBestSeller: boolean;
  category: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export interface Author {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  notableWorks: string[];
}