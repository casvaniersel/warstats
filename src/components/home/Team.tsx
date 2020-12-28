import * as React from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import IWSTeam from "../../interfaces/IWSTeam";
import MatchList from "./MatchList";
import { Box } from "@material-ui/core";
import EmojiEvents from "@material-ui/icons/EmojiEvents"
import grey from "@material-ui/core/colors/grey";
import brown from "@material-ui/core/colors/brown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faXbox, faPlaystation, faSteam, faBattleNet } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import IWSPlayer, { Platform } from "../../interfaces/IWSPlayer";

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
        color: grey[400],
        fontSize: "4rem"
    },
    rankIconThird: {
        color: brown[400],
        fontSize: "2.8rem"
    },
    rankHeaderTop: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    rankHeader: {
        fontSize: "2.2rem",
        color: blueGrey[900]
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "10px"
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
    playerAvatar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 20px"
    },
    platformIndicatorRow: {
        padding: "5px"
    }
}));

interface ITeamProps {
    team: IWSTeam;
}

export default function WSTeam({ team }: ITeamProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getRankClass = () => {
        switch (team.score.rank) {
            case 1: return classes.rankIconFirst;
            case 2: return classes.rankIconSecond;
            case 3: return classes.rankIconThird;
            default: return null;
        }
    }

    const getPlatformIcon = (player: IWSPlayer): IconDefinition => {
        switch (player.platform) {
            case Platform.xbl: return faXbox;
            case Platform.psn: return faPlaystation;
            case Platform.steam: return faSteam;
            case Platform.battle: return faBattleNet;
            case Platform.acti:
            case Platform.uno:
            default: return faGamepad;
        }
    }

    return (
        <Card className={classes.root}>
            <Box component="div" className={classes.ranking}>
                {
                    team.score.rank > 3 ?
                        <div className={classes.rankHeader}>{team.score.rank}</div>
                        :
                        <div className={classes.rankHeaderTop}>

                                <EmojiEvents color="primary" className={getRankClass()} />
                                <span className={getRankClass()}>{team.score.rank}</span>

                        </div>

                }
            </Box>
            <Box component="div" className={classes.cardHeader}>
                {
                    team.players.map((player, i) => {
                        return (
                            <div className={classes.playerAvatar} key={i}>
                                <AccountCircle fontSize="large" />
                                <Typography variant="body2" color="textSecondary" component="div">{player.gamerTag}</Typography>
                                <div className={classes.platformIndicatorRow}><FontAwesomeIcon icon={getPlatformIcon(player)} /></div>
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
                        <MatchList scores={team.score} />
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}