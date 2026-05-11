// Mock data — APEX Performance Suite
// Atlete/i reali della squadra svizzera di Coppa del Mondo (per realismo demo).
// Tutti i dati sono SIMULATI a scopo dimostrativo.

window.DATA = {
  swissTeam: {
    coach: { name: 'Marcello Tavola', role: 'Head Coach & Athletic Trainer', team: 'Swiss-Ski World Cup' },
    season: '2025/26',

    // Atleti — con dati performance, benchmark squadra, ranking WC
    // Event/session types (icone SVG vettoriali, no emoji)
    sessionTypes: {
      palestra: { label: 'Palestra · Forza', short: 'Palestra', color: '#1D4ED8', soft: '#DDE7FB', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>'
      },
      sci: { label: 'Sci · Sport-specifico', short: 'Sci', color: '#0F766E', soft: '#D7F0EC', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>'
      },
      gara: { label: 'Gara · Coppa del Mondo', short: 'Gara', color: '#C8102E', soft: '#FBEAEC', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4"/><path d="M4 4h14l-2 5 2 5H4"/></svg>'
      },
      rehab: { label: 'Rehab · Recupero infortunio', short: 'Rehab', color: '#B45309', soft: '#FCEBCB', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10v12"/><path d="M17 10v12"/><path d="M7 14h10"/><path d="M5 6h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z"/><path d="M12 2v4"/></svg>'
      },
      recovery: { label: 'Recovery · Scarico', short: 'Recovery', color: '#0EA5E9', soft: '#E0F2FE', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M12 6v6l4 2"/></svg>'
      },
      test: { label: 'Test fisico', short: 'Test', color: '#7C3AED', soft: '#EDE3FB', isSession: true,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 6-6"/></svg>'
      },
      // Eventi di calendario (non sono sessioni dell'atleta — non compaiono nell'athlete page)
      briefing: { label: 'Briefing / Meeting', short: 'Briefing', color: '#D97706', soft: '#FED7AA', isSession: false,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'
      },
      travel: { label: 'Trasferta', short: 'Travel', color: '#475569', soft: '#E2E8F0', isSession: false,
        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>'
      },
    },

    athletes: [
      { id: 'lgb', name: 'Lara Gut-Behrami', born: 1991, dob: '1991-04-27', sex: 'F', disc: ['DH','SG','GS'], focus: 'SG/GS',
        readiness: 88, status: 'Available', load: 'Optimal', hrv: 72, sleep: 7.8,
        wcOverall: 4, wcPoints: 1248, podiums: 9, wins: 3, top10s: 18, raceCount: 22,
        discRank: { DH: 6, SG: 2, GS: 5 },
        tests: { cmj: 43.2, sj: 39.8, dj: 2.92, squat1RM: 145, vo2max: 56.8, ybalance: 102 },
        weight: 64, height: 168 },
      { id: 'mge', name: 'Michelle Gisin', born: 1993, dob: '1993-12-05', sex: 'F', disc: ['SL','AC','GS'], focus: 'AC/SL',
        readiness: 76, status: 'Available', load: 'High', hrv: 64, sleep: 7.2,
        wcOverall: 28, wcPoints: 412, podiums: 1, wins: 0, top10s: 5, raceCount: 19,
        discRank: { SL: 12, AC: 3, GS: 24 },
        tests: { cmj: 39.4, sj: 36.1, dj: 2.61, squat1RM: 122, vo2max: 58.4, ybalance: 99 },
        weight: 60, height: 162 },
      { id: 'who', name: 'Wendy Holdener', born: 1993, dob: '1993-05-12', sex: 'F', disc: ['SL','AC'], focus: 'SL',
        readiness: 91, status: 'Available', load: 'Optimal', hrv: 78, sleep: 8.1,
        wcOverall: 11, wcPoints: 798, podiums: 5, wins: 1, top10s: 14, raceCount: 21,
        discRank: { SL: 4, AC: 1 },
        tests: { cmj: 41.8, sj: 38.2, dj: 2.81, squat1RM: 130, vo2max: 60.1, ybalance: 105 },
        weight: 61, height: 168 },
      { id: 'cra', name: 'Camille Rast', born: 1999, dob: '1999-07-10', sex: 'F', disc: ['SL','GS'], focus: 'SL',
        readiness: 85, status: 'Available', load: 'Optimal', hrv: 71, sleep: 7.6,
        wcOverall: 9, wcPoints: 854, podiums: 6, wins: 2, top10s: 12, raceCount: 20,
        discRank: { SL: 1, GS: 18 },
        tests: { cmj: 42.6, sj: 38.9, dj: 2.78, squat1RM: 128, vo2max: 57.2, ybalance: 103 },
        weight: 62, height: 166 },
      { id: 'csu', name: 'Corinne Suter', born: 1994, dob: '1994-07-28', sex: 'F', disc: ['DH','SG'], focus: 'DH',
        readiness: 62, status: 'Rehab Phase 3', load: 'Reduced', hrv: 58, sleep: 6.9,
        injury: 'Ricostruzione LCA dx — return-to-snow',
        wcOverall: null, wcPoints: 0, podiums: 0, wins: 0, top10s: 0, raceCount: 0,
        discRank: { DH: null, SG: null },
        tests: { cmj: 36.4, sj: 33.8, dj: 2.41, squat1RM: 112, vo2max: 54.2, ybalance: 88 },
        weight: 67, height: 172 },
      { id: 'jfl', name: 'Jasmine Flury', born: 1993, dob: '1993-04-29', sex: 'F', disc: ['DH','SG'], focus: 'DH/SG',
        readiness: 82, status: 'Available', load: 'Optimal', hrv: 69, sleep: 7.5,
        wcOverall: 19, wcPoints: 562, podiums: 2, wins: 0, top10s: 9, raceCount: 18,
        discRank: { DH: 5, SG: 7 },
        tests: { cmj: 41.2, sj: 37.8, dj: 2.74, squat1RM: 134, vo2max: 56.4, ybalance: 100 },
        weight: 68, height: 173 },
      { id: 'jha', name: 'Joana Hählen', born: 1992, dob: '1992-08-22', sex: 'F', disc: ['DH','SG'], focus: 'DH',
        readiness: 79, status: 'Available', load: 'High', hrv: 66, sleep: 7.1,
        wcOverall: 22, wcPoints: 488, podiums: 1, wins: 0, top10s: 7, raceCount: 17,
        discRank: { DH: 9, SG: 14 },
        tests: { cmj: 40.6, sj: 37.2, dj: 2.69, squat1RM: 132, vo2max: 55.8, ybalance: 97 },
        weight: 66, height: 170 },
      { id: 'ddu', name: 'Delia Durrer', born: 2002, dob: '2002-04-08', sex: 'F', disc: ['DH','SG','GS'], focus: 'SG',
        readiness: 86, status: 'Available', load: 'Optimal', hrv: 74, sleep: 7.9,
        wcOverall: 17, wcPoints: 624, podiums: 2, wins: 0, top10s: 10, raceCount: 20,
        discRank: { DH: 11, SG: 6, GS: 22 },
        tests: { cmj: 42.1, sj: 38.4, dj: 2.85, squat1RM: 126, vo2max: 58.1, ybalance: 101 },
        weight: 63, height: 167 },
      { id: 'mme', name: 'Mélanie Meillard', born: 1998, dob: '1998-12-04', sex: 'F', disc: ['SL','GS'], focus: 'SL',
        readiness: 81, status: 'Available', load: 'Optimal', hrv: 70, sleep: 7.4,
        wcOverall: 24, wcPoints: 442, podiums: 0, wins: 0, top10s: 6, raceCount: 19,
        discRank: { SL: 9, GS: 21 },
        tests: { cmj: 40.4, sj: 36.9, dj: 2.72, squat1RM: 121, vo2max: 57.6, ybalance: 98 },
        weight: 60, height: 165 },
      { id: 'sst', name: 'Stephanie Jenal', born: 1996, dob: '1996-09-15', sex: 'F', disc: ['SG','DH'], focus: 'SG',
        readiness: 73, status: 'Available', load: 'High', hrv: 63, sleep: 7.0,
        wcOverall: 34, wcPoints: 286, podiums: 0, wins: 0, top10s: 3, raceCount: 16,
        discRank: { SG: 16, DH: 22 },
        tests: { cmj: 39.8, sj: 36.4, dj: 2.62, squat1RM: 124, vo2max: 56.0, ybalance: 95 },
        weight: 65, height: 169 },

      { id: 'mod', name: 'Marco Odermatt', born: 1997, dob: '1997-10-08', sex: 'M', disc: ['GS','SG','DH'], focus: 'All-round',
        readiness: 92, status: 'Available', load: 'Optimal', hrv: 80, sleep: 8.3,
        wcOverall: 1, wcPoints: 1864, podiums: 22, wins: 12, top10s: 25, raceCount: 26,
        discRank: { GS: 1, SG: 1, DH: 3 },
        tests: { cmj: 56.4, sj: 51.2, dj: 3.42, squat1RM: 198, vo2max: 64.8, ybalance: 108 },
        weight: 84, height: 183 },
      { id: 'lme', name: 'Loïc Meillard', born: 1996, dob: '1996-10-29', sex: 'M', disc: ['GS','SL','SG'], focus: 'GS/SL',
        readiness: 84, status: 'Available', load: 'Optimal', hrv: 72, sleep: 7.7,
        wcOverall: 8, wcPoints: 942, podiums: 7, wins: 1, top10s: 15, raceCount: 24,
        discRank: { GS: 4, SL: 6, SG: 12 },
        tests: { cmj: 54.2, sj: 49.8, dj: 3.21, squat1RM: 184, vo2max: 62.4, ybalance: 104 },
        weight: 78, height: 178 },
      { id: 'jmu', name: 'Justin Murisier', born: 1991, dob: '1991-09-30', sex: 'M', disc: ['GS','SG','DH'], focus: 'SG',
        readiness: 77, status: 'Available', load: 'High', hrv: 67, sleep: 7.3,
        wcOverall: 14, wcPoints: 712, podiums: 3, wins: 1, top10s: 11, raceCount: 22,
        discRank: { SG: 5, GS: 18, DH: 9 },
        tests: { cmj: 52.8, sj: 48.2, dj: 3.04, squat1RM: 186, vo2max: 60.6, ybalance: 102 },
        weight: 84, height: 181 },
      { id: 'sro', name: 'Stefan Rogentin', born: 1994, dob: '1994-08-12', sex: 'M', disc: ['DH','SG'], focus: 'DH',
        readiness: 80, status: 'Available', load: 'Optimal', hrv: 68, sleep: 7.4,
        wcOverall: 18, wcPoints: 588, podiums: 1, wins: 0, top10s: 9, raceCount: 18,
        discRank: { DH: 4, SG: 11 },
        tests: { cmj: 51.6, sj: 47.4, dj: 2.98, squat1RM: 192, vo2max: 59.8, ybalance: 100 },
        weight: 88, height: 184 },
      { id: 'gca', name: 'Gino Caviezel', born: 1992, dob: '1992-08-08', sex: 'M', disc: ['SG','GS'], focus: 'SG',
        readiness: 68, status: 'Rehab Phase 4', load: 'Progressive', hrv: 60, sleep: 7.0,
        injury: 'Lussazione spalla dx — RTS in 3 settimane',
        wcOverall: 26, wcPoints: 348, podiums: 0, wins: 0, top10s: 5, raceCount: 14,
        discRank: { SG: 14, GS: 22 },
        tests: { cmj: 50.2, sj: 46.0, dj: 2.88, squat1RM: 176, vo2max: 58.4, ybalance: 96 },
        weight: 86, height: 182 },
      { id: 'fvo', name: 'Franjo von Allmen', born: 2001, dob: '2001-12-12', sex: 'M', disc: ['DH','SG'], focus: 'DH',
        readiness: 88, status: 'Available', load: 'Optimal', hrv: 76, sleep: 8.0,
        wcOverall: 12, wcPoints: 824, podiums: 4, wins: 1, top10s: 13, raceCount: 18,
        discRank: { DH: 2, SG: 8 },
        tests: { cmj: 53.4, sj: 48.6, dj: 3.12, squat1RM: 188, vo2max: 61.2, ybalance: 105 },
        weight: 87, height: 187 },
    ],

    // Benchmark di riferimento: medie squadra svizzera + medie WC + WC top 10 + record
    benchmarks: {
      female: {
        cmj:      { teamMin: 36.4, teamAvg: 40.7, teamMax: 43.2, wcAvg: 39.5, wcTop10: 42.1, wcMax: 45.6 },
        sj:       { teamMin: 33.8, teamAvg: 37.4, teamMax: 39.8, wcAvg: 36.2, wcTop10: 38.8, wcMax: 41.2 },
        dj:       { teamMin: 2.41, teamAvg: 2.71, teamMax: 2.92, wcAvg: 2.58, wcTop10: 2.82, wcMax: 3.05 },
        squat1RM: { teamMin: 112,  teamAvg: 127,  teamMax: 145,  wcAvg: 121,  wcTop10: 138,  wcMax: 156 },
        vo2max:   { teamMin: 54.2, teamAvg: 56.9, teamMax: 60.1, wcAvg: 55.4, wcTop10: 59.6, wcMax: 63.8 },
        ybalance: { teamMin: 88,   teamAvg: 98.8, teamMax: 105,  wcAvg: 96,   wcTop10: 103,  wcMax: 110 },
      },
      male: {
        cmj:      { teamMin: 50.2, teamAvg: 53.1, teamMax: 56.4, wcAvg: 51.8, wcTop10: 55.2, wcMax: 58.6 },
        sj:       { teamMin: 46.0, teamAvg: 48.5, teamMax: 51.2, wcAvg: 47.4, wcTop10: 50.4, wcMax: 53.2 },
        dj:       { teamMin: 2.88, teamAvg: 3.11, teamMax: 3.42, wcAvg: 2.94, wcTop10: 3.24, wcMax: 3.58 },
        squat1RM: { teamMin: 176,  teamAvg: 187,  teamMax: 198,  wcAvg: 178,  wcTop10: 195,  wcMax: 215 },
        vo2max:   { teamMin: 58.4, teamAvg: 61.2, teamMax: 64.8, wcAvg: 59.8, wcTop10: 63.4, wcMax: 67.2 },
        ybalance: { teamMin: 96,   teamAvg: 102.5,teamMax: 108,  wcAvg: 100,  wcTop10: 106,  wcMax: 112 },
      },
    },

    // Calendario gare CdM 2025/26 (mock realistico)
    races: [
      { id: 'r-2026-05-09', date: '2026-05-09', loc: 'Zermatt-Cervinia', country: 'CH/IT', disc: 'DH', cat: 'Coppa del Mondo', men: true, women: true, status: 'upcoming' },
      { id: 'r-2026-05-16', date: '2026-05-16', loc: 'Sölden', country: 'AT', disc: 'GS', cat: 'Coppa del Mondo', men: true, women: true, status: 'upcoming' },
      { id: 'r-2026-05-23', date: '2026-05-23', loc: 'Levi', country: 'FI', disc: 'SL', cat: 'Coppa del Mondo', men: true, women: true, status: 'upcoming' },
      { id: 'r-2026-06-06', date: '2026-06-06', loc: 'Beaver Creek', country: 'US', disc: 'DH+SG', cat: 'Coppa del Mondo', men: true, women: false, status: 'upcoming' },
      { id: 'r-2026-06-13', date: '2026-06-13', loc: 'Killington', country: 'US', disc: 'GS+SL', cat: 'Coppa del Mondo', men: false, women: true, status: 'upcoming' },
    ],

    // Risultati passati (mock)
    results: [
      { date: '2026-04-26', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'GS', athleteId: 'mod', position: 1,  fis: 0,    wcPts: 100, time: '2:14.82', gap: '—' },
      { date: '2026-04-26', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'GS', athleteId: 'lme', position: 4,  fis: 8.2,  wcPts: 50,  time: '2:15.61', gap: '+0.79' },
      { date: '2026-04-25', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'SL', athleteId: 'who', position: 3,  fis: 4.1,  wcPts: 60,  time: '1:42.18', gap: '+0.41' },
      { date: '2026-04-25', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'SL', athleteId: 'cra', position: 2,  fis: 2.0,  wcPts: 80,  time: '1:41.94', gap: '+0.17' },
      { date: '2026-04-24', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'SG', athleteId: 'lgb', position: 2,  fis: 1.8,  wcPts: 80,  time: '1:18.42', gap: '+0.18' },
      { date: '2026-04-24', race: 'Saalbach Finals', loc: 'Saalbach (AT)', disc: 'SG', athleteId: 'mod', position: 1,  fis: 0,    wcPts: 100, time: '1:18.24', gap: '—' },
      { date: '2026-04-19', race: 'Kvitfjell',       loc: 'Kvitfjell (NO)', disc: 'DH', athleteId: 'fvo', position: 1, fis: 0,    wcPts: 100, time: '1:42.56', gap: '—' },
      { date: '2026-04-19', race: 'Kvitfjell',       loc: 'Kvitfjell (NO)', disc: 'DH', athleteId: 'sro', position: 6, fis: 11.4, wcPts: 40,  time: '1:43.28', gap: '+0.72' },
      { date: '2026-04-13', race: 'Aspen',           loc: 'Aspen (US)',     disc: 'GS', athleteId: 'mod', position: 1, fis: 0,    wcPts: 100, time: '2:18.94', gap: '—' },
      { date: '2026-04-13', race: 'Aspen',           loc: 'Aspen (US)',     disc: 'GS', athleteId: 'lgb', position: 5, fis: 9.6,  wcPts: 45,  time: '2:20.14', gap: '+1.20' },
      { date: '2026-04-06', race: 'Are',             loc: 'Are (SE)',       disc: 'SL', athleteId: 'cra', position: 1, fis: 0,    wcPts: 100, time: '1:38.42', gap: '—' },
      { date: '2026-04-06', race: 'Are',             loc: 'Are (SE)',       disc: 'SL', athleteId: 'who', position: 5, fis: 8.4,  wcPts: 45,  time: '1:39.18', gap: '+0.76' },
      { date: '2026-03-29', race: 'Lenzerheide',     loc: 'Lenzerheide (CH)', disc: 'SG', athleteId: 'jfl', position: 3, fis: 4.6, wcPts: 60, time: '1:24.18', gap: '+0.32' },
      { date: '2026-03-29', race: 'Lenzerheide',     loc: 'Lenzerheide (CH)', disc: 'SG', athleteId: 'ddu', position: 8, fis: 12.4, wcPts: 32, time: '1:25.02', gap: '+1.16' },
    ],

    camps: [
      { date: '2026-05-08', loc: 'Saas-Fee', type: 'Snow Camp', desc: 'GS / SG athletes — 7gg' },
      { date: '2026-05-12', loc: 'Magglingen', type: 'Gym Block', desc: 'Forza max + reattività' },
      { date: '2026-05-20', loc: 'Stelvio', type: 'Snow Camp', desc: 'DH/SG · neve veloce' },
    ],

    upcomingTests: [
      { date: '2026-05-08', name: 'CMJ + SJ + DJ batch', loc: 'Magglingen', who: 'Tutta la squadra' },
      { date: '2026-05-09', name: 'Forza max — Squat 1RM', loc: 'Magglingen', who: 'Speed group' },
      { date: '2026-05-10', name: 'Wingate 30s', loc: 'Magglingen', who: 'Tech group' },
      { date: '2026-05-15', name: 'VO2max + soglia', loc: 'OYM Cham', who: 'Tutta la squadra' },
      { date: '2026-05-18', name: 'Y-Balance + Hop test', loc: 'Magglingen', who: 'Suter, Caviezel' },
    ],

    // Programmazione: settimana corrente con sessioni dettagliate
    weekPlan: {
      week: 19, range: '04 → 10 mag 2026',
      days: [
        { day: 'Lun', date: '04/05', sessions: [
          { time: '09:30', type: 'gym', title: 'Forza max + Reattività', group: 'Speed', loc: 'Magglingen', dur: 90, load: 540, athletes: 6 },
          { time: '17:00', type: 'recovery', title: 'Recovery + mobilità', group: 'All', loc: 'Hotel', dur: 45, load: 120, athletes: 12 },
        ]},
        { day: 'Mar', date: '05/05', sessions: [
          { time: '09:00', type: 'snow', title: 'GS — 8 manche tracciato corto', group: 'Tech', loc: 'Saas-Fee', dur: 180, load: 680, athletes: 6 },
          { time: '16:30', type: 'gym', title: 'Core + stabilizzazione', group: 'All', loc: 'Saas-Fee gym', dur: 60, load: 220, athletes: 12 },
        ]},
        { day: 'Mer', date: '06/05', sessions: [
          { time: '10:00', type: 'recovery', title: 'Recovery attiva + crioterapia', group: 'All', loc: 'Magglingen', dur: 90, load: 180, athletes: 12 },
        ]},
        { day: 'Gio', date: '07/05', sessions: [
          { time: '09:30', type: 'gym', title: 'Forza + Potenza', group: 'All', loc: 'Magglingen', dur: 90, load: 580, athletes: 12 },
          { time: '15:00', type: 'meeting', title: 'Briefing pre-Zermatt', group: 'Speed', loc: 'Magglingen', dur: 60, load: 0, athletes: 6 },
        ]},
        { day: 'Ven', date: '08/05', sessions: [
          { time: '09:00', type: 'snow', title: 'SG — drill velocità', group: 'Speed', loc: 'Stelvio', dur: 180, load: 620, athletes: 6 },
          { time: '17:00', type: 'gym', title: 'Mobilità + scarico', group: 'All', loc: 'Stelvio', dur: 45, load: 140, athletes: 12 },
        ]},
        { day: 'Sab', date: '09/05', sessions: [
          { time: '11:30', type: 'race', title: '🏁 Zermatt-Cervinia DH', group: 'Speed', loc: 'Zermatt-Cervinia', dur: 240, load: 380, athletes: 6 },
        ]},
        { day: 'Dom', date: '10/05', sessions: [
          { time: '—', type: 'off', title: 'Riposo', group: 'All', loc: '—', dur: 0, load: 0, athletes: 12 },
        ]},
      ],
    },

    // Cartelle cliniche dettagliate per atleti infortunati
    rehab: {
      csu: {
        athleteId: 'csu', name: 'Corinne Suter',
        diagnosis: 'Rottura completa LCA ginocchio dx + lesione menisco mediale grado II',
        injuryDate: '2025-12-13', injuryContext: 'Caduta in allenamento DH a St. Moritz, rotazione interna su tibia bloccata. Test Lachman positivo immediato.',
        surgery: { date: '2025-12-14', surgeon: 'Prof. Dr. Stefan Müller', center: 'Schulthess Klinik, Zürich', technique: 'Ricostruzione con tendine rotuleo (BPTB) + sutura menisco mediale all-inside' },
        imaging: [
          { date: '2025-12-13', type: 'RM ginocchio dx', findings: 'Rottura completa LCA, lesione menisco mediale corno post., edema osseo plateau tibiale lat.' },
          { date: '2026-01-15', type: 'RM controllo', findings: 'Innesto in sede, ottima vascolarizzazione, riduzione edema osseo del 60%.' },
          { date: '2026-03-20', type: 'RM controllo', findings: 'Innesto integrato, no segni di lassità, menisco riparato.' },
          { date: '2026-04-28', type: 'Eco strutturale', findings: 'Eco-color: spessore tendine rotuleo nei limiti, no segni di tendinopatia.' },
        ],
        phases: [
          { name: 'Fase 1 · Acuta', start: '2025-12-14', end: '2026-01-11', current: false, complete: true, goals: 'ROM 0–120°, attivazione quadricipite, no effusion', focus: 'Crio + elettrostim + drill quadricipite' },
          { name: 'Fase 2 · Recupero ROM', start: '2026-01-12', end: '2026-02-22', current: false, complete: true, goals: 'ROM completo, deambulazione senza stampelle', focus: 'Bike, leg press, mobilità' },
          { name: 'Fase 3 · Rinforzo', start: '2026-02-23', end: '2026-05-10', current: true, complete: false, goals: 'LSI ≥ 90% quadricipite/hamstring, hop test ≥ 90%', focus: 'Forza max progressiva, propriocezione' },
          { name: 'Fase 4 · Pre-RTS', start: '2026-05-11', end: '2026-06-10', current: false, complete: false, goals: 'On-snow progressione, drill sport-specifici', focus: 'Pliometria, agilità multidirezionale, on-snow' },
          { name: 'Fase 5 · RTS', start: '2026-06-11', end: '—', current: false, complete: false, goals: 'Rientro completo agli allenamenti CdM', focus: 'Reintegrazione graduale alla squadra speed' },
        ],
        rtsForecast: '2026-06-15',
        daysSince: 144,
        rtsCriteria: [
          { name: 'LSI quadricipite (isokinetic)', target: '≥ 90%', current: 94, value: '94%', status: 'done', last: '02/05/2026' },
          { name: 'LSI hamstring (isokinetic)', target: '≥ 90%', current: 96, value: '96%', status: 'done', last: '02/05/2026' },
          { name: 'Single hop LSI', target: '≥ 90%', current: 92, value: '92%', status: 'done', last: '28/04/2026' },
          { name: 'Triple hop LSI', target: '≥ 90%', current: 87, value: '87%', status: 'warn', last: '28/04/2026' },
          { name: 'Crossover hop LSI', target: '≥ 90%', current: 84, value: '84%', status: 'warn', last: '28/04/2026' },
          { name: 'Y-Balance composite LSI', target: '≥ 95%', current: null, value: '—', status: 'todo', last: 'in programma 18/05' },
          { name: 'ACL-RSI psicologico', target: '≥ 65', current: null, value: '—', status: 'todo', last: 'in programma 20/05' },
          { name: 'On-snow drill controllati', target: 'Completato', current: null, value: '—', status: 'todo', last: 'fase 5' },
          { name: 'Free-skiing soft snow', target: 'Completato', current: null, value: '—', status: 'todo', last: 'fase 5' },
          { name: 'Allenamento gara ridotto', target: 'Completato', current: null, value: '—', status: 'todo', last: 'fase 5' },
        ],
        dailyMetrics: [
          { day: '01/05', pain: 2, swelling: 1, rom: 138, fatigue: 4, mood: 7, sleep: 7.4, load: 320, notes: 'Buona seduta forza, no fastidi.' },
          { day: '02/05', pain: 1, swelling: 1, rom: 138, fatigue: 3, mood: 8, sleep: 7.8, load: 380, notes: 'Test isokinetic LSI 94%/96% — eccellente.' },
          { day: '03/05', pain: 2, swelling: 1, rom: 140, fatigue: 5, mood: 6, sleep: 6.9, load: 420, notes: 'Lieve fatica post-test, normale.' },
          { day: '04/05', pain: 1, swelling: 0, rom: 140, fatigue: 3, mood: 8, sleep: 7.6, load: 280, notes: 'Sessione recovery + idroterapia.' },
          { day: '05/05', pain: 1, swelling: 0, rom: 140, fatigue: 2, mood: 8, sleep: 8.0, load: 360, notes: 'Plyo progressione, hop test triplo da rivalutare.' },
        ],
        team: [
          { role: 'Chirurgo', name: 'Prof. Dr. Stefan Müller', center: 'Schulthess Klinik', contact: '+41 44 385 71 71' },
          { role: 'Fisioterapista', name: 'Dr. Marc Schneider', center: 'Swiss-Ski Medical', contact: '+41 79 412 33 22' },
          { role: 'Medico federale', name: 'Dr. Walter Müller', center: 'Swiss-Ski Medical', contact: '+41 79 401 22 11' },
          { role: 'Psicologo sportivo', name: 'Dr. Anja Bauer', center: 'OYM Cham', contact: '+41 79 444 18 00' },
          { role: 'Preparatore atletico', name: 'Marcello Tavola', center: 'Swiss-Ski WC', contact: 'in app' },
        ],
        communication: [
          { date: '05/05/2026 09:14', from: 'Dr. Schneider', text: 'Triple hop a 87% LSI — propongo blocco di 2 settimane focus pliometria asimmetrica prima del retest.' },
          { date: '04/05/2026 18:42', from: 'Dr. Müller (chir.)', text: 'Ricontrollo clinico: ROM completo, no laxity, no effusion. Prosegui pure con il piano.' },
          { date: '02/05/2026 11:30', from: 'Marcello', text: 'Test isokinetic eccellenti. Da domani aumento volume forza in fase eccentrica.' },
          { date: '28/04/2026 16:05', from: 'Dr. Bauer', text: 'Sessione preparazione mentale al rientro: motivazione alta, qualche apprensione su carving aggressivo. Lavoriamo su visualizzazione.' },
        ],
        currentExercises: [
          { name: 'Squat unilaterale eccentrico', sets: 4, reps: 8, load: '40kg', notes: 'Tempo 4-1-1 · gamba dx priorità' },
          { name: 'Leg press isokinetic', sets: 3, reps: 12, load: '60% 1RM', notes: 'Velocità angolare 60°/s' },
          { name: 'Single hop forward', sets: 4, reps: 6, load: 'BW', notes: 'Atterraggio controllato · monitoraggio LSI' },
          { name: 'Y-Balance test set', sets: 3, reps: 'AMRAP 30"', load: 'BW', notes: 'Reach asimmetrico' },
          { name: 'Bike + nordic hamstring', sets: 3, reps: 6, load: 'BW', notes: 'Eccentrica hamstring' },
        ],
        loadHistory: [
          { week: 'W14', value: 1200 }, { week: 'W15', value: 1450 }, { week: 'W16', value: 1680 },
          { week: 'W17', value: 1820 }, { week: 'W18', value: 2100 }, { week: 'W19', value: 1950 },
        ],
      },

      gca: {
        athleteId: 'gca', name: 'Gino Caviezel',
        diagnosis: 'Lussazione antero-inferiore spalla dx con lesione di Bankart',
        injuryDate: '2026-03-28', injuryContext: 'Caduta in allenamento SG ad Aspen, impatto laterale sulla spalla.',
        surgery: { date: '2026-03-30', surgeon: 'Dr. Pierre-Yves Zambelli', center: 'Hôpital de La Tour, Genève', technique: 'Riparazione capsulo-labrale artroscopica (Bankart repair)' },
        imaging: [
          { date: '2026-03-28', type: 'RX spalla dx', findings: 'Lussazione antero-inferiore confermata, riduzione in PS.' },
          { date: '2026-03-29', type: 'RM spalla dx', findings: 'Lesione di Bankart, lesione Hill-Sachs minore.' },
          { date: '2026-04-22', type: 'RM controllo', findings: 'Riparazione integra, capsula ben tesa.' },
        ],
        phases: [
          { name: 'Fase 1 · Acuta', start: '2026-03-30', end: '2026-04-13', current: false, complete: true, goals: 'Immobilizzazione + ROM passivo controllato', focus: 'Tutore, no abduzione/extra-rotazione' },
          { name: 'Fase 2 · Mobilità', start: '2026-04-14', end: '2026-04-27', current: false, complete: true, goals: 'ROM passivo completo, attivo limitato', focus: 'Pendular, ROM passivo + assistito' },
          { name: 'Fase 3 · Forza', start: '2026-04-28', end: '2026-05-08', current: false, complete: true, goals: 'Forza isometrica ER/IR, scapular control', focus: 'Theraband, isometric, propriocezione' },
          { name: 'Fase 4 · Sport-specifica', start: '2026-05-09', end: '2026-05-22', current: true, complete: false, goals: 'Stabilità funzionale, drill sport-spec', focus: 'Plyo UE, perturbazioni, gestione caduta' },
          { name: 'Fase 5 · RTS', start: '2026-05-23', end: '—', current: false, complete: false, goals: 'On-snow progressione → CdM', focus: 'Soft snow → race training' },
        ],
        rtsForecast: '2026-05-25',
        daysSince: 39,
        rtsCriteria: [
          { name: 'ROM completo simmetrico', target: '100%', current: 100, value: '100%', status: 'done', last: '28/04/2026' },
          { name: 'Forza isometrica ER LSI', target: '≥ 90%', current: 94, value: '94%', status: 'done', last: '02/05/2026' },
          { name: 'Forza isometrica IR LSI', target: '≥ 90%', current: 92, value: '92%', status: 'done', last: '02/05/2026' },
          { name: 'CKC UE Stability test', target: '> 21 reps', current: 24, value: '24 reps', status: 'done', last: '03/05/2026' },
          { name: 'Y-Balance UQ composite', target: '≥ 95%', current: 96, value: '96%', status: 'done', last: '03/05/2026' },
          { name: 'Stabilità funzionale (perturbazione)', target: 'Completato', current: null, value: '—', status: 'warn', last: 'in valutazione 09/05' },
          { name: 'Plyo UE (med ball throw)', target: '≥ 85% LSI', current: null, value: '—', status: 'todo', last: '12/05' },
          { name: 'Drill caduta controllata', target: 'Completato', current: null, value: '—', status: 'todo', last: 'fase 5' },
          { name: 'On-snow soft drill', target: 'Completato', current: null, value: '—', status: 'todo', last: 'fase 5' },
        ],
        dailyMetrics: [
          { day: '01/05', pain: 2, swelling: 0, rom: 100, fatigue: 3, mood: 8, sleep: 7.2, load: 280, notes: 'Forza isometrica progressione.' },
          { day: '02/05', pain: 1, swelling: 0, rom: 100, fatigue: 3, mood: 8, sleep: 7.4, load: 320, notes: 'Test ER/IR LSI eccellenti.' },
          { day: '03/05', pain: 1, swelling: 0, rom: 100, fatigue: 4, mood: 7, sleep: 7.0, load: 360, notes: 'Plyo UE iniziato — bene.' },
          { day: '04/05', pain: 2, swelling: 0, rom: 100, fatigue: 3, mood: 8, sleep: 7.6, load: 240, notes: 'Recovery — leggera tensione trapezio.' },
          { day: '05/05', pain: 1, swelling: 0, rom: 100, fatigue: 2, mood: 9, sleep: 7.8, load: 380, notes: 'Sessione completa, motivato.' },
        ],
        team: [
          { role: 'Chirurgo', name: 'Dr. Pierre-Yves Zambelli', center: 'Hôpital de La Tour', contact: '+41 22 719 61 11' },
          { role: 'Fisioterapista', name: 'Dr. Marc Schneider', center: 'Swiss-Ski Medical', contact: '+41 79 412 33 22' },
          { role: 'Medico federale', name: 'Dr. Walter Müller', center: 'Swiss-Ski Medical', contact: '+41 79 401 22 11' },
          { role: 'Preparatore atletico', name: 'Marcello Tavola', center: 'Swiss-Ski WC', contact: 'in app' },
        ],
        communication: [
          { date: '05/05/2026 14:20', from: 'Marcello', text: 'Plyo UE sta andando alla grande, lo testiamo med-ball giovedì.' },
          { date: '03/05/2026 09:30', from: 'Dr. Zambelli', text: 'Controllo a 6 settimane: tutto integro. Via libera fase sport-specifica.' },
          { date: '02/05/2026 17:15', from: 'Dr. Schneider', text: 'ER/IR LSI 94%/92% — possiamo iniziare perturbazioni.' },
        ],
        currentExercises: [
          { name: 'Med ball chest throw', sets: 4, reps: 6, load: '4kg', notes: 'Esplosivo, no compensi scapolari' },
          { name: 'Theraband ER/IR end-range', sets: 3, reps: 12, load: 'banda blu', notes: 'Tempo 2-1-2' },
          { name: 'Push-up plus + perturbazione', sets: 3, reps: 10, load: 'BW', notes: 'Su bosu, partner perturbation' },
          { name: 'Y-T-W prone scapolari', sets: 3, reps: 10, load: '2kg', notes: 'Focus retraz. scapola' },
          { name: 'Caduta controllata su materasso', sets: 3, reps: 5, load: 'BW', notes: 'Drill protezione spalla' },
        ],
        loadHistory: [
          { week: 'W14', value: 380 }, { week: 'W15', value: 720 }, { week: 'W16', value: 1100 },
          { week: 'W17', value: 1520 }, { week: 'W18', value: 1840 }, { week: 'W19', value: 2080 },
        ],
      },
    },

    // Staff Swiss-Ski (dati reali da swiss-ski.ch/ski-alpin/staff/)
    staffReal: [
      // Mastery WC Speed Frauen — il gruppo di Marcello
      { name: 'Marcello Tavola', role: 'Trainer / Konditionstrainer', group: 'speed-women', country: 'IT', img: 'assets/staff/marcello_tavola.jpg', primary: true, role_full: 'Head Coach Mastery WC Speed Frauen' },
      { name: 'Jvano Nesa', role: 'Trainer', group: 'speed-women', country: 'CH', img: 'assets/staff/jvano_nesa.jpg', role_full: 'Trainer Mastery WC Speed Frauen' },
      { name: 'Simon Rothenbühler', role: 'Trainer', group: 'speed-women', country: 'CH', img: 'assets/staff/simon_rothenbuhler.jpg', role_full: 'Trainer Mastery WC Speed Frauen' },
      { name: 'Silvano Stadler', role: 'Trainer', group: 'speed-women', country: 'CH', img: 'assets/staff/silvano_stadler.jpg', role_full: 'Trainer Mastery WC Speed Frauen' },
      { name: 'Ladina Eichholzer', role: 'Fisioterapista', group: 'speed-women', country: 'CH', img: 'assets/staff/ladina_eichholzer.jpg', role_full: 'Physiotherapeutin Mastery WC Speed Frauen' },
      { name: 'Julia Winkler', role: 'Fisioterapista', group: 'speed-women', country: 'AT', img: 'assets/staff/julia_winkler.jpg', role_full: 'Physiotherapeutin Mastery WC Speed Frauen' },
      { name: 'Marco Jermini', role: 'Osteopata', group: 'speed-women', country: 'CH', img: 'assets/staff/marco_jermini.jpg', role_full: 'Osteopath Mastery WC Speed/Technik Frauen' },
      { name: 'Mathias Fuhrer', role: 'Service technician', group: 'speed-women', country: 'CH', img: 'assets/staff/mathias_fuhrer.jpg', role_full: 'Service Mastery WC Speed Frauen' },

      // Cheftrainer (Direzione)
      { name: 'Beat Tschuor', role: 'Cheftrainer Alpin Frauen', group: 'direction', country: 'CH', img: 'assets/staff/beat_tschuor.jpg', role_full: 'Cheftrainer Ski Alpin Frauen — direttore tecnico squadra femminile' },
      { name: 'Thomas Stauffer', role: 'Cheftrainer Alpin Männer', group: 'direction', country: 'CH', img: 'assets/staff/thomas_stauffer.jpg', role_full: 'Cheftrainer Ski Alpin Männer — direttore tecnico squadra maschile' },

      // Mastery WC GS+SL Frauen (gruppo tech che collabora)
      { name: 'Heini Pfitscher', role: 'Gruppentrainer GS+SL', group: 'tech-women', country: 'IT', img: 'assets/staff/heini_pfitscher.jpg', role_full: 'Gruppentrainer Mastery WC GS+SL Frauen' },
      { name: 'Christian Brill', role: 'Trainer / Konditionstrainer', group: 'tech-women', country: 'AT', img: 'assets/staff/christian_brill.jpg', role_full: 'Trainer/Konditionstrainer Mastery WC GS+SL Frauen' },
      { name: 'Denis Wicki', role: 'Trainer', group: 'tech-women', country: 'CH', img: 'assets/staff/denis_wicki.jpg', role_full: 'Trainer Mastery WC GS+SL Frauen' },
      { name: 'Jan Šauperl', role: 'Service technician', group: 'tech-women', country: 'SI', img: 'assets/staff/jan_sauperl.jpg', role_full: 'Service Mastery WC GS+SL Frauen' },
      { name: 'Marco Zambelli', role: 'Service technician', group: 'tech-women', country: 'IT', img: 'assets/staff/marco_zambelli.jpg', role_full: 'Service Mastery WC GS+SL Frauen' },

      // Mastery WC Speed Männer (gruppo speed maschile)
      { name: 'Reto Nydegger', role: 'Gruppentrainer Speed', group: 'speed-men', country: 'CH', img: 'assets/staff/reto_nydegger.jpg', role_full: 'Gruppentrainer Mastery WC Speed Männer' },
      { name: 'Stefan Brügger', role: 'Trainer', group: 'speed-men', country: 'CH', img: 'assets/staff/stefan_brugger.jpg', role_full: 'Trainer Mastery WC Speed Männer' },
      { name: 'Valentin Crettaz', role: 'Trainer', group: 'speed-men', country: 'CH', img: 'assets/staff/valentin_crettaz.jpg', role_full: 'Trainer Mastery WC Speed Männer' },
      { name: 'Gabriel Gwerder', role: 'Konditionstrainer', group: 'speed-men', country: 'CH', img: 'assets/staff/gabriel_gwerder.jpg', role_full: 'Konditionstrainer Mastery WC Speed Männer' },
      { name: 'Madita Müller', role: 'Fisioterapista', group: 'speed-men', country: 'DE', img: 'assets/staff/madita_muller.jpg', role_full: 'Physiotherapeutin Mastery WC Speed Männer' },
    ],

    staffGroups: {
      'direction':   { label: 'Direzione tecnica', sub: 'Cheftrainer Swiss-Ski', color: 'accent' },
      'speed-women': { label: 'Mastery WC Speed Frauen', sub: 'Il tuo team — Coppa del Mondo donne speed', color: 'gold', primary: true },
      'tech-women':  { label: 'Mastery WC GS+SL Frauen', sub: 'Gruppo tecniche femminili', color: 'info' },
      'speed-men':   { label: 'Mastery WC Speed Männer', sub: 'Gruppo speed maschile', color: 'good' },
    },

    // Report federazione
    reports: {
      weekly: {
        id: 'weekly',
        name: 'Report settimanale',
        cron: 'Ogni lunedì · 09:00',
        nextSend: '2026-05-11T09:00:00',
        lastSent: '2026-05-04T09:00:00',
        enabled: true,
        avgSize: '2.4 MB',
        sentCount: 19,
        sections: [
          'KPI squadra (readiness, ACWR, wellness)',
          'Carico settimanale per atleta',
          'Alert wellness sotto soglia',
          'Stato infortuni in corso',
          'Sessioni programmate prossima settimana',
          'Test fisici eseguiti & confronto WC',
        ],
        description: 'Aggiornamento settimanale automatico al direttore tecnico Swiss-Ski con sintesi dello stato squadra.',
      },
      monthly: {
        id: 'monthly',
        name: 'Report mensile',
        cron: '1° del mese · 06:00',
        nextSend: '2026-06-01T06:00:00',
        lastSent: '2026-05-01T06:00:00',
        enabled: true,
        avgSize: '8.1 MB',
        sentCount: 7,
        sections: [
          'Panoramica completa stagione',
          'Benchmark squadra vs WC top10',
          'Progressi test fisici (CMJ, 1RM, VO2max)',
          'Episodi infortuni risolti & in corso',
          'Risultati gare CdM del mese',
          'Punti WC squadra · Nations Cup',
          'Programmazione mese prossimo',
        ],
        description: 'Panoramica completa mensile per direttore tecnico, sponsor relations, comunicazione e medico federale.',
      },
      prerace: {
        id: 'prerace',
        name: 'Report pre-gara',
        cron: '48h prima ogni gara CdM',
        nextSend: '2026-05-07T11:30:00',
        lastSent: '2026-04-28T11:30:00',
        enabled: true,
        avgSize: '1.8 MB',
        sentCount: 12,
        sections: [
          'Atleti convocati & profilo readiness',
          'Condizioni meteo previste',
          'Storia risultati nella località',
          'Profilo tracciato (tipo, porte, pendenza)',
          'Stato materiali (sci, lamine, scioline)',
          'Logistica & briefing preliminare',
        ],
        description: 'Inviato 48h prima di ogni gara CdM con readiness atleti convocati e info gara.',
      },
    },

    recipients: [
      { id: 'flatscher', name: 'Hans Flatscher', role: 'Direttore tecnico Swiss-Ski', email: 'h.flatscher@swiss-ski.ch', subs: ['weekly','monthly','prerace'], primary: true },
      { id: 'walter', name: 'Dr. Walter Müller', role: 'Medico federale', email: 'w.muller@swiss-ski.ch', subs: ['weekly','monthly','prerace'] },
      { id: 'krug', name: 'Helmut Krug', role: 'Speed Group Coach', email: 'h.krug@swiss-ski.ch', subs: ['weekly','prerace'] },
      { id: 'stauffer', name: 'Tom Stauffer', role: 'Tech Group Coach', email: 't.stauffer@swiss-ski.ch', subs: ['weekly','prerace'] },
      { id: 'schneider', name: 'Dr. Marc Schneider', role: 'Fisioterapista capo', email: 'm.schneider@swiss-ski.ch', subs: ['weekly','monthly'] },
      { id: 'media', name: 'Media Department', role: 'Comunicazione FSI', email: 'media@swiss-ski.ch', subs: ['monthly'] },
      { id: 'sponsor', name: 'Markus Brunner', role: 'Head Sponsor Relations', email: 'm.brunner@swiss-ski.ch', subs: ['monthly'] },
      { id: 'pres', name: 'Urs Lehmann', role: 'Presidente Swiss-Ski', email: 'u.lehmann@swiss-ski.ch', subs: ['monthly'] },
    ],

    reportHistory: [
      { date: '2026-05-04T09:00:00', type: 'weekly',  status: 'sent',   size: '2.4 MB', recipients: 5, filename: 'Settimanale_W18_Swiss-Ski.pdf', openRate: 100 },
      { date: '2026-05-01T06:00:00', type: 'monthly', status: 'sent',   size: '8.1 MB', recipients: 8, filename: 'Mensile_Aprile_2026_Swiss-Ski.pdf', openRate: 88 },
      { date: '2026-04-28T11:30:00',type: 'prerace', status: 'sent',   size: '1.8 MB', recipients: 5, filename: 'PreGara_Saalbach_GS.pdf', openRate: 100 },
      { date: '2026-04-27T09:00:00', type: 'weekly',  status: 'sent',   size: '2.2 MB', recipients: 5, filename: 'Settimanale_W17_Swiss-Ski.pdf', openRate: 100 },
      { date: '2026-04-23T11:30:00',type: 'prerace', status: 'sent',   size: '1.7 MB', recipients: 5, filename: 'PreGara_Kvitfjell_DH.pdf', openRate: 80 },
      { date: '2026-04-20T09:00:00', type: 'weekly',  status: 'sent',   size: '2.5 MB', recipients: 5, filename: 'Settimanale_W16_Swiss-Ski.pdf', openRate: 100 },
      { date: '2026-04-13T09:00:00', type: 'weekly',  status: 'sent',   size: '2.3 MB', recipients: 5, filename: 'Settimanale_W15_Swiss-Ski.pdf', openRate: 100 },
      { date: '2026-04-11T11:30:00',type: 'prerace', status: 'sent',   size: '1.6 MB', recipients: 5, filename: 'PreGara_Aspen_GS.pdf', openRate: 60 },
      { date: '2026-04-06T09:00:00', type: 'weekly',  status: 'sent',   size: '2.1 MB', recipients: 5, filename: 'Settimanale_W14_Swiss-Ski.pdf', openRate: 100 },
      { date: '2026-04-04T11:30:00',type: 'prerace', status: 'failed', size: '—',      recipients: 5, filename: 'PreGara_Are_SL.pdf', openRate: 0, error: 'SMTP timeout · ritentato 04/04 12:18' },
      { date: '2026-04-04T12:18:00',type: 'prerace', status: 'sent',   size: '1.7 MB', recipients: 5, filename: 'PreGara_Are_SL_retry.pdf', openRate: 100 },
      { date: '2026-04-01T06:00:00', type: 'monthly', status: 'sent',   size: '7.8 MB', recipients: 8, filename: 'Mensile_Marzo_2026_Swiss-Ski.pdf', openRate: 88 },
    ],

    // Template esercizi per tipo di sessione (per generare dettagli)
    exerciseTemplates: {
      palestra: [
        { title: 'Forza max · Squat + Reattività', exs: [
          { name: 'Mobilità + attivazione dinamica', notes: 'FMS routine · drill anche/caviglia', sets: 1, reps: '15\'', load: '—', rpe: 3 },
          { name: 'Box Squat sub-max', notes: 'Pausa 1" sul box · tecnica pulita', sets: 5, reps: 3, load: '85% 1RM', rpe: 8 },
          { name: 'Drop Jump reattivo', notes: 'Box 40cm · contatto <200ms', sets: 4, reps: 5, load: 'BW', rpe: 'RSI 2.7' },
          { name: 'Nordic Hamstring eccentrico', notes: 'Protezione hamstring', sets: 3, reps: 6, load: 'BW', rpe: 8 },
          { name: 'Pallof Press anti-rotazione', notes: 'Core stabilizzazione', sets: 3, reps: '30"', load: 'banda', rpe: 6 },
        ]},
        { title: 'Potenza esplosiva', exs: [
          { name: 'Riscaldamento dinamico', notes: 'Bike + drill mobilità', sets: 1, reps: '10\'', load: '—', rpe: 3 },
          { name: 'Power Clean', notes: 'Esplosivo · prima fase', sets: 5, reps: 3, load: '70% 1RM', rpe: 7 },
          { name: 'Trap Bar Jump Squat', notes: 'Massima velocità', sets: 4, reps: 5, load: '40kg', rpe: 7 },
          { name: 'Lateral Bound', notes: 'Pliometria laterale sci-spec', sets: 4, reps: 6, load: 'BW', rpe: 7 },
          { name: 'Core anti-rotazione circuito', notes: 'Pallof + dead-bug', sets: 3, reps: '40"', load: 'BW', rpe: 6 },
        ]},
        { title: 'Forza eccentrica', exs: [
          { name: 'Attivazione + foam rolling', notes: '', sets: 1, reps: '15\'', load: '—', rpe: 2 },
          { name: 'Bulgarian Split Squat eccentrico', notes: 'Tempo 4-1-1', sets: 4, reps: 8, load: '20kg', rpe: 7 },
          { name: 'RDL bilanciere', notes: 'Eccentrico controllato', sets: 4, reps: 6, load: '60% 1RM', rpe: 7 },
          { name: 'Nordic Hamstring', notes: 'Protezione posteriore', sets: 3, reps: 6, load: 'BW', rpe: 8 },
          { name: 'Plank dinamico + side plank', notes: 'Core circuito', sets: 3, reps: '40"', load: 'BW', rpe: 6 },
        ]},
        { title: 'Mobilità + core', exs: [
          { name: 'Foam rolling completo', notes: 'Tutto il corpo', sets: 1, reps: '15\'', load: '—', rpe: 2 },
          { name: 'Yoga flow dinamico', notes: 'Apertura anche e mobilità toracica', sets: 1, reps: '20\'', load: '—', rpe: 3 },
          { name: 'Dead-bug progressivo', notes: 'Core deep stabilizzazione', sets: 3, reps: 8, load: 'BW', rpe: 5 },
          { name: 'Pallof Press', notes: 'Anti-rotazione', sets: 3, reps: 12, load: 'banda', rpe: 5 },
        ]},
      ],
      sci: [
        { title: 'GS · tracciato corto', loc: 'Saas-Fee', exs: [
          { name: 'Riscaldamento on-snow', notes: 'Free skiing pista facile', sets: 1, reps: '15\'', load: '—', rpe: 3 },
          { name: 'Drill posizione anticipata', notes: 'Esterno · 2 piste', sets: 2, reps: '8 discese', load: '—', rpe: 5 },
          { name: 'GS tracciato 25 porte', notes: 'Pendenza 60% · neve hard pack', sets: 4, reps: '4 manche', load: '—', rpe: 8 },
          { name: 'Cool down + mobilità', notes: 'Free skiing leggero', sets: 1, reps: '10\'', load: '—', rpe: 2 },
        ]},
        { title: 'SL · drill ritmo', loc: 'Hintertux', exs: [
          { name: 'Riscaldamento on-snow', notes: 'Free skiing', sets: 1, reps: '12\'', load: '—', rpe: 3 },
          { name: 'Drill rotolata caviglia', notes: 'Tecnica appoggio · 2 piste', sets: 2, reps: '6 discese', load: '—', rpe: 5 },
          { name: 'SL tracciato 50 porte', notes: 'Cambio di ritmo · 3 settori', sets: 5, reps: '3 manche', load: '—', rpe: 8 },
          { name: 'Recupero attivo', notes: 'Cammino + stretching', sets: 1, reps: '10\'', load: '—', rpe: 2 },
        ]},
        { title: 'SG · velocità', loc: 'Stelvio', exs: [
          { name: 'Riscaldamento on-snow', notes: 'Free skiing + drill posizione', sets: 1, reps: '20\'', load: '—', rpe: 3 },
          { name: 'SG drill velocità', notes: 'Cancellate aperte · pista lunga', sets: 3, reps: '2 manche', load: '—', rpe: 9 },
          { name: 'Video analisi posizione', notes: 'Briefing 15\' tra manche', sets: 1, reps: '15\'', load: '—', rpe: '—' },
          { name: 'Free skiing cool down', notes: 'Leggera intensità', sets: 1, reps: '10\'', load: '—', rpe: 2 },
        ]},
      ],
      rehab: [
        { title: 'Fase 3 LCA · plio asimmetrica', exs: [
          { name: 'Bike attivazione', notes: 'Resistenza bassa', sets: 1, reps: '10\'', load: '—', rpe: 4 },
          { name: 'Single hop forward', notes: 'Atterraggio controllato · monitoraggio LSI', sets: 4, reps: 6, load: 'BW', rpe: 7 },
          { name: 'Triple hop forward', notes: 'LSI target ≥90%', sets: 3, reps: 5, load: 'BW', rpe: 8 },
          { name: 'Y-Balance test set', notes: 'Reach asimmetrico', sets: 3, reps: 'AMRAP 30"', load: 'BW', rpe: 6 },
          { name: 'Crioterapia + compressione', notes: 'Recupero attivo', sets: 1, reps: '20\'', load: '—', rpe: '—' },
        ]},
        { title: 'Fase 4 spalla · drill caduta', exs: [
          { name: 'Mobilità GH + scapolare', notes: 'Theraband attivazione', sets: 2, reps: 15, load: 'banda', rpe: 4 },
          { name: 'Med ball chest throw', notes: 'Esplosivo · no compensi', sets: 4, reps: 6, load: '4kg', rpe: 7 },
          { name: 'Push-up + perturbazione', notes: 'Su BOSU · partner spinge', sets: 3, reps: 10, load: 'BW', rpe: 7 },
          { name: 'Drill caduta controllata', notes: 'Su materasso · 3 lati', sets: 3, reps: 5, load: 'BW', rpe: 6 },
        ]},
      ],
      recovery: [
        { title: 'Recovery + crioterapia', exs: [
          { name: 'Foam rolling completo', notes: 'Catene principali', sets: 1, reps: '15\'', load: '—', rpe: 2 },
          { name: 'Crioterapia (whole-body)', notes: '-110°C · 3 minuti', sets: 1, reps: '3\'', load: '—', rpe: '—' },
          { name: 'Stretching statico', notes: 'Catene posteriori', sets: 1, reps: '20\'', load: '—', rpe: 2 },
          { name: 'Mobility yoga', notes: 'Apertura anche e spalle', sets: 1, reps: '15\'', load: '—', rpe: 2 },
        ]},
      ],
      test: [
        { title: 'CMJ + SJ + DJ batch', exs: [
          { name: 'Riscaldamento dinamico', notes: 'Standardizzato pre-test', sets: 1, reps: '10\'', load: '—', rpe: 4 },
          { name: 'CMJ (Counter Movement Jump)', notes: 'OptoJump · 3 prove · best', sets: 1, reps: 3, load: 'BW', rpe: 'max' },
          { name: 'SJ (Squat Jump)', notes: 'No counter movement · 3 prove', sets: 1, reps: 3, load: 'BW', rpe: 'max' },
          { name: 'DJ (Drop Jump)', notes: 'Box 40cm · RSI · 3 prove', sets: 1, reps: 3, load: 'BW', rpe: 'max' },
          { name: 'Defaticamento', notes: 'Bike + stretching', sets: 1, reps: '10\'', load: '—', rpe: 2 },
        ]},
      ],
      gara: [
        { title: 'Gara CdM · giorno gara', exs: [
          { name: 'Sveglia + colazione 3h pre', notes: '06:30 · ottimizzazione glicogeno', sets: 1, reps: '—', load: '—', rpe: '—' },
          { name: 'Attivazione fisica', notes: '60\' pre-start · bike + drill', sets: 1, reps: '60\'', load: '—', rpe: 5 },
          { name: 'Ricognizione tracciato', notes: 'Memorizzazione settori chiave', sets: 1, reps: '—', load: '—', rpe: '—' },
          { name: '1ª manche', notes: 'Strategia pulita prime 10 porte', sets: 1, reps: 1, load: 'max', rpe: 10 },
          { name: '2ª manche', notes: 'Cambio strategia in base split', sets: 1, reps: 1, load: 'max', rpe: 10 },
          { name: 'Cool down + analisi video', notes: 'Recovery + briefing post', sets: 1, reps: '30\'', load: '—', rpe: 2 },
        ]},
      ],
      briefing: [
        { title: 'Briefing pre-gara', exs: [
          { name: 'Strategia tracciato', notes: 'Settori chiave · linea ideale', sets: 1, reps: '20\'', load: '—', rpe: '—' },
          { name: 'Condizioni meteo', notes: 'Vento · neve · visibilità', sets: 1, reps: '5\'', load: '—', rpe: '—' },
          { name: 'Materiali scelti', notes: 'Sci · lamine · sciolinatura', sets: 1, reps: '15\'', load: '—', rpe: '—' },
          { name: 'Tempistiche', notes: 'Sveglia · attivazione · start', sets: 1, reps: '10\'', load: '—', rpe: '—' },
        ]},
      ],
    },

    // Cartella clinica per atleta (anamnesi, anthro, esami)
    clinica: {
      lgb: {
        bloodType: '0+', allergies: 'Nessuna nota',
        meds: 'Vit. D3 4000 UI · Omega 3 · Magnesio (post-allenamento)',
        anamnesi: 'Atleta storica della squadra svizzera. Carriera senza grandi infortuni gravi. Lieve tendinopatia rotulea 2019 risolta.',
        surgeries: [
          { date: '2019-06-10', type: 'Artroscopia ginocchio dx · debridement menisco', center: 'Schulthess Klinik · Zürich', surgeon: 'Prof. Müller', notes: 'Recupero completo in 8 settimane' },
        ],
        pastExams: [
          { date: '2026-04-15', type: 'Eco strutturale ginocchia', findings: 'Nessuna patologia · trocleare nei limiti' },
          { date: '2026-03-01', type: 'Visita cardiologica annuale', findings: 'ECG nella norma · ecocardio normale · idoneità confermata' },
          { date: '2025-09-12', type: 'RM colonna lombare', findings: 'Nessuna ernia · lieve scoliosi compensatoria' },
        ],
        anthropometry: [
          { date: '2026-05-01', weight: 64.2, height: 168, bf: 18.4, lean: 52.4 },
          { date: '2026-03-01', weight: 64.8, height: 168, bf: 19.0, lean: 52.5 },
          { date: '2026-01-01', weight: 65.5, height: 168, bf: 20.2, lean: 52.3 },
          { date: '2025-10-01', weight: 66.2, height: 168, bf: 21.0, lean: 52.3 },
        ],
        vitals: { restingHR: 48, bp: '108/68', vo2max: 56.8 },
      },
      mod: {
        bloodType: 'A+', allergies: 'Nessuna nota',
        meds: 'Multivitaminico · Creatina 5g/die · Omega 3',
        anamnesi: 'Carriera straordinaria · stato fisico eccellente · zero infortuni significativi.',
        surgeries: [],
        pastExams: [
          { date: '2026-04-20', type: 'Visita cardiologica annuale', findings: 'Tutto nella norma · idoneità confermata' },
          { date: '2026-02-10', type: 'Eco completa', findings: 'Tutto nella norma' },
        ],
        anthropometry: [
          { date: '2026-05-01', weight: 84.0, height: 183, bf: 11.8, lean: 74.1 },
          { date: '2026-03-01', weight: 84.5, height: 183, bf: 12.1, lean: 74.3 },
          { date: '2026-01-01', weight: 85.2, height: 183, bf: 12.5, lean: 74.5 },
        ],
        vitals: { restingHR: 42, bp: '112/70', vo2max: 64.8 },
      },
      csu: {
        bloodType: 'B+', allergies: 'Lattosio (intolleranza lieve)',
        meds: 'Antinfiammatori al bisogno · Vit. D3 · Calcio + Vit K2',
        anamnesi: 'Rottura LCA dx 13/12/2025. Operata 14/12. Anamnesi precedente: distorsione caviglia sx 2022. Buona tolleranza al carico.',
        surgeries: [
          { date: '2025-12-14', type: 'Ricostruzione LCA dx + sutura menisco', center: 'Schulthess Klinik · Zürich', surgeon: 'Prof. Stefan Müller', notes: 'Tecnica BPTB · all-inside meniscale' },
        ],
        pastExams: [
          { date: '2026-04-28', type: 'Eco strutturale tendine rotuleo', findings: 'Spessore nei limiti · no tendinopatia' },
          { date: '2026-03-20', type: 'RM ginocchio dx controllo', findings: 'Innesto integrato · no lassità · menisco riparato' },
          { date: '2026-01-15', type: 'RM ginocchio dx controllo', findings: 'Innesto in sede · ottima vascolarizzazione' },
          { date: '2025-12-13', type: 'RM ginocchio dx (acuta)', findings: 'Rottura completa LCA + lesione menisco mediale' },
        ],
        anthropometry: [
          { date: '2026-05-01', weight: 67.4, height: 172, bf: 22.1, lean: 52.5 },
          { date: '2026-02-01', weight: 66.8, height: 172, bf: 23.4, lean: 51.1 },
          { date: '2025-12-01', weight: 68.2, height: 172, bf: 20.2, lean: 54.4 },
        ],
        vitals: { restingHR: 52, bp: '110/72', vo2max: 54.2 },
      },
      gca: {
        bloodType: 'A-', allergies: 'Nessuna nota',
        meds: 'Antinfiammatori 1° mese post-op · Vit. D3',
        anamnesi: 'Lussazione spalla dx 28/03/2026 in allenamento SG. Operata 30/03. Anamnesi: pollice dx distorsione 2023.',
        surgeries: [
          { date: '2026-03-30', type: 'Riparazione capsulo-labrale artroscopica (Bankart)', center: 'Hôpital de La Tour · Genève', surgeon: 'Dr. Pierre-Yves Zambelli', notes: 'Riparazione integra · capsula ben tesa' },
        ],
        pastExams: [
          { date: '2026-04-22', type: 'RM spalla dx controllo', findings: 'Riparazione integra · capsula tesa' },
          { date: '2026-03-29', type: 'RM spalla dx (acuta)', findings: 'Lesione di Bankart + Hill-Sachs minore' },
          { date: '2026-03-28', type: 'RX spalla dx', findings: 'Lussazione antero-inferiore · ridotta' },
        ],
        anthropometry: [
          { date: '2026-05-01', weight: 86.2, height: 182, bf: 13.5, lean: 74.6 },
          { date: '2026-03-01', weight: 86.8, height: 182, bf: 13.0, lean: 75.5 },
        ],
        vitals: { restingHR: 50, bp: '116/74', vo2max: 58.4 },
      },
    },

    // Conteggio sessioni per atleta (stagione 2025/26)
    athleteSessions: {
      lgb: { palestra: 78, sci: 96, gara: 22, rehab: 0,   recovery: 32, test: 12, briefing: 18 },
      mge: { palestra: 84, sci: 72, gara: 19, rehab: 2,   recovery: 28, test: 11, briefing: 16 },
      who: { palestra: 76, sci: 88, gara: 21, rehab: 0,   recovery: 30, test: 12, briefing: 17 },
      cra: { palestra: 72, sci: 92, gara: 20, rehab: 0,   recovery: 26, test: 11, briefing: 15 },
      csu: { palestra: 64, sci: 4,  gara: 0,  rehab: 88,  recovery: 42, test: 16, briefing: 8  },
      jfl: { palestra: 70, sci: 84, gara: 18, rehab: 0,   recovery: 28, test: 10, briefing: 14 },
      jha: { palestra: 68, sci: 80, gara: 17, rehab: 12,  recovery: 26, test: 10, briefing: 14 },
      ddu: { palestra: 74, sci: 90, gara: 20, rehab: 0,   recovery: 28, test: 11, briefing: 15 },
      mme: { palestra: 70, sci: 86, gara: 19, rehab: 0,   recovery: 26, test: 10, briefing: 14 },
      sst: { palestra: 68, sci: 76, gara: 16, rehab: 6,   recovery: 24, test: 9,  briefing: 12 },
      mod: { palestra: 86, sci: 102,gara: 26, rehab: 0,   recovery: 34, test: 13, briefing: 20 },
      lme: { palestra: 80, sci: 94, gara: 24, rehab: 0,   recovery: 30, test: 12, briefing: 18 },
      jmu: { palestra: 78, sci: 86, gara: 22, rehab: 0,   recovery: 28, test: 11, briefing: 16 },
      sro: { palestra: 72, sci: 78, gara: 18, rehab: 0,   recovery: 26, test: 10, briefing: 14 },
      gca: { palestra: 58, sci: 24, gara: 14, rehab: 36,  recovery: 30, test: 12, briefing: 12 },
      fvo: { palestra: 76, sci: 88, gara: 18, rehab: 0,   recovery: 28, test: 11, briefing: 15 },
    },

    // Wellness time series (ultimi 14 giorni per atleta)
    // sleep (h), stress (1-10), fatigue (1-10), load (au), mood (1-10)
    wellnessHistory: (() => {
      const out = {};
      const ids = ['lgb','mge','who','cra','csu','jfl','jha','ddu','mme','sst','mod','lme','jmu','sro','gca','fvo'];
      const today = new Date('2026-05-07');
      ids.forEach(id => {
        const base = { sleep: 7.6, stress: 4, fatigue: 4, load: 450, mood: 7 };
        if (id === 'csu') { base.sleep = 6.9; base.stress = 6; base.fatigue = 5; base.load = 280; base.mood = 6; }
        if (id === 'gca') { base.sleep = 7.2; base.stress = 5; base.fatigue = 4; base.load = 320; base.mood = 7; }
        if (id === 'mod') { base.sleep = 8.3; base.stress = 3; base.fatigue = 3; base.load = 540; base.mood = 9; }
        out[id] = [];
        for (let i = 13; i >= 0; i--) {
          const d = new Date(today); d.setDate(today.getDate() - i);
          const noise = (s) => (Math.random() - 0.5) * s;
          out[id].push({
            date: d.toISOString().split('T')[0],
            sleep: +(base.sleep + noise(0.8)).toFixed(1),
            stress: Math.max(1, Math.min(10, Math.round(base.stress + noise(2)))),
            fatigue: Math.max(1, Math.min(10, Math.round(base.fatigue + noise(2)))),
            load: Math.max(0, Math.round(base.load + noise(220))),
            mood: Math.max(1, Math.min(10, Math.round(base.mood + noise(1.6)))),
          });
        }
      });
      return out;
    })(),

    // Eventi calendario stagione (mock per maggio 2026)
    calendarEvents: [
      // Settimana corrente (centrata su 07/05)
      { id: 'e001', date: '2026-05-04', time: '09:30', type: 'palestra', title: 'Forza max', loc: 'Magglingen', athleteIds: ['lgb','jfl','jha','ddu','sst'], duration: 90 },
      { id: 'e002', date: '2026-05-04', time: '16:30', type: 'recovery', title: 'Recovery', loc: 'Hotel', athleteIds: ['lgb','jfl','jha','ddu','sst','mge','who','cra'], duration: 45 },
      { id: 'e003', date: '2026-05-05', time: '09:00', type: 'sci', title: 'GS Saas-Fee', loc: 'Saas-Fee', athleteIds: ['mod','lme','cra','who'], duration: 180 },
      { id: 'e004', date: '2026-05-05', time: '14:00', type: 'rehab', title: 'Fase 3 LCA', loc: 'Magglingen', athleteIds: ['csu'], duration: 90 },
      { id: 'e005', date: '2026-05-06', time: '10:00', type: 'recovery', title: 'Crioterapia', loc: 'Magglingen', athleteIds: ['lgb','mge','who','jfl'], duration: 60 },
      { id: 'e006', date: '2026-05-06', time: '15:00', type: 'rehab', title: 'Spalla pre-RTS', loc: 'Magglingen', athleteIds: ['gca'], duration: 60 },
      { id: 'e007', date: '2026-05-07', time: '09:30', type: 'palestra', title: 'Forza + Potenza', loc: 'Magglingen', athleteIds: ['lgb','jfl','jha','ddu','sst','mod','lme','jmu','sro','fvo'], duration: 90 },
      { id: 'e008', date: '2026-05-07', time: '15:00', type: 'briefing', title: 'Briefing pre-Zermatt', loc: 'Magglingen', athleteIds: ['lgb','jfl','jha','ddu','sst','sro','fvo'], duration: 60 },
      { id: 'e009', date: '2026-05-07', time: '17:00', type: 'rehab', title: 'Fase 3 — pliometria', loc: 'Magglingen', athleteIds: ['csu'], duration: 75 },
      { id: 'e010', date: '2026-05-08', time: '09:00', type: 'sci', title: 'SG drill velocità', loc: 'Stelvio', athleteIds: ['lgb','jfl','jha','ddu','sst'], duration: 180 },
      { id: 'e011', date: '2026-05-08', time: '07:00', type: 'travel', title: 'Trasferta Zermatt', loc: 'Magglingen → Zermatt', athleteIds: ['lgb','jfl','jha','ddu','sst','sro','fvo'], duration: 240 },
      { id: 'e012', date: '2026-05-09', time: '11:30', type: 'gara', title: 'DH Zermatt-Cervinia', loc: 'Zermatt-Cervinia', athleteIds: ['lgb','jfl','jha','ddu','sst','sro','fvo'], duration: 240 },
      { id: 'e013', date: '2026-05-10', time: '—', type: 'recovery', title: 'Riposo', loc: '—', athleteIds: [], duration: 0 },

      // Settimana 11-17 maggio
      { id: 'e014', date: '2026-05-11', time: '09:00', type: 'palestra', title: 'Scarico', loc: 'Magglingen', athleteIds: ['mge','who','cra','mod','lme'], duration: 75 },
      { id: 'e015', date: '2026-05-12', time: '10:00', type: 'sci', title: 'GS Hintertux', loc: 'Hintertux', athleteIds: ['mod','lme','cra','mme'], duration: 180 },
      { id: 'e016', date: '2026-05-13', time: '14:00', type: 'test', title: 'CMJ + SJ batch', loc: 'Magglingen', athleteIds: ['lgb','mge','who','cra','jfl','jha','ddu','mme','sst'], duration: 120 },
      { id: 'e017', date: '2026-05-14', time: '09:00', type: 'sci', title: 'SL Hintertux', loc: 'Hintertux', athleteIds: ['who','cra','mme','lme'], duration: 180 },
      { id: 'e018', date: '2026-05-15', time: '07:00', type: 'travel', title: 'Trasferta Sölden', loc: 'Magglingen → Sölden', athleteIds: ['mod','lme','cra','who','mme'], duration: 320 },
      { id: 'e019', date: '2026-05-16', time: '10:00', type: 'gara', title: 'GS Sölden', loc: 'Sölden', athleteIds: ['mod','lme','cra','who','mme','jmu','ddu'], duration: 240 },
      { id: 'e020', date: '2026-05-17', time: '—', type: 'recovery', title: 'Recovery post-gara', loc: '—', athleteIds: [], duration: 0 },

      // Eventi precedenti (settimana passata)
      { id: 'e021', date: '2026-05-02', time: '11:00', type: 'sci', title: 'SG Stelvio', loc: 'Stelvio', athleteIds: ['lgb','jfl','jha','ddu','sst'], duration: 180 },
      { id: 'e022', date: '2026-05-03', time: '10:00', type: 'sci', title: 'GS Saas-Fee', loc: 'Saas-Fee', athleteIds: ['mod','lme','cra','who'], duration: 180 },
      { id: 'e023', date: '2026-05-01', time: '—', type: 'recovery', title: '1° Maggio off', loc: '—', athleteIds: [], duration: 0 },
      { id: 'e024', date: '2026-04-30', time: '09:00', type: 'palestra', title: 'Forza eccentrica', loc: 'Magglingen', athleteIds: ['lgb','mge','who','cra','mod','lme'], duration: 90 },
      { id: 'e025', date: '2026-04-29', time: '14:00', type: 'rehab', title: 'Fase 3 LCA', loc: 'Magglingen', athleteIds: ['csu'], duration: 90 },
    ],

    // Storico stagionale infortuni (per panoramica)
    injuryHistory: [
      { date: '14/12/2025', athleteId: 'csu', name: 'Corinne Suter', area: 'Ginocchio dx', diag: 'Rottura LCA + menisco', daysOut: 144, status: 'rehab' },
      { date: '28/03/2026', athleteId: 'gca', name: 'Gino Caviezel', area: 'Spalla dx', diag: 'Lussazione + Bankart', daysOut: 39, status: 'pre-rts' },
      { date: '11/01/2026', athleteId: 'jha', name: 'Joana Hählen', area: 'Tibio-tarsica sx', diag: 'Distorsione II grado', daysOut: 21, status: 'resolved' },
      { date: '02/02/2026', athleteId: 'lme', name: 'Loïc Meillard', area: 'Pollice dx', diag: 'Distorsione MCP', daysOut: 8, status: 'resolved' },
      { date: '15/02/2026', athleteId: 'sst', name: 'Stephanie Jenal', area: 'Lombare', diag: 'Contrattura', daysOut: 5, status: 'resolved' },
    ],
  },

  personal: {
    coach: { name: 'Marcello Tavola', role: 'Personal Trainer & Athletic Coach' },
    clients: [
      { id: 'p1', name: 'Andrea Rossi', age: 42, sport: 'Sci amatore avanzato', goal: 'Performance + prevenzione', status: 'active', adherence: 94, plan: 'Premium 12 mesi', nextSession: '2026-05-07 09:00', sessions: 38, total: 48 },
      { id: 'p2', name: 'Sofia Bianchi', age: 16, sport: 'Sci agonistico FIS', goal: 'Forza + esplosività', status: 'active', adherence: 89, plan: 'Athlete dev', nextSession: '2026-05-06 16:30', sessions: 22, total: 36 },
      { id: 'p3', name: 'Marco Colombo', age: 38, sport: 'Triathlon', goal: 'Forza per ciclismo', status: 'active', adherence: 81, plan: 'Standard 6 mesi', nextSession: '2026-05-08 07:00', sessions: 14, total: 24 },
      { id: 'p4', name: 'Elena Ferrari', age: 51, sport: 'Sci amatore', goal: 'Ritorno post-LCA', status: 'rehab', adherence: 97, plan: 'Rehab dedicato', nextSession: '2026-05-06 11:00', sessions: 18, total: 24 },
      { id: 'p5', name: 'Luca Moretti', age: 29, sport: 'Snowboard freeride', goal: 'Stabilità + core', status: 'active', adherence: 76, plan: 'Standard', nextSession: '2026-05-09 18:00', sessions: 9, total: 18 },
      { id: 'p6', name: 'Giulia Conti', age: 34, sport: 'Trail running', goal: 'Forza + mobilità', status: 'active', adherence: 92, plan: 'Online', nextSession: '2026-05-07 19:00', sessions: 26, total: 36 },
      { id: 'p7', name: 'Federico Greco', age: 19, sport: 'Sci agonistico FIS Junior', goal: 'Preparazione stagione', status: 'active', adherence: 85, plan: 'Athlete dev', nextSession: '2026-05-08 17:00', sessions: 7, total: 24 },
      { id: 'p8', name: 'Marta Esposito', age: 45, sport: 'Sci amatore', goal: 'Mantenimento + perdita peso', status: 'active', adherence: 71, plan: 'Standard online', nextSession: '2026-05-10 08:00', sessions: 12, total: 24 },
    ],
  },
  testHistory: {
    cmj: [
      { week: 'W1', avg: 38.2 }, { week: 'W2', avg: 38.9 }, { week: 'W3', avg: 39.4 },
      { week: 'W4', avg: 40.1 }, { week: 'W5', avg: 40.6 }, { week: 'W6', avg: 41.2 },
      { week: 'W7', avg: 41.5 }, { week: 'W8', avg: 41.8 },
    ],
    workload: [
      { week: 'W1', acute: 2200, chronic: 2100 }, { week: 'W2', acute: 2400, chronic: 2150 },
      { week: 'W3', acute: 2600, chronic: 2250 }, { week: 'W4', acute: 2350, chronic: 2300 },
      { week: 'W5', acute: 2700, chronic: 2400 }, { week: 'W6', acute: 2800, chronic: 2500 },
      { week: 'W7', acute: 2500, chronic: 2550 }, { week: 'W8', acute: 2300, chronic: 2500 },
    ],
    wellness: [
      { day: 'Lun', sleep: 7.5, fatigue: 3, mood: 8, soreness: 2 },
      { day: 'Mar', sleep: 7.2, fatigue: 4, mood: 7, soreness: 3 },
      { day: 'Mer', sleep: 8.1, fatigue: 2, mood: 9, soreness: 2 },
      { day: 'Gio', sleep: 7.8, fatigue: 3, mood: 8, soreness: 3 },
      { day: 'Ven', sleep: 6.9, fatigue: 5, mood: 6, soreness: 4 },
      { day: 'Sab', sleep: 8.3, fatigue: 2, mood: 9, soreness: 2 },
      { day: 'Dom', sleep: 8.5, fatigue: 1, mood: 9, soreness: 1 },
    ],
  },
};

