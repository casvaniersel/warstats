import Box from "@material-ui/core/Box";
import { blueGrey } from "@material-ui/core/colors";
import amber from "@material-ui/core/colors/amber";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import * as React from "react";
import IWSMatchScore from "../../interfaces/IWSMatchScore";
import IWSRules from "../../interfaces/IWSRules";
import IWSScore from "../../interfaces/IWSTeamScore";
import IWSMatch from "./Match";

interface IWSMatchProps {
    scores: IWSScore;
    rules: IWSRules;
}

/**
 * Component Styling
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "0 -16px 16px",
            overflowX: "visible",
            padding: "10px",
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
            backgroundColor: blueGrey[700],
        },
        scrollRow: {
            alignItems: "stretch",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollPadding: "50%",
        },
        noMatches: {
            color: "white",
            textAlign: "center",
        },
        noMatchesIcon: {
            fontSize: "4rem",
            textAlign: "center",
        },
        notMatchesText: {
            fontSize: "1.4rem",
            textAlign: "center",
        },
    }),
);

export default function Match({ scores, rules }: IWSMatchProps) {
    const classes = useStyles();

    const getRankClass = () => {
        if (scores) {
            switch (scores.rank) {
                case 1:
                    return classes.rankCardBgFirst;
                case 2:
                    return classes.rankCardBgSecond;
                case 3:
                    return classes.rankCardBgThird;
                default:
                    return classes.rankCardBg;
            }
        }
        return classes.rankCardBg;
    };

    const sortMatches = (a: IWSMatchScore, b: IWSMatchScore) => {
        return b.points - a.points;
    };

    return (
        <Box component="div" className={`${classes.root} ${getRankClass()}`}>
            {scores ? (
                <div className={classes.scrollRow}>
                    {scores.matches.sort(sortMatches).map((match, i) => (
                        <IWSMatch match={match} rules={rules} key={i} />
                    ))}
                </div>
            ) : (
                <div className={classes.noMatches}>
                    <div>
                        <EmojiFoodBeverageIcon
                            className={classes.noMatchesIcon}
                        />
                    </div>
                    <div className={classes.notMatchesText}>
                        Waiting for hot results
                    </div>
                </div>
            )}
        </Box>
    );
}
