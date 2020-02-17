import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
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
        
        <Title>{props.children}</Title>
        <Typography component="p" variant="h4">
        2
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
        data di oggi
        </Typography>
        <div>
        <Link color="primary" href="#" onClick={preventDefault}>
            Vedi utenti
        </Link>
        </div>
        
    </React.Fragment>
    );
}

export default Widget;
