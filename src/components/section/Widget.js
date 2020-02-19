import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

//qui trasformala in Dashboard, e poi dashboard richiama i vari widget
function Widget(props) {
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
