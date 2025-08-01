# 🎤 TTS Arayüzü - Metin Sesli Okuma

OpenAI Edge TTS API'si ile güçlendirilmiş modern ve kullanıcı dostu metin sesli okuma arayüzü.

## ✨ Özellikler

- 🇹🇷 **Türkçe Dil Desteği** - Ahmet, Emel, Seda gibi doğal Türkçe sesler
- 🌍 **Çoklu Dil Desteği** - İngilizce, Almanca, Fransızca ve daha fazlası
- ⚡ **Hız Kontrolü** - 0.5x ile 2.0x arasında konuşma hızı ayarı
- 🎵 **Ses Kontrolleri** - Oynat, durdur, indir fonksiyonları
- 📱 **Responsive Tasarım** - Mobil ve masaüstü uyumlu
- 🎨 **Modern UI** - Tailwind CSS ile tasarlanmış güzel arayüz

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **OpenAI Edge TTS API'sini başlatın:**
   ```bash
   docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
   ```

3. **Development server'ı başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın:**
   ```
   http://localhost:3000
   ```

## 🔧 Yapılandırma

### API Ayarları

`src/app/api/tts/route.ts` dosyasında:

```typescript
const TTS_API_URL = 'http://localhost:5050/v1/audio/speech';
const API_KEY = 'your_api_key_here';
```

### Ses Seçenekleri

`src/app/page.tsx` dosyasında ses listesini özelleştirebilirsiniz:

```typescript
const TURKISH_VOICES = [
  { id: 'tr-TR-AhmetNeural', name: 'Ahmet (Erkek)', gender: 'male' },
  { id: 'tr-TR-EmelNeural', name: 'Emel (Kadın)', gender: 'female' },
  // Daha fazla ses ekleyebilirsiniz...
];
```

## 📝 Kullanım

1. **Metin Girin:** Sol panelde sesli okutmak istediğiniz metni yazın
2. **Ses Seçin:** Sağ panelden istediğiniz sesi seçin
3. **Hız Ayarlayın:** Konuşma hızını 0.5x - 2.0x arasında ayarlayın
4. **Ses Oluşturun:** "Ses Oluştur" butonuna tıklayın
5. **Dinleyin:** Oluşturulan sesi oynatın veya indirin

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar
- **React Hot Toast** - Bildirimler
- **OpenAI Edge TTS** - Ses sentezi

## 📱 Ekran Görüntüleri

### Ana Arayüz
- Modern ve temiz tasarım
- Responsive layout
- Kolay kullanım

### Ses Kontrolleri
- Oynat/Durdur butonları
- İndirme özelliği
- Ses çubuğu kontrolü

## 🔗 API Endpoints

- `POST /api/tts` - Metin ses dönüştürme
- Backend: `http://localhost:5050/v1/audio/speech`

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- Issues bölümünde bildirin
- Dokümantasyonu kontrol edin
- API loglarını inceleyin
