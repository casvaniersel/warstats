import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Welcome } from "../interfaces/IMWBattleRoyaleInformation";
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
    const _api = API({ platform: "battle" });

    // Getting credentials from KeyVault
    const activisionUserName = process.env["ActivisionUserName"];
    const activisionPassword = process.env["ActivisionPassword"];

    context.log('HTTP trigger function processed a request.');
    
    // Get vars
    const name = (req.query.name || (req.body && req.body.name));
    const platform: Platform = (req.query.platform || (req.body && req.body.platform) || Platform.xbl);

    try {
        //Auth
        //TODO: 
        // 1. create login
        await _api.login(activisionUserName, activisionPassword);

        // Get Data
        let data: Welcome = await _api.MWBattleData(name, platform);

        // Get KD
        let kd = data.br_all.kdRatio;

        // Output
        const responseMessage = name
            ? "Hello, " + name + ". Your K/D ratio is " + kd
            : "Pass username as Query to see your K/D ratio";

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