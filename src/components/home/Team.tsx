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
import { faGamepad, faSkull } from "@fortawesome/free-solid-svg-icons";
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
    cardContent: {
        paddingBottom: "0",
        paddingTop: "0",
    },
    ranking: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px"
    },
    rankIconFirst: {
        color: amber[400],
        fontSize: "3.4rem"
    },
    rankIconSecond: {
        color: grey[400],
        fontSize: "2.6rem"
    },
    rankIconThird: {
        color: brown[400],
        fontSize: "2rem"
    },
    rankHeaderTop: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    rankHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "1.8rem",
    },
    rankHeaderCircle: {
        backgroundColor: blueGrey[700],
        color: "white",
        borderRadius: "50%",
        fontSize: "1.2rem",
        padding: "10px",
        width: "48px",
        height: "48px",
        textAlign: "center"
    },
    rankHeaderPoints: {
        fontWeight: "bold"
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
    },
    killRow: {
        padding: "5px"
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
                <div className={classes.rankHeader}>
                    {
                        team.score.rank > 3 ?
                            <div className={classes.rankHeaderCircle}>{team.score.rank}</div>
                            :
                            <div className={classes.rankHeaderTop}>
                                <EmojiEvents color="primary" className={getRankClass()} />
                                <span className={getRankClass()}>{team.score.rank}</span>
                            </div>
                    }
                </div>
                <div className={classes.rankHeaderPoints}>
                    {team.score.points} {team.score.points > 1 ? "points" : "point"}
                </div>
                <div className={classes.rankHeaderPoints}>
                    {team.score.totalKills} <FontAwesomeIcon icon={faSkull} />
                </div>
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
                <CardContent className={classes.cardContent}>
                    <MatchList scores={team.score} />
                </CardContent>
            </Collapse>
        </Card>
    );
}