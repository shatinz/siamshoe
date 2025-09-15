// This is a server action.
'use server';

/**
 * @fileOverview Provides personalized shoe recommendations based on user history and preferences.
 *
 * - getPersonalizedShoeRecommendations - A function that generates shoe recommendations.
 * - PersonalizedShoeRecommendationsInput - The input type for the recommendations function.
 * - PersonalizedShoeRecommendationsOutput - The return type for the recommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedShoeRecommendationsInputSchema = z.object({
  browsingHistory: z.string().describe('The user\u2019s browsing history, as a string.'),
  statedPreferences: z.string().describe('The user\u2019s stated preferences for shoes.'),
});
export type PersonalizedShoeRecommendationsInput = z.infer<
  typeof PersonalizedShoeRecommendationsInputSchema
>;

const PersonalizedShoeRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of shoe recommendations based on the user\u2019s history and preferences.'),
});
export type PersonalizedShoeRecommendationsOutput = z.infer<
  typeof PersonalizedShoeRecommendationsOutputSchema
>;

export async function getPersonalizedShoeRecommendations(
  input: PersonalizedShoeRecommendationsInput
): Promise<PersonalizedShoeRecommendationsOutput> {
  return personalizedShoeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedShoeRecommendationsPrompt',
  input: {schema: PersonalizedShoeRecommendationsInputSchema},
  output: {schema: PersonalizedShoeRecommendationsOutputSchema},
  prompt: `Based on the user's browsing history: {{{browsingHistory}}} and stated preferences: {{{statedPreferences}}}, recommend some shoes the user might like.`,
});

const personalizedShoeRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedShoeRecommendationsFlow',
    inputSchema: PersonalizedShoeRecommendationsInputSchema,
    outputSchema: PersonalizedShoeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
