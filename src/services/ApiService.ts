
export default class ApiService {
    static apiUrl = "https://warstatsapi20201222173257.azurewebsites.net/api";

    /**
     * Get playerdata from API
     * @param playerGameTag Players gamertag
     */
    public static async getPlayerDataFor(playerGameTag: string) {
        const endpointUrl = `${this.apiUrl}/playerdata?name=${playerGameTag}`;
        let result = await fetch(endpointUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return result;
    }

    /**
     * Get match data for player from API
     * @param playerGameTag Players gamertag
     */
    public static async getMatchDataFor(playerGameTag: string) {
        const endpointUrl = `${this.apiUrl}/matchdataofplayer?name=${playerGameTag}`;
        let result = await fetch(endpointUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return result;
    }

    /**
     * Get all active tournaments
     */
    public static async getTournaments() {
        const endpointUrl = `${this.apiUrl}/tournament/all`;
        let result = await fetch(endpointUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result;
    }
}