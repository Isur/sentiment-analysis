import { makeStyles, Button, Link, Container, CssBaseline, TextField, Avatar, Typography, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { push } from "connected-react-router";
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "../../../Services";
import { RegisterActionPayload, RegisterState } from "./Register.interface";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initState: RegisterState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state: RegisterState = initState, { field, value }: RegisterActionPayload) => ({
  ...state,
  [field]: value,
});

const RegisterContainer = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const dispatcher = useDispatch();
  const classes = useStyles();

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // TODO:  validate input data.
    event.preventDefault();
    const resp = await AuthService.register(state);
  };

  const handleLogin = () => {
    dispatcher(push("/login"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined"
                         onChange={handleChange}
                         required
                         fullWidth
                         id="username"
                         label="Username"
                         name="username"
                         autoComplete="username" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined"
                         required
                         onChange={handleChange}
                         fullWidth
                         id="email"
                         label="Email Address"
                         name="email"
                         autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined"
                         required
                         fullWidth
                         onChange={handleChange}
                         name="password"
                         label="Password"
                         type="password"
                         id="password"
                         autoComplete="current-password" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined"
                         required
                         onChange={handleChange}
                         fullWidth
                         name="confirmPassword"
                         label="confirmPassword"
                         type="password"
                         id="confirmPassword"
                         autoComplete="confirmPassword" />
            </Grid>
            {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
          </Grid>
          <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" onClick={handleLogin} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterContainer;
