export interface Shoe {
  id: string;
  slug: string;
  name: string;
  type: 'Running' | 'Casual' | 'Formal' | 'Training';
  price: number;
  description: string;
  images: {
    id: string;
    url: string;
    hint: string;
  }[];
  sizes: number[];
  colors: { name: string; hex: string }[];
  reviews: Review[];
  isNew: boolean;
  popularity: number; // e.g. 0-100
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}
