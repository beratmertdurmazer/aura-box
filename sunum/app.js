/**
 * AURA BOX — Apple Bento Interactive Presentation Script
 * Features:
 * - Dynamic Section Navigator & Progress Bar
 * - Frequency & Tier Recalculator
 * - Aura AI Loot-Box Pack Simulator (FIFA / CS style unboxing with Web Audio)
 * - 3 km² Micro-Hub Radar Interaction
 * - Presentation Mode & Keyboard Slide Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SECTIONS & PRESENTATION PROGRESS
  // =========================================================================
  const sections = Array.from(document.querySelectorAll('.bento-section'));
  const progressBar = document.getElementById('progressBar');
  const currentSectionIdx = document.getElementById('currentSectionIdx');
  const totalSections = document.getElementById('totalSections');
  const prevBtn = document.getElementById('prevSection');
  const nextBtn = document.getElementById('nextSection');
  const btnPresentationMode = document.getElementById('btnPresentationMode');

  if (totalSections) {
    totalSections.textContent = sections.length;
  }

  let activeSectionIndex = 0;

  function updateActiveSection() {
    const scrollPos = window.scrollY + 200;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledRatio = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrolledRatio))}%`;
    }

    sections.forEach((sec, idx) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeSectionIndex = idx;
        if (currentSectionIdx) {
          currentSectionIdx.textContent = idx + 1;
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      activeSectionIndex = index;
      sections[index].scrollIntoView({ behavior: 'smooth' });
      if (currentSectionIdx) {
        currentSectionIdx.textContent = index + 1;
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollToSection(activeSectionIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollToSection(activeSectionIndex + 1);
    });
  }

  // Keyboard navigation [ArrowLeft / ArrowRight]
  window.addEventListener('keydown', (e) => {
    // Only if user is not typing in an input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(activeSectionIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(activeSectionIndex - 1);
    }
  });

  // Presentation Mode Toggle
  let isPresentationMode = false;
  if (btnPresentationMode) {
    btnPresentationMode.addEventListener('click', () => {
      isPresentationMode = !isPresentationMode;
      document.body.classList.toggle('presentation-fullscreen', isPresentationMode);

      if (isPresentationMode) {
        btnPresentationMode.classList.remove('btn-secondary');
        btnPresentationMode.classList.add('btn-primary');
        btnPresentationMode.querySelector('span').textContent = 'Sunumdan Çık';
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        btnPresentationMode.classList.remove('btn-primary');
        btnPresentationMode.classList.add('btn-secondary');
        btnPresentationMode.querySelector('span').textContent = 'Sunum Modu';
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    });
  }

  // =========================================================================
  // 2. FREQUENCY TOGGLE (Aylık / 2 Ayda Bir / Önemli Günler)
  // =========================================================================
  const freqBtns = document.querySelectorAll('.freq-btn');
  const packageCards = document.querySelectorAll('.package-card');

  const frequencyData = {
    monthly: {
      petite: { price: '850', period: '/kutu', badge: '🏆 %20 Sadakat İndirimi (12 Kutu/Yıl)', type: 'loyalty' },
      signature: { price: '2.600', period: '/kutu', badge: '🏆 En Avantajlı Fiyat (12 Kutu/Yıl)', type: 'loyalty' },
      prestige: { price: '5.500', period: '/kutu', badge: '🏆 VIP Sadakat Fiyatı (12 Kutu/Yıl)', type: 'loyalty' },
      prive: { price: '12.500', period: '/kutu', badge: '🏆 Privé Sadakat Avantajı (12 Kutu/Yıl)', type: 'loyalty' },
      grand: { price: '24.000', period: '/kutu', badge: '🏆 Grand Sadakat Avantajı (12 Kutu/Yıl)', type: 'loyalty' },
      black: { price: '42.000+', period: '/kutu', badge: '🏆 Exclusive Kulüp (12 Kutu/Yıl)', type: 'loyalty' }
    },
    bimonthly: {
      petite: { price: '1.000', period: '/kutu', badge: '📦 2 Ayda Bir (Yılda 6 Kutu)', type: 'standard' },
      signature: { price: '3.000', period: '/kutu', badge: '📦 Standart Fiyat (Yılda 6 Kutu)', type: 'standard' },
      prestige: { price: '6.500', period: '/kutu', badge: '📦 Standart VIP (Yılda 6 Kutu)', type: 'standard' },
      prive: { price: '14.500', period: '/kutu', badge: '📦 Standart Privé (Yılda 6 Kutu)', type: 'standard' },
      grand: { price: '28.000', period: '/kutu', badge: '📦 Standart Grand (Yılda 6 Kutu)', type: 'standard' },
      black: { price: '50.000+', period: '/kutu', badge: '📦 Standart Özel (Yılda 6 Kutu)', type: 'standard' }
    },
    special: {
      petite: { price: '1.200', period: '/kutu', badge: '🎯 Özel Günler (Yılda 4-5 Kutu)', type: 'flexible' },
      signature: { price: '3.600', period: '/kutu', badge: '🎯 Özel Günler (Yılda 4-5 Kutu)', type: 'flexible' },
      prestige: { price: '7.800', period: '/kutu', badge: '🎯 Randevulu VIP (Yılda 4-5 Kutu)', type: 'flexible' },
      prive: { price: '17.500', period: '/kutu', badge: '🎯 Randevulu Privé (Yılda 4-5 Kutu)', type: 'flexible' },
      grand: { price: '33.000', period: '/kutu', badge: '🎯 Randevulu Grand (Yılda 4-5 Kutu)', type: 'flexible' },
      black: { price: '58.000+', period: '/kutu', badge: '🎯 Özel Tarih JIT (Yılda 4-5 Kutu)', type: 'flexible' }
    }
  };

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const freq = btn.getAttribute('data-freq');

      packageCards.forEach(card => {
        const tier = card.getAttribute('data-tier');
        if (frequencyData[freq] && frequencyData[freq][tier]) {
          const data = frequencyData[freq][tier];
          const priceAmount = card.querySelector('.pack-price .amount');
          const pricePeriod = card.querySelector('.pack-price .period');
          const badgeBox = card.querySelector('.pack-freq-sub');
          if (priceAmount) priceAmount.textContent = data.price;
          if (pricePeriod) pricePeriod.textContent = data.period;
          if (badgeBox) {
            badgeBox.innerHTML = `<span class="freq-tag-badge ${data.type}">${data.badge}</span>`;
          }
        }
      });
      playPipelineStepBeep();
    });
  });

  // =========================================================================
  // 3. AURA AI LOOT-BOX SİMÜLATÖRÜ (CS:GO / FIFA PACK OPENING)
  // =========================================================================
  const targetSelector = document.getElementById('targetSelector');
  const personaSelector = document.getElementById('personaSelector');
  const budgetSelector = document.getElementById('budgetSelector');
  const btnRollBox = document.getElementById('btnRollBox');

  const stagePlaceholder = document.getElementById('stagePlaceholder');
  const stageActive = document.getElementById('stageActive');
  const stageResult = document.getElementById('stageResult');

  const resTierTag = document.getElementById('resTierTag');
  const resTitle = document.getElementById('resTitle');
  const resTotalValue = document.getElementById('resTotalValue');
  const resItemsGrid = document.getElementById('resItemsGrid');
  const resNoteText = document.getElementById('resNoteText');

  // Generic pill selector helper
  function setupPillGroup(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const pills = container.querySelectorAll('.selector-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  setupPillGroup('targetSelector');
  setupPillGroup('personaSelector');
  setupPillGroup('budgetSelector');

  // Web Audio API Synthesizer for pack opening chime / rumble
  function playUnboxingChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Sound 1: Shimmer arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
      });
    } catch {
      // Audio not supported or blocked by browser policy
    }
  }

  // Database of lootbox items for dynamic AI curation
  const itemCatalog = {
    sanatsever: {
      850: {
        title: '"Sanatsever Eş" Petite Koleksiyonu',
        tierName: 'AURA PETITE EDITION',
        totalVal: '1.250 ₺',
        note: 'Doğal dokulu sukulent seramik saksıda, yanına el dökümü soya mumu ve sanat mottosu kartı eşleştirildi.',
        items: [
          { badge: 'ODAK PARÇA', icon: '🌱', name: 'Mini Seramik Teraryum', partner: 'Atölye Toprak (1.1 km)', price: '380 ₺' },
          { badge: 'DUYGU', icon: '🍫', name: 'Artisan Portakallı Bitter', partner: 'Chocoholic (1.8 km)', price: '260 ₺' },
          { badge: 'AMBİYANS', icon: '🕯️', name: 'Soya & Sedir Ağacı Mumu', partner: 'Maison Wax (2.4 km)', price: '240 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Kaligrafi Şiir Notu', partner: 'Aura Studio (Merkez Depo)', price: '120 ₺' }
        ]
      },
      1000: {
        title: '"Sanatsever Eş" Petite Koleksiyonu',
        tierName: 'AURA PETITE EDITION',
        totalVal: '1.250 ₺',
        note: 'Doğal dokulu sukulent seramik saksıda, yanına el dökümü soya mumu ve sanat mottosu kartı eşleştirildi.',
        items: [
          { badge: 'ODAK PARÇA', icon: '🌱', name: 'Mini Seramik Teraryum', partner: 'Atölye Toprak (1.1 km)', price: '380 ₺' },
          { badge: 'DUYGU', icon: '🍫', name: 'Artisan Portakallı Bitter', partner: 'Chocoholic (1.8 km)', price: '260 ₺' },
          { badge: 'AMBİYANS', icon: '🕯️', name: 'Soya & Sedir Ağacı Mumu', partner: 'Maison Wax (2.4 km)', price: '240 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Kaligrafi Şiir Notu', partner: 'Aura Studio (Merkez Depo)', price: '120 ₺' }
        ]
      },
      2600: {
        title: '"Sanatsever Partner" Signature Kürasyonu',
        tierName: 'AURA SIGNATURE EDITION',
        totalVal: '3.850 ₺',
        note: 'Taze Fransız lavantası buketi ve 925 ayar aytaşı tasarım gümüş kolye, estetik algısı yüksek sanatsever eş profiline göre optimize edildi.',
        items: [
          { badge: 'ODAK PARÇA (%40)', icon: '💍', name: 'Aytaşı 925 Gümüş Kolye', partner: 'Atelier Margot (0.8 km)', price: '1.450 ₺' },
          { badge: 'TAZE JEST (%30)', icon: '💐', name: 'Fransız Lavantası Buketi', partner: 'Flora Butik (1.2 km)', price: '1.050 ₺' },
          { badge: 'AMBİYANS (%15)', icon: '🏺', name: 'El Yapımı Seramik Kupa', partner: 'Defne Studio (2.1 km)', price: '540 ₺' },
          { badge: 'DENEYİM (%15)', icon: '✉️', name: 'Mühürlü Kaligrafi Mektup & Sesli QR', partner: 'Aura Studio (Merkez Depo)', price: '380 ₺' }
        ]
      },
      3500: {
        title: '"Sanatsever Partner" Signature Kürasyonu',
        tierName: 'AURA SIGNATURE EDITION',
        totalVal: '4.200 ₺',
        note: 'Taze Fransız lavantası buketi ve 925 ayar aytaşı tasarım gümüş kolye, estetik algısı yüksek sanatsever eş profiline göre optimize edildi.',
        items: [
          { badge: 'ODAK PARÇA (%40)', icon: '💍', name: 'Aytaşı 925 Gümüş Kolye', partner: 'Atelier Margot (0.8 km)', price: '1.480 ₺' },
          { badge: 'TAZE JEST (%30)', icon: '💐', name: 'Fransız Lavantası Buketi', partner: 'Flora Butik (1.2 km)', price: '1.100 ₺' },
          { badge: 'AMBİYANS (%15)', icon: '🏺', name: 'El Yapımı Seramik Kupa', partner: 'Defne Studio (2.1 km)', price: '540 ₺' },
          { badge: 'DENEYİM (%15)', icon: '✉️', name: 'Mühürlü Kaligrafi Mektup', partner: 'Aura Studio (Merkez Depo)', price: '380 ₺' }
        ]
      },
      5500: {
        title: '"Sanatsever VIP" Prestige Koleksiyonu',
        tierName: 'AURA PRESTIGE VIP EDITION',
        totalVal: '7.850 ₺',
        note: 'Niche koku evi travel boy parfüm, çift kişilik özel seramik workshop deneyimi ve tasarım deri defter ile unutulmaz bir sanat kutusu oluşturuldu.',
        items: [
          { badge: 'ODAK PARÇA (%40)', icon: '✨', name: 'Niche Parfüm (50ml Extrait)', partner: 'Oud & Botanica (1.5 km)', price: '2.800 ₺' },
          { badge: 'DENEYİM (%30)', icon: '🎭', name: 'Çift Kişilik Workshop Bileti', partner: 'Artisan Seramik Lab (2.2 km)', price: '1.950 ₺' },
          { badge: 'AKSESUAR (%15)', icon: '👜', name: 'Hakiki Deri Eskiz Defteri', partner: 'Leather Crafts (0.9 km)', price: '980 ₺' },
          { badge: 'LEZZET (%15)', icon: '🍫', name: 'Altın Varaklı Trüf Çikolata', partner: 'Chocoholic VIP (1.8 km)', price: '770 ₺' }
        ]
      },
      6500: {
        title: '"Sanatsever VIP" Prestige Koleksiyonu',
        tierName: 'AURA PRESTIGE VIP EDITION',
        totalVal: '7.850 ₺',
        note: 'Niche koku evi travel boy parfüm, çift kişilik özel seramik workshop deneyimi ve tasarım deri defter ile unutulmaz bir sanat kutusu oluşturuldu.',
        items: [
          { badge: 'ODAK PARÇA (%40)', icon: '✨', name: 'Niche Parfüm (50ml Extrait)', partner: 'Oud & Botanica (1.5 km)', price: '2.800 ₺' },
          { badge: 'DENEYİM (%30)', icon: '🎭', name: 'Çift Kişilik Workshop Bileti', partner: 'Artisan Seramik Lab (2.2 km)', price: '1.950 ₺' },
          { badge: 'AKSESUAR (%15)', icon: '👜', name: 'Hakiki Deri Eskiz Defteri', partner: 'Leather Crafts (0.9 km)', price: '980 ₺' },
          { badge: 'LEZZET (%15)', icon: '🍫', name: 'Altın Varaklı Trüf Çikolata', partner: 'Chocoholic VIP (1.8 km)', price: '770 ₺' }
        ]
      },
      12500: {
        title: '"Sanatsever Privé" Koleksiyonu',
        tierName: 'AURA PRIVÉ EXCLUSIVE EDITION',
        totalVal: '17.600 ₺',
        note: '14K rose altın tasarım mücevher, özel niche koku difüzörü ve butik şef akşam yemeği tadım deneyimi.',
        items: [
          { badge: 'FINE JEWELRY', icon: '💍', name: '14K Rose Altın Aytaşı Kolye', partner: 'Atelier Margot Fine (0.8 km)', price: '7.400 ₺' },
          { badge: 'NİCHE KOKU', icon: '✨', name: 'Lüks Mermer Difüzör & Esans', partner: 'Oud & Botanica Grand (1.5 km)', price: '4.200 ₺' },
          { badge: 'ŞEF DENEYİMİ', icon: '🍷', name: '2 Kişilik Şef Tadım Menüsü', partner: 'Privé Concierge Network', price: '4.000 ₺' },
          { badge: 'İPEK DOKUNUŞ', icon: '🧣', name: 'İtalyan Twilly İpek Fular', partner: 'Milano Silk Atelier (1.4 km)', price: '2.000 ₺' }
        ]
      },
      24000: {
        title: '"Sanatsever Grand" Atelier Koleksiyonu',
        tierName: 'AURA GRAND ATELIER EDITION',
        totalVal: '33.500 ₺',
        note: '0.25ct sertifikalı pırlanta kolye, lüks butik bağ evi hafta sonu kaçamağı ve el oyması lake ahşap hatıra sandığı.',
        items: [
          { badge: 'SERTİFİKALI PIRLANTA', icon: '💎', name: '0.25ct F/VS Pırlanta Kolye', partner: 'Kuyumcukent Vault (2.8 km)', price: '15.500 ₺' },
          { badge: 'HAFTA SONU KAÇAMAK', icon: '🍇', name: 'Urla Bağ Evi 2 Gece Konaklama', partner: 'Relais Concierge Network', price: '11.000 ₺' },
          { badge: 'KAŞMİR ZARAFET', icon: '🧣', name: 'El Dokuması Saf Kaşmir Şal', partner: 'Atelier Tessuto (1.2 km)', price: '4.500 ₺' },
          { badge: 'SANAT SANDIĞI', icon: '🎁', name: 'El Oyması Lake Gravür Sandık', partner: 'Ahşap Ustası Harun (1.9 km)', price: '2.500 ₺' }
        ]
      },
      42000: {
        title: '"Sanatsever Elite" Black Custom Kürasyonu',
        tierName: 'AURA BLACK CUSTOM EXCLUSIVE',
        totalVal: '58.500 ₺',
        note: 'Sertifikalı pırlanta tasarım küpe, İtalyan ipek fular ve Kapadokya butik mağara otel hafta sonu konaklama voucher\'ı ile eşsiz bir jest.',
        items: [
          { badge: 'LÜKS MÜCEVHER', icon: '💎', name: '0.40ct F/VS Pırlanta Küpe', partner: 'Kuyumcukent VIP Vault (2.8 km)', price: '24.500 ₺' },
          { badge: 'ÖZEL KAÇAMAK', icon: '🍷', name: 'Hafta Sonu Butik Kaçamak', partner: 'Relais Concierge Network', price: '18.000 ₺' },
          { badge: 'AKSESUAR', icon: '🧣', name: 'İtalyan İpek Sanat Fuları', partner: 'Milano Silk Atelier (1.4 km)', price: '6.500 ₺' },
          { badge: 'SUNUM', icon: '🎁', name: 'Ceviz Ağacı Özel Gravür Sandık', partner: 'Ahşap Ustası Harun (1.9 km)', price: '3.500 ₺' }
        ]
      },
      50000: {
        title: '"Sanatsever Elite" Black Custom Kürasyonu',
        tierName: 'AURA BLACK CUSTOM EXCLUSIVE',
        totalVal: '58.500 ₺',
        note: 'Sertifikalı pırlanta tasarım küpe, İtalyan ipek fular ve Kapadokya butik mağara otel hafta sonu konaklama voucher\'ı ile eşsiz bir jest.',
        items: [
          { badge: 'LÜKS MÜCEVHER', icon: '💎', name: '0.40ct F/VS Pırlanta Küpe', partner: 'Kuyumcukent VIP Vault (2.8 km)', price: '24.500 ₺' },
          { badge: 'ÖZEL KAÇAMAK', icon: '🍷', name: 'Hafta Sonu Butik Kaçamak', partner: 'Relais Concierge Network', price: '18.000 ₺' },
          { badge: 'AKSESUAR', icon: '🧣', name: 'İtalyan İpek Sanat Fuları', partner: 'Milano Silk Atelier (1.4 km)', price: '6.500 ₺' },
          { badge: 'SUNUM', icon: '🎁', name: 'Ceviz Ağacı Özel Gravür Sandık', partner: 'Ahşap Ustası Harun (1.9 km)', price: '3.500 ₺' }
        ]
      }
    },
    gurme: {
      850: {
        title: '"Gurme & Tat Meraklısı" Petite Kutusu',
        tierName: 'AURA PETITE GOURMET',
        totalVal: '1.200 ₺',
        note: 'Organik soğuk sıkım zeytinyağı tadım şişesi, kurutulmuş meyveli artisan çikolata ve taze kavrulmuş filtre kahve.',
        items: [
          { badge: 'ODAK LEZZET', icon: '☕', name: 'Mikro Lot Filtre Kahve (250g)', partner: 'Roastery Lab (1.1 km)', price: '360 ₺' },
          { badge: 'ARTISAN TAT', icon: '🍫', name: 'Fındıklı Artisan Çikolata', partner: 'Chocoholic (1.8 km)', price: '280 ₺' },
          { badge: 'LEZZET DOKUNUŞU', icon: '🫒', name: 'Erken Hasat Zeytinyağı (100ml)', partner: 'Ege Butik Zeytin (2.0 km)', price: '260 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Gurme Tadım Kartı', partner: 'Aura Studio (Merkez Depo)', price: '120 ₺' }
        ]
      },
      2600: {
        title: '"Gurme & Tat Meraklısı" Signature Kutusu',
        tierName: 'AURA SIGNATURE GOURMET',
        totalVal: '3.900 ₺',
        note: 'Single-origin Etiyopya Yirgacheffe çekirdek kahve, Madagaskar vanilyalı el yapımı trüfler ve ahşap sunum tepsisi ile tam bir tat yolculuğu.',
        items: [
          { badge: 'ODAK LEZZET', icon: '☕', name: 'Single-Origin Reserve Kahve', partner: 'Roastery Lab (1.1 km)', price: '1.150 ₺' },
          { badge: 'ARTISAN TAT', icon: '🍫', name: '16 Parça Madlen Trüf Kutusu', partner: 'Chocoholic (1.8 km)', price: '1.050 ₺' },
          { badge: 'SUNUM', icon: '🥖', name: 'Ceviz Ağacı Sunum Tahtası', partner: 'Woodcrafts (2.5 km)', price: '750 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Kişisel Gurme Tadım Rehberi', partner: 'Aura Studio (Merkez Depo)', price: '300 ₺' }
        ]
      },
      3500: {
        title: '"Gurme & Tat Meraklısı" Signature Kutusu',
        tierName: 'AURA SIGNATURE GOURMET',
        totalVal: '4.100 ₺',
        note: 'Single-origin Etiyopya Yirgacheffe çekirdek kahve, Madagaskar vanilyalı el yapımı trüfler ve ahşap sunum tepsisi ile tam bir tat yolculuğu.',
        items: [
          { badge: 'ODAK LEZZET', icon: '☕', name: 'Single-Origin Reserve Kahve', partner: 'Roastery Lab (1.1 km)', price: '1.200 ₺' },
          { badge: 'ARTISAN TAT', icon: '🍫', name: '16 Parça Madlen Trüf Kutusu', partner: 'Chocoholic (1.8 km)', price: '1.050 ₺' },
          { badge: 'SUNUM', icon: '🥖', name: 'Ceviz Ağacı Sunum Tahtası', partner: 'Woodcrafts (2.5 km)', price: '750 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Kişisel Gurme Tadım Rehberi', partner: 'Aura Studio (Merkez Depo)', price: '300 ₺' }
        ]
      }
    },
    minimalist: {
      850: {
        title: '"Minimalist & Huzur" Petite Kutusu',
        tierName: 'AURA PETITE MINIMAL',
        totalVal: '1.180 ₺',
        note: 'Sedir ağacı tütsü çubukları, el yapımı beton tütsülük ve saf lavanta hidrosolü spreyi.',
        items: [
          { badge: 'AROMA', icon: '🌿', name: 'Saf Lavanta Hidrosolü', partner: 'Maison Wax (2.4 km)', price: '340 ₺' },
          { badge: 'NESNE', icon: '🏺', name: 'El Dökümü Beton Tütsülük', partner: 'Defne Studio (2.1 km)', price: '320 ₺' },
          { badge: 'TÜTSÜ', icon: '🕯️', name: 'Sedir Ağacı Tütsü Demeti', partner: 'Botanica Lab (1.5 km)', price: '240 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Minimalist Şiir Kartı', partner: 'Aura Studio (Merkez Depo)', price: '100 ₺' }
        ]
      },
      2600: {
        title: '"Minimalist & Huzur" Signature Kutusu',
        tierName: 'AURA SIGNATURE MINIMAL',
        totalVal: '3.950 ₺',
        note: 'Sade çizgiler, keten dokulu masa objesi, bergamot & paçuli aromaterapi yağı ve el yapımı beyaz seramik tütsülük.',
        items: [
          { badge: 'ODAK NESNE', icon: '🏺', name: 'Mat Beyaz Seramik Tütsülük', partner: 'Defne Studio (2.1 km)', price: '1.300 ₺' },
          { badge: 'AROMATERAPİ', icon: '🌿', name: 'Doğal Bergamot Esansı', partner: 'Maison Wax (2.4 km)', price: '950 ₺' },
          { badge: 'DOKU', icon: '🧣', name: '%100 Keten Dokuma Örtü', partner: 'Weave Lab (1.6 km)', price: '680 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Minimalist Zihin Notu', partner: 'Aura Studio (Merkez Depo)', price: '250 ₺' }
        ]
      },
      3500: {
        title: '"Minimalist & Huzur" Signature Kutusu',
        tierName: 'AURA SIGNATURE MINIMAL',
        totalVal: '3.950 ₺',
        note: 'Sade çizgiler, keten dokulu masa objesi, bergamot & paçuli aromaterapi yağı ve el yapımı beyaz seramik tütsülük.',
        items: [
          { badge: 'ODAK NESNE', icon: '🏺', name: 'Mat Beyaz Seramik Tütsülük', partner: 'Defne Studio (2.1 km)', price: '1.300 ₺' },
          { badge: 'AROMATERAPİ', icon: '🌿', name: 'Doğal Bergamot Esansı', partner: 'Maison Wax (2.4 km)', price: '950 ₺' },
          { badge: 'DOKU', icon: '🧣', name: '%100 Keten Dokuma Örtü', partner: 'Weave Lab (1.6 km)', price: '680 ₺' },
          { badge: 'DENEYİM', icon: '✉️', name: 'Minimalist Zihin Notu', partner: 'Aura Studio (Merkez Depo)', price: '250 ₺' }
        ]
      }
    },
    luks: {
      5500: {
        title: '"Lüks & Glamour" VIP Prestige Kutusu',
        tierName: 'AURA VIP GLAMOUR',
        totalVal: '8.100 ₺',
        note: 'Niş koku evinden Amber Extrait parfüm, 925 ayar baget kesim zirkon kolye ve İtalyan deri kartvizitlik.',
        items: [
          { badge: 'MÜCEVHER', icon: '💍', name: 'Baget Kesim Gümüş Kolye', partner: 'Atelier Margot (0.8 km)', price: '2.750 ₺' },
          { badge: 'PARFÜM', icon: '✨', name: 'Amber Grand Extrait (50ml)', partner: 'Oud & Botanica (1.5 km)', price: '2.600 ₺' },
          { badge: 'DERİ AKSESUAR', icon: '👜', name: 'Hakiki Deri Cüzdan / Kartlık', partner: 'Leather Crafts (0.9 km)', price: '1.250 ₺' },
          { badge: 'ŞIK DOKUNUŞ', icon: '🍫', name: 'Altın Yapraklı Artisan Pralin', partner: 'Chocoholic VIP (1.8 km)', price: '850 ₺' }
        ]
      },
      6500: {
        title: '"Lüks & Glamour" VIP Prestige Kutusu',
        tierName: 'AURA VIP GLAMOUR',
        totalVal: '8.100 ₺',
        note: 'Niş koku evinden Amber Extrait parfüm, 925 ayar baget kesim zirkon kolye ve İtalyan deri kartvizitlik.',
        items: [
          { badge: 'MÜCEVHER', icon: '💍', name: 'Baget Kesim Gümüş Kolye', partner: 'Atelier Margot (0.8 km)', price: '2.750 ₺' },
          { badge: 'PARFÜM', icon: '✨', name: 'Amber Grand Extrait (50ml)', partner: 'Oud & Botanica (1.5 km)', price: '2.600 ₺' },
          { badge: 'DERİ AKSESUAR', icon: '👜', name: 'Hakiki Deri Cüzdan / Kartlık', partner: 'Leather Crafts (0.9 km)', price: '1.250 ₺' },
          { badge: 'ŞIK DOKUNUŞ', icon: '🍫', name: 'Altın Yapraklı Artisan Pralin', partner: 'Chocoholic VIP (1.8 km)', price: '850 ₺' }
        ]
      }
    }
  };

  // Roll Box Button Event
  if (btnRollBox) {
    btnRollBox.addEventListener('click', () => {
      // Find active selections
      const activePersonaBtn = personaSelector?.querySelector('.selector-pill.active');
      const activeBudgetBtn = budgetSelector?.querySelector('.selector-pill.active');
      const activeTargetBtn = targetSelector?.querySelector('.selector-pill.active');

      const persona = activePersonaBtn?.getAttribute('data-persona') || 'sanatsever';
      const budget = activeBudgetBtn?.getAttribute('data-budget') || '2600';
      const target = activeTargetBtn?.textContent || 'Eş';

      // Hide placeholder and result, show rolling
      if (stagePlaceholder) stagePlaceholder.classList.add('hidden');
      if (stageResult) stageResult.classList.add('hidden');
      if (stageActive) stageActive.classList.remove('hidden');

      // Play audio chime
      playUnboxingChime();

      // Simulate AI Calculation & Partner API response (800ms)
      setTimeout(() => {
        if (stageActive) stageActive.classList.add('hidden');
        if (stageResult) stageResult.classList.remove('hidden');

        // Look up content in catalog with fallbacks
        let match = null;
        if (itemCatalog[persona] && itemCatalog[persona][budget]) {
          match = itemCatalog[persona][budget];
        } else if (itemCatalog['sanatsever'] && itemCatalog['sanatsever'][budget]) {
          match = itemCatalog['sanatsever'][budget];
        } else {
          match = itemCatalog['sanatsever']['2600'];
        }

        // Fill data
        if (resTierTag) resTierTag.textContent = match.tierName;
        if (resTitle) resTitle.textContent = match.title.replace('Eş', target);
        if (resTotalValue) resTotalValue.textContent = match.totalVal;
        if (resNoteText) resNoteText.textContent = `"${match.note}"`;

        if (resItemsGrid) {
          resItemsGrid.innerHTML = '';
          match.items.forEach(it => {
            const card = document.createElement('div');
            card.className = 'loot-item-card';
            card.innerHTML = `
              <span class="loot-item-badge">${it.badge}</span>
              <div class="loot-item-icon">${it.icon}</div>
              <strong class="loot-item-name">${it.name}</strong>
              <span class="loot-item-partner">📍 ${it.partner}</span>
              <span class="loot-item-price">${it.price}</span>
            `;
            resItemsGrid.appendChild(card);
          });
        }
      }, 750);
    });
  }

  // =========================================================================
  // 4. MICRO-HUB RADAR INTERACTION
  // =========================================================================
  const partnerNodes = document.querySelectorAll('.partner-node');
  partnerNodes.forEach(node => {
    node.addEventListener('click', () => {
      const name = node.querySelector('.node-name')?.textContent || 'Tedarikçi';
      const stock = node.querySelector('.node-stock')?.textContent || 'Canlı API';
      
      // Temporary tooltip or highlight effect
      node.style.transform = 'translate(-50%, -55%) scale(1.2)';
      setTimeout(() => {
        node.style.transform = '';
      }, 300);

      console.log(`[Aura Hub API] Tedarikçi Sorgulandı: ${name} (${stock})`);
    });
  });

  // =========================================================================
  // 5. 30 TEDARİKÇİ CANLI API KÜRASİYON SİMÜLASYONU (PİPELİNE ANİMASYONU)
  // =========================================================================
  function playPipelineStepBeep() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch(e) {}
  }

  let isSimulating = false;
  window.runPipelineSimulation = function() {
    if (isSimulating) return;
    isSimulating = true;

    const consoleBox = document.getElementById('pipelineSimConsole');
    const statusText = document.getElementById('simStatusText');
    const stopwatch = document.getElementById('simStopwatch');
    const progressFill = document.getElementById('simProgressFill');
    const previewBox = document.getElementById('simCuratedPreview');
    const stepBoxes = document.querySelectorAll('.p-step-box');
    const btnSim = document.getElementById('btnSimulatePipeline');

    if (btnSim) btnSim.disabled = true;
    if (consoleBox) consoleBox.classList.remove('hidden');
    if (previewBox) previewBox.classList.add('hidden');
    if (progressFill) progressFill.style.width = '0%';

    stepBoxes.forEach(box => box.classList.remove('sim-highlight'));

    const steps = [
      {
        stepIndex: 0,
        text: '30 Partner API düğümü sorgulanıyor... [1.428 ürün taranıyor]',
        ms: '48 ms',
        progress: 20
      },
      {
        stepIndex: 1,
        text: 'Kesin Hayırlar Kalkanı: Alerjenler & geçmiş kutular elendi [Kalan: 412 parça]',
        ms: '112 ms',
        progress: 40
      },
      {
        stepIndex: 2,
        text: 'Vision AI & Ses Analizi: Renk paleti #E2D9D2, stres tonu tespit edildi [Mod: Rahatlatıcı]',
        ms: '195 ms',
        progress: 65
      },
      {
        stepIndex: 3,
        text: 'Bütçe Harmoni Matrisi: Marj %46.2 kilitlendi [Mücevher + Lavanta + Trüf + Kaligrafi]',
        ms: '280 ms',
        progress: 85
      },
      {
        stepIndex: 4,
        text: 'JIT Montaj & Mühür: 3 km² Nişantaşı Hub kurye rotası oluşturuldu!',
        ms: '342 ms',
        progress: 100
      }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const s = steps[currentStep];
        stepBoxes.forEach(box => box.classList.remove('sim-highlight'));
        if (stepBoxes[s.stepIndex]) {
          stepBoxes[s.stepIndex].classList.add('sim-highlight');
        }
        if (statusText) statusText.textContent = s.text;
        if (stopwatch) stopwatch.textContent = s.ms;
        if (progressFill) progressFill.style.width = `${s.progress}%`;
        playPipelineStepBeep();
        currentStep++;
      } else {
        clearInterval(interval);
        playUnboxingChime();
        if (statusText) statusText.textContent = '✦ Kutu başarıyla mühürlendi ve kuryeye devredildi!';
        if (previewBox) previewBox.classList.remove('hidden');
        if (btnSim) btnSim.disabled = false;
        isSimulating = false;
      }
    }, 550);
  };

  // =========================================================================
  // 6. SİPARİŞ YÖNETİM PANELİ (38 TEDARİKÇİ & 3. AY OTONOM SİPARİŞ SİMÜLASYONU)
  // =========================================================================
  let isOpsSimulating = false;
  window.runOpsSimulation = function() {
    if (isOpsSimulating) return;
    isOpsSimulating = true;

    const btn = document.getElementById('btnRunOpsSimulation');
    const emptyState = document.getElementById('opsEmptyState');
    const itemsStream = document.getElementById('opsItemsStream');
    const banner = document.getElementById('opsDispatchBanner');
    const dispText = document.getElementById('opsDispText');
    const wholesaleDisplay = document.getElementById('opsWholesaleDisplay');
    const retailDisplay = document.getElementById('opsRetailDisplay');
    const marginVal = document.getElementById('opsMarginVal');
    const bonusVal = document.getElementById('opsBonusVal');
    const timelineCurrent = document.getElementById('opsTimelineCurrent');

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳</span> AI Siparişi Derliyor...';
    }
    if (timelineCurrent) {
      timelineCurrent.style.boxShadow = '0 0 0 2px var(--accent-purple-royal)';
    }
    if (banner) {
      banner.classList.remove('active');
    }
    if (dispText) {
      dispText.innerHTML = '<strong>Micro-Hub Durumu: Canlı API & Zevk Hafızası Analiz Ediliyor...</strong><span>38 tedarikçi taranıyor; alıcının geçmiş tercihleri ve 72s sesli fısıltısı eşleştiriliyor.</span>';
    }
    if (emptyState) emptyState.classList.add('hidden');
    if (itemsStream) {
      itemsStream.classList.remove('hidden');
      itemsStream.innerHTML = '';
    }

    const curatedProducts = [
      {
        icon: '🕯️',
        name: 'Maison Wax Sedir & Adaçayı Mumu',
        partner: 'Maison Wax Studio (0.6 km • Canlı Stok: 8)',
        wholesale: '420 ₺',
        retail: '1.100 ₺'
      },
      {
        icon: '🌸',
        name: 'Şampanya Gülü & Okaliptus Terfi Buketi',
        partner: 'Flora Botanica Lab (1.1 km • Taze Kesim Emri)',
        wholesale: '380 ₺',
        retail: '950 ₺'
      },
      {
        icon: '💍',
        name: '14K Rose Altın Kaplama Yıldız Kolye',
        partner: 'Atelier Margot (1.4 km • Kasa Rezervasyonu)',
        wholesale: '440 ₺',
        retail: '1.300 ₺'
      },
      {
        icon: '💌',
        name: 'Kaligrafi Tebrik Kartı + Dinamik Sesli QR Mühür',
        partner: 'Nişantaşı Hub Atölyesi (0 km • JIT Baskı)',
        wholesale: '100 ₺',
        retail: '500 ₺'
      }
    ];

    let currentItemIdx = 0;
    const interval = setInterval(() => {
      if (currentItemIdx < curatedProducts.length) {
        const item = curatedProducts[currentItemIdx];
        if (itemsStream) {
          const row = document.createElement('div');
          row.className = 'ops-product-row';
          row.innerHTML = `
            <div class="p-row-left">
              <span class="p-row-icon">${item.icon}</span>
              <div>
                <strong class="p-row-name">${item.name}</strong>
                <span class="p-row-partner">📍 ${item.partner}</span>
              </div>
            </div>
            <div class="p-row-prices">
              <span class="p-row-wholesale">Toptan: ${item.wholesale}</span>
              <span class="p-row-retail">Vitrin: ${item.retail}</span>
            </div>
          `;
          itemsStream.appendChild(row);
        }
        playPipelineStepBeep();
        currentItemIdx++;
      } else {
        clearInterval(interval);
        // Completed
        if (wholesaleDisplay) wholesaleDisplay.textContent = '1.340 ₺';
        if (retailDisplay) retailDisplay.textContent = '3.850 ₺';
        if (marginVal) marginVal.textContent = '%48.5';
        if (bonusVal) bonusVal.textContent = '+1.250 ₺';

        if (banner) {
          banner.classList.add('active');
        }
        if (dispText) {
          dispText.innerHTML = '<strong>✅ Kutu JIT Montaja Alındı — Kurye Atandı!</strong><span>Nişantaşı Hub • Özel Kurye: 18:30 Randevulu Teslimat (Takip: #AUR-8921)</span>';
        }
        if (timelineCurrent) {
          timelineCurrent.style.boxShadow = '';
        }

        playUnboxingChime();

        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>↺</span> Simülasyonu Yeniden Çalıştır';
        }
        isOpsSimulating = false;
      }
    }, 450);
  };

});
