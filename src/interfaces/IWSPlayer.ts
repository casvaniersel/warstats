export default interface IWSPlayer {
    gamerTag: string;
    platform: string;
}

export enum Platform {
    battle = "battle",
    xbl = "xbl",
    psn = "psn",
    steam = "steam",
    acti = "acti",
    uno = "uno",
}
