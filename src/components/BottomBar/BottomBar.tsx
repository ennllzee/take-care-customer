import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid, IconButton } from "@material-ui/core";
import {
  Event,
  Help,
  History,
  Person,
} from "@material-ui/icons";
import { history } from "../../helper/history";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    pos: {
      top: "auto",
      bottom: 0,
    },
    bar: {
      height: "7vh",
    },
    here: {
      backgroundColor: "#C785EB",
    },
    posCustomer: {
      backgroundColor: "#7C5D92",
      top: "auto",
      bottom: 0,
    }
  })
);

interface BottomBarProps {
  page: string;
}

function BottomBar({ page }: BottomBarProps) {

  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.posCustomer}
      >
        <Toolbar className={classes.bar}>
          <Grid container direction="row" justify="space-around">
              <IconButton
                color="inherit"
                onClick={() => history.push(`/profile&=${accessToken}`)}
              >
                <Person />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => history.push(`/appointment&=${accessToken}`)}
              >
                <Event />
              </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => history.push(`/history&=${accessToken}`)}
                >
                  <History />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() =>
                    history.push(`/customer&service&=${accessToken}`)
                  }
                >
                  <Help />
                </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default BottomBar;
