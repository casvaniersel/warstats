import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import blueGrey from "@material-ui/core/colors/blueGrey";
import MenuItem from "@material-ui/core/MenuItem";

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "white",
        borderRadius: "4px",
        border: `1px solid ${blueGrey[900]}`,
        padding: "20px"
    },
    field: {
        margin: "10px 0"
    }
}));

export default function WSClashForm({ }) {
    const classes = useStyles();
    const [numberOfTeams, setNumberOfTeams] = React.useState(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfTeams(parseInt(event.target.value));
    }
    const possibleAmountOfTeams = [1, 2, 3, 4];

    return (
        <form className={classes.root}>
            <TextField id="ClashName" label="Name" variant="outlined" required className={classes.field} color="secondary" />
            <TextField id="GameName" label="Game" defaultValue="Warzone" variant="outlined" disabled className={classes.field} color="secondary" />
            <TextField id="Rules" label="Rules" defaultValue="Default" variant="outlined" disabled className={classes.field} color="secondary" />
            <TextField
                id="standard-select-numberofteams"
                select
                label="Number of Teams"
                value={numberOfTeams}
                onChange={handleChange}
                helperText="How many teams are clashing?"
                color="secondary"
            >
                {possibleAmountOfTeams.map((amount) => (
                    <MenuItem key={amount} value={amount}>
                        {amount}
                    </MenuItem>
                ))}
            </TextField>
            <hr />

        </form>
    );
}