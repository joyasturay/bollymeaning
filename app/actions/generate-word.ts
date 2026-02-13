'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { unstable_cache } from 'next/cache'; // <--- 1. Import Cache

// 2. Define the Schema
const bollyWordSchema = z.object({
  word: z.string().describe("The vocabulary word being defined"),
  meaning: z.string().describe("A simple, clear English definition of the word"),
  movie: z.string().describe("Title of the Bollywood movie selected"),
  character: z.string().describe("The name of the character involved in the scene (e.g., 'Baburao', 'Geet', 'Rancho')"),
  context: z.string().describe("A brief, 1-sentence description of the scene that matches the word's vibe."),
  filmySentence: z.string().describe("A sentence using the word in the context of the movie scene. It can use Hinglish for impact."),
  famousDialogue: z.string().optional().describe("A famous dialogue from that scene, if applicable"),
  mood: z.enum(['Funny', 'Romantic', 'Action', 'Drama', 'Horror']).describe("The mood of the scene"),
});

// 3. The Core Logic (Wrapped in Cache)
const getCachedBollyWord = unstable_cache(
  async (word: string) => {
    try {
      const { object } = await generateObject({
        model: google('gemini-2.5-flash'), 
        schema: bollyWordSchema,
        prompt: `
        You are an expert Bollywood movie buff and an English vocabulary teacher.
        
        Task: Explain the word "${word}" using a famous Indian/Bollywood movie scene.
        
        Guidelines:
        1. **Select a Cult Classic:** Prioritize widely known movies (e.g., Hera Pheri, 3 Idiots, Sholay, DDLJ, Mirzapur, Gangs of Wasseypur, ZNMD).
        2. **Make it Memorable:** The "filmySentence" should stick in the user's mind. It's okay to be funny or dramatic.
        3. **Context:** If the word is "Betrayal", think of 'Bahubali' (Katappa). If the word is "Confusion", think of 'Hera Pheri'.
        4. **Language:** The "filmySentence" should be in English, but you can use Hinglish (Hindi words mixed in) for the movie references if it adds flavor.

        Example Input: "Persistence"
        Example Output Movie: "Manjhi: The Mountain Man"
        Example Sentence: "Persistence is what Dashrath Manjhi showed when he spent 22 years carving a path, proving that if you have enough grit, you can literally move mountains."
      `,
      });
      return { success: true, data: object };
    } catch (error) {
      console.error("Error generating BollyWord:", error);
      return { success: false, error: "Failed to generate word. Maybe the server is 'Housefull'?" };
    }
  },
  ['bolly-word-cache'], // Cache Key
  {
    revalidate: 86400, // Cache for 24 Hours (86400 seconds)
    tags: ['bolly-words']
  }
);

// 4. The Public Action
export async function generateBollyWord(word: string) {
  // Normalize input so "Love" and "love" use the same cache entry
  const cleanWord = word.trim().toLowerCase();
  
  return await getCachedBollyWord(cleanWord);
}