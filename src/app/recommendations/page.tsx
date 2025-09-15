'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getPersonalizedShoeRecommendations } from '@/ai/flows/personalized-shoe-recommendations';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const recommendationSchema = z.object({
  browsingHistory: z.string().min(10, 'Please provide some browsing history for better recommendations.'),
  statedPreferences: z.string().min(10, 'Please tell us what you are looking for.'),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      browsingHistory: '',
      statedPreferences: '',
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getPersonalizedShoeRecommendations(data);
      setRecommendations(result.recommendations);
    } catch (e) {
      setError('Sorry, we couldn\'t generate recommendations at this time. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Wand2 className="text-primary" />
              AI Shoe Recommendations
            </CardTitle>
            <CardDescription>
              Tell us about your style and what you've been looking at, and our AI will find the perfect pair for you.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="browsingHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Browsing History</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Looked at white running shoes, high-top casual sneakers, and black formal shoes...'"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="statedPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I need comfortable shoes for daily walks, prefer breathable materials, and like minimalist designs...'"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Generating...' : 'Find My Sole Mate'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {isLoading && (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>AI is thinking...</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                </CardContent>
            </Card>
        )}

        {error && (
          <Card className="mt-8 border-destructive">
             <CardHeader>
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {recommendations && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{recommendations}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
