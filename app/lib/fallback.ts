export interface BollyWordData{
  word: string;
  meaning: string;
  movie: string;
  character: string;
  context: string;
  filmySentence: string;
  famousDialogue?: string;
  mood: 'Funny' | 'Romantic' | 'Action' | 'Drama' | 'Horror';
}
export const PRE_GENERATED_WORDS: Record<string, BollyWordData> = {
  "betrayal": {
    word: "Betrayal",
    meaning: "The action of breaking someone's trust.",
    movie: "Baahubali: The Beginning",
    character: "Katappa",
    context: "Katappa stabbing Baahubali in the back despite being his loyal servant.",
    filmySentence: "Betrayal is when you trust someone like Baahubali trusted Katappa, and they stab you in the back. Literally.",
    famousDialogue: "Mama, aapne Baahubali ko kyu maara?",
    mood: "Drama"
  },
  "confusion": {
    word: "Confusion",
    meaning: "A situation where everything is disordered and unclear.",
    movie: "Hera Pheri",
    character: "Baburao Ganpatrao Apte",
    context: "Baburao trying to handle cross-connected calls meant for Star Fisheries.",
    filmySentence: "Confusion is your life when you are Baburao and Devi Prasad is calling for fish.",
    famousDialogue: "Utha le re baba, utha le! Mere ko nahi, in dono ko utha le!",
    mood: "Funny"
  },
  "arrogance": {
    word: "Arrogance",
    meaning: "Exaggerated sense of one's own importance.",
    movie: "KGF: Chapter 1",
    character: "Rocky Bhai",
    context: "Rocky walking into the villain's den with pure swagger.",
    filmySentence: "Arrogance looks bad on everyone, unless you are Rocky Bhai saying 'Violence, Violence, Violence... I avoid.'",
    famousDialogue: "Salaam Rocky Bhai!",
    mood: "Action"
  },
  "fear": {
    word: "Fear",
    meaning: "An unpleasant emotion caused by the belief that someone is dangerous.",
    movie: "Sholay",
    character: "Gabbar Singh",
    context: "Gabbar asking his men simply 'Kitne aadmi the?'",
    filmySentence: "True fear isn't a ghost; it's Gabbar Singh asking you 'Jo darr gaya, samjho marr gaya.'",
    famousDialogue: "Soja beta, nahi toh Gabbar aa jayega.",
    mood: "Horror"
  },
  "love": {
    word: "Love",
    meaning: "An intense feeling of deep affection.",
    movie: "Dilwale Dulhania Le Jayenge",
    character: "Raj",
    context: "Raj extending his hand to Simran on a moving train.",
    filmySentence: "Love is not just a feeling; it's Raj waiting for you to run and catch the train.",
    famousDialogue: "Jaa Simran, jee le apni zindagi!",
    mood: "Romantic"
  }
};