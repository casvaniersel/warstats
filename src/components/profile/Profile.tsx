import * as React from "react";
import ApiService from "../../services/ApiService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IMWBattleRoyaleInformation } from "../../interfaces/IMWBattleRoyaleInformation";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Grid from '@material-ui/core/Grid';
import WSAvatar from "./Avatar";
import MWDataBox from "./DataBox";

export default function MyProfile({gamerTag}) {
    /**
     * Component Styling
     */
    const profileStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            backgroundColor: blueGrey[900],
            color: "white"
        },
        profileSection: {
            padding: "10px 20px",
        },
        dataSection: {
            padding: "10px 20px",
        }
    }));
    const classes = profileStyles();
    return <Profile classes={classes} gamerTag={gamerTag} />;
}

export interface IProfileProps {
    classes: any;
    gamerTag: string;
}

class State {
    kdr: string = "0.0";
    played: number = 0;
    wins: number = 0;
}

class Profile extends React.PureComponent<IProfileProps, State> {

    public state = new State();

    constructor(props) {
        super(props);
    }

    private async getPlayerData() {
        const data = await ApiService.getPlayerDataFor(this.props.gamerTag);
        const player: IMWBattleRoyaleInformation = await data.json();
        this.setState({
            kdr: player.br.kdRatio.toFixed(2),
            played: player.br.gamesPlayed,
            wins: player.br.wins
        });
    }

    componentDidMount() {
        this.getPlayerData();
    }

    render() {
        return (
            <Grid container id="myProfile" className={this.props.classes.root}>
                <Grid item xs={12} className={this.props.classes.profileSection}>
                    <WSAvatar gamerTag={this.props.gamerTag} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={this.props.classes.dataSection}>
                    <MWDataBox title="Kill/Death ratio" data={this.state.kdr} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={this.props.classes.dataSection}>
                    <MWDataBox title="Wins" data={this.state.wins} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={this.props.classes.dataSection}>
                    <MWDataBox title="Played" data={this.state.played} />
                </Grid>
            </Grid>
        );
    }
}