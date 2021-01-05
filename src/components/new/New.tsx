import * as React from "react";
import ApiService from "../../services/ApiService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";

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
    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.form}>
                    <h1>Work in Progress</h1>
                    Hit save to go back
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