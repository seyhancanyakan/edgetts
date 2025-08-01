import { NextRequest, NextResponse } from 'next/server';

const TTS_API_URL = process.env.TTS_API_URL || 'http://openai-edge-tts:5050/v1/audio/speech';
const API_KEY = process.env.TTS_API_KEY || 'sk-proj-tts-edge-api-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Gerekli alanları kontrol et
    if (!body.input) {
      return NextResponse.json(
        { error: 'Missing input text' },
        { status: 400 }
      );
    }

    // Desteklenen tüm sesler
    const supportedVoices = [
      // OpenAI Compatible
      'alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer',
      // Türkçe Edge TTS  
      'tr-TR-AhmetNeural', 'tr-TR-EmelNeural', 'tr-TR-SedaNeural',
      // Diğer Edge TTS (deneysel)
      'en-US-AvaNeural', 'en-US-AndrewNeural', 'de-DE-KatjaNeural'
    ];
    const isUnsupportedVoice = body.voice && !supportedVoices.includes(body.voice);

    // OpenAI Edge TTS API'sine istek gönder
    const response = await fetch(TTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        input: body.input,
        voice: body.voice || 'tr-TR-AhmetNeural', // Varsayılan: Türkçe ses
        response_format: body.response_format || 'mp3',
        speed: body.speed || 1.0,
      }),
      signal: AbortSignal.timeout(60000), // 60 saniye timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TTS API Error:', response.status, errorText);
      
      // Desteklenmeyen ses hatası için özel mesaj
      if (response.status === 400 && isUnsupportedVoice) {
        return NextResponse.json(
          { 
            error: 'Bu ses desteklenmiyor. Lütfen desteklenen seslerden birini seçin.',
            voiceError: true,
            recommendedVoices: ['alloy', 'echo', 'nova', 'tr-TR-AhmetNeural', 'tr-TR-EmelNeural']
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: `TTS API Error: ${response.status}` },
        { status: response.status }
      );
    }

    // Audio verilerini al
    const audioBuffer = await response.arrayBuffer();
    
    // Audio response döndür
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 