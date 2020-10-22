import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import 'semantic-ui-css/semantic.min.css'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import {Close, Facebook, FingerprintTwoTone, Visibility, VisibilityOff} from "@material-ui/icons";
import {AuthService} from "./AuthService";
import {Divider, Icon} from "semantic-ui-react";
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        buttonSpacing: {
            padding: theme.spacing(2)
        },
        marginSpacing: {
            margin: theme.spacing(2, 0, 0)
        },
        loginCardSpacing: {
            margin: theme.spacing(5)
        },
        forgotYourPassword: {
            paddingRight: 10
        },
        loginHeader: {
            textAlign: 'center',
            margin: theme.spacing(0, 0, 2)
        },
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 1),
        },
    }),
);

interface State {
    email: string;
    password: string;
    showPassword: boolean;
    stayLogged: boolean;
    openSnackBar: boolean;
    incorrectEmail: boolean;
    incorrectPassword: boolean;
    emailErrorMessage: string;
    passwordErrorMessage: string;
    snackBarErrorMessage: string;

}

export default function LoginCard() {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        showPassword: false,
        stayLogged: false,
        openSnackBar: false,
        incorrectEmail: false,
        incorrectPassword: false,
        emailErrorMessage: '',
        passwordErrorMessage: '',
        snackBarErrorMessage: ''
    });
    const showHidePassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }
    const stayConnected = () => {
        setValues({...values, stayLogged: !values.stayLogged})
    }
    const handleCloseSnackBar = () => {
        setValues({...values, openSnackBar: !values.openSnackBar})
    }
    const verifyEmail = (email: React.ChangeEvent<HTMLInputElement>) => {
        let emailVerificationRegex = '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$';
        if ((!new RegExp(emailVerificationRegex).test(email.target.value)) && email.target.value.length !== 0) {
            setValues({
                ...values,
                incorrectEmail: true,
                emailErrorMessage: 'The email you entered is invalid'
            })
        } else {
            setValues({
                ...values,
                incorrectEmail: false,
                emailErrorMessage: '',
                email: email.target.value
            })


        }
    }
    const verifyPassword = (password: React.ChangeEvent<HTMLInputElement>) => {
        if ((password.target.value.length < 5 || password.target.value.length > 24 || !password) && !(password.target.value === '')) {
            setValues({
                ...values,
                incorrectPassword: true,
                passwordErrorMessage: 'The password you entered is invalid',
            })
        } else {
            setValues({
                ...values,
                incorrectPassword: false,
                passwordErrorMessage: '',
                password: password.target.value
            })

        }
    }
    const history = useHistory();
    function navigateTo(path: string){
        history.push(path)
    }
    function loginToApp(): any {
        if ((values.incorrectPassword || values.incorrectEmail) || values.email.length === 0 || values.password.length === 0) {
            setValues({
                ...values, snackBarErrorMessage: 'There\'s something wrong with your credentials',
                openSnackBar: !values.openSnackBar
            })
        } else {
            new AuthService().emailLogin(values.email, values.password, values.stayLogged).then(value => {
                console.log(value);
                navigateTo("/app")
                }
            ).catch(
                reason => {
                    setValues({
                        ...values,
                        snackBarErrorMessage: reason.message,
                        openSnackBar: !values.openSnackBar
                    });
                }
            );
        }
    }

    const snackBar = <Snackbar anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}
                               open={values.openSnackBar}
                               autoHideDuration={6000}
                               onClose={handleCloseSnackBar}
                               message={values.snackBarErrorMessage}
                               action={<React.Fragment>
                                   <IconButton size="small" aria-label="close" color="inherit"
                                               onClick={handleCloseSnackBar}>
                                       <Close fontSize="small"/>
                                   </IconButton>
                               </React.Fragment>}/>;
    const googleLogin = () => {
        new AuthService().googleLogin().then(value => {
            navigateTo("/app")
        }).catch(reason => {
            setValues({
                ...values,
                snackBarErrorMessage: reason.message,
                openSnackBar: !values.openSnackBar
            });
        })
    }
    return (
        <div id="container" className={classes.loginCardSpacing}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid>
                    <Card className={classes.root}>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Grid>
                                    <Container component="main" maxWidth="xs">
                                        <CssBaseline/>
                                        <div className={classes.paper}>
                                            <Avatar className={classes.avatar}>
                                                <FingerprintTwoTone/>
                                            </Avatar>
                                            <Typography component="h6" variant="h6" className={classes.loginHeader}>
                                                Sign in with your account
                                            </Typography>
                                            <form noValidate>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    size="small"
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    autoComplete="email"
                                                    autoFocus
                                                    error={values.incorrectEmail}
                                                    onChange={verifyEmail}
                                                    helperText={values.emailErrorMessage}/>
                                                <TextField
                                                    size="small"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    onChange={verifyPassword}
                                                    error={values.incorrectPassword}
                                                    helperText={values.passwordErrorMessage}
                                                    id="password"
                                                    autoComplete="current-password"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={showHidePassword}
                                                                >
                                                                    {values.showPassword ? <Visibility/> :
                                                                        <VisibilityOff/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <Grid
                                                    className={classes.marginSpacing}
                                                    container
                                                    direction="row"
                                                    justify="space-around"
                                                    alignItems="center"

                                                >
                                                    <Grid item xs>
                                                        <FormControlLabel
                                                            control={<Switch size="small" checked={values.stayLogged}
                                                                             onChange={stayConnected}
                                                                             name="stayLoggedSwitch"/>}
                                                            label="Stay Logged"
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Link href="#" variant="body2">
                                                            Forgot your password?
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.submit}
                                                    onClick={loginToApp}
                                                >
                                                    Sign In
                                                </Button>
                                                <Divider horizontal>Or</Divider>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<Facebook/>}
                                                    onClick={googleLogin}
                                                >
                                                    Login with Google
                                                </Button>
                                            </form>
                                        </div>
                                    </Container>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {snackBar}
        </div>
    );
}
