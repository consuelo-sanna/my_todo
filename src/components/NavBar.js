import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors/index';

import { user_logout } from '../redux/ActionCreators';

import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ClippedDrawer from './section/ClippedDrawer';
import MySnackbar from './section/MySnackbar';

const drawerWidth = 240;
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
    hide: {
        display: 'none',
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const NavBar = props => {
    const classes = useStyles();
    const [isDrawerOpen, setisDrawerOpen] = useState(false);
    const handleDrawerClose = () => {
        console.log('premuto per chiudere');
        setisDrawerOpen(false);
    };
    const handleDrawerOpen = () => {
        console.log('premuto per aprire');
        setisDrawerOpen(true);
    };

    const user = props.user;

    const isAdmin = user && user.role === 'admin' ? true : false;
    const drawer = isAdmin ? (
        <ClippedDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerClose={handleDrawerClose}
        />
    ) : null;

    const dashboardIcon = isAdmin ? (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
                [classes.hide]: isDrawerOpen,
            })}
        >
            <MenuIcon />
        </IconButton>
    ) : null;

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
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isDrawerOpen,
                })}
            >
                <Toolbar>
                    {dashboardIcon}
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                    >
                        To Do App
                    </Typography>
                    <MySnackbar />
                    {user && Object.entries(user).length !== 0
                        ? authLinks
                        : guestLinks}
                </Toolbar>
            </AppBar>
            {drawer}
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
