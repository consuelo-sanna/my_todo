import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors/index';

import { user_logout } from '../redux/ActionCreators';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
        paddingTop: 56,
    },
    stickyNav: {
        position: 'fixed',
        top: 0,
    },
}));

const NavBar = props => {
    const classes = useStyles();
    const user = props.user;

    const guestLinks = (
        <Link href="/auth" variant="body2" color="inherit">
            Login
        </Link>
    );
    const authLinks = (
        <Button
            color="inherit"
            onClick={() => {
                localStorage.clear();
                props.user_logout();
            }}
        >
            Logout
        </Button>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.stickyNav}>
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

const mapDispatchToProps = dispatch => ({
    user_logout: () => dispatch(user_logout()),
});

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
