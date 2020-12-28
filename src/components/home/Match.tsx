import * as React from "react";
import IWSMatch from "../../interfaces/IWSMatchScore";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface IWSMatchProps {
    match: IWSMatch;
}

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "inline-block",
        maxWidth: "80%",
        padding: ".75rem",
        border: "0",
        flexBasis: "80%",
        flexGrow: 0,
        flexShrink: 0,
        scrollSnapAlign: "start"
    },
    matchCard: {
        display: "flex",
        flexDirection: "column"
    },
    placement: {
        fontSize: "1.4rem",
        textAlign: "center"
    },
    kills: {
        display: "flex",
        flexDirection: "row"
    }
}));

export default function Match({ match }: IWSMatchProps) {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Card className={classes.matchCard}>
                <Box component="div" className={classes.placement}>
                    {match.placement}
                </Box>
                <Box component="div" className={classes.kills}>
                    {
                        match.playerScores.map((playerScore, i) => {
                            return(
                                <div></div>   
                            )
                        })
                    }
                </Box>
            </Card>
        </section>
    );
}