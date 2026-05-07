// ============================================================
// TAVOLA PERFORMANCE — App logic v3
// + benchmark · toast · universal handlers · rehab detail · races
// ============================================================

// ============ TOAST SYSTEM ============
function ensureToastContainer() {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}
function toast(msg, type = 'success', icon = '✓') {
  const c = ensureToastContainer();
  const t = document.createElement('div');
  t.className = 'toast ' + (type === 'success' ? '' : type);
  t.innerHTML = `<div class="ico">${icon}</div><div>${msg}</div>`;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 2600);
}
window.toast = toast;

// ============ NAVIGATION ============
function setActiveNav(view) {
  document.querySelectorAll('[data-view]').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  document.querySelectorAll('[data-pane]').forEach(el => {
    if (el.dataset.pane === view) {
      el.style.display = '';
      el.classList.remove('page-pane');
      void el.offsetWidth;
      el.classList.add('page-pane');
    } else {
      el.style.display = 'none';
    }
  });
  const crumbEl = document.getElementById('crumb-current');
  if (crumbEl) {
    const labels = {
      dashboard: 'Dashboard', atleti: 'Atleti', programma: 'Programmazione',
      test: 'Test & Performance', calendario: 'Calendario', infortuni: 'Cartelle Cliniche',
      video: 'Neve & Video', staff: 'Staff', report: 'Report Federazione',
      gare: 'Gare & Risultati',
      clienti: 'Clienti', programmi: 'Programmi', sessioni: 'Sessioni',
      esercizi: 'Esercizi', pagamenti: 'Pagamenti', messaggi: 'Messaggi',
    };
    crumbEl.textContent = labels[view] || view;
  }
  if (window.__renderCharts) setTimeout(() => window.__renderCharts(view), 30);
  if (window.__animateCounters) setTimeout(() => window.__animateCounters(), 60);
  if (window.__paneInit && window.__paneInit[view]) setTimeout(() => window.__paneInit[view](), 80);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ UNIVERSAL CLICK HANDLER ============
document.addEventListener('click', (e) => {
  // Nav links
  const link = e.target.closest('[data-view]');
  if (link && link.tagName !== 'BUTTON') {
    e.preventDefault();
    setActiveNav(link.dataset.view);
    return;
  }

  // Athlete row → modal
  const athleteRow = e.target.closest('[data-athlete]');
  if (athleteRow) { openAthlete(athleteRow.dataset.athlete); return; }

  // Client row → modal
  const clientRow = e.target.closest('[data-client]');
  if (clientRow) { openClient(clientRow.dataset.client); return; }

  // Rehab tab switch
  const rehabTab = e.target.closest('[data-rehab-tab]');
  if (rehabTab) {
    document.querySelectorAll('[data-rehab-tab]').forEach(t => t.classList.remove('active'));
    rehabTab.classList.add('active');
    if (window.__renderRehab) window.__renderRehab(rehabTab.dataset.rehabTab);
    return;
  }

  // Day picker (week view in programma)
  const weekDay = e.target.closest('[data-day-idx]');
  if (weekDay) {
    document.querySelectorAll('[data-day-idx]').forEach(d => d.classList.remove('selected'));
    weekDay.classList.add('selected');
    if (window.__renderSession) window.__renderSession(parseInt(weekDay.dataset.dayIdx));
    return;
  }

  // Race row → details
  const raceRow = e.target.closest('[data-race]');
  if (raceRow) {
    toast('Dettaglio gara: ' + raceRow.dataset.race, 'info', 'i');
    return;
  }

  // Filter tab segmented
  const filter = e.target.closest('[data-filter]');
  if (filter) {
    const group = filter.closest('[data-filter-group]');
    if (group) {
      group.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
      filter.classList.add('active');
      const target = group.dataset.filterGroup;
      const value = filter.dataset.filter;
      applyFilter(target, value);
      return;
    }
  }

  // Universal: any button without specific behavior → toast feedback
  const btn = e.target.closest('button');
  if (btn && !btn.dataset.handled && btn.type !== 'submit') {
    if (btn.classList.contains('modal-close')) return;
    if (btn.dataset.action === 'close-modal') return;
    if (btn.closest('.tab')) return;
    const action = btn.dataset.toast || btn.textContent.trim().replace(/^[+•↦→←]/, '').trim();
    if (action && action.length < 60) {
      toast(action, 'success');
    }
  }
});

// ============ FILTERS / SEARCH ============
function applyFilter(target, value) {
  document.querySelectorAll(`[data-filter-target="${target}"] [data-tags]`).forEach(it => {
    const tags = it.dataset.tags.split(',');
    it.classList.toggle('is-hidden', !(value === 'all' || tags.includes(value)));
  });
}
function attachSearch(inputEl, target) {
  if (!inputEl) return;
  inputEl.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll(`[data-filter-target="${target}"] [data-search]`).forEach(it => {
      const text = it.dataset.search.toLowerCase();
      it.classList.toggle('is-hidden', q && !text.includes(q));
    });
  });
}
window.attachSearch = attachSearch;

