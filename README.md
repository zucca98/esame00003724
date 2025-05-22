# Coccibelli - E-commerce di Bijoux Artigianali

Un e-commerce per la vendita di gioielli artigianali realizzati con frammenti di porcellana vintage. Ogni pezzo è unico e racconta una storia.

## 🚀 Avvio Rapido

1. Estrai il contenuto dello ZIP
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
4. In un altro terminale, avvia il server JSON:
   ```bash
   npm run server
   ```

## 👥 Credenziali Demo

### Admin
- Email: admin@coccibelli.com
- Password: admin123

### Utente
- Email: user@example.com
- Password: user123

## 🛠️ Tecnologie Utilizzate

- **Frontend**: React 18, Redux Toolkit, Bootstrap 5
- **Backend**: JSON Server
- **Email**: EmailJS (prossimamente)
- **Build Tool**: Vite

## 📋 Funzionalità

- Catalogo prodotti con filtri per categoria
- Carrello della spesa
- Sistema di autenticazione
- Dashboard admin per gestione prodotti
- Sistema ordini
- Form contatti

## 📁 Struttura del Progetto

```
coccibelli/
├── docs/               # Documentazione
│   ├── installation.md     # Guida installazione
│   ├── maintenance.md      # Guida manutenzione
│   └── product-management.md # Gestione prodotti
├── public/            # File statici
├── src/               # Codice sorgente
│   ├── components/    # Componenti React
│   ├── pages/         # Pagine dell'app
│   ├── store/         # Store Redux
│   └── assets/        # Risorse statiche
└── db.json            # Database JSON
```

## 📜 Script Disponibili

- `npm run dev`: Avvia server di sviluppo
- `npm run build`: Crea build produzione
- `npm run server`: Avvia JSON Server

## 📚 Documentazione

Per informazioni dettagliate sulla gestione del progetto, consulta:

- [Manuale di Installazione](docs/installation.md)
- [Gestione Prodotti](docs/product-management.md)
- [Manuale di Manutenzione](docs/maintenance.md)

## 🔧 Requisiti di Sistema

- Node.js (v14.0.0 o superiore)
- npm (v6.0.0 o superiore)