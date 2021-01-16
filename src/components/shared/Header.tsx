import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BuildIcon from "@material-ui/icons/Build";
import Timeline from "@material-ui/icons/Timeline";
import * as React from "react";
import { Link } from "react-router-dom";

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
            teamBuilderIcon: {
                fontSize: "1.2rem",
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
                    <IconButton
                        edge="start"
                        className={this.props.classes.menuButton}
                        color="inherit"
                        aria-label="menu">
                        <Timeline />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={this.props.classes.title}>
                        Warstats
                    </Typography>
                    <Link to="/teambuilder">
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="secondary">
                            <BuildIcon
                                className={this.props.classes.teamBuilderIcon}
                            />
                        </IconButton>
                    </Link>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        /* onClick={} */
                        color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}