// ============ ANIMATED COUNTERS ============
window.__animateCounters = function() {
  document.querySelectorAll('[data-count]:not([data-counted])').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0');
    const duration = parseInt(el.dataset.duration || '900');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    el.dataset.counted = '1';
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = prefix + val.toLocaleString('it-IT', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
};

// ============ BENCHMARK COMPONENT RENDERER ============
function renderBenchmark(athleteId, testKey) {
  const a = window.DATA.swissTeam.athletes.find(x => x.id === athleteId);
  if (!a || !a.tests) return '';
  const meta = window.UTIL.testMeta[testKey];
  const bm = window.DATA.swissTeam.benchmarks[a.sex === 'F' ? 'female' : 'male'][testKey];
  const value = a.tests[testKey];
  if (value == null) return '';

  const min = Math.min(bm.teamMin, bm.wcAvg) * 0.96;
  const max = Math.max(bm.wcMax, bm.teamMax) * 1.02;
  const pct = (v) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));

  const rk = window.UTIL.rankInTeam(athleteId, testKey, meta.higher);
  const rkClass = rk && rk.rank === 1 ? 'gold' : rk && rk.rank === 2 ? 'silver' : rk && rk.rank === 3 ? 'bronze' : '';

  const dTeam = (value - bm.teamAvg).toFixed(meta.decimals);
  const dWcTop = (value - bm.wcTop10).toFixed(meta.decimals);
  const dTeamGood = (parseFloat(dTeam) >= 0) === meta.higher;
  const dWcGood = (parseFloat(dWcTop) >= 0) === meta.higher;

  return `
    <div class="benchmark">
      <div class="benchmark-head">
        <div class="benchmark-name">${meta.label} <span>${a.sex === 'F' ? 'ref. donne' : 'ref. uomini'}</span></div>
        <div class="benchmark-value">${value.toFixed(meta.decimals)}<small>${meta.unit}</small></div>
      </div>
      <div class="benchmark-bar">
        <div class="benchmark-track"></div>
        <div class="benchmark-fill" style="width:${pct(value)}%;"></div>
        <div class="benchmark-marker team" style="left:${pct(bm.teamAvg)}%;"></div>
        <div class="benchmark-marker wc" style="left:${pct(bm.wcTop10)}%;"></div>
        <div class="benchmark-dot" style="left:${pct(value)}%;"></div>
      </div>
      <div class="benchmark-legend">
        ${rk ? `<span class="benchmark-rank ${rkClass}">#${rk.rank} di ${rk.total} squadra</span>` : ''}
        <span class="${dTeamGood ? 'text-good' : 'text-bad'}">vs Team avg <strong>${dTeamGood?'+':''}${dTeam}${meta.unit}</strong></span>
        <span class="${dWcGood ? 'text-good' : 'text-bad'}">vs WC Top10 <strong>${dWcGood?'+':''}${dWcTop}${meta.unit}</strong></span>
      </div>
    </div>
  `;
}
window.renderBenchmark = renderBenchmark;

// ============ CHARTS ============
const chartDefaults = {
  responsive: true, maintainAspectRatio: false,
  animation: { duration: 900, easing: 'easeOutQuart' },
  interaction: { mode: 'index', intersect: false },
};
const gridColor = 'rgba(0,0,0,0.05)';
const tickColor = '#76767E';

function lineChart(ctx, labels, datasets, opts = {}) {
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: datasets.map(d => ({
      borderColor: d.color || '#C8102E',
      backgroundColor: d.fill ? createGradient(ctx, d.color || '#C8102E') : 'transparent',
      borderWidth: 2.2, tension: 0.4,
      fill: !!d.fill, pointRadius: d.point ?? 0, pointHoverRadius: 5,
      pointBackgroundColor: d.color || '#C8102E',
      pointBorderColor: '#FFFFFF', pointBorderWidth: 2, ...d
    })) },
    options: {
      ...chartDefaults,
      plugins: {
        legend: { display: !!opts.legend, labels: { color: tickColor, font: { size: 11, family: 'Inter' }, boxWidth: 8, boxHeight: 8, usePointStyle: true } },
        tooltip: tooltipStyle(),
      },
      scales: {
        x: { grid: { color: gridColor, drawTicks: false }, ticks: { color: tickColor, font: { size: 10 } }, border: { display: false } },
        y: { grid: { color: gridColor, drawTicks: false }, ticks: { color: tickColor, font: { size: 10 } }, beginAtZero: opts.beginAtZero !== false, border: { display: false } }
      },
      ...opts.chartOpts
    }
  });
}
function createGradient(ctx, color) {
  const canvas = ctx.canvas || ctx;
  const c = canvas.getContext ? canvas.getContext('2d') : null;
  if (!c) return color + '20';
  const g = c.createLinearGradient(0, 0, 0, canvas.height || 200);
  g.addColorStop(0, color + '40');
  g.addColorStop(1, color + '02');
  return g;
}
function barChart(ctx, labels, datasets, opts = {}) {
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: datasets.map(d => ({ backgroundColor: d.color || '#C8102E', borderRadius: 6, borderSkipped: false, ...d })) },
    options: {
      ...chartDefaults,
      plugins: {
        legend: { display: !!opts.legend, labels: { color: tickColor, font: { size: 11, family: 'Inter' }, boxWidth: 8, boxHeight: 8, usePointStyle: true } },
        tooltip: tooltipStyle(),
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: tickColor, font: { size: 10 } }, border: { display: false } },
        y: { grid: { color: gridColor, drawTicks: false }, ticks: { color: tickColor, font: { size: 10 } }, beginAtZero: true, border: { display: false } }
      }
    }
  });
}
function radarChart(ctx, labels, dataset, label2 = null, dataset2 = null) {
  const datasets = [{
    label: label2 ? 'Atleta' : '',
    data: dataset, backgroundColor: 'rgba(200, 16, 46, 0.18)', borderColor: '#C8102E',
    borderWidth: 2, pointBackgroundColor: '#C8102E', pointRadius: 3, pointHoverRadius: 5,
    pointBorderColor: 'white', pointBorderWidth: 1.5,
  }];
  if (dataset2) {
    datasets.push({
      label: label2,
      data: dataset2, backgroundColor: 'rgba(118, 118, 126, 0.06)', borderColor: '#76767E',
      borderWidth: 1.5, borderDash: [4, 4], pointBackgroundColor: '#76767E', pointRadius: 2,
    });
  }
  return new Chart(ctx, {
    type: 'radar',
    data: { labels, datasets },
    options: {
      ...chartDefaults,
      plugins: {
        legend: { display: !!label2, labels: { color: tickColor, font: { size: 11, family: 'Inter' }, boxWidth: 8, boxHeight: 8, usePointStyle: true } },
        tooltip: tooltipStyle()
      },
      scales: { r: {
        grid: { color: gridColor }, angleLines: { color: gridColor },
        pointLabels: { color: '#44444A', font: { size: 11, family: 'Inter', weight: 500 } },
        ticks: { display: false, stepSize: 20 }, suggestedMin: 0, suggestedMax: 100,
      } }
    }
  });
}
function tooltipStyle() {
  return {
    backgroundColor: 'rgba(10,10,10,0.95)',
    titleColor: '#fafafa', bodyColor: '#d4d4d4',
    titleFont: { family: 'Inter', size: 12, weight: '600' },
    bodyFont: { family: 'Inter', size: 12 },
    padding: 10, cornerRadius: 8, displayColors: true,
    boxPadding: 4, borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1,
  };
}

// ============ ATHLETE MODAL ============
function openAthlete(id) {
  const a = window.DATA.swissTeam.athletes.find(x => x.id === id);
  if (!a) return;
  const modal = document.getElementById('athlete-modal');
  if (!modal) return;
  document.getElementById('am-name').textContent = a.name;
  document.getElementById('am-meta').textContent = `${a.born} · ${a.sex === 'F' ? 'F' : 'M'} · ${a.disc.join(' / ')} · Focus: ${a.focus}`;
  document.getElementById('am-avatar').textContent = window.UTIL.initials(a.name);
  document.getElementById('am-readiness').textContent = a.readiness + '%';
  document.getElementById('am-hrv').textContent = a.hrv + 'ms';
  document.getElementById('am-sleep').textContent = a.sleep + 'h';
  document.getElementById('am-load').textContent = a.load;
  document.getElementById('am-status').textContent = a.status;
  document.getElementById('am-status').className = 'pill ' + (a.injury ? 'bad' : 'good');
  document.getElementById('am-tags').innerHTML = a.disc.map(d => `<span class="disc-tag ${d.toLowerCase()}">${d}</span>`).join('');
  if (a.injury) {
    document.getElementById('am-injury-row').style.display = '';
    document.getElementById('am-injury').textContent = a.injury;
  } else {
    document.getElementById('am-injury-row').style.display = 'none';
  }

  // WC standing
  const wcEl = document.getElementById('am-wc');
  if (a.wcOverall) {
    wcEl.style.display = '';
    wcEl.innerHTML = `
      <div class="wc-position">
        <div class="wc-position-rank">#${a.wcOverall}</div>
        <div class="wc-position-info"><strong>POSIZIONE COPPA DEL MONDO</strong><span>Generale ${a.sex === 'F' ? 'donne' : 'uomini'} · stagione 2025/26</span></div>
        <div class="wc-position-points">${a.wcPoints}<small>punti WC</small></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px;">
        <div class="stat" style="padding:12px;"><div class="stat-label">Vittorie</div><div class="stat-value" style="font-size:22px;">${a.wins}</div></div>
        <div class="stat" style="padding:12px;"><div class="stat-label">Podi</div><div class="stat-value" style="font-size:22px;">${a.podiums}</div></div>
        <div class="stat" style="padding:12px;"><div class="stat-label">Top 10</div><div class="stat-value" style="font-size:22px;">${a.top10s}</div></div>
        <div class="stat" style="padding:12px;"><div class="stat-label">Gare</div><div class="stat-value" style="font-size:22px;">${a.raceCount}</div></div>
      </div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
        ${Object.entries(a.discRank).filter(([_,v]) => v != null).map(([d, r]) => `<span class="pill muted"><span class="disc-tag ${d.toLowerCase()}" style="margin:0;">${d}</span> &nbsp;#${r} WC</span>`).join('')}
      </div>
    `;
  } else {
    wcEl.style.display = '';
    wcEl.innerHTML = `<div class="wc-position" style="background:var(--surface-2);border-color:var(--border);"><div class="wc-position-rank" style="color:var(--text-3);">—</div><div class="wc-position-info"><strong>STAGIONE INTERROTTA</strong><span>In rehabilitazione · nessuna gara WC 2025/26</span></div></div>`;
  }

  // Benchmark for each test
  const bmEl = document.getElementById('am-benchmarks');
  bmEl.innerHTML = ['cmj','sj','dj','squat1RM','vo2max','ybalance']
    .map(k => renderBenchmark(id, k))
    .join('');

  modal.classList.add('open');

  setTimeout(() => {
    const cmjEl = document.getElementById('am-cmj-chart');
    if (cmjEl) {
      if (cmjEl._chart) cmjEl._chart.destroy();
      const base = a.tests.cmj - 3;
      const data = Array.from({length: 8}, (_, i) => +(base + i * 0.4 + (Math.random()-0.5)*0.3).toFixed(1));
      data[7] = a.tests.cmj;
      cmjEl._chart = lineChart(cmjEl, ['W1','W2','W3','W4','W5','W6','W7','W8'], [{ data, color: '#C8102E', fill: true }]);
    }
    const wlEl = document.getElementById('am-wl-chart');
    if (wlEl) {
      if (wlEl._chart) wlEl._chart.destroy();
      wlEl._chart = barChart(wlEl, ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],
        [{ label: 'Carico (au)', data: [320, 480, 250, 540, 420, 380, 0], color: '#C8102E' }]);
    }
    const rdEl = document.getElementById('am-radar');
    if (rdEl) {
      if (rdEl._chart) rdEl._chart.destroy();
      const sex = a.sex === 'F' ? 'female' : 'male';
      const benches = window.DATA.swissTeam.benchmarks[sex];
      const score = (test) => {
        const b = benches[test];
        const v = a.tests[test];
        return Math.max(0, Math.min(100, ((v - b.wcAvg) / (b.wcMax - b.wcAvg)) * 100));
      };
      rdEl._chart = radarChart(rdEl,
        ['Forza max','Potenza','Reattività','Endurance','Equilibrio','Salto'],
        [score('squat1RM'), score('sj'), score('dj'), score('vo2max'), score('ybalance'), score('cmj')],
        'WC Top10', [70,70,70,70,70,70]
      );
    }
  }, 100);
}
function closeAthlete() { document.getElementById('athlete-modal').classList.remove('open'); }
window.openAthlete = openAthlete;
window.closeAthlete = closeAthlete;

// ============ CLIENT MODAL ============
function openClient(id) {
  const c = window.DATA.personal.clients.find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('client-modal');
  if (!modal) return;
  document.getElementById('cm-name').textContent = c.name;
  document.getElementById('cm-meta').textContent = `${c.age} anni · ${c.sport}`;
  document.getElementById('cm-avatar').textContent = window.UTIL.initials(c.name);
  document.getElementById('cm-goal').textContent = c.goal;
  document.getElementById('cm-plan').textContent = c.plan;
  document.getElementById('cm-adherence').textContent = c.adherence + '%';
  document.getElementById('cm-sessions').textContent = `${c.sessions} / ${c.total}`;
  document.getElementById('cm-next').textContent = c.nextSession;
  modal.classList.add('open');
  setTimeout(() => {
    const el = document.getElementById('cm-progress-chart');
    if (el) {
      if (el._chart) el._chart.destroy();
      const base = 60 + Math.random()*10;
      const data = Array.from({length: 12}, (_, i) => +(base + i*1.2 + (Math.random()-0.5)*1.2).toFixed(1));
      el._chart = lineChart(el, ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],
        [{ data, color: '#1D4ED8', fill: true }]);
    }
  }, 100);
}
function closeClient() { document.getElementById('client-modal').classList.remove('open'); }
window.openClient = openClient;
window.closeClient = closeClient;

// ============ KEYBOARD ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeAthlete(); closeClient(); }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector('.search input')?.focus();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.__renderCharts) {
    const v = document.querySelector('.nav-link.active')?.dataset.view || 'dashboard';
    setTimeout(() => window.__renderCharts(v), 60);
  }
  if (window.__animateCounters) setTimeout(() => window.__animateCounters(), 80);
  initMagneticButtons();
  initCursorGlow();
  initParticles();
  initCountdown();
});

// ============================================================
// v4 — WOW additions
// ============================================================

// ============ DRAWER (athlete profile) ============
function openDrawer(id) {
  const a = window.DATA.swissTeam.athletes.find(x => x.id === id);
  if (!a) return;
  const drawer = document.getElementById('athlete-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return openAthlete(id); // fallback

  // Trading card
  document.getElementById('dr-watermark').textContent = window.UTIL.initials(a.name);
  document.getElementById('dr-name').innerHTML = a.name.split(' ').map((part, i) => i === a.name.split(' ').length - 1 ? `<em>${part}</em>` : part).join(' ');
  document.getElementById('dr-meta').textContent = `${a.born} · ${a.sex === 'F' ? 'Donne' : 'Uomini'} · ${a.disc.join(' / ')} · ${a.weight}kg / ${a.height}cm`;
  document.getElementById('dr-rank').innerHTML = a.wcOverall ? `<em>#</em>${a.wcOverall}` : '—';
  document.getElementById('dr-points').textContent = a.wcPoints.toLocaleString('it-IT');
  document.getElementById('dr-podiums').textContent = a.podiums;
  document.getElementById('dr-wins').textContent = a.wins;

  document.getElementById('dr-title-name').textContent = a.name;

  // Live metrics
  document.getElementById('dr-readiness').textContent = a.readiness + '%';
  document.getElementById('dr-hrv').textContent = a.hrv + 'ms';
  document.getElementById('dr-sleep').textContent = a.sleep + 'h';
  document.getElementById('dr-load').textContent = a.load;

  // Status
  const stEl = document.getElementById('dr-status');
  stEl.textContent = a.status;
  stEl.className = 'pill ' + (a.injury ? 'bad' : 'good');

  // Injury banner
  const injEl = document.getElementById('dr-injury');
  if (a.injury) {
    injEl.style.display = '';
    injEl.innerHTML = `<strong>⚠ Infortunio in corso:</strong> ${a.injury}`;
  } else {
    injEl.style.display = 'none';
  }

  // DNA strip
  const sex = a.sex === 'F' ? 'female' : 'male';
  const benches = window.DATA.swissTeam.benchmarks[sex];
  const tests = ['squat1RM', 'sj', 'dj', 'vo2max', 'ybalance', 'cmj'];
  const labels = ['Forza', 'Pot', 'Reat', 'End', 'Eq', 'Salto'];
  const dnaHtml = tests.map((t, i) => {
    const b = benches[t];
    const v = a.tests[t];
    const score = ((v - b.wcAvg) / (b.wcMax - b.wcAvg)) * 100;
    const cls = score >= 80 ? 'elite' : score >= 60 ? 'good' : score >= 40 ? '' : score >= 20 ? 'warn' : 'bad';
    const heightPct = Math.max(15, Math.min(100, score));
    return `<div class="dna-bar ${cls}" style="height:${heightPct}%;" data-label="${labels[i]} ${Math.round(score)}"></div>`;
  }).join('');
  document.getElementById('dr-dna').innerHTML = dnaHtml;

  // Benchmarks
  document.getElementById('dr-benchmarks').innerHTML = ['cmj','sj','dj','squat1RM','vo2max','ybalance']
    .map(k => renderBenchmark(id, k))
    .join('');

  // Discipline ranks
  if (a.wcOverall) {
    document.getElementById('dr-disc-ranks').innerHTML = Object.entries(a.discRank)
      .filter(([_,v]) => v != null)
      .map(([d, r]) => `<div class="alert-row"><span class="disc-tag ${d.toLowerCase()}">${d}</span><div class="label">Posizione Coppa del Mondo · ${d}</div><strong style="font-size:18px;">#${r}</strong></div>`).join('');
  } else {
    document.getElementById('dr-disc-ranks').innerHTML = '<div class="alert-row"><span class="dot bad"></span><div class="label">Stagione interrotta · in rehabilitazione</div></div>';
  }

  // Recent results for athlete
  const results = window.DATA.swissTeam.results.filter(r => r.athleteId === id).slice(0, 5);
  document.getElementById('dr-recent-results').innerHTML = results.length ? results.map(r => {
    const cls = r.position === 1 ? 'gold' : r.position === 2 ? 'silver' : r.position === 3 ? 'bronze' : (r.position <= 10 ? 'top10' : '');
    return `<div class="alert-row">
      <div class="position-badge ${cls}" style="width:30px;height:30px;font-size:12px;">${r.position}</div>
      <div class="label"><strong>${r.race}</strong> · ${r.disc} · ${r.gap}</div>
      <span class="when tabular">${r.wcPts}pt</span>
    </div>`;
  }).join('') : '<div class="alert-row"><span class="dot bad"></span><div class="label">Nessuna gara questa stagione</div></div>';

  // Show drawer
  drawer.classList.add('open');
  backdrop.classList.add('open');

  // Charts
  setTimeout(() => {
    const cmjEl = document.getElementById('dr-cmj-chart');
    if (cmjEl) {
      if (cmjEl._chart) cmjEl._chart.destroy();
      const base = a.tests.cmj - 3;
      const data = Array.from({length: 8}, (_, i) => +(base + i * 0.4 + (Math.random()-0.5)*0.3).toFixed(1));
      data[7] = a.tests.cmj;
      cmjEl._chart = lineChart(cmjEl, ['W1','W2','W3','W4','W5','W6','W7','W8'], [{ data, color: '#C8102E', fill: true }]);
    }
    const rdEl = document.getElementById('dr-radar');
    if (rdEl) {
      if (rdEl._chart) rdEl._chart.destroy();
      const score = (test) => {
        const b = benches[test];
        return Math.max(0, Math.min(100, ((a.tests[test] - b.wcAvg) / (b.wcMax - b.wcAvg)) * 100));
      };
      rdEl._chart = radarChart(rdEl,
        ['Forza max','Potenza','Reattività','Endurance','Equilibrio','Salto'],
        [score('squat1RM'), score('sj'), score('dj'), score('vo2max'), score('ybalance'), score('cmj')],
        'WC Top10', [70,70,70,70,70,70]
      );
    }
  }, 200);
}
function closeDrawer() {
  document.getElementById('athlete-drawer')?.classList.remove('open');
  document.getElementById('drawer-backdrop')?.classList.remove('open');
}
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

