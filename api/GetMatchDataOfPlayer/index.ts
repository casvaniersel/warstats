import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Welcome, Match } from "../interfaces/IMWWzMatchDetails";
import API = require("call-of-duty-api");

enum Platform {
    xbl = "xbl",
    psn = "psn",
    steam = "steam",
    battle = "battle",
    acti = "acti",
    uno = "uno"
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Init API
    const _api = API({ platform: Platform.battle });

    // Getting credentials from KeyVault
    const activisionUserName = process.env["ActivisionUserName"];
    const activisionPassword = process.env["ActivisionPassword"];

    context.log('HTTP trigger function processed a request.');
    
    // Get vars
    const name = (req.query.name || (req.body && req.body.name));
    const platform: Platform = (req.query.platform || (req.body && req.body.platform) || Platform.xbl);
    const from = (req.query.from || (req.body && req.body.from));
    const to = (req.query.to || (req.body && req.body.to));

    try {
        //Auth
        //TODO: 
        // 1. create login
        await _api.login(activisionUserName, activisionPassword);

        // Get Data
        let data: Welcome = await _api.MWcombatwz(name, platform);

        // Get KD
        let from: number = new Date("2020-12-17T20:00:00+0100").getMilliseconds();
        let to: number = new Date("2020-12-17T23:00:00+0100").getMilliseconds();
        let matchesbetweentimespan: Match[] = data.matches.filter(x => x.utcStartSeconds > from && x.utcEndSeconds < to)

        // Output
        const responseMessage = matchesbetweentimespan.forEach(
            match => 
            "<h1>MatchId: " + match.matchID + "</h1><br>"
            + "Player: " + match.player.username + "<br>"
            + "Kills: " + match.playerStats.kills + "<br>"
            + "Placement: " + match.playerStats.teamPlacement+ "<br><br>")

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } catch (Error) {
        context.log("Login failed.");
        const responseMessage = "Failed to get data: " + Error;
        context.res = {
            body: responseMessage
        };
    }

};

export default httpTrigger;