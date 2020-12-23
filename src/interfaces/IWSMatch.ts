import IWSPlayer from "./IWSPlayer";
export default interface IWSMatch {
    id: string;
    player: IWSPlayer;
    kills: number;
    placement: number;
}