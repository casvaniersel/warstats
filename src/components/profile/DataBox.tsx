import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";
import amber from "@material-ui/core/colors/amber";

export default function WSDataBox({ data, title }) {
    /**
     * Component Styling
     */
    const profileStyles = makeStyles((theme: Theme) => createStyles({
        dataSection: {
            alignItems: "center",
            backgroundColor: blueGrey[500],
            borderRadius: "5px",
            border: `1px solid ${amber[300]}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px 20px"
        },
        title: {
            fontSize: "1em",
            color: "white"
        },
        data: {
            fontSize: "2em",
            color: "white"
        }
    }));
    const classes = profileStyles();
    return <DataBox classes={classes} data={data} title={title} />;
}

interface IDataBoxProps {
    classes: any;
    data: number;
    title: string;
}

class DataBox extends React.PureComponent<IDataBoxProps, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={this.props.classes.dataSection}>
                <div className={this.props.classes.data}>{this.props.data}</div>
                <div className={this.props.classes.title}>{this.props.title}</div>
            </div>
        );
    }
}