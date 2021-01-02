import React, { useState } from "react";
import { Button, Container, TextField, makeStyles, CssBaseline, Snackbar, Paper } from "@material-ui/core";
import { SentimentService } from "../../Services";

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  result: {
    padding: "8px",
    "&.positive": {
      background: "green",
      color: "silver",
    },
    "&.negative": {
      background: "red",
      color: "white",
    },
  },
}));
const Sentiment = () => {
  const [text, setText] = useState<string>("");
  const [snack, setSnack] = useState<"positive" | "neutral" | "negative">(null);
  const classes = useStyles();
  const getSentiment = async (e: React.FormEvent) => {
    e.preventDefault();
    const d = await SentimentService.getSentiment({ text });
    const sentiment = d.sentiment.result;
    if(sentiment === 1) setSnack("positive");
    else if(sentiment === 0) setSnack("neutral");
    else if(sentiment === -1) setSnack("negative");
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={getSentiment}>
          <TextField id="sentiment-text"
                     label="Sentiment-text"
                     fullWidth
                     required
                     variant="standard"
                     onChange={event => setText(event.target.value)}
                     color="primary" />
          <Button type="submit" disabled={!text} className={classes.submit} variant="outlined"> Submit </Button>
        </form>
      </div>
      <Snackbar anchorOrigin={{ horizontal: "center", vertical: "top" }} open={!!snack} autoHideDuration={10000} onClose={event => setSnack(null)}>
        <Paper className={`${classes.result} ${snack}`} elevation={3}>
          Result: {snack}
        </Paper>
      </Snackbar>
    </Container>
  );
};

export default Sentiment;
