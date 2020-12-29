import * as React from "react";
import IWSMatchScore from "../../interfaces/IWSMatchScore";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import { blueGrey } from "@material-ui/core/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faSkull } from "@fortawesome/free-solid-svg-icons";
import IWSRules from "../../interfaces/IWSRules";

interface IWSMatchProps {
    match: IWSMatchScore;
    rules: IWSRules;
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
        borderRadius: "4px",
        color: blueGrey[900],
        display: "flex",
        flexDirection: "row",
        fontSize: "1.4rem",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center"
    },
    pointsCircle: {
        backgroundColor: blueGrey[800],
        border: `1px solid ${blueGrey[800]}`,
        borderRadius: "50%",
        color: "white",
        padding: "8px",
        width: "48px",
        height: "48px",
        textAlign: "center",
        marginRight: "10px"
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
        padding: "10px 0 0 0",
        textAlign: "center",
    },
    placementNumber: {
        padding: "0 10px 0 0"
    },
    placementPoints: {
        fontSize: "0.8rem",
        textAlign: "center",
    }
}));

export default function Match({ match, rules }: IWSMatchProps) {
    const classes = useStyles();

    /**
     * Return amount of points based on placement and rules 
     * @param placement Placement of played match
     */
    const getPointsByPlacement = (placement) => {
        if(rules) {
            return rules.pointsPerPlacement[`${placement}`] || 0;
        }
    }

    const points = getPointsByPlacement(match.placement);

    return (
        <section className={classes.root}>
            <Card className={classes.matchCard}>
                <Box component="div" className={classes.points}>
                    <span className={classes.pointsCircle}>{match.points}</span> {match.points > 1 ? "points" : "point"}
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
                <Box component="div" className={classes.placementPoints}>
                    {points} {points === 1 ? "point" : "points"}
                </Box>
            </Card>
        </section>
    );
}