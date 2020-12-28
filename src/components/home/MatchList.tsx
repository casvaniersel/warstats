import * as React from "react";
import IWSScore from "../../interfaces/IWSTeamScore";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import amber from "@material-ui/core/colors/amber";
import IWSMatch from "./Match";
import grey from "@material-ui/core/colors/grey";
import brown from "@material-ui/core/colors/brown";
import { blueGrey } from "@material-ui/core/colors";
import IWSMatchScore from "../../interfaces/IWSMatchScore";

interface IWSMatchProps {
    scores: IWSScore;
}

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: "0 -16px 16px",
        overflowX: "visible",
        padding: "10px"
    },
    rankCardBgFirst: {
        backgroundColor: amber[400],
    },
    rankCardBgSecond: {
        backgroundColor: grey[400],
    },
    rankCardBgThird: {
        backgroundColor: brown[400],
    },
    rankCardBg: {
        backgroundColor: blueGrey[700]
    },
    scrollRow: {
        alignItems: "stretch",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowX: "auto",
        overflowY: "hidden",
        scrollSnapType: "x mandatory",
        scrollPadding: "50%"
    }
}));

export default function Match({ scores }: IWSMatchProps) {
    const classes = useStyles();

    const getRankClass = () => {
        switch(scores.rank) {
            case 1: return classes.rankCardBgFirst;
            case 2: return classes.rankCardBgSecond;
            case 3: return classes.rankCardBgThird;
            default: return classes.rankCardBg; 
        }
    }

    const sortMatches = (a: IWSMatchScore, b: IWSMatchScore) => {
        return b.points - a.points;
    }

    return (
        <Box component="div" className={`${classes.root} ${getRankClass()}`}>
            <div className={classes.scrollRow}>
            {
                scores.matches.sort(sortMatches).map((match, i) => <IWSMatch match={match} key={i}/>)
            }
            </div>
        </Box>
    );
}