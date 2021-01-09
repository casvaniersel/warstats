import DateFnsUtils from "@date-io/date-fns";
import blueGrey from "@material-ui/core/colors/blueGrey";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as React from "react";
import IWSRules from "../../interfaces/IWSRules";
import IWSTeam from "../../interfaces/IWSTeam";
import IWSTournament from "../../interfaces/IWSTournament";
import TeamForm from "./TeamForm";

/**
 * Component Styling
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "white",
            borderRadius: "4px",
            border: `1px solid ${blueGrey[900]}`,
            padding: "20px",
        },
        heading: {
            color: blueGrey[900],
        },
        field: {
            margin: "10px",
        },
    }),
);

export default function WSClashForm({ onChange }) {
    const classes = useStyles();
    return <ClashForm classes={classes} onChange={onChange} />;
}

class ClashFormState implements IWSTournament {
    id: string = "";
    name: string = "";
    start: string = new Date().toString();
    end: string = new Date().toString();
    rules: IWSRules = null;
    teams: Array<IWSTeam> = [];
    // Added members for handling form
    numberOfTeams: number = 2;
    startDate: Date = new Date();
    endDate: Date = new Date();
}

class ClashForm extends React.PureComponent<
    { classes; onChange },
    ClashFormState
> {
    public state = new ClashFormState();

    private possibleAmountOfTeams = [1, 2, 3, 4];

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNoTeamsChange = this.handleNoTeamsChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
    }

    private handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    private handleNoTeamsChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ numberOfTeams: parseInt(event.target.value) });
    }

    private handleStartDateChange(date: Date | null) {
        this.setState({
            start: date.toISOString(),
            end: date.toISOString(),
            startDate: date,
            endDate: date,
        });
    }

    private handleEndDateChange(date: Date | null) {
        this.setState({ end: date.toISOString(), endDate: date });
    }

    private handleTeamChange(teams: Array<IWSTeam>) {
        this.setState({ teams: teams });
    }

    componentDidUpdate() {
        this.props.onChange({
            id: this.state.id,
            name: this.state.name,
            start: this.state.start,
            end: this.state.end,
            teams: this.state.teams,
        });
    }

    render() {
        return (
            <form className={this.props.classes.root}>
                <h2 className={this.props.classes.heading}>
                    Tournament settings
                </h2>
                <TextField
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    id="ClashName"
                    label="Name"
                    variant="outlined"
                    required
                    className={this.props.classes.field}
                    color="secondary"
                />
                <TextField
                    id="GameName"
                    label="Game"
                    defaultValue="Warzone"
                    variant="outlined"
                    disabled
                    className={this.props.classes.field}
                    color="secondary"
                />
                <TextField
                    id="Rules"
                    label="Rules"
                    defaultValue="Default"
                    variant="outlined"
                    disabled
                    className={this.props.classes.field}
                    color="secondary"
                />
                <TextField
                    id="standard-select-numberofteams"
                    select
                    label="Number of Teams"
                    value={this.state.numberOfTeams}
                    onChange={this.handleNoTeamsChange}
                    helperText="How many teams are clashing?"
                    color="secondary">
                    {this.possibleAmountOfTeams.map((amount) => (
                        <MenuItem key={amount} value={amount}>
                            {amount}
                        </MenuItem>
                    ))}
                </TextField>
                <hr />
                <h2 className={this.props.classes.heading}>Team settings</h2>
                <TeamForm
                    amountOfTeams={this.state.numberOfTeams}
                    teamSize={2}
                    onChange={this.handleTeamChange}
                />
                <hr />
                <h2 className={this.props.classes.heading}>Event settings</h2>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Clash date"
                            format="dd-MM-yyyy"
                            value={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            color="secondary"
                        />
                    </div>
                    <div>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Clash start"
                            value={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                        />
                    </div>
                    <div>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Clash ends"
                            value={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                        />
                    </div>
                </MuiPickersUtilsProvider>
            </form>
        );
    }
}
