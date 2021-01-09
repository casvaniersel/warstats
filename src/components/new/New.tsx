import blueGrey from "@material-ui/core/colors/blueGrey";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import * as React from "react";
import IWSRules from "../../interfaces/IWSRules";
import IWSTeam from "../../interfaces/IWSTeam";
import IWSTournament from "../../interfaces/IWSTournament";
import ApiService from "../../services/ApiService";
import WSClashForm from "./ClashForm";

export default function WSNew() {
    /**
     * Component Styling
     */
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                backgroundColor: blueGrey[900],
                display: "flex",
                flexDirection: "column",
            },
            form: {
                color: "white",
                flex: "1 0 auto",
                padding: "20px",
                textAlign: "center",
            },
            savePanel: {
                backgroundColor: blueGrey[900],
                bottom: 0,
                flexShrink: 0,
                position: "sticky",
                textAlign: "center",
                opacity: 0.98,
                width: "100%",
                zIndex: 100,
            },
            saveIcon: {
                position: "relative",
                top: "-26px",
            },
        }),
    );
    const classes = useStyles();
    return <New classes={classes} />;
}

interface INewProps {
    classes: any;
}

class NewState implements IWSTournament {
    id: string = "";
    name: string = "";
    start: string = new Date().toString();
    end: string = new Date().toString();
    rules?: IWSRules = null;
    teams: Array<IWSTeam> = [];
}

class New extends React.PureComponent<INewProps, NewState> {
    // Define default rules for tournament
    private defaultRules: IWSRules = {
        description: "Top 3 games, 1 ppk and placement 10,8,6,4,2,1,1,1,1,1",
        type: 2,
        pointsPerKill: 1,
        pointsPerPlacement: {
            "1": 10,
            "2": 8,
            "3": 6,
            "4": 4,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1,
            "10": 1,
        },
        numberOfBestGames: 3,
    };

    public state = new NewState();

    constructor(props) {
        super(props);

        this.state.rules = this.defaultRules;

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    private handleFormChange(tournament: IWSTournament) {
        tournament.rules = this.defaultRules;
        this.setState({ ...tournament });
    }

    private handleSave() {
        ApiService.newTournament(this.state);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.form}>
                    <h1>Prepare to CLASH</h1>
                    <WSClashForm onChange={this.handleFormChange} />
                </div>
                <div className={this.props.classes.savePanel}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={this.props.classes.saveIcon}
                        onClick={this.handleSave}
                    >
                        <SaveIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}
