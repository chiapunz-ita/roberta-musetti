# Nuovo sito — note per la messa online

Questo pacchetto contiene il sito statico completo (HTML/CSS/JS), pronto per essere caricato su qualsiasi hosting (anche il tuo attuale).

**Attenzione alla struttura**: `index.html` ora è una schermata d'apertura minimale (solo la frase, su sfondo astratto) — è quella che si vede per prima aprendo il sito, perché la maggior parte degli hosting mostra automaticamente `index.html` come pagina di ingresso. Il bottone "Entra" porta alla vera homepage con tutti i contenuti (servizi, chi sono, ecc.), che ora si chiama `home.html`. Tutti i link "Home" del menu e del footer puntano già a `home.html`.

## Cosa verificare prima di pubblicare

- **Prezzi e date**: ho riportato le tariffe e i protocolli che erano pubblicati sul vecchio sito (es. 75€ a seduta, 200€ costellazione individuale, 600€/675€ Mindful Eating). Controlla che siano ancora quelle attuali.
- **Moduli di contatto**: "Richiedi un appuntamento" e la consulenza online, ad oggi, aprono il programma di posta con i dati già scritti (non serve un server). Se preferisci ricevere le richieste direttamente via form (senza passare dal client di posta dell'utente), si può collegare un servizio come Formspree o Netlify Forms in pochi minuti.
- **Mappa**: il pin in "Contatti" è centrato su Cesano Maderno con le coordinate pubbliche più precise che ho trovato; se vuoi il puntamento esatto sul portone di Via Padova 12/B, basta aggiornare le coordinate nell'iframe.
- **Privacy policy**: ho riscritto l'informativa in modo semplice e corretto (al posto del vecchio testo, che per errore indicava il Garante Privacy come titolare del sito). Consiglio comunque una verifica con un consulente privacy prima della pubblicazione definitiva.
- **Foto**: ho usato la tua foto già presente nell'archivio del vecchio sito, ritagliata e trattata per adattarla al nuovo stile. Se hai scatti più recenti o in alta risoluzione, si possono sostituire facilmente in `assets/img/roberta.jpg`.

## Struttura

- `index.html` e le altre pagine .html sono i contenuti del sito.
- `assets/css/style.css` — tutto lo stile grafico.
- `assets/js/main.js` — effetto macchina da scrivere in home, animazioni, menu mobile, moduli.
- `assets/img/` — foto, logo e favicon.
