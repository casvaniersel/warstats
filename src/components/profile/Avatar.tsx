import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import cazler from "../../assets/CasAvatar640.png";
import blueGrey from "@material-ui/core/colors/blueGrey";
import amber from "@material-ui/core/colors/amber";


export default function WSAvatar({gamerTag}) {
    /**
     * Component Styling
     */
    const profileStyles = makeStyles((theme: Theme) => createStyles({
        avatar: {
            backgroundColor: amber[300],
            border: `2px solid ${blueGrey[600]}`,
            height: "150px",
            width: "150px"
        },
        profileSection: {
            alignItems: "center",
            backgroundColor: blueGrey[500],
            borderRadius: "5px",
            border: `1px solid ${amber[300]}`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "10px 20px"
        },
        gamerTag: {
            fontSize: "4em",
            color: amber[300],
            padding: "0 20px"
        }
    }));
    const classes = profileStyles();
    return <ProfileAvatar classes={classes} gamerTag={gamerTag} profilePicture={cazler} />;
}

interface IAvatarProps {
    classes: any;
    gamerTag: string;
    profilePicture: string;
}

class ProfileAvatar extends React.PureComponent<IAvatarProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={this.props.classes.profileSection}>
                <Avatar src={this.props.profilePicture} className={this.props.classes.avatar} />
                <span className={this.props.classes.gamerTag}>{this.props.gamerTag}</span>
            </div>
        );
    }
}