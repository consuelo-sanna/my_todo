import React, { Component } from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { connect } from 'react-redux';
import { notify_added_todo } from '../../redux/ActionCreators';
import { getNotifica } from '../../redux/selectors/index';
import { getNoteFromSocket } from '../../redux/shared/mySocket';

class MySnackbar extends Component {
    constructor(props) {
        super(props);
        getNoteFromSocket((err, userEmail) => {
            this.props.notify_added_todo(userEmail);
            this.setState({
                notificaIcon: this.state.notificaIcon + 1,
            });
        });
    }

    state = {
        isSnackbarOpen: false,
        notificaIcon: 0,
    };

    handleClick = () => newState => {
        this.setState({ ...this.state, isSnackbarOpen: true });
    };

    handleClose = () => {
        this.setState({
            ...this.state,
            isSnackbarOpen: false,
            notificaIcon: 0,
        });
    };

    render() {
        return (
            <div>
                <IconButton
                    color="inherit"
                    onClick={this.handleClick({
                        vertical: 'top',
                        horizontal: 'right',
                    })}
                >
                    <Badge
                        badgeContent={this.state.notificaIcon}
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.isSnackbarOpen}
                    onClose={this.handleClose}
                    message={this.props.notifica}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    notify_added_todo: userEmail =>
        dispatch(notify_added_todo(userEmail)),
});

const mapStateToProps = state => ({
    notifica: getNotifica(state),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySnackbar);
