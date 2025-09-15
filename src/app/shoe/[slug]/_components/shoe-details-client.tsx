'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Shoe } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function ShoeDetailsClient({ shoe }: { shoe: Shoe }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(shoe.colors[0]?.name || null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(shoe.id);
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(shoe.id, shoe.name);
    } else {
      addToWishlist(shoe.id, shoe.name);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
        toast({
            title: "Selection required",
            description: "Please select a size and color.",
            variant: "destructive",
        });
        return;
    }
    toast({
        title: "Added to Cart",
        description: `${shoe.name} (Size: ${selectedSize}, Color: ${selectedColor}) has been added to your cart.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-foreground">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
        <RadioGroup
          defaultValue={selectedColor ?? undefined}
          onValueChange={setSelectedColor}
          className="flex items-center gap-2 mt-2"
        >
          {shoe.colors.map(color => (
            <RadioGroupItem
              key={color.name}
              value={color.name}
              id={`color-${color.name}`}
              className="sr-only"
            />
            <Label
              htmlFor={`color-${color.name}`}
              className={cn(
                "w-8 h-8 rounded-full border-2 cursor-pointer",
                selectedColor === color.name ? 'border-primary' : 'border-transparent'
              )}
            >
              <div
                className="w-full h-full rounded-full border-2 border-background"
                style={{ backgroundColor: color.hex }}
              />
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground">Size</h3>
        <RadioGroup
          onValueChange={(val) => setSelectedSize(Number(val))}
          className="flex flex-wrap items-center gap-2 mt-2"
        >
          {shoe.sizes.map(size => (
            <RadioGroupItem
              key={size}
              value={String(size)}
              id={`size-${size}`}
              className="sr-only"
            />
            <Label
              htmlFor={`size-${size}`}
              className={cn(
                "h-10 w-14 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer transition-colors",
                selectedSize === size
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-accent'
              )}
            >
              {size}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center gap-4">
        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button size="lg" variant="outline" className="px-4" onClick={handleWishlistToggle} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart className={cn("h-6 w-6", isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground')} />
        </Button>
      </div>
    </div>
  );
}
