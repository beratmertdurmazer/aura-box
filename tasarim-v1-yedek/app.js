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
  // 3. MOBİL KASA (THE VAULT) MÜHÜR KIRMA ETKİLEŞİMİ
  // =========================================================================
  window.breakWaxSeal = function() {
    const seal = document.getElementById('vaultWaxSeal');
    const box = document.getElementById('vault3DBox');
    const unveiled = document.getElementById('vaultUnveiled');
    const hint = document.getElementById('vaultHintText');

    if (!seal) return;

    // Haptic / audio chime simulation
    playChime();

    seal.style.transform = 'scale(1.2) rotate(15deg)';
    seal.style.opacity = '0';

    setTimeout(() => {
      seal.classList.add('hidden');
      if (box) box.style.background = 'linear-gradient(145deg, #2A2A2E, #18181A)';
      if (unveiled) unveiled.classList.remove('hidden');
      if (hint) hint.textContent = '✦ Kasa Mührü Açıldı: 3 Parça Rezerve Edildi.';
    }, 280);
  };

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
  // 5. ÖZEL BÜTÇE SLIDER'I (CUSTOM ATELIER SLIDER)
  // =========================================================================
  const budgetSlider = document.getElementById('budgetSlider');
  const customBudgetDisplay = document.getElementById('customBudgetDisplay');
  const customCurationSummary = document.getElementById('customCurationSummary');

  if (budgetSlider && customBudgetDisplay && customCurationSummary) {
    budgetSlider.addEventListener('input', () => {
      const val = parseInt(budgetSlider.value, 10);
      customBudgetDisplay.textContent = `${val.toLocaleString('tr-TR')} ₺`;

      if (val < 2500) {
        customCurationSummary.textContent = '"İncelikli mini tasarım sukulent, el yapımı aromaterapi mumu ve butik artisan trüfler."';
      } else if (val < 5000) {
        customCurationSummary.textContent = '"Taze butik tasarım çiçek buketi, 925 ayar gümüş takı ve el yapımı seramik tasarım objesi."';
      } else if (val < 12000) {
        customCurationSummary.textContent = '"Niche extrait parfüm, İtalyan hakiki deri kartlık/cüzdan ve çift kişilik özel kültür davetiyesi."';
      } else if (val < 30000) {
        customCurationSummary.textContent = '"Sertifikalı pırlanta ve altın tasarım kolye, saf ipek İtalyan şal ve gurme tadım deneyimi."';
      } else {
        customCurationSummary.textContent = '"İsviçre mekanizmalı saat aksesuarları, pırlanta mücevherler ve hafta sonu butik bağ evi / otel kaçamağı."';
      }
    });
  }

  window.applyCustomBudgetAndScroll = function() {
    const val = budgetSlider ? parseInt(budgetSlider.value, 10).toLocaleString('tr-TR') : '15.000';
    const chosenTitle = document.getElementById('wizardChosenTierTitle');
    if (chosenTitle) {
      chosenTitle.innerHTML = `Özel Bütçeniz: <strong>Aura Atelier Custom (${val} ₺/ay)</strong>`;
    }

    const onboardingSection = document.getElementById('onboarding-web');
    if (onboardingSection) {
      onboardingSection.scrollIntoView({ behavior: 'smooth' });
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
      petite: '1.000',
      signature: '3.000',
      prestige: '6.500',
      black: '50.000+'
    },
    bimonthly: {
      petite: '1.900',
      signature: '5.700',
      prestige: '12.400',
      black: '95.000+'
    },
    special: {
      petite: '4.500',
      signature: '13.500',
      prestige: '29.000',
      black: '220.000+'
    }
  };

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-freq');

      const prices = priceMap[f];
      if (!prices) return;

      const keys = ['petite', 'signature', 'prestige', 'black'];
      tierCards.forEach((c, idx) => {
        const valSpan = c.querySelector('.price-val');
        const currSpan = c.querySelector('.price-curr');
        const k = keys[idx];
        if (valSpan && prices[k]) {
          valSpan.textContent = prices[k];
        }
        if (currSpan) {
          if (f === 'monthly') currSpan.textContent = '₺ / ay';
          else if (f === 'bimonthly') currSpan.textContent = '₺ / 2 ay';
          else currSpan.textContent = '₺ / yıl';
        }
      });
    });
  });

  window.selectTierAndScroll = function(tierName) {
    const tierNames = {
      petite: 'Aura Petite (1.000 ₺/ay)',
      signature: 'Aura Signature (3.000 ₺/ay)',
      prestige: 'Aura Prestige (6.500 ₺/ay)',
      black: 'Aura Black (50.000+ ₺/özel)'
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

});
