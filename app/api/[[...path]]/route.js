import { NextResponse } from 'next/server';

// Basic API route for portfolio
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  return NextResponse.json({
    message: 'Portfolio API',
    status: 'online',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Handle contact form or other POST requests
    return NextResponse.json({
      success: true,
      message: 'Message received',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}