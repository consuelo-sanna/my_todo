/**
 * Crea un unico componente per login e registrazione.
 *
 */

import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import {
    user_login_attempt,
    user_registration_attempt,
} from '../redux/ActionCreators';

import { getErrors } from '../redux/selectors/index';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        flexGrow: 1,
    },
    registration: {
        flexGrow: 1,
        width: '90%',
        margin: theme.spacing(0, 0, 0),
    },
}));

function Authentication(props) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState('');

    const registrationBlock = (
        <Grid container spacing={2} className={classes.registration}>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    value={name}
                    onInput={e => setName(e.target.value)}
                    label="First Name"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    value={lastname}
                    onInput={e => setLastName(e.target.value)}
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                />
            </Grid>
        </Grid>
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (!isRegistration) props.user_login(email, password);
        else props.user_register(name, lastname, email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {isRegistration ? 'Registrazione' : 'Sign in'}
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                            {isRegistration
                                ? registrationBlock
                                : null}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    value={email}
                                    onInput={e =>
                                        setEmail(e.target.value)
                                    }
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onInput={e =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isRegistration
                                ? 'Registrazione'
                                : 'Log in'}
                        </Button>

                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <div className={classes.root}>
                                {props.errors ? (
                                    <div>
                                        {props.errors.map(err => (
                                            <Grid item>{err}</Grid>
                                        ))}

                                        <Grid item>
                                            <Button
                                                onClick={() => {
                                                    //pulisci i vecchi errori, una nuova dispatch
                                                    setIsRegistration(
                                                        !isRegistration
                                                    );
                                                }}
                                                size="small"
                                            >
                                                {isRegistration
                                                    ? 'Sei gia registrato? Fai il Log in'
                                                    : 'Non hai un account? Registrati'}
                                            </Button>
                                        </Grid>
                                    </div>
                                ) : null}
                            </div>
                        </Grid>
                    </form>
                </div>
            </Card>
        </Container>
    );
}

const mapStateToProps = state => ({
    errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
    user_login: (email, password) =>
        dispatch(user_login_attempt(email, password)),
    user_register: (name, lastname, email, password) =>
        dispatch(
            user_registration_attempt(name, lastname, email, password)
        ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authentication);
