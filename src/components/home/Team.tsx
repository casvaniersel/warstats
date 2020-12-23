import * as React from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import amber from "@material-ui/core/colors/amber";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IWSTeam from "../../interfaces/IWSTeam";
import Grid from "@material-ui/core/Grid/Grid";
import { Box } from "@material-ui/core";
import EmojiEvents from "@material-ui/icons/EmojiEvents"
import grey from "@material-ui/core/colors/grey";
import brown from "@material-ui/core/colors/brown";

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: "20px auto",
        maxWidth: 345,
    },
    cardActions: {
        
    },
    ranking: {
        display: "flex",
        flexDirection: "row",
        height: "100px",
        justifyContent: "center",
        padding: "20px"
    },
    rankIconFirst: {
        color: amber[400],
        fontSize: "5rem"
    },
    rankIconSecond: {
        color: grey[300],
        fontSize: "4rem"
    },
    rankIconThird: {
        color: brown[400],
        fontSize: "2.8rem"
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "10px 20px"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: amber[300],
        border: `2px solid ${blueGrey[600]}`,
        display: "inline-block",
        margin: "5px",
        height: "32px",
        width: "32px"
    },
    playerAvatar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 20px"
    }
}));

interface ITeamProps {
    team: IWSTeam;
}

export default function WSTeam({ team }: ITeamProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getRankClass = () => {
        switch(team.scores.rank) {
            case 1: return classes.rankIconFirst;
            case 2: return classes.rankIconSecond;
            case 3: return classes.rankIconThird;
            default: return null; 
        }
    }

    return (
        <Card className={classes.root}>
            <Box component="div" className={classes.ranking}>
                <EmojiEvents color="primary" className={getRankClass()}/>
            </Box>
            <Box component="div" className={classes.cardHeader}>    
                {
                    team.players.map((player, i) => {
                        return (
                            <div className={classes.playerAvatar} key={i}>
                                <AccountCircle fontSize="large"/>
                                <Typography variant="body2" color="textSecondary" component="div">{player.gamerTag}</Typography>
                            </div>
                        )
                    })
                }
            </Box> 
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <h1>{team.name}</h1>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <div>Points: {team.scores.points}</div>
                        <div>Matches Played: {team.scores.matches.length}</div>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}