# Prerequisites
1. Installeer VSCode met Azure Functions Extension en Live Server (https://docs.microsoft.com/en-us/azure/static-web-apps/local-development)
2. `git clone` de `dev` branch van deze repository
3. Start een terminal en voer `npm i` uit in de `/api` folder

### Activision API
We maken gebruik van een wrapper om de officiele Activision API (die niet gedocumenteerd is). https://lierrmm.github.io/capi-docs/#/?id=usage 

### Activision Login 
Om te testen moet je je eigen account gegevens in een `local.settings.json` file opnemen. Deze staat al in de .gitignore dus wordt niet gepushed.

1. Maak een nieuwe `local.settings.json` file aan in de root van de `api` folder
2. Neem onderstaand voorbeeld over en vul je eigen gegevens in

```
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ActivisionUserName": "mijnemail@domein.com",
    "ActivisionPassword": "mijnwachtwoord"
  }
}
```

# Development
Neem de volgende zaken in acht
- Maak een `Feature/Branch` aan voor grotere features
- Gebruik engelse imperatieve commit messages ("Add file, Update API, Delete file, etc.") 

### Front End
De front end code zit in de `./src` folder. Voer een `npm install` uit voor je aan de slag gaat. Vervolgens kun je de HTML serveren met `npm run start`. Via de browser ga je naar http://localhost:9000. 

# Deployment
De structuur van deze solution is gebaseerd op Azure Static Web Apps (Preview). Als je `dev` pusht naar origin en vervolgens daar een Pull Request aanmaakt naar `master` en die goedkeurt, zorgen de Github Actions ervoor dat de site automatische wordt gedeployed naar Azure op url: https://orange-sky-048fbc203.azurestaticapps.net.

## Pull Request
Zodra je een Pull Request open zet, gaat het build proces ook af en wordt er een staging omgeving aangemaakt. Daar kun je je code testen en vergelijken met productie. Als je daarna je PR goedkeurt, wordt je code gedeployed naar bovenstaande URL.