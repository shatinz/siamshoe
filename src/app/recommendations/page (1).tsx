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
  browsingHistory: z.string().min(10, 'لطفاً برای توصیه‌های بهتر، تاریخچه مرور خود را ارائه دهید.'),
  statedPreferences: z.string().min(10, 'لطفاً به ما بگویید دنبال چه چیزی هستید.'),
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
      setError('متاسفانه در حال حاضر امکان ارائه پیشنهاد وجود ندارد. لطفاً بعداً دوباره امتحان کنید.');
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
              پیشنهاد کفش با هوش مصنوعی
            </CardTitle>
            <CardDescription>
              در مورد سبک خود و آنچه که به دنبال آن بوده‌اید به ما بگویید، و هوش مصنوعی ما جفت مناسب را برای شما پیدا خواهد کرد.
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
                      <FormLabel>تاریخچه مرور شما</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="مثلاً: 'کفش‌های دویدن سفید، کتانی‌های ساق بلند غیرر رسمی و کفش‌های رسمی مشکی را دیده‌ام...'"
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
                      <FormLabel>ترجیحات شما</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="مثلاً: 'من به کفش‌های راحت برای پیاده‌روی روزانه نیاز دارم، مواد قابل تنفس را ترجیح می‌دهم و طرح‌های مینیمالیستی را دوست دارم...'"
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
                  {isLoading ? 'در حال تولید...' : 'جفت مناسب من را پیدا کن'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {isLoading && (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>هوش مصنوعی در حال فکر کردن است...</CardTitle>
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
                <CardTitle className="text-destructive">خطایی رخ داد</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {recommendations && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>پیشنهادهای شخصی‌سازی شده شما</CardTitle>
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
