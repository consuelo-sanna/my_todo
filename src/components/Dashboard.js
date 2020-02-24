import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from './section/Widget';
import Attivita from './section/Attivita';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { statistics_get } from '../redux/ActionCreators';

import { getCards, getLastTodos } from '../redux/selectors/index';

import { connect } from 'react-redux';

import { store } from '../redux/store';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 80,
    },
    paper: {
        height: 140,
        width: 100,
        //padding: theme.spacing(2),
        textAlign: 'center',
    },
    attivita: {
        //padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    control: {
        //padding: theme.spacing(2),
    },
});

class Dashboard extends Component {
    componentDidMount() {
        store.dispatch(statistics_get());
    }

    render() {
        const { classes } = this.props;
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
                        {this.props.cards.map(elemento => (
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
                        <Attivita lista={this.props.lastTodos} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cards: getCards(state),
    lastTodos: getLastTodos(state),
});

export default connect(mapStateToProps, { statistics_get })(
    withStyles(styles)(Dashboard)
);
