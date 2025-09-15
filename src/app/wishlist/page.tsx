'use client';

import { useWishlist } from '@/contexts/wishlist-context';
import { SHOES } from '@/lib/shoes';
import ShoeCard from '@/components/shoe-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistedShoes = SHOES.filter(shoe => wishlist.includes(shoe.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">علاقه‌مندی‌های شما</h1>
      {wishlistedShoes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistedShoes.map(shoe => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">لیست علاقه‌مندی‌های شما خالی است</h2>
          <p className="text-muted-foreground mb-6">به نظر می‌رسد هنوز کفشی اضافه نکرده‌اید. بیایید جفت مناسب خود را پیدا کنیم!</p>
          <Button asChild>
            <Link href="/">شروع خرید</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
