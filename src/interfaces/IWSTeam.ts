import Player from "./IWSPlayer";
import Score from "./IWSScore";
export default interface IWSTeam {
    name: string;
    players: Array<Player>;
    scores: Score;
}