/**
 * AURA BOX — Quiet Luxury & Refined Bento Design System
 * Interactive Controller (Web & Mobile Split/Dual View, Custom Atelier Slider, Infinite Marquee)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. VIEWPORT SWITCHER (Web Anasayfa vs Split vs iPhone 16 Pro)
  // =========================================================================
  const mainWrapper = document.getElementById('mainDisplayWrapper');
  const switchBtns = document.querySelectorAll('.switch-btn');
  const btnOpenMobileFromWeb = document.getElementById('btnOpenMobileFromWeb');

  function setViewport(viewMode) {
    switchBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewMode);
    });

    mainWrapper.classList.remove('view-web-active', 'view-split-active', 'view-mobile-active');
    mainWrapper.classList.add(`view-${viewMode}-active`);
  }

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-view');
      setViewport(mode);
    });
  });

  if (btnOpenMobileFromWeb) {
    btnOpenMobileFromWeb.addEventListener('click', () => {
      setViewport('mobile');
    });
  }

  // =========================================================================
  // 1B. DUAL-INTENT SWITCHER (Kendim İçin vs Biri İçin)
  // =========================================================================
  window.setExperienceIntent = function(intent) {
    const btnSelf = document.getElementById('btnIntentSelf');
    const btnGift = document.getElementById('btnIntentGift');
    const kicker = document.getElementById('heroKickerText');
    const headline = document.getElementById('heroMainHeadline');
    const subtext = document.getElementById('heroSubtext');
    const ctaBtn = document.getElementById('heroMainCtaBtn');

    if (intent === 'self') {
      if (btnSelf) btnSelf.classList.add('active');
      if (btnGift) btnGift.classList.remove('active');
      if (kicker) kicker.textContent = 'Aura Private Concierge • Kişisel Lüks Ritüeli';
      if (headline) headline.innerHTML = 'Hak ettiğiniz <span class="gradient-headline">sessiz lüks.</span>';
      if (subtext) subtext.innerHTML = 'Dünyanın en seçkin niş parfümleri, zanaatkar mücevherleri ve saf kaşmir dokunuşlarıyla; sadece sizin stil DNA\'nıza özel mühürlenen aylık lüks ritüel.';
      if (ctaBtn) ctaBtn.innerHTML = '<span>Kişisel Profilini Oluştur</span><span class="btn-arrow">&rarr;</span>';

      // Auto-select 'self' in wizard
      const selfChip = document.querySelector('#wTargetGroup .w-chip[data-val="self"]');
      if (selfChip) {
        document.querySelectorAll('#wTargetGroup .w-chip').forEach(c => c.classList.remove('active'));
        selfChip.classList.add('active');
      }
    } else {
      if (btnGift) btnGift.classList.add('active');
      if (btnSelf) btnSelf.classList.remove('active');
      if (kicker) kicker.textContent = 'Aura Intelligence Engine • Yeni Nesil Lüks Hediye Konsiyerji';
      if (headline) headline.innerHTML = 'Kusursuz jestler.<br><span class="gradient-headline">Sıfır çaba.</span>';
      if (subtext) subtext.innerHTML = 'Unutulma stresini sıfırlayan, sevdiklerinizin zevk haritasını çözen ve kapı çalınana kadar içeriği gizli kalan kişisel konsiyerj.';
      if (ctaBtn) ctaBtn.innerHTML = '<span>Hediye Kürasyonunu Başlat</span><span class="btn-arrow">&rarr;</span>';

      // Auto-select 'es' in wizard
      const esChip = document.querySelector('#wTargetGroup .w-chip[data-val="es"]');
      if (esChip) {
        document.querySelectorAll('#wTargetGroup .w-chip').forEach(c => c.classList.remove('active'));
        esChip.classList.add('active');
      }
    }
    playChime();
  };

  // =========================================================================
  // 2. MOBİL APP TAB BAR KONTROLÜ
  // =========================================================================
  const tabButtons = document.querySelectorAll('.ios-tab-bar .tab-item');
  const tabScreens = document.querySelectorAll('.mobile-tab-screen');
  const btnFaceIdTrigger = document.getElementById('btnFaceIdTrigger');

  function switchMobileTab(targetId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === targetId);
    });

    tabScreens.forEach(screen => {
      screen.classList.toggle('active', screen.id === targetId);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      switchMobileTab(targetId);
    });
  });

  if (btnFaceIdTrigger) {
    btnFaceIdTrigger.addEventListener('click', () => {
      switchMobileTab('tabScreenCheat');
    });
  }

  // =========================================================================
  // 3. MOBİL KASA (THE VAULT) MULTISENSORY UNBOXING RİTÜELİ
  // =========================================================================
  window.breakWaxSeal = function() {
    const seal = document.getElementById('vaultWaxSeal');
    const lid = document.getElementById('vaultLid');
    const ribbon = document.getElementById('vaultRibbonSilk');
    const box = document.getElementById('vault3DBox');
    const unveiled = document.getElementById('vaultUnveiled');
    const hint = document.getElementById('vaultHintText');
    const actionBtn = document.getElementById('btnRitualAction');

    if (!seal) return;

    // Step 1: Silk slide sound & Ribbon untie
    playSilkUntieSound();
    if (ribbon) ribbon.classList.add('ribbon-untied');

    // Step 2: Wax crack sound & fracture
    setTimeout(() => {
      playWaxCrackSound();
      seal.style.transform = 'scale(1.25) rotate(-20deg)';
      seal.style.opacity = '0';
    }, 200);

    // Step 3: Lid lifts, box opens with velvet glow & items emerge
    setTimeout(() => {
      if (lid) lid.classList.add('lid-lifted');
      if (box) box.classList.add('box-open');
      playChime();

      if (unveiled) unveiled.classList.remove('hidden');
      if (hint) hint.innerHTML = '✦ <strong>Kasa Açılış Ritüeli Tamamlandı.</strong> Parçaların zanaat sertifikasını inceleyin veya sesli fısıltıyı dinleyin.';
      if (actionBtn) {
        actionBtn.innerHTML = '<span>✓ Kasa Başarıyla Açıldı</span>';
        actionBtn.style.opacity = '0.7';
        actionBtn.style.pointerEvents = 'none';
      }
    }, 450);
  };

  // Synthesized Apple-grade Audio Effects
  function playSilkUntieSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  }

  function playWaxCrackSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  // Synthesized Apple chime sound
  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } catch {}
  }

  // =========================================================================
  // 3B. ZANAAT SERTİFİKASI (PROVENANCE) & SESLİ NOT MODALLARI
  // =========================================================================
  const provenanceData = {
    necklace: {
      serial: 'SERİ NO: AB-2026-042/100',
      title: 'Aytaşı 925 Rodyumlu Kolye',
      subtitle: 'Bu parça, Atelier Margot tarafından Aura Box üyeleri için sınırlı sayıda özel olarak elde işlenmiştir.',
      artisan: 'Atelier Margot • Harun Usta',
      location: 'Nişantaşı (Merkeze 0.8 km)',
      material: '925 Ayar Gümüş & Doğal Aytaşı',
      quality: 'Ömür Boyu Bakım Garantili'
    },
    perfume: {
      serial: 'SERİ NO: EXP-772/500',
      title: 'Amber Grand Extrait de Parfum (50ml)',
      subtitle: 'Fransa Grasse esansları ile Moda atölyesinde dinlendirilmiş saf extrait konsantrasyonu.',
      artisan: 'Oud & Botanica • Parfümör Cemal B.',
      location: 'Moda / Kadıköy (Merkeze 1.4 km)',
      material: 'İtalyan Bergamotu, Fransız Lavantası, Beyaz Sedir',
      quality: '%30 Esans Yoğunluğu (24 Saat Kalıcılık)'
    },
    chocolate: {
      serial: 'PARTİ NO: TRUF-0982-FRESH',
      title: 'Altın Varaklı Belçika Trüfleri',
      subtitle: 'Sipariş günü sabahı temperlenen taze Belçika kuvertürü ve Madagaskar vanilyası.',
      artisan: 'Madlen Artisan Choco',
      location: 'Bebek (Merkeze 1.1 km)',
      material: '%72 Kakaolu Bitter & Yenilebilir Altın Varak',
      quality: 'Aynı Gün Üretim (Sıfır Koruyucu Madde)'
    },
    watch: {
      serial: 'SERİ NO: GNV-901/250',
      title: 'İsviçre Saat Aksesuarı & Deri Seyahat Rulosu',
      subtitle: 'Toskana bitkisel tabaklanmış sığır derisinden elde dikilen saat koruma kılıfı.',
      artisan: 'Geneva Vault • Usta Ziya',
      location: 'Bebek (Merkeze 1.2 km)',
      material: 'Hakiki Toskana Derisi, Pirinç Tokalar',
      quality: 'Ömür Boyu Dikiş Garantisi'
    },
    candle: {
      serial: 'PARTİ NO: WAX-104-EDITION',
      title: 'Mermer Kaideli Sedir & Paçuli Soya Mumu',
      subtitle: 'Afyon beyaz mermer bloklarının elde oyulmasıyla hazırlanan yeniden doldurulabilir tasarım kap.',
      artisan: 'Maison Wax Studio • Selin T.',
      location: 'Karaköy (Merkeze 2.1 km)',
      material: '%100 Doğal Soya Mumu, Sedir Ağacı Esansı',
      quality: '65 Saat İs Yapmadan Yanma'
    },
    bracelet: {
      serial: 'SERİ NO: BR-910/300',
      title: '14K Rose Altın İtalyan Örgü Bileklik',
      subtitle: 'Milano kuyumculuk geleneğinden ilhamla elde örülen 14 ayar rose altın mücevher.',
      artisan: 'Atelier Margot Fine • Selim Usta',
      location: 'Nişantaşı (Merkeze 0.8 km)',
      material: '14 Ayar Rose Altın, Güvenlik Kilitli',
      quality: 'Ömür Boyu Parlatma & Bakım Garantisi'
    },
    cashmere: {
      serial: 'SERİ NO: KSH-412/100',
      title: 'Moğolistan Saf Kaşmir Dokuma Şal',
      subtitle: 'İç Moğolistan dağ keçisi tiftiğinden dokunan, tüy hafifliğinde ultra lüks şal.',
      artisan: 'Atelier Tessuto • Loro Piana Ekolü',
      location: 'Bomonti (Merkeze 1.6 km)',
      material: '%100 2-Kat Bükümlü Kaşmir Yünü',
      quality: 'Doğal Ekolojik Boyalı • Hypoallergenic'
    },
    ceramic: {
      serial: 'PARTİ NO: CER-204-HAND',
      title: 'Ham Mat Sır Seramik Kupa & Mermer Tütsülük',
      subtitle: 'Tornada tek tek şekillendirilen ve odun fırınında 1250°C derecede pişirilen zanaat parçası.',
      artisan: 'Defne Sanat Stüdyosu • Defne K.',
      location: 'Kuzguncuk (Merkeze 3.2 km)',
      material: 'Taş Çamuru (Stoneware) & Mat Kül Sırı',
      quality: 'Gıda Uyumlu • Bulaşık Makinesi Güvenli'
    },
    leather: {
      serial: 'SERİ NO: SMY-088-ROYAL',
      title: 'Kraliyet Mühürlü Hakiki Deri Kılıf & Defter',
      subtitle: 'İngiliz ciltçilik geleneğiyle altın yaldız kenarlı sayfalar ve bitkisel tabak deri kılıf.',
      artisan: 'Smythson Ekolü Atölye',
      location: 'Galata (Merkeze 1.9 km)',
      material: 'Krosgrain Sığır Derisi & Kuşe Kağıt',
      quality: 'Kişiselleştirilmiş Baş Harf Baskı Uyumlu'
    },
    relais: {
      serial: 'DAVETİYE KODU: RC-URLA-VIP-092',
      title: 'Urla Butik Bağ Evi Özel Tadım Davetiyesi',
      subtitle: 'Asırlık zeytinlikler arasında çift kişilik sommelier eşliğinde gün batımı tadımı ve süit konaklama.',
      artisan: 'Relais Concierge Network',
      location: 'Urla Bağ Yolu / İzmir',
      material: 'Özel Kaligrafi Davetiye Kartı & Rezervasyon Anahtarı',
      quality: '12 Ay Geçerli Esnek Rezervasyon'
    }
  };

  window.openProvenance = function(type) {
    const data = provenanceData[type] || provenanceData.necklace;
    const certSerial = document.getElementById('certSerial');
    const certTitle = document.getElementById('certTitle');
    const certSubtitle = document.getElementById('certSubtitle');
    const certArtisan = document.getElementById('certArtisan');
    const certLocation = document.getElementById('certLocation');
    const certMaterial = document.getElementById('certMaterial');
    const certQuality = document.getElementById('certQuality');

    if (certSerial) certSerial.textContent = data.serial;
    if (certTitle) certTitle.textContent = data.title;
    if (certSubtitle) certSubtitle.textContent = data.subtitle;
    if (certArtisan) certArtisan.textContent = data.artisan;
    if (certLocation) certLocation.textContent = data.location;
    if (certMaterial) certMaterial.textContent = data.material;
    if (certQuality) certQuality.textContent = data.quality;

    const modal = document.getElementById('provenanceModal');
    if (modal) modal.classList.add('modal-open');
    playChime();
  };

  window.openVoiceModal = function() {
    const modal = document.getElementById('voiceMemoModal');
    if (modal) modal.classList.add('modal-open');
    playChime();
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('modal-open');
      if (modalId === 'voiceMemoModal') {
        const player = modal.querySelector('.v-audio-player');
        const btn = document.getElementById('btnModalPlayAudio');
        if (player) player.classList.remove('playing');
        if (btn) btn.textContent = '▶';
        isAudioPlaying = false;
      }
    }
  };

  window.closeModalOnBackdrop = function(e, modalId) {
    if (e.target.id === modalId) {
      window.closeModal(modalId);
    }
  };

  let isAudioPlaying = false;
  window.toggleModalAudio = function() {
    const btn = document.getElementById('btnModalPlayAudio');
    const player = document.querySelector('.v-audio-player');
    isAudioPlaying = !isAudioPlaying;
    if (btn) btn.textContent = isAudioPlaying ? '❚❚' : '▶';
    if (player) {
      if (isAudioPlaying) player.classList.add('playing');
      else player.classList.remove('playing');
    }
    playChime();
  };

  // =========================================================================
  // 3C. ONBOARDING SESLİ FISILTI SİMÜLASYONU
  // =========================================================================
  let isRecordingVoice = false;
  window.toggleVoiceRecord = function() {
    const btn = document.getElementById('btnMicRecord');
    const micIcon = document.getElementById('micIcon');
    const title = document.getElementById('recordStatusTitle');
    const sub = document.getElementById('recordStatusSub');
    const wave = document.getElementById('recordWaveLive');
    const parseResult = document.getElementById('aiNoteParseResult');

    if (!isRecordingVoice) {
      isRecordingVoice = true;
      if (btn) btn.classList.add('recording');
      if (micIcon) micIcon.textContent = '⏹';
      if (title) title.textContent = '🎙️ Dinleniyor... (0:03 / 0:10)';
      if (sub) sub.textContent = 'Lütfen konuşun: Eşinizin ruh hali, iş temposu veya istekleri...';
      if (wave) wave.classList.add('active');
      playWaxCrackSound();

      // Auto stop after 2.5s simulation
      setTimeout(() => {
        isRecordingVoice = false;
        if (btn) btn.classList.remove('recording');
        if (micIcon) micIcon.textContent = '✓';
        if (title) title.innerHTML = '✓ <strong>Sesli Fısıltı Kaydedildi (0:12)</strong>';
        if (sub) sub.textContent = 'Kutuya özel mühürlü QR hatıra kartı olarak eklendi!';
        if (wave) wave.classList.remove('active');
        if (parseResult) {
          parseResult.innerHTML = '✦ <strong>Ses Analizi Tamamlandı:</strong> Yorgunluk ve sevgi tonu tespit edildi; dinlendirici spa, lavanta ve doğal ametist kolye ağırlığı %30 artırıldı. Zarf içerisine sesli QR basıldı.';
        }
        playChime();
      }, 2500);
    }
  };

  // =========================================================================
  // 4. INFINITE MARQUEE CLONER (Kesintisiz Kayan Filmşeridi)
  // =========================================================================
  const marqueeTrack = document.querySelector('.luxury-marquee-track');
  if (marqueeTrack) {
    const cards = Array.from(marqueeTrack.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });
  }

  // =========================================================================
  // 5. APPLE-STYLE MEMBERSHIP STUDIO CONSOLE & ÖZEL BÜTÇE
  // =========================================================================
  const CONSOLE_TIERS = {
    petite: {
      name: 'Aura Petite',
      badge: 'Mikro-Jest & Zarafet',
      arbitrage: 'Piyasa Perakende Değeri: ~1.200 ₺',
      desc: 'Yeni başlayan flörtler, kıymetli dostluklar veya kendinize küçük bir moral ve self-reward jesti.',
      price: { monthly: '850', bimonthly: '950', special: '1.050' },
      chips: [
        '✦ Tasarım Sukulent veya Cam Teraryum',
        '✦ El Yapımı Dolgulu Artisan Çikolata',
        '✦ Doğal Soya Mumu & Aromaterapi',
        '✦ Kişiye Özel Kaligrafi Motto Kartı'
      ]
    },
    signature: {
      name: 'Aura Signature',
      badge: 'Standart / Romantik',
      arbitrage: 'Piyasa Perakende Değeri: ~3.800 ₺',
      desc: 'Eşe, sevgiliye ve kendinize düzenli zarafet. Butik çiçek, gurme çikolata, tasarım obje ve organik bakım ritüeli.',
      price: { monthly: '2.600', bimonthly: '2.850', special: '3.100' },
      chips: [
        '✦ Butik Tasarım Buket (VIP Kurye)',
        '✦ Single-Origin Kahve & Trüf',
        '✦ Sanatçı İmzalı Seramik Fincan',
        '✦ Organik Cilt Bakım & Duş Ritüeli'
      ]
    },
    prestige: {
      name: 'Aura Prestige',
      badge: 'VIP Prestige & Niche Zevkler',
      arbitrage: 'Piyasa Perakende Değeri: ~8.200 ₺',
      desc: 'Lüks zevklere sahip partnerler, iş ortakları ve prestijli anlar için yüksek kalibreli sürprizler.',
      price: { monthly: '5.500', bimonthly: '5.950', special: '6.400' },
      chips: [
        '✦ Niche Extrait Parfüm (Özel Koku Evleri)',
        '✦ 925 Ayar Gümüş / Doğal Taş Takı',
        '✦ El Yapımı Hakiki Deri Kartlık',
        '✦ Çift Kişilik Özel Kültür & Sanat Bileti'
      ]
    },
    prive: {
      name: 'Aura Privé',
      badge: 'Haute Curation & Fine Jewelry',
      arbitrage: 'Piyasa Perakende Değeri: ~18.500 ₺',
      desc: 'Altın dokunuşlar, İtalyan saf ipek ve sınırlı sayıda üretilen zanaatkar objeleriyle büyüleyen üst segment deneyim.',
      price: { monthly: '12.500', bimonthly: '13.500', special: '14.800' },
      chips: [
        '✦ 14K Altın & Aytaşı Tasarım Mücevher',
        '✦ İtalyan Saf İpek Twilly Fular',
        '✦ Grand Cru Şarap Kadehi & Trüf Havuzu',
        '✦ Kişisel Konsiyerj Özel Mührü'
      ]
    },
    vault: {
      name: 'Aura Grand Vault',
      badge: 'Zaman ve Mücevher Ustaları',
      arbitrage: 'Piyasa Perakende Değeri: ~36.000 ₺',
      desc: 'İsviçre horoloji aksesuarları, sertifikalı pırlanta mücevherler ve hafta sonu butik kaçamak ayrıcalıkları.',
      price: { monthly: '24.000', bimonthly: '25.500', special: '27.500' },
      chips: [
        '✦ Sertifikalı Pırlanta Kolye veya Küpe',
        '✦ İsviçre Mekanizma Saat Kurma Kutusu',
        '✦ Moğolistan Saf Bebek Kaşmiri Şal',
        '✦ Butik Bağ Evi / Relais & Châteaux Daveti'
      ]
    },
    black: {
      name: 'Aura Black',
      badge: 'Ultra-Lüks & Özel Danışman',
      arbitrage: 'Piyasa Perakende Değeri: ~65.000+ ₺',
      desc: 'Sınırsız bütçe, tam kişiselleştirilmiş kürasyon ve 7/24 özel yaşam konsiyerji desteğiyle ulaşılamaz deneyimler.',
      price: { monthly: '42.000+', bimonthly: '45.000+', special: '48.000+' },
      chips: [
        '✦ Haute Horlogerie & Yüksek Mücevher',
        '✦ Özel Şoförlü Stealth Sürpriz Teslimat',
        '✦ Michelin Yıldızlı Şef Rezervasyonu',
        '✦ Yılda 2 Kez VIP Hafta Sonu Kaçamağı'
      ]
    }
  };

  let currentConsoleFreq = 'monthly';
  let currentConsoleTier = 'signature';

  window.switchConsoleFreq = function(freq) {
    currentConsoleFreq = freq;
    document.querySelectorAll('.cfs-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-freq') === freq);
    });

    const freqNotes = {
      monthly: 'Aylık Düzenli Teslimat (Yılda 12 Kutu)',
      bimonthly: '2 Ayda Bir Teslimat (Yılda 6 Kutu)',
      special: 'Özel Günler + 1 Salı Sürprizi (Yılda 5 Kutu)'
    };
    const freqEl = document.getElementById('cmcFreqNote');
    if (freqEl && freqNotes[freq]) freqEl.textContent = freqNotes[freq];

    // Update prices on tabs
    document.querySelectorAll('.cts-tab').forEach(tab => {
      const tKey = tab.getAttribute('data-tier');
      if (CONSOLE_TIERS[tKey]) {
        const priceEl = tab.querySelector('.cts-price');
        if (priceEl) priceEl.textContent = `${CONSOLE_TIERS[tKey].price[freq]} ₺`;
      }
    });

    // Update master card
    updateConsoleMasterCard();
    playChime();
  };

  window.selectConsoleTier = function(tier) {
    if (!CONSOLE_TIERS[tier]) return;
    currentConsoleTier = tier;

    document.querySelectorAll('.cts-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tier') === tier);
    });

    updateConsoleMasterCard();
    playChime();
  };

  function updateConsoleMasterCard() {
    const data = CONSOLE_TIERS[currentConsoleTier];
    if (!data) return;

    const badgeEl = document.getElementById('cmcTierBadge');
    const arbEl = document.getElementById('cmcArbitrageTag');
    const titleEl = document.getElementById('cmcTierTitle');
    const descEl = document.getElementById('cmcTierDesc');
    const chipsEl = document.getElementById('cmcChipsGrid');
    const priceEl = document.getElementById('cmcPriceVal');

    if (badgeEl) badgeEl.textContent = data.badge;
    if (arbEl) arbEl.textContent = data.arbitrage;
    if (titleEl) titleEl.textContent = data.name;
    if (descEl) descEl.textContent = data.desc;
    if (priceEl) priceEl.textContent = data.price[currentConsoleFreq] || data.price.monthly;

    if (chipsEl) {
      chipsEl.innerHTML = data.chips.map(chip => `<span class="cmc-chip">${chip}</span>`).join('');
    }
  }

  window.applyConsoleTierAndScroll = function() {
    const data = CONSOLE_TIERS[currentConsoleTier];
    const chosenTitle = document.getElementById('wizardChosenTierTitle');
    if (chosenTitle && data) {
      const p = data.price[currentConsoleFreq] || data.price.monthly;
      chosenTitle.innerHTML = `Seçilen Kademe: <strong>${data.name} (${p} ₺/kutu)</strong>`;
    }

    const onboardingSection = document.getElementById('onboarding-web');
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.handleConsoleSlider = function(val) {
    const num = parseInt(val, 10);
    const labelEl = document.getElementById('customSliderValLabel');
    const previewEl = document.getElementById('consoleSliderPreviewText');

    if (labelEl) {
      labelEl.innerHTML = `Seçilen Özel Bütçe: <strong>${num.toLocaleString('tr-TR')} ₺ / kutu</strong>`;
    }

    if (previewEl) {
      if (num < 3000) {
        previewEl.textContent = '"İncelikli mini tasarım sukulent, el yapımı aromaterapi mumu ve butik artisan trüfler."';
      } else if (num < 8000) {
        previewEl.textContent = '"Taze butik tasarım çiçek buketi, 925 ayar gümüş takı ve el yapımı seramik sanat eseri fincan."';
      } else if (num < 20000) {
        previewEl.textContent = '"Niche extrait parfüm, 14K altın pırlanta dokunuşu, İtalyan hakiki deri aksesuar ve gurme tadım deneyimi."';
      } else if (num < 45000) {
        previewEl.textContent = '"Sertifikalı pırlanta kolye, saf Moğolistan kaşmiri şal, İsviçre saat kurma kutusu ve Relais & Châteaux daveti."';
      } else {
        previewEl.textContent = '"Haute horlogerie saat aksesuarları, pırlanta takı, şoförlü gizli teslimat ve Michelin restoran rezervasyonu."';
      }
    }
  };

  window.applyConsoleCustomBudget = function() {
    const slider = document.getElementById('consoleBudgetRange');
    const val = slider ? parseInt(slider.value, 10).toLocaleString('tr-TR') : '15.000';
    const chosenTitle = document.getElementById('wizardChosenTierTitle');
    if (chosenTitle) {
      chosenTitle.innerHTML = `Özel Bütçeniz: <strong>Aura Atelier Custom (${val} ₺/kutu)</strong>`;
    }

    const onboardingSection = document.getElementById('onboarding-web');
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Backward compatibility for existing buttons if any
  window.selectTierAndScroll = function(tierName) {
    if (CONSOLE_TIERS[tierName]) {
      selectConsoleTier(tierName);
      applyConsoleTierAndScroll();
    }
  };

  // =========================================================================
  // 6. 60-SANİYELİK ONBOARDING SİHİRBAZI (WIZARD)
  // =========================================================================
  window.nextWizardStep = function(stepNum) {
    const steps = document.querySelectorAll('.wizard-step-pane');
    const stepIndicators = document.querySelectorAll('.wizard-stepper-header .w-step');

    steps.forEach((p, idx) => {
      p.classList.toggle('active', idx + 1 === stepNum);
    });

    stepIndicators.forEach((ind, idx) => {
      ind.classList.toggle('active', idx + 1 === stepNum);
    });
  };

  window.generateAiBoxPreview = function() {
    window.nextWizardStep(4);
    playChime();

    const scanScreen = document.getElementById('aiScanScreen');
    const revealScreen = document.getElementById('aiRevealScreen');
    const tickerSteps = document.querySelectorAll('#aiScanTicker .scan-step-item');

    // Extract dates from step 3 if filled
    const dateInput = document.querySelector('#wStep3 .input-lux');
    const revealDeliveryDate = document.getElementById('aiRevealDeliveryDate');
    if (dateInput && dateInput.value.trim() && revealDeliveryDate) {
      revealDeliveryDate.textContent = dateInput.value.trim();
    }

    if (scanScreen && revealScreen) {
      scanScreen.style.display = 'block';
      revealScreen.style.display = 'none';

      let currentStep = 0;
      const stepInterval = setInterval(() => {
        currentStep++;
        if (tickerSteps[currentStep]) {
          tickerSteps.forEach((st, i) => st.classList.toggle('active', i === currentStep));
        }
      }, 500);

      setTimeout(() => {
        clearInterval(stepInterval);
        scanScreen.style.display = 'none';
        revealScreen.style.display = 'flex';
        playChime();
      }, 2100);
    }
  };

  window.lockAiRecommendationAndProceed = function(tier) {
    if (typeof selectConsoleTier === 'function') {
      selectConsoleTier(tier);
    }
    const paketler = document.getElementById('paketler');
    if (paketler) {
      paketler.scrollIntoView({ behavior: 'smooth' });
    }
    playChime();
  };

  // Chip Selector Helpers
  function initChipGroup(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return;
    const chips = group.querySelectorAll('.w-chip');
    chips.forEach(c => {
      c.addEventListener('click', () => {
        chips.forEach(item => item.classList.remove('active'));
        c.classList.add('active');
      });
    });
  }

  initChipGroup('wTargetGroup');
  initChipGroup('wPersonaGroup');

  // =========================================================================
  // 7. WEB FREKANS SEÇİCİ
  // =========================================================================
  const freqButtons = document.querySelectorAll('.web-freq-btn');
  const tierCards = document.querySelectorAll('.tier-editorial-card');

  const priceMap = {
    monthly: {
      petite: { price: '850', curr: '₺ / kutu', badge: '🏆 %20 Sadakat İndirimi (12 Kutu/Yıl)', type: 'loyalty' },
      signature: { price: '2.600', curr: '₺ / kutu', badge: '🏆 En Avantajlı Fiyat (12 Kutu/Yıl)', type: 'loyalty' },
      prestige: { price: '5.500', curr: '₺ / kutu', badge: '🏆 VIP Sadakat Fiyatı (12 Kutu/Yıl)', type: 'loyalty' },
      prive: { price: '12.500', curr: '₺ / kutu', badge: '🏆 Privé Sadakat Avantajı (12 Kutu/Yıl)', type: 'loyalty' },
      grand: { price: '24.000', curr: '₺ / kutu', badge: '🏆 Grand Sadakat Avantajı (12 Kutu/Yıl)', type: 'loyalty' },
      black: { price: '42.000+', curr: '₺ / kutu', badge: '🏆 Exclusive Kulüp (12 Kutu/Yıl)', type: 'loyalty' }
    },
    bimonthly: {
      petite: { price: '1.000', curr: '₺ / kutu', badge: '📦 2 Ayda Bir (Yılda 6 Kutu)', type: 'standard' },
      signature: { price: '3.000', curr: '₺ / kutu', badge: '📦 Standart Fiyat (Yılda 6 Kutu)', type: 'standard' },
      prestige: { price: '6.500', curr: '₺ / kutu', badge: '📦 Standart VIP (Yılda 6 Kutu)', type: 'standard' },
      prive: { price: '14.500', curr: '₺ / kutu', badge: '📦 Standart Privé (Yılda 6 Kutu)', type: 'standard' },
      grand: { price: '28.000', curr: '₺ / kutu', badge: '📦 Standart Grand (Yılda 6 Kutu)', type: 'standard' },
      black: { price: '50.000+', curr: '₺ / kutu', badge: '📦 Standart Özel (Yılda 6 Kutu)', type: 'standard' }
    },
    special: {
      petite: { price: '1.200', curr: '₺ / kutu', badge: '🎯 Özel Günler (Yılda 4-5 Kutu)', type: 'flexible' },
      signature: { price: '3.600', curr: '₺ / kutu', badge: '🎯 Özel Günler (Yılda 4-5 Kutu)', type: 'flexible' },
      prestige: { price: '7.800', curr: '₺ / kutu', badge: '🎯 Randevulu VIP (Yılda 4-5 Kutu)', type: 'flexible' },
      prive: { price: '17.500', curr: '₺ / kutu', badge: '🎯 Randevulu Privé (Yılda 4-5 Kutu)', type: 'flexible' },
      grand: { price: '33.000', curr: '₺ / kutu', badge: '🎯 Randevulu Grand (Yılda 4-5 Kutu)', type: 'flexible' },
      black: { price: '58.000+', curr: '₺ / kutu', badge: '🎯 Özel Tarih JIT (Yılda 4-5 Kutu)', type: 'flexible' }
    }
  };

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-freq');

      const prices = priceMap[f];
      if (!prices) return;

      const keys = ['petite', 'signature', 'prestige', 'prive', 'grand', 'black'];
      tierCards.forEach((c, idx) => {
        const valSpan = c.querySelector('.price-val');
        const currSpan = c.querySelector('.price-curr');
        const badgeSpan = c.querySelector('.tier-freq-sub');
        const k = keys[idx];
        if (prices[k]) {
          if (valSpan) valSpan.textContent = prices[k].price;
          if (currSpan) currSpan.textContent = prices[k].curr;
          if (badgeSpan) {
            badgeSpan.innerHTML = `<span class="freq-tag-badge ${prices[k].type}">${prices[k].badge}</span>`;
          }
        }
      });
      playChime();
    });
  });

  // =========================================================================
  // VISION AI STİL DNA'SI & FOTOĞRAF TARAMASI (ONBOARDING ADIM 1)
  // =========================================================================
  const visionDataMap = {
    riviera: {
      name: 'Fransız Riviera & İpek',
      score: '%97.8',
      swatches: ['#FAF5FF', '#E9D5FF', '#581C87', '#F5EBE0'],
      materials: '✦ %100 Doğal İpek • 925 Rodyumlu Gümüş • Ham Seramik',
      fragrance: '✦ Pudralı Fransız Lavantası & Beyaz Sedir'
    },
    scandi: {
      name: 'Minimalist İskandinav',
      score: '%98.5',
      swatches: ['#FFFFFF', '#ECE8F2', '#2E1065', '#D4AF37'],
      materials: '✦ Ham Meşe • Organik Soya Mumu • Saf 925 Gümüş',
      fragrance: '✦ Adaçayı & Narenciye Ağacı Notaları'
    },
    glamour: {
      name: 'Modern Glamour & Taş',
      score: '%96.9',
      swatches: ['#FFFBEB', '#FEF3C7', '#B45309', '#1E0B36'],
      materials: '✦ 0.30ct Pırlanta • İtalyan Derisi • Altın Varak',
      fragrance: '✦ Amber Grand Extrait & Odunsu Vanilya'
    }
  };

  let currentSelectedVisionStyle = 'Fransız Riviera & İpek';

  window.simulateVisionScan = function(styleKey) {
    const data = visionDataMap[styleKey];
    if (!data) return;

    currentSelectedVisionStyle = data.name;

    // Kartların aktifliğini güncelle
    const cards = document.querySelectorAll('.photo-preset-card');
    cards.forEach(c => c.classList.toggle('active', c.getAttribute('data-style') === styleKey));

    // Skor ve metinleri güncelle
    const scoreEl = document.getElementById('vrScoreVal');
    const materialsEl = document.getElementById('vrMaterials');
    const fragranceEl = document.getElementById('vrFragrance');
    const swatchesWrap = document.getElementById('vrSwatches');
    const summaryStyle = document.getElementById('summaryVisionStyle');

    if (scoreEl) scoreEl.textContent = data.score;
    if (materialsEl) materialsEl.textContent = data.materials;
    if (fragranceEl) fragranceEl.textContent = data.fragrance;
    if (summaryStyle) summaryStyle.textContent = data.name;

    if (swatchesWrap) {
      swatchesWrap.innerHTML = data.swatches.map(hex => 
        `<span class="swatch" style="background:${hex}"></span>`
      ).join('');
    }
  };

  window.handleCustomPhotoUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    currentSelectedVisionStyle = `Özel Fotoğraf Analizi (${file.name.substring(0, 14)}...)`;
    
    // Preset kartlarının aktifliğini temizle
    document.querySelectorAll('.photo-preset-card').forEach(c => c.classList.remove('active'));

    const scoreEl = document.getElementById('vrScoreVal');
    const materialsEl = document.getElementById('vrMaterials');
    const fragranceEl = document.getElementById('vrFragrance');
    const summaryStyle = document.getElementById('summaryVisionStyle');

    if (scoreEl) scoreEl.textContent = '%99.2 (Yüksek Güven)';
    if (materialsEl) materialsEl.textContent = '✦ Kullanıcı Fotoğrafından Çıkarılan: Doğal İpek & Rodyumlu Gümüş';
    if (fragranceEl) fragranceEl.textContent = '✦ Görsel Tonlarla Eşleşen: Pudralı Çiçeksi & Beyaz Sedir';
    if (summaryStyle) summaryStyle.textContent = currentSelectedVisionStyle;
  };

  window.handleNotesInput = function(val) {
    const tag = document.getElementById('aiNoteParseResult');
    const summaryNotes = document.getElementById('summaryNotes');

    if (!val || !val.trim()) {
      if (tag) tag.textContent = 'Yapay zeka notunuzu bekliyor...';
      if (summaryNotes) summaryNotes.textContent = 'Belirtilmedi (Algoritmik Denge)';
      return;
    }

    if (summaryNotes) {
      summaryNotes.textContent = val.length > 25 ? val.substring(0, 22) + '...' : val;
    }

    if (tag) {
      if (val.toLowerCase().includes('yorgun') || val.toLowerCase().includes('yoğun')) {
        tag.textContent = '✦ Stres/Yoğunluk tespit edildi: Dinlendirici spa, soya mumu ve sakinleştirici koku önceliklendirildi (+%45).';
      } else if (val.toLowerCase().includes('kahve') || val.toLowerCase().includes('lezzet')) {
        tag.textContent = '✦ Gurme tercihi işlendi: Single-origin kahve & el yapımı trüf ağırlığı artırıldı.';
      } else {
        tag.textContent = '✦ Kişisel notunuz ayrıştırıldı ve algoritmik parametrelere başarıyla işlendi.';
      }
    }
  };

  // =========================================================================
  // YAŞAYAN ZEKA REZONANS GRAFİĞİ (ACT II)
  // =========================================================================
  const tasteMonthData = {
    1: {
      score: '%74.2',
      fill: '74.2%',
      style: '"Başlangıç zevk profili oluşturuldu: Temel tercihler ve kırmızı çizgiler işleniyor."',
      data: '1 Anket Formu • Temel Kategori Seçimi • İlk Stil Fotoğrafı',
      decision: '✦ Standart Signature koleksiyonundan risksiz ve dengeli ilk sürpriz kurgulandı.'
    },
    3: {
      score: '%86.5',
      fill: '86.5%',
      style: '"Ametist taşı ve taze lavanta tutkusu keşfedildi; ağır paçuli esansları elendi."',
      data: '1 Gardırop Fotoğrafı • 2 WhatsApp Fısıltı Notu • 2 Teslimat Puanı (4.8 / 5.0)',
      decision: '✦ Şekerli tatlar tamamen kaldırıldı, doğal soya mumu ve rodyum gümüş kolyeler kilitlendi.'
    },
    6: {
      score: '%94.6',
      fill: '94.6%',
      style: '"Pastel leylak & ipek fular tutkunu, ağır paçuli yerine taze Fransız lavantası seven, 925 rodyumlu gümüş kolyelere hayran."',
      data: '2 Gardırop Fotoğrafı • 3 Özel WhatsApp Fısıltı Notu • 5 Teslimat Sonrası Memnuniyet Skoru (4.9 / 5.0)',
      decision: '✦ Yüksek yoğunluk tespit edildi: Sakinleştirici aromaterapi & el yapımı ametist kolye eşleşmesi tetiklendi.'
    },
    12: {
      score: '%99.2',
      fill: '99.2%',
      style: '"Sevdiklerinizin ruhu matematiksel olarak haritalandı. Kelimelere dökmediği zarafet beklentileri anında karşılanıyor."',
      data: '4 Fotoğraf Analizi • 11 Fısıltı Brifingi • 12 Kutu Açılımı Geri Bildirimi (%100 Memnuniyet)',
      decision: '✦ Yıldönümü için İsviçre zanaatı özel saat aksesuarı & pırlanta detaylı kolye eşleştirmesi kilitlendi.'
    }
  };

  window.selectTasteMonth = function(m) {
    const d = tasteMonthData[m];
    if (!d) return;

    document.querySelectorAll('.tr-month-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-month')) === m);
    });

    const scoreEl = document.getElementById('tasteAffinityScore');
    const fillEl = document.getElementById('tasteProgressFill');
    const styleEl = document.getElementById('tasteLearnedStyle');
    const dataEl = document.getElementById('tasteLearnedData');
    const decEl = document.getElementById('tasteNextDecision');

    if (scoreEl) scoreEl.textContent = d.score;
    if (fillEl) fillEl.style.width = d.fill;
    if (styleEl) styleEl.textContent = d.style;
    if (dataEl) dataEl.textContent = d.data;
    if (decEl) decEl.textContent = d.decision;
  };

  window.selectTierAndScroll = function(tierName) {
    const tierNames = {
      petite: 'Aura Petite (850 ₺/kutu)',
      signature: 'Aura Signature (2.600 ₺/kutu)',
      prestige: 'Aura Prestige (5.500 ₺/kutu)',
      prive: 'Aura Privé (12.500 ₺/kutu)',
      grand: 'Aura Grand Atelier (24.000 ₺/kutu)',
      black: 'Aura Black (42.000+ ₺/kutu)'
    };
    const chosenTitle = document.getElementById('wizardChosenTierTitle');
    if (chosenTitle && tierNames[tierName]) {
      chosenTitle.innerHTML = `Seçilen Kademe: <strong>${tierNames[tierName]}</strong>`;
    }

    const onboardingSection = document.getElementById('onboarding-web');
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.showAppAlert = function(msg) {
    alert(msg);
    setViewport('split');
    switchMobileTab('tabScreenHome');
  };

  // Concierge Chat send message simulation
  const chatInput = document.querySelector('.chat-in');
  const chatSendBtn = document.querySelector('.chat-send-btn');
  const chatStream = document.querySelector('.app-chat-stream');

  function sendChatMessage() {
    if (!chatInput || !chatInput.value.trim() || !chatStream) return;
    const txt = chatInput.value.trim();
    chatInput.value = '';

    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user';
    userBubble.innerHTML = `<p>${txt}</p><span class="b-time">Şimdi</span>`;
    chatStream.appendChild(userBubble);

    setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.className = 'bubble bot';
      botBubble.innerHTML = `<p>Talebiniz kaydedildi Berat Bey. Özel küratörümüz hazırlığı güncelliyor. ✦</p><span class="b-time">Şimdi</span>`;
      chatStream.appendChild(botBubble);
      chatStream.scrollTop = chatStream.scrollHeight;
    }, 600);
  }

  if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // =========================================================================
  // 6. SMART CALENDAR SYNC SIMULATION
  // =========================================================================
  window.simulateCalendarSync = function(provider) {
    const statusPill = document.getElementById('calSyncStatus');
    const msg = document.getElementById('calSyncMsg');
    const inputs = document.querySelectorAll('#wStep3 .input-lux');

    if (inputs.length >= 2) {
      inputs[0].value = '14 Ekim (Doğum Günü)';
      inputs[0].style.borderColor = '#10B981';
      inputs[1].value = '28 Haziran (Yıldönümü)';
      inputs[1].style.borderColor = '#10B981';
    }

    if (statusPill && msg) {
      statusPill.style.display = 'inline-flex';
      const provName = provider === 'google' ? 'Google Calendar' : 'Apple iCal';
      msg.textContent = `✓ ${provName} bağlandı: 2 kritik tarih takvimden otomatik aktarıldı!`;
    }
    playChime();
  };

  // =========================================================================
  // 7. STEALTH NOTIFICATION TOAST (APPLE PUSH SIMULATOR)
  // =========================================================================
  const toast = document.getElementById('stealthToast');
  window.dismissStealthToast = function() {
    if (toast) {
      toast.classList.remove('show');
      toast.classList.add('dismissed');
    }
  };

  // Show stealth toast automatically after 3.2 seconds
  setTimeout(() => {
    if (toast && !toast.classList.contains('dismissed')) {
      toast.classList.add('show');
      playChime();
    }
  }, 3200);

  // =========================================================================
  // 8. LOOKBOOK GENDER & PERSONA FILTERS
  // =========================================================================
  window.filterLookbook = function(category) {
    const buttons = document.querySelectorAll('.lb-filter-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    const cards = document.querySelectorAll('.luxury-marquee-track .lookbook-item-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category') || '';
      if (category === 'all' || cat.includes(category)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    playChime();
  };

  // =========================================================================
  // 9. 3D GYRO BOX TILT & HOLOGRAPHIC SHIMMER
  // =========================================================================
  window.handleGyroBoxMove = function(event) {
    const card = document.getElementById('gyroBoxCard');
    const mesh = document.getElementById('gyroBoxMesh');
    if (!card || !mesh) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = (x - rect.width / 2) / (rect.width / 2);
    const dy = (y - rect.height / 2) / (rect.height / 2);

    mesh.style.transform = `rotateY(${dx * 22}deg) rotateX(${-dy * 16}deg)`;
  };

  window.resetGyroBox = function() {
    const mesh = document.getElementById('gyroBoxMesh');
    if (mesh) {
      mesh.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  };

  window.handleHologramShimmer = function(event) {
    const card = document.getElementById('hologramPassportCard');
    const layer = document.getElementById('holoShimmerLayer');
    if (!card || !layer) return;

    const rect = card.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    layer.style.setProperty('--mouse-x', `${xPercent}%`);
    layer.style.setProperty('--mouse-y', `${yPercent}%`);
    layer.style.opacity = '1';
  };

  window.resetHologramShimmer = function() {
    const layer = document.getElementById('holoShimmerLayer');
    if (layer) {
      layer.style.opacity = '0.75';
    }
  };

  // =========================================================================
  // 10. LIVE ATELIER TICKER AUTO-ROTATION
  // =========================================================================
  let tickerIndex = 0;
  const tickerEl = document.getElementById('atelierLiveTicker');
  if (tickerEl) {
    setInterval(() => {
      tickerIndex = (tickerIndex + 1) % 4;
      tickerEl.style.transform = `translateY(-${tickerIndex * 22}px)`;
    }, 3800);
  }

});
