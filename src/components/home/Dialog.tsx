import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from "react";
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