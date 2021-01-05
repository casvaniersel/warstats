import * as React from "react";
import ApiService from "../../services/ApiService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import WSClashForm from "./ClashForm";
import IWSRules from "../../interfaces/IWSRules";

export default function WSNew() {
    /**
     * Component Styling
     */
    const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            backgroundColor: blueGrey[900],
            display: "flex",
            flexDirection: "column"
        },
        form: {
            color: "white",
            flex: "1 0 auto",
            padding: "20px",
            textAlign: "center",
        },
        savePanel: {
            backgroundColor: blueGrey[900],
            bottom: 0,
            flexShrink: 0,
            position: "sticky",
            textAlign: "center",
            opacity: 0.98,
            width: "100%",
            zIndex: 100
        },
        saveIcon: {
            position: "relative",
            top: "-26px"
        }
    }));
    const classes = useStyles();
    return <New classes={classes} />;
}

interface INewProps {
    classes: any;
}

class New extends React.PureComponent<INewProps, {}> {

    // Define default rules for tournament
    private defaultRules: IWSRules = {
        description: 'Top 3 games, 1 ppk and placement 10,8,6,4,2,1,1,1,1,1',
        type: 2,
        pointsPerKill: 1,
        pointsPerPlacement: {
            '1': 10,
            '2': 8,
            '3': 6,
            '4': 4,
            '5': 2,
            '6': 1,
            '7': 1,
            '8': 1,
            '9': 1,
            '10': 1
        },
        numberOfBestGames: 3
    };

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.form}>
                    <h1>Prepare to CLASH</h1>
                    <WSClashForm />
                </div>
                <div className={this.props.classes.savePanel}>
                    <Link to="/">
                        <Fab color="primary" aria-label="add" className={this.props.classes.saveIcon}>
                            <SaveIcon />
                        </Fab>
                    </Link>
                </div>
            </div>
        );
    }
}