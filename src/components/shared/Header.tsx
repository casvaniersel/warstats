import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Timeline from '@material-ui/icons/Timeline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as React from "react";

export default function WSHeader() {
    /**
     * Component Styling
     */
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );

    const classes = useStyles();
    return <Header classes={classes} />;
}

interface IHeaderProps {
    classes: any;
}

class Header extends React.PureComponent<IHeaderProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (

                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
                            <Timeline />
                        </IconButton>
                        <Typography variant="h6" className={this.props.classes.title}>
                            Warstats
                    </Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            /* onClick={} */
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

        );
    }
}

