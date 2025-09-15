import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SHOES, getShoeBySlug } from '@/lib/shoes';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ShoeDetailsClient from './_components/shoe-details-client';

export async function generateStaticParams() {
  return SHOES.map((shoe) => ({
    slug: shoe.slug,
  }));
}

type ShoePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ShoePageProps) {
  const shoe = getShoeBySlug(params.slug);
  if (!shoe) {
    return { title: 'Shoe Not Found' };
  }
  return {
    title: shoe.name,
    description: shoe.description,
  };
}

export default function ShoePage({ params }: ShoePageProps) {
  const shoe = getShoeBySlug(params.slug);

  if (!shoe) {
    notFound();
  }

  const averageRating = shoe.reviews.length > 0
    ? shoe.reviews.reduce((acc, review) => acc + review.rating, 0) / shoe.reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {shoe.images.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`${shoe.name} - view ${image.id}`}
                      width={800}
                      height={600}
                      className="w-full h-auto aspect-[4/3] object-cover"
                      data-ai-hint={image.hint}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{shoe.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-3xl text-primary font-semibold">${shoe.price}</p>
              {shoe.reviews.length > 0 && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({shoe.reviews.length} reviews)</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-muted-foreground">{shoe.description}</p>
          
          <ShoeDetailsClient shoe={shoe} />
          
        </div>
      </div>
      <Separator className="my-12" />
      <div>
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
        {shoe.reviews.length > 0 ? (
          <div className="space-y-8">
            {shoe.reviews.map(review => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
}
