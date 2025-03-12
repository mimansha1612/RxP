// groqService.ts
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Allow usage in the browser
});

export async function getGroqChatCompletion(userMessage: string) {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'llama-3.3-70b-versatile',
    });

    return response.choices[0]?.message?.content || "Sorry, I couldn't process that.";
  } catch (error) {
    console.error('Groq API Error:', error);
    return 'Error: Unable to connect to the AI model.';
  }
}