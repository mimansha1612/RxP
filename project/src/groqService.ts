import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Allow usage in the browser
});

export async function getGroqChatCompletion(chatHistory: { role: 'user' | 'assistant'; content: string }[]) {
  try {
    // Add a system message to set the context
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful AI assistant designed specifically for medical students developed by saksham agarwal and mimansha bhandari as a minor project. Your purpose is to assist students in their studies by providing clear, accurate, and detailed explanations of medical topics, helping them understand complex concepts, and answering their questions in a way that is easy to comprehend. This application is called RPM.AI (Research and Practice Med.ai), and it is tailored to support medical students in their learning journey.',
    };

    // Combine the system message with the chat history
    const messages = [systemMessage, ...chatHistory];

    const response = await groq.chat.completions.create({
      messages: messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })),
      model: 'llama-3.3-70b-versatile',
    });

    return response.choices[0]?.message?.content || "Sorry, I couldn't process that.";
  } catch (error) {
    console.error('Groq API Error:', error);
    return 'Error: Unable to connect to the AI model.';
  }
}