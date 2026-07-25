export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('method not allowed', { status: 405 });
  }

  try {
    const { message, history } = await req.json();

    // this tells the ai who it is and what it knows
    const systemPrompt = `You are Kate Aikeen Fabiani's AI assistant. 
    Kate is a Web Developer in Caloocan City, Metro Manila.
    Education: STI College Fairview (BS Information Technology, Dean's Lister).
    Experience: Frontend Developer Intern at Hiraya Technology Solutions (React, MapLibre GL, Node.js, Django).
    Projects: Darwin's Hardware (PHP/MySQL), Compo (React/Supabase), Credibly (React/Vercel), Manic Emulator Skins.
    Tech Stack: React, TypeScript, Tailwind, Node.js, SQL.
    Rules: Keep answers brief, natural, and helpful. Use lowercase letters mostly, matching Kate's casual but professional vibe.`;

    // format the past messages so openai understands the context
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.text
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // you can change this to gpt-4o if you want
        messages: [
          { role: 'system', content: systemPrompt },
          ...formattedHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();
    
    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ reply: "sorry, i'm having trouble connecting right now." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}