// Override universal handler to use drawer if present
const _origOpenAthlete = window.openAthlete;
window.openAthlete = function(id) {
  if (document.getElementById('athlete-drawer')) return openDrawer(id);
  return _origOpenAthlete(id);
};

// ============ COUNTDOWN LIVE TICKER ============
function initCountdown() {
  const targets = document.querySelectorAll('[data-countdown-target]');
  if (!targets.length) return;
  const update = () => {
    targets.forEach(el => {
      const target = new Date(el.dataset.countdownTarget).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
      const secs = Math.floor((diff % (1000*60)) / 1000);
      const dEl = el.querySelector('[data-cd="d"]');
      const hEl = el.querySelector('[data-cd="h"]');
      const mEl = el.querySelector('[data-cd="m"]');
      const sEl = el.querySelector('[data-cd="s"]');
      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    });
  };
  update();
  if (!window.__cdTick) window.__cdTick = setInterval(update, 1000);
}
window.initCountdown = initCountdown;

// ============ PARTICLES ============
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let particles = [];
  const fit = () => {
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
  };
  fit();
  window.addEventListener('resize', fit);

  const N = 80;
  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      a: Math.random() * 0.4 + 0.15,
    });
  }

  let mouse = { x: -9999, y: -9999 };
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * dpr;
    mouse.y = (e.clientY - rect.top) * dpr;
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;

      // mouse repel
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100 * dpr) {
        const force = (100*dpr - dist) / (100*dpr);
        p.x += (dx/dist) * force * 1.2;
        p.y += (dy/dist) * force * 1.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(20, 20, 25, ${p.a})`;
      ctx.fill();
    });

    // connect close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110 * dpr) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(20, 20, 25, ${0.05 * (1 - d/(110*dpr))})`;
          ctx.lineWidth = 0.6 * dpr;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}

// ============ CURSOR GLOW ============
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;
  const parent = glow.parentElement;
  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
    glow.style.opacity = '1';
  });
  parent.addEventListener('mouseleave', () => glow.style.opacity = '0');
}

