import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButton(props) {
    const classes = useStyles();

    const onChangeHandler = e => {
        props.upload(e.target.files[0]);
    };

    return (
        <div className={classes.root}>
            <input
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onChangeHandler}
            />
            <label htmlFor="icon-button-file">
                <IconButton
                    color="primary"
                    aria-label="upload file"
                    component="span"
                >
                    <BackupIcon />
                </IconButton>
            </label>
        </div>
    );
}
