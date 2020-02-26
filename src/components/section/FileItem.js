import React from 'react';

import { Card } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function FileItem(props) {
    return (
        <div>
            {props.file ? (
                <Card variant="outlined">
                    {props.file.name}

                    <label>
                        <IconButton
                            color="primary"
                            aria-label="remove file"
                            component="span"
                            onClick={() => props.removeFile()}
                        >
                            <HighlightOffIcon fontSize="small" />
                        </IconButton>
                    </label>
                </Card>
            ) : null}
        </div>
    );
}
