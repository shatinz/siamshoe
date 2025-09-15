'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

import type { Shoe } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShoeCardProps {
  shoe: Shoe;
}

export default function ShoeCard({ shoe }: ShoeCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(shoe.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(shoe.id, shoe.name);
    } else {
      addToWishlist(shoe.id, shoe.name);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/shoe/${shoe.slug}`}>
          <Image
            src={shoe.images[0].url}
            alt={shoe.name}
            width={600}
            height={400}
            className="w-full h-auto aspect-[4/3] object-cover"
            data-ai-hint={shoe.images[0].hint}
          />
        </Link>
        {shoe.isNew && <Badge className="absolute top-3 left-3">New</Badge>}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 rounded-full h-9 w-9 bg-background/70 hover:bg-background"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn("h-5 w-5", isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground')} />
        </Button>
      </CardHeader>
      <Link href={`/shoe/${shoe.slug}`} className="flex-grow flex flex-col">
        <CardContent className="pt-6 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight">{shoe.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{shoe.type}</p>
        </CardContent>
        <CardFooter>
          <p className="text-lg font-bold text-primary">${shoe.price}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
