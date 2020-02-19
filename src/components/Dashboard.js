import React from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from './section/Widget';
import Attivita from './section/Attivita';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 80,
    },
    paper: {
        height: 140,
        width: 100,
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    attivita: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function Dashboard() {
    const classes = useStyles();

    const stato = [
        {
            titolo: 'Tot User',
            risultato: 2,
        },
        {
            titolo: 'Avg Todo/User',
            risultato: 3,
        },
        {
            titolo: 'Avg Hour Logged in',
            risultato: 4,
        },
        {
            titolo: 'Tot Todo',
            risultato: 15,
        },
        {
            titolo: 'Avg Todo/Day',
            risultato: 4,
        },
        {
            titolo: 'Avg Todo Del/Day',
            risultato: 3,
        },
    ];

    return (
        <div>
            <Grid
                container
                justify="space-evenly"
                alignItems="center"
                className={classes.root}
                alignContent="space-around"
                display="flex"
                spacing={4}
            >
                <Grid item container justify="center" spacing={2}>
                    {stato.map(elemento => (
                        <Grid
                            key={elemento.titolo}
                            item
                            xs={12}
                            sm={6}
                            md={3}
                        >
                            <Paper className={classes.paper}>
                                <Widget
                                    titolo={elemento.titolo}
                                    risultato={elemento.risultato}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Attivita />
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