// ============ MAGNETIC BUTTONS ============
function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach(el => {
    let rect;
    el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('mousemove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      el.style.transform = `translate(${x*0.18}px, ${y*0.22}px)`;
      const inner = el.querySelector('*');
      if (inner) inner.style.transform = `translate(${x*0.06}px, ${y*0.08}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      const inner = el.querySelector('*');
      if (inner) inner.style.transform = '';
    });
  });
}

// ============ GAUGE ANIMATOR ============
function animateGauge(el, value, max = 100) {
  if (!el) return;
  const fill = el.querySelector('.gauge-fill');
  if (!fill) return;
  const circ = parseInt(fill.style.getPropertyValue('--circ') || '565');
  const offset = circ * (1 - value / max);
  setTimeout(() => { fill.style.strokeDashoffset = offset; }, 50);
}
window.animateGauge = animateGauge;

// ============================================================
// FORM MODAL SYSTEM (v6)
// ============================================================
function ensureFormModal() {
  let m = document.getElementById('fm-modal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'fm-modal';
  m.className = 'fm-modal';
  m.innerHTML = `<div class="fm-card">
    <div class="fm-head"><h3 id="fm-title">—<small id="fm-subtitle"></small></h3><button class="btn ghost" data-action="close-fm">✕</button></div>
    <div class="fm-body" id="fm-body"></div>
    <div class="fm-foot" id="fm-foot"></div>
  </div>`;
  document.body.appendChild(m);
  m.addEventListener('click', (e) => { if (e.target.id === 'fm-modal') closeFormModal(); });
  return m;
}
function openFormModal({ title, subtitle = '', body = '', actions = [], onMount }) {
  const m = ensureFormModal();
  document.getElementById('fm-title').firstChild.textContent = title + ' ';
  document.getElementById('fm-subtitle').textContent = subtitle;
  document.getElementById('fm-body').innerHTML = body;
  const foot = document.getElementById('fm-foot');
  foot.innerHTML = '';
  if (actions.length) {
    foot.innerHTML += '<div class="spacer"></div>';
    actions.forEach(a => {
      const cls = a.primary ? 'btn primary' : a.danger ? 'btn' : 'btn';
      const danger = a.danger ? 'style="color:var(--bad);"' : '';
      foot.innerHTML += `<button class="${cls}" ${danger} data-fm-action="${a.action}">${a.text}</button>`;
    });
  }
  m.classList.add('open');
  if (onMount) setTimeout(onMount, 50);
}
function closeFormModal() { document.getElementById('fm-modal')?.classList.remove('open'); }
window.openFormModal = openFormModal;
window.closeFormModal = closeFormModal;

// ============================================================
// FORMS
// ============================================================

// Session builder
function sessionForm() {
  return `
    <div class="fm-section">Tipo &amp; orario</div>
    <div class="field-row three">
      <div class="field"><label class="field-label">Tipo</label>
        <select class="field-select" id="ss-type">
          <option value="gym">Palestra · Forza</option>
          <option value="gym2">Palestra · Potenza</option>
          <option value="snow">Neve · GS</option>
          <option value="snow2">Neve · SL</option>
          <option value="snow3">Neve · SG</option>
          <option value="snow4">Neve · DH</option>
          <option value="recovery">Recovery</option>
          <option value="meeting">Briefing</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Data</label><input type="date" class="field-input" id="ss-date" value="2026-05-07"/></div>
      <div class="field"><label class="field-label">Orario</label><input type="time" class="field-input" id="ss-time" value="09:30"/></div>
    </div>

    <div class="field-row">
      <div class="field"><label class="field-label">Località</label><input type="text" class="field-input" id="ss-loc" value="Magglingen"/></div>
      <div class="field"><label class="field-label">Durata (min)</label><input type="number" class="field-input" id="ss-dur" value="90"/></div>
    </div>

    <div class="fm-section">Atleti convocati</div>
    <div class="chip-group" id="ss-athletes">
      ${window.DATA.swissTeam.athletes.map(a => `<div class="chip-pick" data-id="${a.id}">${a.name}</div>`).join('')}
    </div>

    <div class="fm-section">Carico stimato &amp; obiettivo</div>
    <div class="field-row three">
      <div class="field"><label class="field-label">RPE target</label><input type="number" class="field-input" id="ss-rpe" value="7" min="1" max="10"/></div>
      <div class="field"><label class="field-label">Carico (au)</label><input type="number" class="field-input" id="ss-load" value="540"/></div>
      <div class="field"><label class="field-label">Gruppo</label>
        <select class="field-select" id="ss-group">
          <option>Speed (DH/SG)</option>
          <option>Tech (GS/SL)</option>
          <option>Tutta la squadra</option>
        </select>
      </div>
    </div>

    <div class="field"><label class="field-label">Note</label>
      <textarea class="field-textarea" placeholder="Note tecniche · obiettivi specifici…"></textarea>
    </div>
  `;
}

// Test scheduler
function testForm() {
  return `
    <div class="fm-section">Test &amp; sessione</div>
    <div class="field-row">
      <div class="field"><label class="field-label">Tipo test</label>
        <select class="field-select">
          <option>CMJ + SJ + DJ batch</option>
          <option>Squat 1RM</option>
          <option>Wingate 30s</option>
          <option>VO2max + soglia</option>
          <option>Y-Balance + Hop test</option>
          <option>Forza isokinetic ginocchio</option>
          <option>Test antropometrico</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Data</label><input type="date" class="field-input" value="2026-05-15"/></div>
    </div>
    <div class="field-row">
      <div class="field"><label class="field-label">Località</label>
        <select class="field-select">
          <option>Magglingen — BASPO</option>
          <option>OYM Cham</option>
          <option>Schulthess Klinik</option>
          <option>In trasferta</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Operatore</label>
        <select class="field-select">
          <option>Marcello Tavola</option>
          <option>Helmut Krug</option>
          <option>Tom Stauffer</option>
          <option>Dr. Schneider (esterno)</option>
        </select>
      </div>
    </div>
    <div class="fm-section">Atleti coinvolti</div>
    <div class="chip-group">
      <div class="chip-pick selected">Tutta la squadra</div>
      <div class="chip-pick">Solo Speed</div>
      <div class="chip-pick">Solo Tech</div>
      <div class="chip-pick">Solo donne</div>
      <div class="chip-pick">Solo uomini</div>
      <div class="chip-pick">Solo rehab</div>
    </div>
  `;
}

// Track configurator (THE feature requested)
function trackConfigForm() {
  const tc = window.__trackConfig || {
    type: 'GS', gates: 28, length: 980, drop: 320, slope: 33, gateGap: 22, snow: 'hard', set: 'technical', width: 28, target: 65,
  };
  return `
    <div class="track-preview">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--text-3);margin-bottom:8px;">Anteprima configurazione</div>
      <div class="track-preview-stats" id="tc-preview">
        <div class="track-preview-stat"><strong id="tc-p-type">${tc.type}</strong><span>Tipo</span></div>
        <div class="track-preview-stat"><strong id="tc-p-gates">${tc.gates}</strong><span>Porte</span></div>
        <div class="track-preview-stat"><strong id="tc-p-length">${tc.length}<small style="font-size:10px;">m</small></strong><span>Lunghezza</span></div>
        <div class="track-preview-stat"><strong id="tc-p-drop">${tc.drop}<small style="font-size:10px;">m</small></strong><span>Dislivello</span></div>
      </div>
    </div>

    <div class="fm-section">Specialità &amp; geometria</div>
    <div class="field">
      <label class="field-label">Tipo gara</label>
      <div class="chip-group" data-radio="tc-type" id="tc-type-group">
        <div class="chip-pick danger ${tc.type === 'SL' ? 'selected' : ''}" data-val="SL">SL — Slalom</div>
        <div class="chip-pick danger ${tc.type === 'GS' ? 'selected' : ''}" data-val="GS">GS — Gigante</div>
        <div class="chip-pick danger ${tc.type === 'SG' ? 'selected' : ''}" data-val="SG">SG — Super-G</div>
        <div class="chip-pick danger ${tc.type === 'DH' ? 'selected' : ''}" data-val="DH">DH — Discesa</div>
        <div class="chip-pick danger ${tc.type === 'AC' ? 'selected' : ''}" data-val="AC">AC — Combinata</div>
      </div>
    </div>

    <div class="field-row three">
      <div class="field"><label class="field-label">Numero porte</label><input type="number" class="field-input tc-input" id="tc-gates" value="${tc.gates}" min="20" max="80"/><div class="field-help">Range FIS: SL 55–75 · GS 32–55 · SG 30–50 · DH 30+</div></div>
      <div class="field"><label class="field-label">Lunghezza pista (m)</label><input type="number" class="field-input tc-input" id="tc-length" value="${tc.length}"/></div>
      <div class="field"><label class="field-label">Dislivello (m)</label><input type="number" class="field-input tc-input" id="tc-drop" value="${tc.drop}"/></div>
    </div>

    <div class="field">
      <label class="field-label">Pendenza media (%) · <strong id="tc-slope-val" style="color:var(--accent);">${tc.slope}%</strong></label>
      <input type="range" class="field-range" id="tc-slope" min="15" max="60" value="${tc.slope}"/>
      <div class="field-help">15-25% facile · 25-40% medio · 40+% impegnativo</div>
    </div>

    <div class="field-row">
      <div class="field"><label class="field-label">Distanza media porte (m)</label><input type="number" class="field-input tc-input" id="tc-gap" value="${tc.gateGap}"/></div>
      <div class="field"><label class="field-label">Larghezza tracciato (m)</label><input type="number" class="field-input tc-input" id="tc-width" value="${tc.width}"/></div>
    </div>

    <div class="fm-section">Condizioni neve &amp; set</div>
    <div class="field">
      <label class="field-label">Tipo neve</label>
      <div class="chip-group" data-radio="tc-snow">
        <div class="chip-pick ${tc.snow === 'hard' ? 'selected' : ''}" data-val="hard">Hard pack</div>
        <div class="chip-pick ${tc.snow === 'salt' ? 'selected' : ''}" data-val="salt">Salt</div>
        <div class="chip-pick ${tc.snow === 'soft' ? 'selected' : ''}" data-val="soft">Soft</div>
        <div class="chip-pick ${tc.snow === 'frozen' ? 'selected' : ''}" data-val="frozen">Frozen</div>
        <div class="chip-pick ${tc.snow === 'icy' ? 'selected' : ''}" data-val="icy">Ghiaccio</div>
      </div>
    </div>

    <div class="field">
      <label class="field-label">Tipo set</label>
      <div class="chip-group" data-radio="tc-set">
        <div class="chip-pick ${tc.set === 'technical' ? 'selected' : ''}" data-val="technical">Technical · curve strette</div>
        <div class="chip-pick ${tc.set === 'gliding' ? 'selected' : ''}" data-val="gliding">Gliding · scorrevole</div>
        <div class="chip-pick ${tc.set === 'mixed' ? 'selected' : ''}" data-val="mixed">Mixed</div>
        <div class="chip-pick ${tc.set === 'rhythm' ? 'selected' : ''}" data-val="rhythm">Rhythm change</div>
      </div>
    </div>

    <div class="fm-section">Obiettivo cronometrico</div>
    <div class="field-row">
      <div class="field"><label class="field-label">Tempo target manche (s)</label><input type="number" class="field-input tc-input" id="tc-target" value="${tc.target}" step="0.1"/></div>
      <div class="field"><label class="field-label">Località</label>
        <select class="field-select">
          <option>Saas-Fee</option><option>Stelvio</option><option>Zermatt</option>
          <option>Lenzerheide</option><option>Adelboden</option><option>Wengen</option>
          <option>St. Moritz</option><option>Cervinia</option>
        </select>
      </div>
    </div>
  `;
}

// Briefing
function briefingForm() {
  return `
    <div class="fm-section">Gara &amp; partecipanti</div>
    <div class="field-row">
      <div class="field"><label class="field-label">Gara</label>
        <select class="field-select">
          ${window.DATA.swissTeam.races.map(r => `<option>${r.loc} · ${r.disc} · ${r.date}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label class="field-label">Orario briefing</label><input type="time" class="field-input" value="08:00"/></div>
    </div>

    <div class="fm-section">Punti chiave</div>
    <div class="field"><label class="field-label">Strategia tracciato</label><textarea class="field-textarea" placeholder="Linea, settori chiave, gestione velocità…"></textarea></div>
    <div class="field"><label class="field-label">Condizioni meteo previste</label><input type="text" class="field-input" value="Hard pack · -2°C · vento NE 14 km/h · cielo sereno"/></div>
    <div class="field"><label class="field-label">Note materiali</label><textarea class="field-textarea" placeholder="Tipologia sci, lamine, sciolinatura…"></textarea></div>

    <div class="fm-section">Tempistiche</div>
    <div class="field-row three">
      <div class="field"><label class="field-label">Sveglia</label><input type="time" class="field-input" value="06:30"/></div>
      <div class="field"><label class="field-label">Attivazione</label><input type="time" class="field-input" value="09:30"/></div>
      <div class="field"><label class="field-label">Start 1ª manche</label><input type="time" class="field-input" value="11:30"/></div>
    </div>
  `;
}

// Phase change rehab
function phaseChangeForm(athleteId) {
  const c = window.DATA.swissTeam.rehab[athleteId] || Object.values(window.DATA.swissTeam.rehab)[0];
  return `
    <p style="font-size:13px;color:var(--text-2);line-height:1.55;margin:0 0 18px;">Atleta · <strong>${c.name}</strong>. Stato attuale: <strong>${c.phases.find(p => p.current)?.name || '—'}</strong>. Selezionare la nuova fase richiede conferma del medico federale.</p>

    <div class="fm-section">Nuova fase</div>
    <div class="chip-group" data-radio="phase-pick">
      ${c.phases.map((p, i) => `<div class="chip-pick danger ${p.current ? 'selected' : ''}" data-val="${i}">${p.name}</div>`).join('')}
    </div>

    <div class="fm-section">Motivazione &amp; criteri</div>
    <div class="field"><label class="field-label">Note del cambio fase</label><textarea class="field-textarea" placeholder="LSI raggiunti · feedback fisio · sentimento atleta…"></textarea></div>

    <div class="field-row">
      <div class="field"><label class="field-label">Approvazione medica</label>
        <select class="field-select">
          <option>Dr. Walter Müller (medico federale)</option>
          <option>Dr. Marc Schneider (fisio)</option>
          <option>Prof. Müller (chirurgo)</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Data effettiva</label><input type="date" class="field-input" value="2026-05-11"/></div>
    </div>
  `;
}

// Document upload
function uploadForm() {
  return `
    <div class="file-drop" onclick="this.querySelector('input').click()">
      <div class="file-drop-icon">📎</div>
      <strong>Trascina qui il referto</strong>
      <span>oppure clicca per selezionare · PDF, DICOM, JPG, PNG · max 25 MB</span>
      <input type="file" hidden multiple accept=".pdf,.jpg,.jpeg,.png,.dcm"/>
    </div>

    <div class="fm-section" style="margin-top:24px;">Metadata referto</div>
    <div class="field-row">
      <div class="field"><label class="field-label">Tipo esame</label>
        <select class="field-select">
          <option>RM (Risonanza Magnetica)</option>
          <option>RX (Radiografia)</option>
          <option>Ecografia</option>
          <option>TC</option>
          <option>Visita ambulatoriale</option>
          <option>Test isokinetico</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Data esame</label><input type="date" class="field-input" value="2026-05-05"/></div>
    </div>
    <div class="field"><label class="field-label">Centro / refertista</label><input type="text" class="field-input" value="Schulthess Klinik · Dr. Müller"/></div>
    <div class="field"><label class="field-label">Findings</label><textarea class="field-textarea" placeholder="Riepilogo dei reperti…"></textarea></div>
  `;
}

// Message composer
function messageForm() {
  return `
    <div class="field-row">
      <div class="field"><label class="field-label">A</label>
        <select class="field-select">
          <option>Dr. Marc Schneider (fisio)</option>
          <option>Dr. Walter Müller (medico fed.)</option>
          <option>Prof. Stefan Müller (chirurgo)</option>
          <option>Dr. Anja Bauer (psicologa)</option>
          <option>Tutto staff medico</option>
          <option>Atleta</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Priorità</label>
        <select class="field-select">
          <option>Normale</option><option>Alta</option><option>Urgente</option>
        </select>
      </div>
    </div>
    <div class="field"><label class="field-label">Oggetto</label><input type="text" class="field-input" placeholder="Es: Aggiornamento test isokinetic"/></div>
    <div class="field"><label class="field-label">Messaggio</label><textarea class="field-textarea" style="min-height:140px;"></textarea></div>
  `;
}

// Convocation list
function convocationForm() {
  return `
    <p style="font-size:13px;color:var(--text-2);margin:0 0 18px;">Selezionare gli atleti convocati per <strong>Zermatt-Cervinia DH · 09 maggio</strong>. Massimo 6 per il team Speed.</p>
    <div id="conv-list">
      ${window.DATA.swissTeam.athletes.filter(a => (a.disc.includes('DH') || a.disc.includes('SG')) && !a.injury).map(a => `
        <div class="conv-row" data-conv-id="${a.id}">
          <div class="conv-check"></div>
          <div>
            <strong style="display:block;font-size:13px;">${a.name}</strong>
            <span style="font-size:11px;color:var(--text-3);">${a.focus} · #${a.wcOverall || '—'} WC · ${a.wcPoints} pt</span>
          </div>
          <span class="readiness" style="width:60px;"><span class="readiness-bar ${window.UTIL.readinessClass(a.readiness)}" style="display:block;height:100%;width:${a.readiness}%;border-radius:999px;background:linear-gradient(90deg,var(--good),#10B981);"></span></span>
          <span class="muted tabular" style="font-size:12px;font-weight:600;">${a.readiness}%</span>
        </div>
      `).join('')}
    </div>
  `;
}

// Athlete form (new)
function athleteForm() {
  return `
    <div class="fm-section">Anagrafica</div>
    <div class="field-row three">
      <div class="field"><label class="field-label">Nome</label><input type="text" class="field-input" placeholder="Nome"/></div>
      <div class="field"><label class="field-label">Cognome</label><input type="text" class="field-input" placeholder="Cognome"/></div>
      <div class="field"><label class="field-label">Data di nascita</label><input type="date" class="field-input"/></div>
    </div>
    <div class="field-row three">
      <div class="field"><label class="field-label">Sesso</label><select class="field-select"><option>F</option><option>M</option></select></div>
      <div class="field"><label class="field-label">Altezza (cm)</label><input type="number" class="field-input"/></div>
      <div class="field"><label class="field-label">Peso (kg)</label><input type="number" class="field-input"/></div>
    </div>
    <div class="fm-section">Specialità</div>
    <div class="field"><label class="field-label">Discipline</label>
      <div class="chip-group">
        <div class="chip-pick">DH</div><div class="chip-pick">SG</div>
        <div class="chip-pick">GS</div><div class="chip-pick">SL</div>
        <div class="chip-pick">AC</div>
      </div>
    </div>
    <div class="field"><label class="field-label">Focus stagione</label><input type="text" class="field-input" placeholder="Es: SG/GS"/></div>
  `;
}

// Event form
function eventForm() {
  return `
    <div class="field-row">
      <div class="field"><label class="field-label">Tipo evento</label>
        <select class="field-select">
          <option>Gara FIS · Coppa del Mondo</option>
          <option>Sessione palestra</option>
          <option>Sessione neve</option>
          <option>Recovery / off</option>
          <option>Trasferta</option>
          <option>Test fisico</option>
          <option>Visita medica</option>
          <option>Briefing</option>
        </select>
      </div>
      <div class="field"><label class="field-label">Data</label><input type="date" class="field-input" value="2026-05-12"/></div>
    </div>
    <div class="field-row">
      <div class="field"><label class="field-label">Località</label><input type="text" class="field-input" value="Magglingen"/></div>
      <div class="field"><label class="field-label">Orario</label><input type="time" class="field-input" value="09:30"/></div>
    </div>
    <div class="field"><label class="field-label">Descrizione</label><textarea class="field-textarea"></textarea></div>
  `;
}

// Template library
function templateLibrary() {
  return `
    <div class="grid grid-2" style="gap:10px;">
      ${[
        {n:'Forza max + Reattività · Speed', d:'5 esercizi · 90′ · carico ~540au', c:'Squad Speed'},
        {n:'Tech focus · GS pre-gara', d:'3 esercizi · 60′ · attivazione', c:'Squad Tech'},
        {n:'Recovery + crioterapia', d:'4 mod. · 90′ · scarico', c:'All'},
        {n:'Mobilità + core', d:'6 esercizi · 45′ · ogni giorno', c:'All'},
        {n:'Forza max · Squat 1RM', d:'4 esercizi · 75′ · max 88%', c:'All'},
        {n:'Wingate + soglia', d:'3 esercizi · 60′ · endurance', c:'Tech'},
        {n:'Pliometria avanzata', d:'5 esercizi · 60′ · esplosivo', c:'Speed'},
        {n:'Pre-LCA RTS · fase 4', d:'7 esercizi · 90′ · Suter', c:'Rehab'},
      ].map(t => `<div class="card" style="cursor:pointer;" data-action="apply-template" data-template="${t.n}">
        <strong style="display:block;font-size:13.5px;">${t.n}</strong>
        <span class="muted" style="font-size:11.5px;display:block;margin:4px 0 10px;">${t.d}</span>
        <span class="pill muted">${t.c}</span>
      </div>`).join('')}
    </div>
  `;
}

// ============================================================
// ACTION HANDLERS
// ============================================================
const ACTIONS = {
  'close-fm': () => closeFormModal(),

  // Sessions / programming
  'new-session': () => openFormModal({
    title: 'Nuova sessione', subtitle: 'Crea un allenamento e assegnalo agli atleti',
    body: sessionForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Salva e assegna', primary: true, action: 'save-session' },
    ]
  }),
  'save-session': () => { closeFormModal(); toast('Sessione salvata · 6 atleti assegnati', 'success', '✓'); },
  'edit-session': () => openFormModal({
    title: 'Modifica sessione', subtitle: 'Box Squat 5×3 @ 85% — Magglingen',
    body: sessionForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Salva modifiche', primary: true, action: 'save-session' },
    ]
  }),
  'open-templates': () => openFormModal({
    title: 'Libreria template', subtitle: '8 template disponibili',
    body: templateLibrary(),
    actions: [{ text: 'Chiudi', action: 'close-fm' }]
  }),
  'apply-template': () => { closeFormModal(); toast('Template applicato alla settimana corrente', 'success', '✓'); },

  // Test
  'new-test': () => openFormModal({
    title: 'Programma test fisico', subtitle: 'Test FMS · isokinetic · CMJ · 1RM · VO2max',
    body: testForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Programma test', primary: true, action: 'save-test' },
    ]
  }),
  'save-test': () => { closeFormModal(); toast('Test programmato · notifica inviata atleti', 'success', '✓'); },

  // Briefing
  'briefing': () => openFormModal({
    title: 'Briefing pre-gara', subtitle: 'Convocazione, strategia, tempistiche',
    body: briefingForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Salva briefing', primary: true, action: 'save-briefing' },
    ]
  }),
  'save-briefing': () => { closeFormModal(); toast('Briefing salvato · invio convocati alle 06:00', 'success', '✓'); },

  // Convocation
  'convocation': () => openFormModal({
    title: 'Convocazione gara', subtitle: 'Zermatt-Cervinia DH · 09 maggio',
    body: convocationForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Conferma convocazione', primary: true, action: 'save-convocation' },
    ],
    onMount: () => {
      document.querySelectorAll('#conv-list .conv-row').forEach(r => {
        r.addEventListener('click', () => r.classList.toggle('selected'));
      });
      // Pre-select top performers
      ['lgb','jfl','jha','ddu','sst'].forEach(id => document.querySelector(`[data-conv-id="${id}"]`)?.classList.add('selected'));
    }
  }),
  'save-convocation': () => {
    const n = document.querySelectorAll('#conv-list .conv-row.selected').length;
    closeFormModal(); toast(`${n} atleti convocati · notifica inviata`, 'success', '✓');
  },

  // Track configurator
  'track-config': () => openFormModal({
    title: 'Configura tracciato', subtitle: 'Specialità · porte · pendenza · neve · target',
    body: trackConfigForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Reset default', action: 'reset-track' },
      { text: 'Applica configurazione', primary: true, action: 'apply-track' },
    ],
    onMount: () => bindTrackConfig(),
  }),
  'apply-track': () => { applyTrackConfig(); closeFormModal(); toast('Tracciato aggiornato · ridisegno completo', 'success', '✓'); },
  'reset-track': () => { window.__trackConfig = null; ACTIONS['track-config'](); },

  // Phase change
  'change-phase': () => openFormModal({
    title: 'Cambio fase rehabilitazione', subtitle: 'Conferma medica richiesta',
    body: phaseChangeForm(window.__currentRehab || 'csu'),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Richiedi approvazione', primary: true, action: 'save-phase' },
    ]
  }),
  'save-phase': () => { closeFormModal(); toast('Richiesta inviata al medico federale', 'success', '✓'); },

  // Document upload
  'upload-document': () => openFormModal({
    title: 'Upload referto medico', subtitle: 'PDF · DICOM · imaging',
    body: uploadForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Carica referto', primary: true, action: 'save-document' },
    ]
  }),
  'save-document': () => { closeFormModal(); toast('Referto caricato · cartella aggiornata', 'success', '✓'); },

  // Message
  'new-message': () => openFormModal({
    title: 'Nuovo messaggio', subtitle: 'Comunicazione interna staff',
    body: messageForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Invia', primary: true, action: 'send-message' },
    ]
  }),
  'send-message': () => { closeFormModal(); toast('Messaggio inviato', 'success', '✓'); },

  // New athlete
  'new-athlete': () => openFormModal({
    title: 'Nuovo atleta', subtitle: 'Anagrafica · specialità · profilo',
    body: athleteForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Crea profilo', primary: true, action: 'save-athlete' },
    ]
  }),
  'save-athlete': () => { closeFormModal(); toast('Profilo atleta creato', 'success', '✓'); },

  // Calendar event
  'new-event': () => openFormModal({
    title: 'Nuovo evento', subtitle: 'Gara · sessione · trasferta',
    body: eventForm(),
    actions: [
      { text: 'Annulla', action: 'close-fm' },
      { text: 'Aggiungi al calendario', primary: true, action: 'save-event' },
    ]
  }),
  'save-event': () => { closeFormModal(); toast('Evento aggiunto al calendario', 'success', '✓'); },

  // Calendar nav
  'cal-prev': () => toast('← Aprile 2026 · 4 gare · 18 sessioni', 'info', 'i'),
  'cal-next': () => toast('Giugno 2026 → · 3 gare · 16 sessioni', 'info', 'i'),
  'week-prev': () => toast('← Settimana 18 · 04 mag · carico 2.840 au', 'info', 'i'),
  'week-next': () => toast('Settimana 20 → · 11 mag · carico previsto 2.640 au', 'info', 'i'),

  // Exports
  'export-pdf-report': () => simulateDownload('APEX_Report_Settimanale.pdf'),
  'export-pdf-rehab': () => simulateDownload('Cartella_Clinica_Suter.pdf'),
  'export-pdf-athlete': () => simulateDownload('Profilo_Atleta.pdf'),
  'export-csv-tests': () => simulateDownload('test_results_squadra.csv'),
  'export-csv-results': () => simulateDownload('risultati_stagione_2025-26.csv'),
  'storico-rehab': () => toast('Storico stagionale aperto · 5 episodi totali', 'info', 'i'),

  // Phase actions for week prev/next, season prev/next, video
  'play-video': (btn) => toast('Riproduzione video: ' + (btn?.dataset.label || 'sessione neve'), 'info', '▶'),

  // View toggles
  'view-list': () => toast('Vista lista attivata', 'info', '☰'),
  'view-calendar': () => toast('Vista calendario attivata', 'info', '📅'),
};

