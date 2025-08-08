'use server';

/**
 * @fileOverview Provides AI-powered slide content suggestions based on a given topic.
 *
 * - suggestSlideContent -  A function that generates slide content suggestions.
 * - SuggestSlideContentInput - The input type for suggestSlideContent.
 * - SuggestSlideContentOutput - The output type for suggestSlideContent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSlideContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate slide content suggestions.'),
});

export type SuggestSlideContentInput = z.infer<typeof SuggestSlideContentInputSchema>;

const SuggestSlideContentOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of slide content suggestions based on the topic.'),
});

export type SuggestSlideContentOutput = z.infer<typeof SuggestSlideContentOutputSchema>;

export async function suggestSlideContent(input: SuggestSlideContentInput): Promise<SuggestSlideContentOutput> {
  return suggestSlideContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSlideContentPrompt',
  input: {schema: SuggestSlideContentInputSchema},
  output: {schema: SuggestSlideContentOutputSchema},
  prompt: `You are an AI assistant specialized in generating slide content suggestions for presentations.
  Based on the given topic, provide a list of relevant and engaging slide content ideas.
  Return the suggestions as a JSON array of strings.

  Topic: {{{topic}}}

  Suggestions:`,
});

const suggestSlideContentFlow = ai.defineFlow(
  {
    name: 'suggestSlideContentFlow',
    inputSchema: SuggestSlideContentInputSchema,
    outputSchema: SuggestSlideContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