window.UTIL = {
  initials: (name) => name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
  loadColor: (load) => ({ Optimal: 'good', High: 'warn', Reduced: 'bad', Progressive: 'info' }[load] || 'muted'),
  readinessClass: (r) => r >= 80 ? 'high' : r >= 70 ? 'med' : 'low',
  readinessColor: (r) => r >= 80 ? 'good' : r >= 70 ? 'warn' : 'bad',
  formatDate: (iso) => new Date(iso).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),

  // Athlete benchmark: ranking position in team for a given test
  rankInTeam: (athleteId, test, higher = true) => {
    const team = window.DATA.swissTeam.athletes;
    const athlete = team.find(a => a.id === athleteId);
    if (!athlete) return null;
    const sameSex = team.filter(a => a.sex === athlete.sex && a.tests && a.tests[test] != null);
    sameSex.sort((a, b) => higher ? b.tests[test] - a.tests[test] : a.tests[test] - b.tests[test]);
    return { rank: sameSex.findIndex(a => a.id === athleteId) + 1, total: sameSex.length };
  },

  // Compute % position vs team min-max
  positionInRange: (value, min, max) => {
    const clamped = Math.max(min, Math.min(max, value));
    return ((clamped - min) / (max - min)) * 100;
  },

  // Delta vs team avg / WC top10
  deltaVs: (value, ref) => {
    const d = value - ref;
    return { value: d, sign: d >= 0 ? '+' : '', pct: ((d / ref) * 100).toFixed(1) };
  },

  // Test display config: label, unit, higherIsBetter
  testMeta: {
    cmj:      { label: 'CMJ', unit: 'cm', higher: true, decimals: 1 },
    sj:       { label: 'SJ', unit: 'cm', higher: true, decimals: 1 },
    dj:       { label: 'DJ RSI', unit: '', higher: true, decimals: 2 },
    squat1RM: { label: 'Squat 1RM', unit: 'kg', higher: true, decimals: 0 },
    vo2max:   { label: 'VO2max', unit: 'ml/kg/min', higher: true, decimals: 1 },
    ybalance: { label: 'Y-Balance', unit: '', higher: true, decimals: 0 },
  },
};
