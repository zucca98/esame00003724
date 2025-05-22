# Manuale per la Gestione dei Prodotti - Coccibelli

Questa guida spiega come gestire il catalogo prodotti di Coccibelli.

## Struttura dei Dati

Ogni prodotto nel database (`db.json`) ha questa struttura:

```json
{
  "id": 1,
  "name": "Nome del Prodotto",
  "description": "Descrizione dettagliata",
  "price": 25.00,
  "category": "collane",
  "imageUrl": "URL dell'immagine",
  "stock": 5
}
```

### Categorie Disponibili
- collane
- anelli
- orecchini
- accessori

## Gestione tramite Dashboard Admin

1. Accedi come admin:
   - Email: admin@coccibelli.com
   - Password: admin123

2. Vai alla sezione Admin

3. Da qui puoi:
   - Visualizzare tutti i prodotti
   - Aggiungere nuovi prodotti
   - Modificare prodotti esistenti
   - Eliminare prodotti
   - Gestire lo stock

## Linee Guida per le Immagini

- Dimensioni consigliate: 1200x800px
- Formato: JPG o PNG
- Peso massimo: 500KB
- Sfondo: preferibilmente neutro
- Prodotto: ben centrato e illuminato

## Linee Guida per le Descrizioni

- Lunghezza: 100-200 caratteri
- Includere:
  - Materiali utilizzati
  - Colori predominanti
  - Dimensioni approssimative
  - Caratteristiche uniche
  - Tipo di chiusura/montaggio

## Gestione dello Stock

- Mantieni lo stock aggiornato
- Imposta notifiche per stock basso (< 3 pezzi)
- Verifica regolarmente la disponibilità