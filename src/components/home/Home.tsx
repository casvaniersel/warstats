import blueGrey from "@material-ui/core/colors/blueGrey";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";
import { Link } from "react-router-dom";
import IWSTournament from "../../interfaces/IWSTournament";
import ApiService from "../../services/ApiService";
import WSTournament from "./Tournament";
const testdata = require("./TESTDATA.json");

export default function WSHome() {
    /**
     * Component Styling
     */
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                overflowY: "visible",
            },
            tournament: {
                padding: "20px",
            },
            addPanel: {
                backgroundColor: blueGrey[900],
                bottom: 0,
                position: "sticky",
                textAlign: "center",
                opacity: 0.98,
                width: "100%",
                zIndex: 100,
            },
            addIcon: {
                position: "relative",
                top: "-26px",
            },
        }),
    );
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
        this.sortTeamsByRank(tournaments[tournaments.length - 1]);
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
        tournament.teams.sort((a, b) =>
            a.score
                ? a.score.rank - b.score.rank
                : a.name < b.name
                ? -1
                : a.name > b.name
                ? 1
                : 0,
        );
        this.setState({ tournament });
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <WSTournament tournament={this.state.tournament} />
                <div className={this.props.classes.addPanel}>
                    <Link to="/new">
                        <Fab
                            color="primary"
                            aria-label="add"
                            className={this.props.classes.addIcon}>
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </div>
        );
    }
}
