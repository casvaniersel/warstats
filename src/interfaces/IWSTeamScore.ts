import IWSMatchScore from "./IWSMatchScore";
export default interface IWSTeamScore {
    matches: Array<IWSMatchScore>;
    points: number;
    rank: number;
    totalKills: number;
}