function simulateDownload(filename) {
  toast('Generazione ' + filename + '…', 'info', '⤓');
  setTimeout(() => {
    toast(filename + ' · pronto al download', 'success', '✓');
  }, 1100);
}
window.simulateDownload = simulateDownload;

// Bind track config interactions
function bindTrackConfig() {
  document.querySelectorAll('[data-radio]').forEach(group => {
    group.querySelectorAll('.chip-pick').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip-pick').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        if (group.id === 'tc-type-group') {
          document.getElementById('tc-p-type').textContent = chip.dataset.val;
        }
      });
    });
  });
  // Bind range slope
  const slope = document.getElementById('tc-slope');
  if (slope) {
    slope.addEventListener('input', () => document.getElementById('tc-slope-val').textContent = slope.value + '%');
  }
  // Live preview number inputs
  ['tc-gates','tc-length','tc-drop'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const previewId = 'tc-p-' + id.split('-')[1];
    el.addEventListener('input', () => {
      const target = document.getElementById(previewId);
      if (target) {
        const v = el.value;
        const suffix = id === 'tc-gates' ? '' : `<small style="font-size:10px;">m</small>`;
        target.innerHTML = v + suffix;
      }
    });
  });
}

// Apply track config: collect, save, re-render race track if visible
function applyTrackConfig() {
  const get = (id) => document.getElementById(id)?.value;
  const radio = (group) => document.querySelector(`[data-radio="${group}"] .selected`)?.dataset.val;
  window.__trackConfig = {
    type: radio('tc-type') || 'GS',
    gates: parseInt(get('tc-gates') || 28),
    length: parseInt(get('tc-length') || 980),
    drop: parseInt(get('tc-drop') || 320),
    slope: parseInt(get('tc-slope') || 33),
    gateGap: parseInt(get('tc-gap') || 22),
    width: parseInt(get('tc-width') || 28),
    snow: radio('tc-snow') || 'hard',
    set: radio('tc-set') || 'technical',
    target: parseFloat(get('tc-target') || 65),
  };
  if (window.__rerenderTrack) window.__rerenderTrack();
}

