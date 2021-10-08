import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Paper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import GoogleLogin from "react-google-login";
import { useQuery } from "@apollo/client";
import Image from "material-ui-image";

import useCustomerApi from "../../hooks/customerhooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#C3A3DB",
      minWidth: "100vw",
      maxWidth: "100vw",
    },
    paper: {
      background: "white",
      width: "80vw",
    },
    login: {
      padding: "5%",
    },
    form: {
      paddingTop: "2%",
      paddingBottom: "2%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    google: {
      padding: "2%",
    },
    name: {
      paddingLeft: "2%",
    },
  })
);

function LoginPage() {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken !== null) {
      history.push(`/appointment&=${accessToken}`);
    }
  }, [accessToken]);

  const [res, setRes] = useState<any>();
  const [token, setToken] = useState<string>();

  const { LOGIN_CUSTOMER } = useCustomerApi();

  const { loading, error, data } = useQuery(LOGIN_CUSTOMER, {
    variables: { loginCustomerToken: token },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && res !== undefined && token !== undefined) {
      if (data.loginCustomer) {
        localStorage.setItem("_id", data.loginCustomer._id);
        localStorage.setItem("accessToken", res.accessToken);
        history.push(`/profile&=${localStorage.getItem("accessToken")}`);
      } else {
        localStorage.setItem("token", res.tokenId);
        localStorage.setItem("gmail", res.profileObj.email);
        history.push("/register");
      }
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, res, token, error, data]);

  const responseGoogle = async (response: any) => {
    setRes(response);
    setToken(response.tokenId);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.login}
          >
            <Grid xs={12} md={12} lg={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item xs={2} md={1} lg={1}>
                  <Image
                    src="./logo.png"
                    cover={true}
                    // style={{padding: 0}}
                  />
                </Grid>
                <Grid item xs={10} md={11} lg={11} className={classes.name}>
                  <Typography variant="h4">ลงชื่อเข้าระบบ</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.form}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.google}
              >
                <GoogleLogin
                  clientId="907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
