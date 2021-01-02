import { push } from "connected-react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { login as Login } from "../../../../Common/Redux/Auth";
import { AppState } from "../../../../Common/Redux/store";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginContainer = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state: AppState) => state.auth.userid);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    if(userid) {
      dispatch(push("/"));
    }
  }, [userid]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(Login(login, password));
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    dispatch(push("/register"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField variant="outlined"
                     onChange={handleChangeLogin}
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus />
          <TextField variant="outlined"
                     onChange={handleChangePassword}
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password" />
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                            label="Remember me" /> */}
          <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link onClick={handleRegister} variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginContainer;
