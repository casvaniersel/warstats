import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { IMWBattleRoyaleInformation } from "../interfaces/IMWBattleRoyaleInformation";
import API = require("call-of-duty-api");
import Platform from "../Platform";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Init API
    const _api = API();

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
        let data: IMWBattleRoyaleInformation = await _api.MWBattleData(name, platform);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data
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