// Hook into universal click handler
const _origClick = document._tavolaActionsBound;
if (!_origClick) {
  document._tavolaActionsBound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (btn) {
      e.preventDefault();
      const action = btn.dataset.action;
      if (ACTIONS[action]) ACTIONS[action](btn);
      else if (action.startsWith('export-')) simulateDownload('export.csv');
      else toast(action, 'info', 'i');
    }
    // foot button
    const fmBtn = e.target.closest('[data-fm-action]');
    if (fmBtn) {
      e.preventDefault();
      const a = fmBtn.dataset.fmAction;
      if (ACTIONS[a]) ACTIONS[a](fmBtn);
    }
  });
}

// ============ DNA RENDERER (compact for athletes list) ============
// ============================================================
// AI COPILOT (smart suggestions panel)
// ============================================================
const AI_SUGGESTIONS = [
  { priority: 'high', icon: '!', tag: 'Performance · Suter', title: 'Triple hop LSI a 87% — sotto soglia RTS', desc: 'Propongo 2 settimane di pliometria asimmetrica focus arto dx prima del retest. Posticipo RTS al 22/06.', primary: 'Crea blocco', secondary: 'Vedi dati' },
  { priority: 'medium', icon: '?', tag: 'Carico · Gisin', title: 'ACWR 1.42 in zona di rischio', desc: 'Acuto cresciuto del +18% in 5gg. Suggerisco scarico 30% nel microciclo prossima settimana.', primary: 'Applica scarico', secondary: 'Posticipa' },
  { priority: 'low', icon: '✓', tag: 'Predittivo · Odermatt', title: 'Forma in crescita verso peak per Sölden', desc: 'Modello predice picco di forma 14-16 maggio. CMJ +1.8cm vs media 4 sett. Ottimale per GS.', primary: 'Conferma piano' },
  { priority: 'medium', icon: '⚡', tag: 'Convocazione · Speed', title: 'Suggerimento convocazione Zermatt-Cervinia', desc: 'Top readiness: Gut-Behrami (88), von Allmen (88), Durrer (86), Flury (82), Rogentin (80), Hählen (79). Esclude Suter (rehab).', primary: 'Applica', secondary: 'Modifica' },
  { priority: 'high', icon: '!', tag: 'Wellness alert', title: 'Suter wellness sotto soglia 3gg', desc: 'Sonno -1.2h, fatica +2 punti. Possibile correlazione con carico settimana scorsa. Verificare con fisio.', primary: 'Contatta fisio', secondary: 'Vedi trend' },
  { priority: 'low', icon: '◎', tag: 'Insight · Squadra', title: 'Squadra +1.3cm CMJ vs WC avg', desc: 'Mantenete 8 settimane consecutive sopra il riferimento WC. Eccellente conservazione esplosività in fase agonistica.', primary: 'Vedi report' },
  { priority: 'medium', icon: '⏱', tag: 'Tempo previsione', title: 'Caviezel RTS in tempo per Beaver Creek', desc: 'Modello rehab proietta RTS 25/05. Beaver Creek SG 06/06 → 12gg margin. Propongo soft snow drill 26/05.', primary: 'Calendario' },
];

