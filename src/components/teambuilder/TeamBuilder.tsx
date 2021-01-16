import { faBahai } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    AppBar,
    Button,
    Card,
    CardContent,
    createStyles,
    Grid,
    IconButton,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import { ArrowBack } from "@material-ui/icons";
import BuildIcon from "@material-ui/icons/Build";
import * as React from "react";
import { Link } from "react-router-dom";

export default function WSTeamBuilder() {
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
            menuButton: {
                color: "white",
            },
            pageTitle: {
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
            },
            builderIcon: {
                color: "white",
                fontSize: "1.6rem",
                margin: "10px",
            },
            builderText: {
                color: "white",
                fontSize: "2.2rem",
            },
            inputContainer: {
                padding: "20px",
            },
            inputCard: {
                color: blueGrey[900],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                textAlign: "center",
            },
            inputField: {
                width: "100%",
            },
            inputButton: {
                margin: "20px",
            },
            teamList: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            },
            team: {
                borderRadius: "4px",
                color: "white",
                backgroundColor: blueGrey[800],
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                padding: "10px",
                textAlign: "center",
                width: "100px",
            },
            teamIcon: {
                fontSize: "2.6rem",
            },
            teamNames: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
            },
        }),
    );
    const classes = useStyles();

    return <TeamBuilder classes={classes} />;
}

interface ITeamMakerProps {
    classes: any;
}

class ITeamMakerState {
    names: Array<string> = [];
    teams: Array<Array<string>> = [];
}

class TeamBuilder extends React.PureComponent<
    ITeamMakerProps,
    ITeamMakerState
> {
    public state = new ITeamMakerState();

    constructor(props) {
        super(props);

        this.createTeams = this.createTeams.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    createTeams(names: string[]) {
        let teams = [];
        let sortedNames = [...names];
        sortedNames.sort((a, b) => {
            return 0.5 - Math.random();
        });

        this.makePairs(sortedNames, teams);
        console.log(teams);
        this.setState({ teams });
    }

    /**
     * Recursive function to create pairs
     * @param sortedNames Names sorted for pairing
     * @param pairs list of paired teams
     */
    makePairs(sortedNames: Array<string>, pairs: Array<Array<string>>) {
        let [player1, player2, ...other] = sortedNames;
        player2 ? pairs.push([player1, player2]) : pairs.push([player1]);
        if (other.length > 0) this.makePairs(other, pairs);
    }

    onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        let namesString = event.target.value;
        let names = namesString.split("\n").sort();
        this.setState({ names });
    }

    render() {
        return (
            <Grid
                container
                className={this.props.classes.root}
                justify="center"
                direction="row">
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
                <Grid
                    item
                    xs={12}
                    className={this.props.classes.inputContainer}>
                    <div className={this.props.classes.pageTitle}>
                        <BuildIcon className={this.props.classes.builderIcon} />{" "}
                        <span className={this.props.classes.builderText}>
                            Team Builder
                        </span>
                    </div>
                    <Card className={this.props.classes.inputCard}>
                        <form>
                            <TextField
                                id="Names"
                                label="Names"
                                onChange={this.onInputChange}
                                color="secondary"
                                variant="outlined"
                                multiline
                                rows={8}
                                className={this.props.classes.inputField}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                    this.createTeams(this.state.names)
                                }
                                className={this.props.classes.inputButton}>
                                Build Teams
                            </Button>
                        </form>
                        <CardContent className={this.props.classes.teamList}>
                            {this.state.teams.map((team, i) => (
                                <div
                                    className={this.props.classes.team}
                                    key={i}>
                                    <FontAwesomeIcon icon={faBahai} />
                                    <div
                                        className={
                                            this.props.classes.teamNames
                                        }>
                                        <div>{team[0]}</div>
                                        <div>{team[1]}</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
