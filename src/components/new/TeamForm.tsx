import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import blueGrey from "@material-ui/core/colors/blueGrey";
import MenuItem from "@material-ui/core/MenuItem";
import InputPlatform from "../../components/shared/InputPlatform";
import IWSPlayer, { Platform } from "../../interfaces/IWSPlayer";
import IWSTeam from "../../interfaces/IWSTeam";
import IWSTeamScore from "../../interfaces/IWSTeamScore";

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "white",
        borderRadius: "4px",
        border: `1px solid ${blueGrey[900]}`,
        padding: "20px"
    },
    field: {
        margin: "10px"
    },
    gamerTagPlatform: {
        display: "flex",
        flexDirection: "row",
        justifyItems: "center"
    }
}));

interface IWSTeamsFormProps {
    amountOfTeams: number;
    onChange: any;
    teamSize: number;
}

export default function WSTeamsForm({ amountOfTeams, onChange, teamSize }: IWSTeamsFormProps) {
    const classes = useStyles();
    const [teams, setTeams] = React.useState(() => {
        const teamArray = new Array<IWSTeam>();
        for (let i = 0; i < amountOfTeams; i++) {
            teamArray.push({
                id: "",
                name: "",
                players: [],
                score: null
            });
        }
        return teamArray;
    });
    const handleTeamChange = (teamId, team) => {
        teams[teamId] = team;
        onChange(teams);
    }
    const fields = [];

    for (let i = 0; i < amountOfTeams; i++) {
        fields.push(<TeamForm classes={classes} teamSize={teamSize} teamId={i} key={i} onChange={(team) => handleTeamChange(i, team)} />);
    }

    return (
        <React.Fragment>
            {fields}
        </React.Fragment>
    );
}

class TeamFormState implements IWSTeam {
    id: string = "";
    name: string = "";
    players: Array<IWSPlayer> = [];
    score: IWSTeamScore = null;
}


class TeamForm extends React.PureComponent<{ classes, onChange, teamId, teamSize }, TeamFormState> {

    private tags = [];

    public state = new TeamFormState();

    constructor(props) {
        super(props);

        this.gamerTagChanged = this.gamerTagChanged.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.platformChanged = this.platformChanged.bind(this);
    }

    private handleNameChange (event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    private gamerTagChanged (tag: string, memberId: number) {
        let tempPlayers = [...this.state.players];
        if(tempPlayers[memberId]) {
            tempPlayers[memberId].gamerTag = tag;
        } else {
            tempPlayers.push({ gamerTag: tag, platform: Platform.xbl });
        }
        this.setState({ players: tempPlayers });
    }

    private platformChanged(platform: Platform, memberId: number) {
        let tempPlayers = [...this.state.players];
        if(tempPlayers[memberId]) {
            tempPlayers[memberId].platform = platform;
        } else {
            tempPlayers.push({ gamerTag: "", platform });
        }
        this.setState({ players: tempPlayers });
    }

    componentDidUpdate() {
        console.log("TEAM UPDATE", this.state);
        this.props.onChange(this.state);
    }

    render() {
        for (let s = 0; s < this.props.teamSize; s++) {
            this.tags.push(
                <div className={this.props.classes.gamerTagPlatform} key={s}>
                    <InputPlatform onChange={this.platformChanged} memberId={s} />
                    <TextField onChange={(event) => this.gamerTagChanged(event.target.value, s)} size="small" id={`GamerTag${s}`} label={`Gamertag`} variant="outlined" required className={this.props.classes.field} color="secondary" />
                </div>
            )
        }
    
        return (
            <div>
                <TextField value={this.state.name} onChange={this.handleNameChange} id={`TeamName${this.props.teamId}`} label={`Team ${this.props.teamId + 1}`} variant="outlined" required className={this.props.classes.field} color="secondary" />
                {this.tags}
            </div>
        );
    }
}
