import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Platform } from "../../interfaces/IWSPlayer";
import { faXbox, faPlaystation, faSteam, faBattleNet } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) => createStyles({
    platformValue: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 5px"
    },
    platformName: {
        marginLeft: "10px"
    }
}));

export default function InputPlatform({ memberId, onChange }) {
    const classes = useStyles();
    const [platform, setPlatform] = React.useState(Platform.xbl.toString());
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlatform(event.target.value);
        onChange(event.target.value, memberId);
    }
    const platforms = [
        { value: Platform.acti, icon: faGamepad},
        { value: Platform.battle, icon: faBattleNet},
        { value: Platform.psn, icon: faPlaystation},
        { value: Platform.steam, icon: faSteam},
        { value: Platform.uno, icon: faGamepad},
        { value: Platform.xbl, icon: faXbox}
    ];
    
    return (
<TextField
                id={`standard-select-numberofteams-${memberId}`}
                select
                label="Platform"
                value={platform}
                onChange={handleChange}
                color="secondary"
            >
                {platforms.map((platform) => (
                    <MenuItem key={platform.value} value={platform.value}>
                        <div className={classes.platformValue}>
                            <FontAwesomeIcon icon={platform.icon} />
                            <div className={classes.platformName}>{platform.value}</div>
                        </div>
                    </MenuItem>
                ))}
            </TextField>
    );
}