import * as React from "react";
import ApiService from "../../services/ApiService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IWSTournament from "../../interfaces/IWSTournament";
import IWSTeam from "../../interfaces/IWSTeam";
import IWScore from "../../interfaces/IWSScore";
import IWSRules from "../../interfaces/IWSRules";
import IWSPlayer from "../../interfaces/IWSPlayer";
import Grid from "@material-ui/core/Grid/Grid";
import Team from "./Team";
import blueGrey from "@material-ui/core/colors/blueGrey";

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
        let data = {
            id: null,
            name: 'Test Tournooi Nu',
            start: '2020-12-22T17:47:26.1516875+00:00',
            end: '2020-12-22T19:47:26.1586745+00:00',
            teams: [
                {
                    name: "Braaiers",
                    players: [
                        {
                            gamerTag: 'JKROOTS',
                            platform: 'xbl'
                        },
                        {
                            gamerTag: 'C4zler',
                            platform: 'xbl'
                        }
                    ],
                    scores: {
                        points: 1,
                        matches: [
                            {
                                id: null,
                                player: {
                                    gamerTag: 'C4zler',
                                    platform: 'xbl'
                                },
                                kills: 1,
                                placement: 11
                            }
                        ],
                        rank: 2
                    }
                },
                {
                    name: "Broeders",
                    players: [
                        {
                            gamerTag: 'Kuubsnl',
                            platform: 'xbl'
                        },
                        {
                            gamerTag: 'Bertonenl',
                            platform: 'xbl'
                        }
                    ],
                    scores: {
                        points: 14,
                        matches: [
                            {
                                id: null,
                                player: {
                                    gamerTag: 'Bertonenl',
                                    platform: 'xbl'
                                },
                                kills: 4,
                                placement: 1
                            }
                        ],
                        rank: 1
                    }
                }
            ]
        } 
        
        
        /* const tournaments = await this.getTournaments();
        // Only use latest tournament
        this.sortTeamsByRank(tournaments[tournaments.length-1]); */
        this.sortTeamsByRank(data);
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
        tournament.teams.sort((a,b) => a.scores.rank - b.scores.rank);
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
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Team team={team} key={`team${i}`}/>
                            </Grid>);
                    })
                }
            </Grid>
        );
    }
}
