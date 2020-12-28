import IWSPlayer from "./IWSPlayer";
import IWSTeamScore from "./IWSTeamScore";
export default interface IWSTeam {
    id: string;
    name: string;
    players: Array<IWSPlayer>;
    score: IWSTeamScore;
}