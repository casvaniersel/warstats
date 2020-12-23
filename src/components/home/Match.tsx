import * as React from "react";
import IWSMatch from "../../interfaces/IWSMatch";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList";

interface IWSMatchProps {
    match: IWSMatch;
}

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({

}));

export default function Match({ match }: IWSMatchProps) {
    const classes = useStyles();

    return (
        <GridList cellHeight={160} cols={2}>
            {/* TODO: MATCHDATA */}
        </GridList>
    );
}