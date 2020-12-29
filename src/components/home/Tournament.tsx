import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IWSTournament from "../../interfaces/IWSTournament";
import Grid from "@material-ui/core/Grid";
import Team from "./Team";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { RuleType } from "../../interfaces/IWSRules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faAward, faSkull, faBomb } from "@fortawesome/free-solid-svg-icons";

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        border: "1px solid white",
        borderRadius: "4px",
        backgroundColor: blueGrey[800],
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        width: "95%",
    },
    homeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        padding: "20px"
    },
    tournamentName: {
        flexGrow: 1,
        fontSize: "2rem",
        color: "white",
        padding: "10px"
    },
    tournamentType: {
        alignItems: "center",
        border: "1px white solid",
        borderRadius: " 4px",
        backgroundColor: blueGrey[700],
        color: "white",
        display: "flex",
        flexDirection: "row",
        padding: "10px 4px",
        width: "48px",
        height: "48px"
    },
    typeIcon: {
        fontSize: "1rem",
        margin: "2px"
    },
    timeSpan:{
        color: "white",
        fontSize: "1.2rem",
        textAlign: "center"
    }
}));

interface IWSTournamentProps {
    tournament: IWSTournament;
}

export default function WSTournament({ tournament }: IWSTournamentProps) {
    const classes = useStyles();

    const formatDate = (dateString: string) => {
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const returnDate = new Date(dateString);
        let minutes = returnDate.getMinutes().toString();
        if(minutes.length === 1) { minutes = `0${minutes}`; }
        return `${returnDate.getDate()} ${months[returnDate.getMonth()]} ${returnDate.getFullYear()} ${returnDate.getHours()}:${minutes}`;
    }

    const getRuleTypeIcon = (): Array<IconDefinition> => {
        switch(tournament.rules.type) {
            case RuleType.Kills: return [faSkull];
            case RuleType.KillsAndPlacement: return [faSkull, faAward];
            case RuleType.Placement: return [faAward];
            case RuleType.Bracket: return [faBomb]; 
        }
    }

    return (
        <Grid container className={classes.root} justify="center" direction="column">
            {
                tournament ?
                    <React.Fragment>
                        <Grid item xs={12} className={classes.homeContainer}>
                            {
                                tournament.name ?
                                    <div className={classes.tournamentName}>{tournament.name}</div>
                                    :
                                    <div>Tournament</div>
                            }
                            <div className={classes.tournamentType}>
                                {
                                    getRuleTypeIcon().map((icon, i) => <FontAwesomeIcon icon={icon} key={i} className={classes.typeIcon}/>)
                                }
                            </div>
                        </Grid>
                        {/* TODO: iets leuks maken van de time */}
                        <div className={classes.timeSpan}>{formatDate(tournament.start)} - {formatDate(tournament.end)}</div>
                        {
                            tournament.teams.map((team, i) => {
                                return (
                                    <Grid item xs={12} sm={12} md={6} key={i}>
                                        <Team team={team} key={`team${i}`} />
                                    </Grid>);
                            })
                        }
                    </React.Fragment>
                    :
                    null
            }
        </Grid>
    )
}