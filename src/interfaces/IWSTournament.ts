import IWSRules from "./IWSRules";
import IWSTeam from "./IWSTeam";

export default interface IWSTournament {
    id: string;
    name: string;
    start: string;
    end: string;
    teams: Array<IWSTeam>;
    rules?: IWSRules;
}
