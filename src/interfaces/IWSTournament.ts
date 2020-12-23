import IWSTeam from "./IWSTeam";
import IWSRules from "./IWSRules";

export default interface IWSTournament {
    id: string;
    name: string;
    start: string;
    end: string;
    teams: Array<IWSTeam>;
    rules?: IWSRules;
}
