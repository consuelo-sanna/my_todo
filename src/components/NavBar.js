import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUser, getNotifica } from '../redux/selectors/index';

import { user_logout } from '../redux/ActionCreators';

import { mySocket } from '../redux/shared/mySocket';

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

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const user = props.user;
    const [notification, setNotification] = useState(0);
    const [userNotification, setUserNotification] = useState();
    //Listen for data on the "outgoing todo" namespace and create a callback that can take the data sent from the server

    mySocket.on('newTodo', todo => {
        console.log('......notifica ' + todo);
        setNotification(notification + 1);
        setUserNotification(`nuovo todo da ${todo}`);
    });

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

    const handleClick = newState => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setUserNotification('');
        setNotification(0);
        setState({ ...state, open: false });
    };

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
                    <IconButton
                        color="inherit"
                        onClick={handleClick({
                            vertical: 'top',
                            horizontal: 'right',
                        })}
                    >
                        <Badge
                            badgeContent={notification}
                            color="secondary"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        key={`${vertical},${horizontal}`}
                        open={open}
                        onClose={handleClose}
                        message={userNotification}
                    />
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
    notifica: getNotifica(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
