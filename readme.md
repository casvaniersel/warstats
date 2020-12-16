# Prerequisites
1. Installeer VSCode met Azure Functions Extension en Live Server (https://docs.microsoft.com/en-us/azure/static-web-apps/local-development)
2. `git clone` de `dev` branch van deze repository
3. Start een terminal en voer `npm i` uit in de `/api` folder

### Activision API
We maken gebruik van een wrapper om de officiele Activision API (die niet gedocumenteerd is). https://lierrmm.github.io/capi-docs/#/?id=usage 

### Activision Login 
Om te testen moet je je eigen account gegevens in een .env file opnemen. 

1. Maak een nieuwe `.env` file aan in de root van de `api` folder
2. Neem onderstaand voorbeeld over en vul je eigen gegevens in

```
USERNAME=pietjepuk@email.com
PASSWORD=mypassword
```

# Deployment
De structuur van deze solution is gebaseerd op Azure Static Web Apps (Preview). Als je `dev` pusht naar origin en vervolgens daar een Pull Request aanmaakt naar `master` en die goedkeurt, zorgen de Github Actions ervoor dat de site automatische wordt gedeployed naar Azure op url: https://orange-sky-048fbc203.azurestaticapps.net

## Known issues
### API issue
Vanuit de Static Web App lukt het niet om de API aan te spreken. Krijg een 500 melding. Moet nog uitzoeken hoe we dat het beste kunnen loggen en debuggen.