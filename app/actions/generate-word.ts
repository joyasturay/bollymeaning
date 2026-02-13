'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
const bollyWordSchema = z.object({
  word: z.string().describe("The vocabulary word being defined"),
  meaning: z.string().describe("A simple, clear English definition of the word"),
  movie: z.string().describe("Title of the Bollywood movie selected"),
  character: z.string().describe("The name of the character involved in the scene (e.g., 'Baburao', 'Geet', 'Rancho')"),
  
  // This is the 'Scene Card' content
  context: z.string().describe("A brief, 1-sentence description of the scene that matches the word's vibe."),
  
  // The 'Hook' - The funny/dramatic sentence
  filmySentence: z.string().describe("A sentence using the word in the context of the movie scene. It can use Hinglish for impact."),
  
  // Optional: A famous dialogue if it fits
  famousDialogue: z.string().optional().describe("A famous dialogue from that scene, if applicable (e.g., 'Utha le re baba')"),
  
  // To help the UI pick a color/theme
  mood: z.enum(['Funny', 'Romantic', 'Action', 'Drama', 'Horror']).describe("The mood of the scene"),
});

export async function generateBollyWord(word: string) {
  try {
    // 2. Call Gemini
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
}