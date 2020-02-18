import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

//qui trasformala in Dashboard, e poi dashboard richiama i vari widget
function Widget(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{props.titolo}</Title>
            <Typography component="p" variant="h4">
                {props.risultato}
            </Typography>
        </React.Fragment>
    );
}

export default Widget;
