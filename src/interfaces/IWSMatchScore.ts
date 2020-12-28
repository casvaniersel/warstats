import IWSPlayerScore from "./IWSPlayerScore";
export default interface IWSMatchScore {
    id: string;
    playerScores: Array<IWSPlayerScore>;
    placement: number;
    totalKills: number;
    points: number;
    countsForTotal?: number;
}