import amber from "@material-ui/core/colors/amber";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    createMuiTheme,
    createStyles,
    makeStyles,
    Theme,
    ThemeOptions,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import WSHome from "./home/Home";
import WSNew from "./new/New";
import Header from "./shared/Header";

const theme: ThemeOptions = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: amber[300],
        },
        secondary: {
            // This is green.A700 as hex.
            main: blueGrey[900],
        },
    },
});

export default function AppWrap() {
    const appStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                backgroundColor: blueGrey[900],
            },
        }),
    );
    const classes = appStyles();
    return <App classes={classes} />;
}

class App extends React.PureComponent<{ classes }, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className={this.props.classes.root}>
                        <Header />
                        <Route exact path="/" component={() => <WSHome />} />
                        <Route path="/new" component={() => <WSNew />} />
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        );
    }
}
