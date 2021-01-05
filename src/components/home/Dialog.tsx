import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import blueGrey from "@material-ui/core/colors/blueGrey";
import Box from "@material-ui/core/Box";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faAward, faSkull, faBomb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RuleType } from "../../interfaces/IWSRules";

/**
* Component Styling
*/
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        color: blueGrey[900],
    },
    dialogTitleBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    dialogTitle: {
        flexGrow: 1
    },
    closeButton: {
        color: theme.palette.grey[500],
        textAlign: "right"
    },
    ruleTypeRow: {
        alignItems: "center",
        backgroundColor: blueGrey[800],
        border: `1px solid ${blueGrey[900]}`,
        borderRadius: "4px",
        color: "white",
        display: "flex",
        flexDirection: "row",
        fontSize: "1.1rem",
        padding: "5px",
        margin: "5px 0",
        textAlign: "center"
    },
    ruleIcon: {
        display: "block",
        height: "36px",
        padding: "5px",
        width: "36px"
    },
    ruleType: {
        flexGrow: 1,
        padding: "5px"
    }
}));

interface IWSDialog {
    content: string;
    handleClose: any;
    icons: Array<any>;
    open: boolean;
    title: string;
}

export default function WSDialog({ content, handleClose, icons, open, title }: IWSDialog) {
    const classes = useStyles();

    const getTypeText = (ruleType: RuleType) => {
        switch(ruleType) {
            case RuleType.Bracket: 
                return `Tournament is based on knockout system`;
            case RuleType.Kills:
                return `You get points for the kills you make in games`;
            case RuleType.Placement:
                return `You get points for your placement in games`;
            default: 
                return "";
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <MuiDialogTitle>
                {title}
            </MuiDialogTitle>
            <MuiDialogContent>
                <div>
                    {
                        icons.map((tournamentType, i) => {
                            return(
                                <div key={i} className={classes.ruleTypeRow}>
                                    <span className={classes.ruleIcon}><FontAwesomeIcon icon={tournamentType.icon} /></span>
                                    <span className={classes.ruleType}>{getTypeText(tournamentType.ruleType)}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}