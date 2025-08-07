import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { createPrompt, formatCompact } from '@/lib/ai-context';

export async function GET() {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    console.log('Testing Groq connection...');

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: createPrompt('Hello! Please respond with "Groq is working!"', false),
      apiKey: GROQ_API_KEY,
    });

    // Collect the full response
    let fullResponse = '';
    for await (const textPart of result.textStream) {
      fullResponse += textPart;
    }

    console.log('Test response:', fullResponse);

    // Format the response to be more compact
    const formattedResponse = formatCompact(fullResponse);

    return NextResponse.json({ 
      success: true, 
      message: 'Groq connection successful',
      response: formattedResponse 
    });

  } catch (error) {
    console.error('Groq test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: error.toString()
      },
      { status: 500 }
    );
  }
} 