let _copilotIdx = 0;
function copilotPanelHtml() {
  const visible = AI_SUGGESTIONS.slice(0, 3);
  return `
    <div class="copilot-head">
      <div class="copilot-avatar">M</div>
      <div class="copilot-head-info">
        <strong>Marcello AI · Copilot</strong>
        <span>3 suggerimenti smart · attivo</span>
      </div>
      <div class="copilot-toggle" data-action="toggle-copilot" title="Comprimi">−</div>
    </div>
    <div class="copilot-body" id="copilot-body">
      ${visible.map((s, i) => copilotSuggestionHtml(s, i)).join('')}
    </div>
    <div class="copilot-input-bar">
      <input placeholder="Chiedi qualcosa al Copilot…" id="copilot-input" />
      <button data-action="copilot-send">↑</button>
    </div>
  `;
}
function copilotSuggestionHtml(s, idx) {
  return `
    <div class="copilot-suggestion priority-${s.priority}" data-sug-idx="${idx}">
      <div class="copilot-suggestion-head">
        <div class="copilot-suggestion-icon">${s.icon}</div>
        <span class="copilot-suggestion-tag">${s.tag}</span>
      </div>
      <div class="copilot-suggestion-title">${s.title}</div>
      <div class="copilot-suggestion-desc">${s.desc}</div>
      <div class="copilot-suggestion-actions">
        ${s.secondary ? `<button data-action="copilot-secondary" data-sug="${idx}">${s.secondary}</button>` : ''}
        <button class="primary" data-action="copilot-primary" data-sug="${idx}">${s.primary}</button>
      </div>
    </div>
  `;
}
function initCopilot() {
  if (document.getElementById('copilot')) return;
  const c = document.createElement('div');
  c.id = 'copilot';
  c.className = 'copilot';
  c.innerHTML = copilotPanelHtml();
  document.body.appendChild(c);
}
window.initCopilot = initCopilot;

// Add copilot actions
Object.assign(ACTIONS, {
  'toggle-copilot': () => {
    const c = document.getElementById('copilot');
    if (!c) return;
    c.classList.toggle('collapsed');
    const t = c.querySelector('.copilot-toggle');
    if (t) t.textContent = c.classList.contains('collapsed') ? '↑' : '−';
  },
  'copilot-primary': (btn) => {
    const idx = parseInt(btn.dataset.sug);
    const s = AI_SUGGESTIONS[idx];
    toast('AI: ' + s.primary + ' · ' + s.tag.split('·')[0].trim() + ' applicato', 'success', '✓');
    // Remove suggestion from panel
    btn.closest('.copilot-suggestion').style.transform = 'translateX(400px)';
    btn.closest('.copilot-suggestion').style.opacity = '0';
    setTimeout(() => btn.closest('.copilot-suggestion').remove(), 350);
  },
  'copilot-secondary': (btn) => {
    const idx = parseInt(btn.dataset.sug);
    const s = AI_SUGGESTIONS[idx];
    toast('AI: ' + s.secondary, 'info', 'i');
  },
  'copilot-send': () => {
    const input = document.getElementById('copilot-input');
    if (!input || !input.value.trim()) return;
    toast('Marcello AI sta elaborando…', 'info', '⌛');
    setTimeout(() => toast('Risposta pronta · vedi pannello copilot', 'success', '✓'), 1200);
    input.value = '';
  },
});

