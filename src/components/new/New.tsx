import AppBar from "@material-ui/core/AppBar";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { ArrowBack } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import * as React from "react";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
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
                padding: "10px",
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
            menuButton: {
                color: "white",
            },
        }),
    );
    const classes = useStyles();

    const history = useHistory();
    const handleOnSave = useCallback(() => {
        history.push("/new");
        window.location.href = "/";
    }, [history]);

    return <New classes={classes} handleOnSave={handleOnSave} />;
}

interface INewProps {
    classes: any;
    handleOnSave: any;
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
        console.log("Save to API");
        console.log(this.state);
        this.props.handleOnSave();
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="sticky" color="secondary">
                    <Toolbar>
                        <Link to="/">
                            <IconButton
                                edge="start"
                                className={this.props.classes.menuButton}
                                aria-label="menu">
                                <ArrowBack />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <div className={this.props.classes.form}>
                    <WSClashForm onChange={this.handleFormChange} />
                </div>
                <div className={this.props.classes.savePanel}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={this.props.classes.saveIcon}
                        onClick={this.handleSave}>
                        <SaveIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}
