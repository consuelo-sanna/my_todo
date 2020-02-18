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

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import clsx from 'clsx';

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    //toolbar: { color: 'primary', paddingTop: 56 },
    toolbar: theme.mixins.toolbar,
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
    menuButton: {
        marginRight: 36,
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

    const [isDrawerOpen, setisDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        console.log('premuto per aprire');
        setisDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        console.log('premuto per chiudere');
        setisDrawerOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isDrawerOpen,
                })}
            >
                <Toolbar>
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
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isDrawerOpen,
                    [classes.drawerClose]: !isDrawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
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
