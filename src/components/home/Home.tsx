import * as React from "react";
import ApiService from "../../services/ApiService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IWSTournament from "../../interfaces/IWSTournament";
import IWSTeam from "../../interfaces/IWSTeam";
import IWScore from "../../interfaces/IWSTeamScore";
import IWSRules from "../../interfaces/IWSRules";
import IWSPlayer, { Platform } from "../../interfaces/IWSPlayer";
import Grid from "@material-ui/core/Grid/Grid";
import Team from "./Team";
import blueGrey from "@material-ui/core/colors/blueGrey";
const testdata = require("./TESTDATA.json");

export default function WSHome() {
    /**
     * Component Styling
     */
    const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            backgroundColor: blueGrey[900],
            color: "white"
        },
        tournament: {
            padding: "20px"
        },
        homeContainer: {
            padding: "20px"
        },
        teamContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }
    }));
    const classes = useStyles();
    return <Home classes={classes} />;
}

interface IHomeProps {
    classes: any;
}

/**
 * State object with mock data
 */
class State {
    tournament?: IWSTournament;
}

class Home extends React.PureComponent<IHomeProps, State> {

    public state = new State();

    constructor(props) {
        super(props);

        this.sortTeamsByRank = this.sortTeamsByRank.bind(this);
    }

    public async componentDidMount() {
        /* TESTDATA */
        //this.sortTeamsByRank(testdata);
        
        const tournaments = await this.getTournaments();
        // Only use latest tournament
        this.sortTeamsByRank(tournaments[tournaments.length-1]);
        
    }
    
    /**
     * Get and parse tournaments
     */
    private async getTournaments() {
        const data = await ApiService.getTournaments();
        const tournaments: Array<IWSTournament> = await data.json();
        return tournaments;
    }

    /**
     * Sort teams in this tournament by rank
     * @param tournament Last created tournament
     */
    private sortTeamsByRank(tournament: IWSTournament) {
        console.log(tournament);
        tournament.teams.sort((a,b) => a.score.rank - b.score.rank);
        this.setState({ tournament });
    }

    render() {
        return (
            <Grid container id="home" className={this.props.classes.root} justify="center" direction="column">
                <Grid item xs={12} className={this.props.classes.homeContainer}>

                </Grid>
                {
                    this.state.tournament && this.state.tournament.teams.map((team, i) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} key={i}>
                                <Team team={team} key={`team${i}`}/>
                            </Grid>);
                    })
                }
            </Grid>
        );
    }
}
