import * as React from "react";
import IWSMatchScore from "../../interfaces/IWSMatchScore";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import { blueGrey } from "@material-ui/core/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faSkull } from "@fortawesome/free-solid-svg-icons";


interface IWSMatchProps {
    match: IWSMatchScore;
}

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "inline-block",
        maxWidth: "90%",
        padding: ".75rem",
        border: "0",
        flexBasis: "90%",
        flexGrow: 0,
        flexShrink: 0,
        scrollSnapAlign: "center"
    },
    matchCard: {
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    },
    points: {
        color: blueGrey[900],
        fontSize: "1.4rem",
        padding: "10px",
        textAlign: "center",
        textDecoration: "underline"
    },
    kills: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "10px",
    },
    player: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "50%"
    },
    placement: {
        fontSize: "1.2rem",
        padding: "10px",
        textAlign: "center",
    },
    placementNumber: {
        padding: "0 10px"
    }
}));

export default function Match({ match }: IWSMatchProps) {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Card className={classes.matchCard}>
                <Box component="div" className={classes.points}>
                    {match.points} {match.points > 1 ? "points" : "point"}
                </Box>
                <Box component="div" className={classes.kills}>
                    {
                        match.playerScores.map((playerScore, i) => {
                            return(
                                <div className={classes.player} key={i}>
                                    <div>{playerScore.player.gamerTag}</div>
                                    <div><span className={classes.placementNumber}>{playerScore.kills}</span><FontAwesomeIcon icon={faSkull} /></div>
                                </div>   
                            )
                        })
                    }
                </Box>
                <Box component="div" className={classes.placement}>
                    <span className={classes.placementNumber}>{match.placement}</span><FontAwesomeIcon icon={faAward} />
                </Box>
            </Card>
        </section>
    );
}