import type { Shoe } from './types';

export const SHOES: Shoe[] = [
  {
    id: '1',
    slug: 'urban-runner-x',
    name: 'Urban Runner X',
    type: 'Running',
    price: 129.99,
    description: 'Experience the city like never before with the Urban Runner X. Featuring our latest lightweight foam technology and a breathable mesh upper, this shoe is built for comfort and performance on any urban terrain.',
    images: [
      { id: 'urban-runner-1', url: 'https://picsum.photos/seed/shoe1a/800/600', hint: 'running shoe' },
      { id: 'urban-runner-2', url: 'https://picsum.photos/seed/shoe1b/800/600', hint: 'shoe top' },
      { id: 'urban-runner-3', url: 'https://picsum.photos/seed/shoe1c/800/600', hint: 'shoe fabric' },
    ],
    sizes: [8, 9, 9.5, 10, 10.5, 11, 12],
    colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }],
    reviews: [
      { id: 'r1', rating: 5, comment: 'Incredibly comfortable and stylish!', author: 'Alex D.', date: '2023-10-15' },
      { id: 'r2', rating: 4, comment: 'Great for my daily runs.', author: 'Sam B.', date: '2023-10-20' },
    ],
    isNew: true,
    popularity: 95,
  },
  {
    id: '2',
    slug: 'classic-loafer',
    name: 'Classic Loafer',
    type: 'Formal',
    price: 189.99,
    description: 'Timeless elegance meets modern comfort. The Classic Loafer is crafted from premium full-grain leather and features a cushioned insole for all-day wear. Perfect for the office or any formal occasion.',
    images: [
      { id: 'classic-loafer-1', url: 'https://picsum.photos/seed/shoe2a/800/600', hint: 'leather loafer' },
      { id: 'classic-loafer-2', url: 'https://picsum.photos/seed/shoe2b/800/600', hint: 'formal shoe' },
      { id: 'classic-loafer-3', url: 'https://picsum.photos/seed/shoe2c/800/600', hint: 'shoe stitching' },
    ],
    sizes: [7, 8, 9, 10, 11],
    colors: [{ name: 'Brown', hex: '#8B4513' }, { name: 'Black', hex: '#000000' }],
    reviews: [
      { id: 'r3', rating: 5, comment: 'The best loafers I have ever owned. Worth every penny.', author: 'Michael R.', date: '2023-09-05' },
    ],
    isNew: false,
    popularity: 88,
  },
  {
    id: '3',
    slug: 'retro-sneaker-88',
    name: "Retro Sneaker '88",
    type: 'Casual',
    price: 99.99,
    description: "A throwback to the golden age of sneakers. The Retro Sneaker '88 combines a vintage silhouette with modern materials for a look that's both classic and fresh. Your perfect everyday companion.",
    images: [
      { id: 'retro-sneaker-1', url: 'https://picsum.photos/seed/shoe3a/800/600', hint: 'retro sneaker' },
      { id: 'retro-sneaker-2', url: 'https://picsum.photos/seed/shoe3b/800/600', hint: 'sneakers pair' },
      { id: 'retro-sneaker-3', url: 'https://picsum.photos/seed/shoe3c/800/600', hint: 'shoe sole' },
    ],
    sizes: [7, 8, 9, 9.5, 10, 10.5, 11, 12, 13],
    colors: [{ name: 'Blue', hex: '#3F51B5' }, { name: 'Red', hex: '#F44336' }, { name: 'Green', hex: '#4CAF50' }],
    reviews: [
      { id: 'r4', rating: 5, comment: 'Love the retro vibes and they are super comfy.', author: 'Jessica L.', date: '2023-11-01' },
      { id: 'r5', rating: 4, comment: 'Great looking shoe, fits a bit snug.', author: 'Tom H.', date: '2023-10-28' },
    ],
    isNew: false,
    popularity: 92,
  },
  {
    id: '4',
    slug: 'flex-trainer-pro',
    name: 'Flex-Trainer Pro',
    type: 'Training',
    price: 149.99,
    description: 'Dominate your workout with the Flex-Trainer Pro. Designed for high-intensity training, it provides superior stability, flexibility, and support. The durable outsole offers excellent grip for any gym surface.',
    images: [
      { id: 'flex-trainer-1', url: 'https://picsum.photos/seed/shoe4a/800/600', hint: 'gym shoe' },
      { id: 'flex-trainer-2', url: 'https://picsum.photos/seed/shoe4b/800/600', hint: 'training shoe' },
      { id: 'flex-trainer-3', url: 'https://picsum.photos/seed/shoe4c/800/600', hint: 'shoelaces' },
    ],
    sizes: [9, 10, 11, 12, 13],
    colors: [{ name: 'Grey', hex: '#9E9E9E' }, { name: 'Volt', hex: '#CEFF00' }],
    reviews: [
      { id: 'r6', rating: 5, comment: 'Perfect for CrossFit and lifting. Very stable.', author: 'Chris G.', date: '2023-10-18' },
    ],
    isNew: true,
    popularity: 90,
  },
   {
    id: '5',
    slug: 'sky-high-runner',
    name: 'Sky-High Runner',
    type: 'Running',
    price: 139.99,
    description: 'Feel like you are running on clouds. The Sky-High Runner offers maximum cushioning and a responsive ride. The engineered mesh upper adapts to your foot for a personalized fit.',
    images: [
      { id: 'sky-high-runner-1', url: 'https://picsum.photos/seed/shoe5/800/600', hint: 'blue sneaker' },
    ],
    sizes: [8, 9, 10, 11, 12],
    colors: [{ name: 'Sky Blue', hex: '#87CEEB' }, { name: 'White', hex: '#FFFFFF' }],
    reviews: [],
    isNew: true,
    popularity: 85,
  },
  {
    id: '6',
    slug: 'city-walker',
    name: 'City Walker',
    type: 'Casual',
    price: 89.99,
    description: 'The ultimate shoe for urban explorers. Comfortable, durable, and stylish, the City Walker is ready for wherever the day takes you. Features a water-resistant canvas and a grippy rubber sole.',
    images: [
      { id: 'city-walker-1', url: 'https://picsum.photos/seed/shoe6/800/600', hint: 'casual shoe' },
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [{ name: 'Khaki', hex: '#F0E68C' }, { name: 'Black', hex: '#000000' }],
    reviews: [
       { id: 'r7', rating: 4, comment: 'Good for walking around town.', author: 'David S.', date: '2023-11-05' },
    ],
    isNew: false,
    popularity: 80,
  },
];

export const getShoeBySlug = (slug: string): Shoe | undefined => {
  return SHOES.find((shoe) => shoe.slug === slug);
};
