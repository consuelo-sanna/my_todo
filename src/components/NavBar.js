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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    //toolbar: { color: 'primary', paddingTop: 56 },
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
            <AppBar position="fixed" className={classes.appBar}>
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
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
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
