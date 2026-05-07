# APEX — Performance Suite · Demo Prototipo

Sistema gestionale per **Marcello Tavola** (Head Coach Swiss-Ski WC + Personal Trainer).

## Come aprire la demo

Doppio click su `index.html` — si apre in qualsiasi browser (Chrome / Safari / Firefox), nessun server richiesto.

## Struttura

```
index.html        → Entry / scelta modulo
team.html         → Modulo 1 — Swiss Ski Team (squadra nazionale CdM)
personal.html     → Modulo 2 — Personal Athletes (clienti privati PT)
assets/
  app.css         → Design system completo
  app.js          → Logica modali / navigazione / grafici
  data.js         → Dati mock (atleti reali, performance simulate)
```

## Cosa c'è dentro

### 🇨🇭 Swiss Ski Team
- **Dashboard** — KPI squadra (readiness, ACWR, wellness, sonno), roster live, alert, grafici carico e CMJ
- **Atleti** — 16 atleti reali della Svizzera (Gut-Behrami, Holdener, Odermatt, Rast, Suter, Meillard, ecc.). Profilo dettaglio cliccando su ogni nome: anagrafica, 4 metriche live, CMJ trend 8 settimane, carico settimanale, radar performance, attività ultimi 7gg
- **Programmazione** — Periodizzazione annuale a fasi (gen/spec/preag/ag/trans) + sessione tipo + barre carico settimanale
- **Test & Performance** — KPI medi squadra, wellness questionnaire, prossimi test in agenda, tabella test eseguiti
- **Calendario** — vista mensile con gare FIS, palestra, neve, trasferte
- **Infortuni & Rehab** — timeline grafica per Suter (LCA) e Caviezel (spalla), con criteri RTS oggettivi (LSI, hop test, Y-balance, ACL-RSI), storico stagionale
- **Neve & Video** — log sessioni in pista + annotazioni tecniche
- **Staff** — ruoli e permessi differenziati
- **Report Federazione** — export automatici PDF settimanali/mensili/pre-gara

### 👤 Personal Athletes
- **Dashboard** — clienti attivi, sessioni 7gg, aderenza, fatturato
- **Clienti** — 8 clienti tipo (sciatori amatori, agonisti FIS, triatleti, post-LCA)
- **Programmi** — template per categoria (sci amatore, agonisti, endurance, rehab) + esempio microciclo
- **Sessioni** — calendario con sync Google Calendar, sessioni in presenza/online/da prenotare
- **Libreria esercizi** — 340 esercizi categorizzati (forza/potenza/reattività/sci-spec/rehab)
- **Pagamenti** — fatturazione, pacchetti, MRR, integrazione Stripe
- **Messaggi** — chat diretta con clienti

## Cosa raccontare a Marcello

1. **"Due porte, due mondi separati"** — la squadra svizzera e i clienti privati non si mescolano mai, ma puoi passare da uno all'altro con un click.
2. **"Vede tutto in un colpo"** — la dashboard mostra readiness della squadra, carico (ACWR), wellness, sonno medio. Non serve aprire 10 file Excel.
3. **"Pensato per chi è in pista"** — design dark, tipografia leggibile da iPad fuori al freddo, tutto a portata di click.
4. **"I dati seri, non i giocattoli"** — sRPE, ACWR, LSI, RSI, Y-balance, ACL-RSI: il linguaggio della preparazione atletica di alto livello.
5. **"La federazione riceve i report da sola"** — automazione settimanale verso il direttore tecnico.
6. **"Tutto integrato, niente strumenti separati"** — wearable (HRV/sonno), wellness, video analysis, calendari, fatturazione.

## Tecnologie usate (demo)

- HTML + CSS (design system custom, 100% controllo) + Vanilla JS
- Chart.js per grafici (line, bar, radar)
- Font Inter
- Zero dipendenze esterne installate localmente

## Per la versione produttiva

Stack proposto quando si passa al prodotto reale:

- **Frontend**: Next.js 14 + TypeScript + Tailwind (PWA per mobile)
- **Backend**: Next.js API routes / Node + Express
- **Database**: PostgreSQL (Supabase) — relazionale, perfetto per dati strutturati di atleti/sessioni
- **Auth**: NextAuth con ruoli (admin, coach, fisio, atleta, cliente PT)
- **Storage video/foto**: Supabase Storage o S3
- **Hosting**: Vercel (frontend) + Supabase (DB) — server Svizzera per GDPR/dati medici
- **Integrazioni**: API Polar/Garmin/Whoop, Google Calendar, Stripe, Google Drive

## Domande aperte da discutere con Marcello

1. **Privacy/GDPR**: dati medici di atlete CdM — server Svizzera richiesto? La federazione ha policy specifiche?
2. **Strumenti esistenti**: Swiss-Ski usa già Smartabase/Kinduct/AMS? Da sostituire o coesistere?
3. **Dispositivi principali**: iPad in palestra? Telefono in pista? Desktop in ufficio?
4. **Wearable**: che brand usano gli atleti? (Polar, Garmin, Whoop)
5. **Roadmap**: MVP rapido (4-6 settimane: solo squadra + programmazione + test) o scope completo (3-4 mesi)?
6. **App mobile per atleti**: PWA o app nativa iOS/Android?
7. **Numero utenti**: solo squadra Marcello + suoi PT, o tutta la federazione?

## Stagione 2025/26 — atleti referenziati

I nomi sono atlete/i reali della squadra CdM svizzera. **Tutti i dati di performance, infortuni, wellness e HRV sono SIMULATI** a scopo di demo. Niente di sensibile è reale.
