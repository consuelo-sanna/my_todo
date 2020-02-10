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
import { user_login_attempt } from '../redux/ActionCreators';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: theme.palette.secondary.main,
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
    },
}));

function Login(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.user_login(email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            value={email}
                            onInput={e => setEmail(e.target.value)}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onInput={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
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
                                            <Link
                                                href="/reg"
                                                variant="body2"
                                            >
                                                {
                                                    'Non hai un account? Registrati'
                                                }
                                            </Link>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
