import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faAward, faBomb, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import blueGrey from "@material-ui/core/colors/blueGrey";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from "react";
import { useState } from "react";
import { RuleType } from "../../interfaces/IWSRules";
import IWSTournament from "../../interfaces/IWSTournament";
import WSDialog from "./Dialog";
import Team from "./Team";


/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        borderRadius: "4px",
        backgroundColor: blueGrey[800],
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        width: "95%",
    },
    tournamentInfoCard: {
        color: blueGrey[900],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    homeContainer: {
        padding: "20px"
    },
    descriptionContainer: {
        color: "white",
        fontSize: "1.2rem",
        padding: "10px"
    },
    tournamentName: {
        flexGrow: 1,
        fontSize: "2rem",
        padding: "10px",
        textAlign: "center"
    },
    tournamentType: {
        alignItems: "center",
        border: "1px white solid",
        borderTopColor: blueGrey[800],
        borderRadius: "0 0 4px 4px",
        backgroundColor: blueGrey[800],
        color: "white",
        display: "flex",
        flexDirection: "row",
        padding: "10px 4px",
        position: "relative",
        top: "-1px",
        width: "48px",
        height: "48px"
    },
    typeIcon: {
        fontSize: "1rem",
        margin: "2px"
    },
    calendar: {
        display: "flex",
        flexDirection: "column",
        width: "64px",
        height: "64px"
    },
    calendarHeader: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontSize: "0.8rem",
        textAlign: "center"
    },
    calendarDate: {
        border: `1px solid ${blueGrey[700]}`, 
        color: blueGrey[700],
        textAlign: "center",
        height: "42px",
        padding: "4px"
    },
    timeSpan:{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        fontSize: "1.2rem",
        padding: "0 0 10px 0",
    },
    timeFrame: {
        flexGrow: 1,
        textAlign: "center"
    }
}));

interface IWSTournamentProps {
    tournament: IWSTournament;
}

interface IWSCalendarDay {
    year?: number;
    month: string;
    day: number;
}

interface TournamentType {
    icon: IconDefinition;
    ruleType: RuleType;
}

export default function WSTournament({ tournament }: IWSTournamentProps) {

    const contentKills = "";
    const contentKillsPlacement = "";

    const classes = useStyles();
    let [dialogStateOpen, setDialogStateOpen] = useState(false); 

    const formatDate = (dateString: string): IWSCalendarDay => {
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const returnDate = new Date(dateString);
        
        return { month: months[returnDate.getMonth()], day: returnDate.getDate()};
    }

    const formatTime = (dateString: string) => {
        const returnTime = new Date(dateString);
        let minutes = returnTime.getMinutes().toString();
        if(minutes.length === 1) { minutes = `0${minutes}`}; 
        return `${returnTime.getHours()}:${minutes}`;
    }

    const getRuleTypeIcon = (): Array<TournamentType> => {
        switch(tournament.rules.type) {
            case RuleType.Kills: return [{icon: faSkull, ruleType: RuleType.Kills}];
            case RuleType.KillsAndPlacement: return [{icon: faSkull, ruleType: RuleType.Kills}, {icon: faAward, ruleType: RuleType.Placement}];
            case RuleType.Placement: return [{icon: faAward, ruleType: RuleType.Placement}];
            case RuleType.Bracket: return [{icon: faBomb, ruleType: RuleType.Bracket}]; 
        }
    }

    const handleDialogClose = () => {
        setDialogStateOpen(false);
    }

    const openTournamentTypeDialog = () => {
        setDialogStateOpen(true);
    }

    return (
        <Grid container className={classes.root} justify="center" direction="column">
            {
                tournament ?
                    <React.Fragment>
                        <Grid item xs={12} className={classes.homeContainer}>
                            <Card className={classes.tournamentInfoCard}>
                            <div className={classes.tournamentType} onClick={openTournamentTypeDialog}>
                                {
                                    getRuleTypeIcon().map((tournamentType, i) => <FontAwesomeIcon icon={tournamentType.icon} key={i} className={classes.typeIcon}/>)
                                }
                            </div>
                            {
                                tournament.name ?
                                    <div className={classes.tournamentName}>{tournament.name}</div>
                                    :
                                    <div>Tournament</div>
                            }
                            <CardContent>
                                <div className={classes.timeSpan}>
                                    <div className={classes.calendar}>
                                        <div className={classes.calendarHeader}>{formatDate(tournament.start).month}</div>
                                        <div className={classes.calendarDate}>{formatDate(tournament.start).day}</div>
                                    </div>
                                    <div className={classes.timeFrame}>{`${formatTime(tournament.start)} - ${formatTime(tournament.end)}`}</div>
                                </div>
                                <div>{tournament.rules.description}</div>
                            </CardContent>
                            </Card>
                        </Grid>
                        {
                            tournament.teams.map((team, i) => {
                                return (
                                    <Grid item xs={12} sm={12} md={6} key={i}>
                                        <Team team={team} rules={tournament.rules} key={`team${i}`} />
                                    </Grid>);
                            })
                        }
                        
                    </React.Fragment>
                    :
                    null
            }
            {tournament && <WSDialog title="Tournament Type" icons={getRuleTypeIcon()} open={dialogStateOpen} content="Content" handleClose={handleDialogClose} />}
        </Grid>
    )
}

