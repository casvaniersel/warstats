import IWSMatch from "./IWSMatch";
export default interface IWSScore {
    points: number;
    matches: Array<IWSMatch>;
    rank: number;
}