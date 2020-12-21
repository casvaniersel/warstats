
export default class ApiService {
    static apiUrl = "http://127.0.0.1:7071/api";

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
}