# Manuale di Installazione - Coccibelli

Segui queste istruzioni per installare e avviare il progetto Coccibelli, un e-commerce di bijoux artigianali realizzati con frammenti di porcellana.

## Requisiti

- Node.js (v14.0.0 o superiore)
- npm (v6.0.0 o superiore)

## Passi per l'installazione

1. Estrai il contenuto del file ZIP in una cartella sul tuo computer

2. Apri un terminale nella cartella estratta

3. Installa le dipendenze:
   ```bash
   npm install
   ```

4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

5. In un'altra finestra del terminale, avvia il server JSON:
   ```bash
   npm run server
   ```

6. L'applicazione sarà disponibile all'indirizzo mostrato nel terminale (solitamente http://localhost:5173)

## Struttura del Progetto

```
coccibelli/
├── docs/               # Documentazione
├── public/            # File statici
├── src/               # Codice sorgente
│   ├── components/    # Componenti React
│   ├── pages/         # Pagine dell'applicazione
│   ├── store/         # Store Redux
│   └── assets/        # Immagini e altri asset
└── db.json            # Database JSON
```

## Script Disponibili

- `npm run dev`: Avvia il server di sviluppo
- `npm run build`: Crea la build di produzione
- `npm run preview`: Visualizza la build di produzione
- `npm run server`: Avvia il server JSON
- `npm run lint`: Esegue il linting del codice

## Credenziali Demo

Per testare l'applicazione, usa queste credenziali:

### Admin
- Email: admin@coccibelli.com
- Password: admin123

### Utente
- Email: user@example.com
- Password: user123

## Risoluzione Problemi

Se incontri problemi durante l'installazione:

1. Verifica di avere la versione corretta di Node.js installata
2. Prova a cancellare la cartella `node_modules` e il file `package-lock.json`
3. Esegui nuovamente `npm install`
4. Se il problema persiste, verifica che le porte 5173 (dev server) e 3001 (JSON server) siano libere