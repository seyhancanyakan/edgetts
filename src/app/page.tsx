'use client';

import { useState, useRef } from 'react';
import { Play, Square, Download, Mic, Settings, Volume2, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Türkçe sesler listesi
const TURKISH_VOICES = [
  { id: 'tr-TR-AhmetNeural', name: 'Ahmet (Erkek)', gender: 'male' },
  { id: 'tr-TR-EmelNeural', name: 'Emel (Kadın)', gender: 'female' },
  { id: 'tr-TR-SedaNeural', name: 'Seda (Kadın)', gender: 'female' },
];

// Diğer popüler sesler
const OTHER_VOICES = [
  // İngilizce
  { id: 'en-US-AvaNeural', name: 'Ava (İngilizce - Kadın)', gender: 'female' },
  { id: 'en-US-AndrewNeural', name: 'Andrew (İngilizce - Erkek)', gender: 'male' },
  { id: 'en-GB-SoniaNeural', name: 'Sonia (İngiliz - Kadın)', gender: 'female' },
  
  // Almanca
  { id: 'de-DE-KatjaNeural', name: 'Katja (Almanca - Kadın)', gender: 'female' },
  { id: 'de-DE-ConradNeural', name: 'Conrad (Almanca - Erkek)', gender: 'male' },
  { id: 'de-DE-AmalaNeural', name: 'Amala (Almanca - Kadın)', gender: 'female' },
  
  // Fransızca
  { id: 'fr-FR-DeniseNeural', name: 'Denise (Fransızca - Kadın)', gender: 'female' },
  { id: 'fr-FR-HenriNeural', name: 'Henri (Fransızca - Erkek)', gender: 'male' },
  { id: 'fr-FR-BrigitteNeural', name: 'Brigitte (Fransızca - Kadın)', gender: 'female' },
  
  // İtalyanca
  { id: 'it-IT-ElsaNeural', name: 'Elsa (İtalyanca - Kadın)', gender: 'female' },
  { id: 'it-IT-DiegoNeural', name: 'Diego (İtalyanca - Erkek)', gender: 'male' },
  { id: 'it-IT-IsabellaNeural', name: 'Isabella (İtalyanca - Kadın)', gender: 'female' },
  
  // İspanyolca
  { id: 'es-ES-ElviraNeural', name: 'Elvira (İspanyolca - Kadın)', gender: 'female' },
  { id: 'es-ES-AlvaroNeural', name: 'Alvaro (İspanyolca - Erkek)', gender: 'male' },
  { id: 'es-MX-DaliaNeural', name: 'Dalia (Meksika İspanyolcası - Kadın)', gender: 'female' },
];

export default function TTSInterface() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('tr-TR-AhmetNeural');
  const [speed, setSpeed] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const generateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Lütfen bir metin girin!');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: text,
          voice: selectedVoice,
          response_format: 'mp3',
          speed: speed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      toast.success('Ses başarıyla oluşturuldu!');
    } catch (error) {
      console.error('TTS Error:', error);
      toast.error('Ses oluşturulurken bir hata oluştu!');
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `tts-${selectedVoice}-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Ses dosyası indirildi!');
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Volume2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              TTS Arayüzü
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Metninizi sesli okutun - OpenAI Edge TTS ile güçlendirilmiştir
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Metin Girişi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mic className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Metin Girişi</h2>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Sesli okutmak istediğiniz metni buraya yazın..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                maxLength={1000}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {text.length}/1000 karakter
                </span>
                
                <button
                  onClick={generateSpeech}
                  disabled={isGenerating || !text.trim()}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 disabled:scale-100"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      Ses Oluştur
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Ayarlar ve Kontroller */}
          <div className="space-y-6">
            {/* Ses Ayarları */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Ayarlar</h2>
              </div>
              
              <div className="space-y-4">
                {/* Ses Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ses Seçimi
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <optgroup label="🇹🇷 Türkçe Sesler">
                      {TURKISH_VOICES.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌍 Diğer Diller">
                      {OTHER_VOICES.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Hız Ayarı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konuşma Hızı: {speed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Yavaş</span>
                    <span>Normal</span>
                    <span>Hızlı</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ses Kontrolleri */}
            {audioUrl && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ses Kontrolleri</h2>
                
                <div className="flex gap-3">
                  <button
                    onClick={isPlaying ? stopAudio : playAudio}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-4 h-4" />
                        Durdur
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Oynat
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={downloadAudio}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    <Download className="w-4 h-4" />
                    İndir
                  </button>
                </div>

                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={handleAudioEnded}
                  className="w-full mt-4"
                  controls
                />
              </div>
            )}
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-8 text-gray-500">
          <p>OpenAI Edge TTS API ile güçlendirilmiştir</p>
        </div>
      </div>
    </div>
  );
}
