# 🎤 TTS Arayüzü - Metin Sesli Okuma

OpenAI-Compatible Edge TTS API ile güçlendirilmiş modern ve kullanıcı dostu metin sesli okuma arayüzü. Microsoft Edge'in ücretsiz TTS servisini OpenAI uyumlu endpoint üzerinden kullanır.

## ✨ Özellikler

- 🇹🇷 **Türkçe Dil Desteği** - Ahmet, Emel, Seda gibi doğal Türkçe sesler
- 🌍 **Çoklu Dil Desteği** - İngilizce, Almanca, Fransızca ve daha fazlası
- ⚡ **Hız Kontrolü** - 0.5x ile 2.0x arasında konuşma hızı ayarı
- 🎵 **Ses Kontrolleri** - Oynat, durdur, indir fonksiyonları
- 📱 **Responsive Tasarım** - Mobil ve masaüstü uyumlu
- 🎨 **Modern UI** - Tailwind CSS ile tasarlanmış güzel arayüz

## 🚀 Kurulum

### 📦 **Local Development**

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/seyhancanyakan/edgetts.git
   cd edgetts
   ```

2. **Docker Compose ile çalıştırın:**
   ```bash
   docker-compose up --build
   ```

3. **Tarayıcınızda açın:**
   ```
   http://localhost:3000
   ```

### 🐳 **Coolify Deployment (Önerilen)**

1. **Coolify Dashboard'da:**
   - **New Project** > **Deploy from Git**
   - **Repository:** `https://github.com/seyhancanyakan/edgetts.git`
   - **Branch:** `master`

2. **Build Type:** Docker Compose

3. **Environment Variables:**
   ```env
   # TTS API Configuration - Production
   TTS_API_URL=http://46.62.160.181:5050/v1/audio/speech
   TTS_API_KEY=gerçek_api_key
   
   # Next.js Configuration
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   NEXT_PUBLIC_APP_URL=http://46.62.160.181:3000
   
   # Port Configuration
   FRONTEND_PORT=3000
   TTS_SERVICE_PORT=5050
   ```

4. **Port Mappings Coolify'da:**
   - Frontend: `3000:3000`
   - TTS Service: `5050:5050`

5. **Deploy & Test!** 🚀

### **📡 COOLIFY DEPLOYMENT TEST**

Deploy sonrası endpoint'leri test edin:

```bash
# Frontend health check
curl -I http://46.62.160.181:3000

# TTS API test
curl -X POST http://46.62.160.181:3000/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Coolify deployment test",
    "voice": "tr-TR-AhmetNeural",
    "speed": 1.0
  }' \
  --output coolify-test.mp3

# PowerShell test
$body = @{ input = "Coolify test"; voice = "tr-TR-AhmetNeural" } | ConvertTo-Json
Invoke-WebRequest -Uri "http://46.62.160.181:3000/api/tts" -Method POST -Body $body -ContentType "application/json" -OutFile "coolify-test.mp3"
```

### 🔧 **Manuel Kurulum**

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **OpenAI-Compatible Edge TTS Server'ı başlatın:**
   ```bash
   docker run -d -p 5050:5050 \
     -e API_KEY=sk-proj-tts-edge-api-key \
     -e DEFAULT_VOICE=tr-TR-AhmetNeural \
     -e DEFAULT_LANGUAGE=tr-TR \
     travisvn/openai-edge-tts:latest
   ```

3. **Development server'ı başlatın:**
   ```bash
   npm run dev
   ```

## 🔧 Yapılandırma

### Environment Variables

`.env.local` dosyasında:

```bash
# TTS API Configuration
TTS_API_URL=http://46.62.160.181:5050/v1/audio/speech
TTS_API_KEY=sk-openai-edge-tts

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://46.62.160.181:3000
```

### API Ayarları

`src/app/api/tts/route.ts` dosyası otomatik olarak environment variables'ları kullanır:

```typescript
const TTS_API_URL = process.env.TTS_API_URL || 'http://46.62.160.181:5050/v1/audio/speech';
const API_KEY = process.env.TTS_API_KEY || 'sk-openai-edge-tts';
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

### Frontend API
- `POST /api/tts` - Metin ses dönüştürme
- URL: `http://46.62.160.181:3000/api/tts`

### Backend TTS Service
- OpenAI Edge TTS API: `http://46.62.160.181:5050/v1/audio/speech`

### 🧪 **API Test Komutları**

**Local Test:**
```bash
# Frontend API Test
curl -X POST http://localhost:3000/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Merhaba dünya",
    "voice": "tr-TR-AhmetNeural",
    "speed": 1.0
  }' \
  --output test-audio.mp3

# Direct Edge TTS Test
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Direct test",
    "voice": "tr-TR-EmelNeural",
    "speed": 1.0
  }' \
  --output direct-test.mp3
```

**Production Test (Coolify'dan sonra):**
```bash
curl -X POST https://your-coolify-domain.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Production test",
    "voice": "tr-TR-AhmetNeural",
    "speed": 1.0
  }' \
  --output prod-test.mp3
```

**PowerShell Test:**
```powershell
$body = @{
    input = "Test mesajı"
    voice = "tr-TR-AhmetNeural"
    speed = 1.0
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/tts" -Method POST -Body $body -ContentType "application/json" -OutFile "test-audio.mp3"
```

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
