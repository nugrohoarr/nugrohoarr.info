import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { createPrompt, formatCompact } from '@/lib/ai-context';

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }
    
    // Check if this is the first message in the conversation
    const isFirstMessage = !request.headers.get('x-conversation-started');
    const prompt = createPrompt(question, isFirstMessage);

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: prompt,
      apiKey: GROQ_API_KEY,
    });

    // Collect the full response
    let fullResponse = '';
    for await (const textPart of result.textStream) {
      fullResponse += textPart;
    }

    // Format the response to be more compact
    const formattedResponse = formatCompact(fullResponse);

    return NextResponse.json({ answer: formattedResponse });

  } catch (error) {
    console.error('Ask Me Anything API error:', error);
    return NextResponse.json(
      { error: 'Failed to get answer. Please try again later.' },
      { status: 500 }
    );
  }
} 