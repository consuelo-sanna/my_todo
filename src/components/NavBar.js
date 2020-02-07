import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors/index';

/**
 * Per il login ecc, riconosco da local storage o ne abuserei?
 */
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
}));

const NavBar = props => {
    const classes = useStyles();
    const user = props.user;

    const guestLinks = <Button color="inherit">Login</Button>;
    const authLinks = (
        <Button
            color="inherit"
            onClick={() => {
                localStorage.clear(); //devi anche cancellare user e isAuthenticated da reducer.. fai un dispatch verso reducer, creati l azione ecc
            }}
        >
            Logout
        </Button>
    );

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                    >
                        To Do App
                    </Typography>

                    {user ? authLinks : guestLinks}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(mapStateToProps)(NavBar);