// ============================================================
// LIVE ECG WAVEFORM (HRV-style animation)
// ============================================================
function initEcg() {
  const svg = document.getElementById('ecg-svg');
  if (!svg || svg.dataset.init) return;
  svg.dataset.init = '1';
  const W = 800, H = 100;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('class', 'ecg-line');
  svg.appendChild(line);

  // ECG-like beat pattern (one cycle, 200 wide)
  const beat = (t) => {
    // t: 0-1 within one beat cycle
    if (t < 0.10) return 50;
    if (t < 0.13) return 50 - (t - 0.10) * 200; // Q dip
    if (t < 0.16) return 44 + (t - 0.13) * 1200; // R rise
    if (t < 0.18) return 80 - (t - 0.16) * 1500; // R peak
    if (t < 0.21) return 50 - (t - 0.18) * 800; // S dip
    if (t < 0.24) return 26 + (t - 0.21) * 800;
    if (t < 0.40) return 50 - Math.sin((t - 0.24) * 25) * 1.5;
    if (t < 0.55) return 50 - Math.sin((t - 0.40) * 20) * 4; // T wave
    return 50;
  };

  let offset = 0;
  const draw = () => {
    const pts = [];
    const totalBeats = 4;
    const beatWidth = W / totalBeats;
    for (let x = 0; x < W; x++) {
      const xPos = (x + offset) % W;
      const beatT = (xPos % beatWidth) / beatWidth;
      const y = beat(beatT);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    const d = `M ${pts.join(' L ')}`;
    line.setAttribute('d', d);
    offset = (offset + 1.6) % W;
    svg._ecgRaf = requestAnimationFrame(draw);
  };
  draw();
}
window.initEcg = initEcg;

// ============================================================
// WORLD RACE MAP — authentic SVG world map + geographic pins
// Authoritative GeoJSON-derived SVG at viewBox 1200×600 (equirectangular)
// ============================================================
const MAP_W = 1200, MAP_H = 600;
function geo2px(lat, lng) {
  const x = (lng + 180) * (MAP_W / 360);
  const y = (90 - lat) * (MAP_H / 180);
  return { x, y };
}

// Callout positions per race — designed manually to avoid overlap.
// callout: { side: 'tl'|'tr'|'bl'|'br'|'l'|'r'|'t'|'b', dist: SVG units }
const PIN_CALLOUTS = {
  zermatt:     { side: 'l',  dist: 95 },   // far left → Atlantic ocean
  solden:      { side: 'tr', dist: 75 },   // top-right
  saalbach:    { side: 'r',  dist: 90 },   // right → Russia/Black Sea area (low density)
  lenzerheide: { side: 'bl', dist: 75 },   // bottom-left
  kvitfjell:   { side: 'l',  dist: 70 },   // left → Atlantic
  are:         { side: 'r',  dist: 60 },   // right
  levi:        { side: 't',  dist: 40 },   // top
  beaver:      { side: 't',  dist: 45 },   // top
  aspen:       { side: 'b',  dist: 50 },   // bottom
  killington:  { side: 't',  dist: 40 },   // top
};

function calloutOffset(side, dist) {
  const d = dist;
  switch (side) {
    case 't':  return { dx: 0,         dy: -d };
    case 'b':  return { dx: 0,         dy:  d };
    case 'l':  return { dx: -d,        dy:  0 };
    case 'r':  return { dx:  d,        dy:  0 };
    case 'tl': return { dx: -d * 0.7,  dy: -d * 0.7 };
    case 'tr': return { dx:  d * 0.7,  dy: -d * 0.7 };
    case 'bl': return { dx: -d * 0.7,  dy:  d * 0.7 };
    case 'br': return { dx:  d * 0.7,  dy:  d * 0.7 };
  }
  return { dx: 0, dy: -d };
}

function europeMapSvg() {
  const races = [
    { id: 'zermatt',    name: 'Zermatt',     date: '09 Mag', lat: 46.0, lng:   7.7, status: 'next' },
    { id: 'solden',     name: 'Sölden',      date: '16 Mag', lat: 47.0, lng:  11.0, status: 'upcoming' },
    { id: 'levi',       name: 'Levi',        date: '23 Mag', lat: 67.8, lng:  24.8, status: 'upcoming' },
    { id: 'beaver',     name: 'Beaver Creek',date: '06 Giu', lat: 39.6, lng:-106.5, status: 'upcoming' },
    { id: 'killington', name: 'Killington',  date: '13 Giu', lat: 43.6, lng: -72.8, status: 'upcoming' },
    { id: 'saalbach',   name: 'Saalbach',    date: '26 Apr', lat: 47.4, lng:  12.6, status: 'past' },
    { id: 'kvitfjell',  name: 'Kvitfjell',   date: '19 Apr', lat: 61.5, lng:  10.2, status: 'past' },
    { id: 'aspen',      name: 'Aspen',       date: '13 Apr', lat: 39.2, lng:-106.9, status: 'past' },
    { id: 'are',        name: 'Åre',         date: '06 Apr', lat: 63.4, lng:  13.1, status: 'past' },
    { id: 'lenzerheide',name: 'Lenzerheide', date: '29 Mar', lat: 46.7, lng:   9.5, status: 'past' },
  ];

  races.forEach(r => {
    const p = geo2px(r.lat, r.lng);
    r.geoX = p.x;
    r.geoY = p.y;
    const cfg = PIN_CALLOUTS[r.id] || { side: 't', dist: 40 };
    const off = calloutOffset(cfg.side, cfg.dist);
    r.calloutX = p.x + off.dx;
    r.calloutY = p.y + off.dy;
    r.side = cfg.side;
  });

  const monthOrder = { 'Mar': 3, 'Apr': 4, 'Mag': 5, 'Giu': 6 };
  const upcoming = races.filter(r => r.status !== 'past').sort((a,b) => {
    const am = monthOrder[a.date.split(' ')[1]];
    const bm = monthOrder[b.date.split(' ')[1]];
    if (am !== bm) return am - bm;
    return parseInt(a.date) - parseInt(b.date);
  });
  // Route line uses TRUE geo coordinates
  const routePath = 'M ' + upcoming.map(r => `${r.geoX.toFixed(1)} ${r.geoY.toFixed(1)}`).join(' L ');

  // Helper: compute pill width based on text length (rough)
  const pillWidth = (text, isBigger) => {
    const charW = isBigger ? 7.2 : 6.4;
    return Math.max(60, text.length * charW + 18);
  };

  return `<div class="eu-map-stage">
    <img class="eu-map-img" src="assets/world-map.svg" alt="World map"/>
    <svg class="eu-map-overlay" viewBox="0 0 ${MAP_W} ${MAP_H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
          <feOffset dy="1.5" result="offset"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="pill-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dy="2"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Route line (animated) connecting upcoming races geographically -->
      <path class="eu-route" d="${routePath}"/>

      <!-- Leader lines: from pin to callout -->
      ${races.map(r => {
        const stroke = r.status === 'past' ? 'rgba(118,118,126,0.5)' : (r.status === 'next' ? 'rgba(212,165,116,0.85)' : 'rgba(200,16,46,0.6)');
        return `<line x1="${r.geoX.toFixed(1)}" y1="${r.geoY.toFixed(1)}" x2="${r.calloutX.toFixed(1)}" y2="${r.calloutY.toFixed(1)}" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round"/>`;
      }).join('')}

      <!-- Geographic dots (pin at exact location) -->
      ${races.map(r => `
        <g class="eu-pin ${r.status}" data-race-pin="${r.id}">
          ${r.status !== 'past' ? `<circle class="eu-pin-pulse" cx="${r.geoX.toFixed(1)}" cy="${r.geoY.toFixed(1)}" r="6"/>` : ''}
          <circle class="eu-pin-circle" cx="${r.geoX.toFixed(1)}" cy="${r.geoY.toFixed(1)}" r="${r.status === 'next' ? 8 : r.status === 'past' ? 5 : 6}" filter="url(#pin-shadow)"/>
        </g>
      `).join('')}

      <!-- Callout pills with name + date -->
      ${races.map(r => {
        const isNext = r.status === 'next';
        const isPast = r.status === 'past';
        const w = pillWidth(r.name + ' ' + r.date, isNext);
        const h = isNext ? 32 : 26;
        const cx = r.calloutX, cy = r.calloutY;
        const x = cx - w / 2, y = cy - h / 2;
        const fillColor = isNext ? '#FEF3C7' : isPast ? '#F1F5F9' : 'white';
        const strokeColor = isNext ? '#D4A574' : isPast ? '#CBD5E1' : '#C8102E';
        const strokeW = isNext ? 1.8 : 1.2;
        const nameColor = isNext ? '#92400E' : isPast ? '#475569' : '#0A0A0A';
        const dateColor = isNext ? '#B45309' : isPast ? '#76767E' : '#76767E';
        const nameFs = isNext ? 13 : isPast ? 10.5 : 11;
        const dateFs = isNext ? 10 : 9;
        return `<g class="eu-callout ${r.status}" data-race-callout="${r.id}" style="cursor:pointer;">
          <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h}" rx="${h/2}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeW}" filter="url(#pill-shadow)"/>
          <text x="${cx.toFixed(1)}" y="${(cy - 2).toFixed(1)}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${nameFs}" fill="${nameColor}" letter-spacing="0.04em" style="text-transform:uppercase;">${r.name}</text>
          <text x="${cx.toFixed(1)}" y="${(cy + 11).toFixed(1)}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="${dateFs}" fill="${dateColor}" font-feature-settings="'tnum'">${r.date}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}
window.europeMapSvg = europeMapSvg;

// ============================================================
// LIVE TICKER (periodic value updates)
// ============================================================
function startLiveTicker() {
  if (window.__liveTickerStarted) return;
  window.__liveTickerStarted = true;
  setInterval(() => {
    // Find live-tick elements and pulse them
    const elems = document.querySelectorAll('[data-live-key]');
    if (!elems.length) return;
    const el = elems[Math.floor(Math.random() * elems.length)];
    const key = el.dataset.liveKey;
    // Apply small variation to a relevant value
    if (key === 'readiness') {
      const cur = parseInt(el.textContent) || 81;
      const newVal = Math.max(75, Math.min(88, cur + (Math.random() < 0.5 ? -1 : 1)));
      el.textContent = newVal + (el.dataset.suffix || '%');
    } else if (key === 'hrv') {
      const cur = parseInt(el.textContent) || 72;
      const newVal = Math.max(65, Math.min(82, cur + (Math.random() < 0.5 ? -1 : 1)));
      el.textContent = newVal;
    }
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1500);
  }, 4500);
}
window.startLiveTicker = startLiveTicker;

function renderDnaCompact(athleteId) {
  const a = window.DATA.swissTeam.athletes.find(x => x.id === athleteId);
  if (!a || !a.tests) return '';
  const sex = a.sex === 'F' ? 'female' : 'male';
  const benches = window.DATA.swissTeam.benchmarks[sex];
  const tests = ['squat1RM', 'sj', 'dj', 'vo2max', 'ybalance', 'cmj'];
  const labels = ['F','P','R','E','Eq','S'];
  return `<div class="dna-strip compact">
    ${tests.map((t, i) => {
      const b = benches[t];
      const v = a.tests[t];
      const score = ((v - b.wcAvg) / (b.wcMax - b.wcAvg)) * 100;
      const cls = score >= 80 ? 'elite' : score >= 60 ? 'good' : score >= 40 ? '' : score >= 20 ? 'warn' : 'bad';
      const heightPct = Math.max(20, Math.min(100, score));
      return `<div class="dna-bar ${cls}" style="height:${heightPct}%;" data-label="${labels[i]}"></div>`;
    }).join('')}
  </div>`;
}
window.renderDnaCompact = renderDnaCompact;
