import {
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import { history } from "../../helper/history";
import { useGoogleLogout } from "react-google-login";
import { ExitToApp } from "@material-ui/icons";

interface ProfileCardProps {
  name: string;
  gmail?: string;
  img: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      padding: "2%",
      width: "60%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "40%",
    },
    logout: {
      display: "flex",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

function ProfileCard({ name, gmail, img }: ProfileCardProps) {
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cover} image={img} title={name} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {name}
            <br />
            <Typography variant="caption" color="textSecondary">
              {gmail}
            </Typography>
          </Typography>
        </CardContent>
        <Grid container justify="flex-end" className={classes.logout}>
          <Button
            onClick={signOut}
            style={{padding: '3%'}}
          >
            <Grid
              container
              direction="row"
              spacing={1}
              justify="center"
              alignItems="center"
            >
              <ExitToApp />
              <Typography variant="body1">
                ลงชื่อออก
              </Typography>
            </Grid>
          </Button>
        </Grid>
      </div>
    </Card>
  );
}

export default ProfileCard;
