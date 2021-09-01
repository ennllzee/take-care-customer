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
  import { gql, useQuery } from '@apollo/client';

  import useCustomerApi from '../../hooks/customerhooks'
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minHeight: "100vh",
        backgroundColor: "#C3A3DB",
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
    })
  );
  
  function LoginPage() {

    const classes = useStyles();
  
    const accessToken = localStorage.getItem("accessToken");
  
    useEffect(() => {
      if (accessToken !== null) {
        history.push(`/profile&=${accessToken}`);
      }
    }, [accessToken]);
  
    const [res, setRes] = useState<any>();
    const [token, setToken] = useState<string>();
  
    const { loginCustomer } = useCustomerApi();
  
    const { loading, error, data } = useQuery(loginCustomer, {
      variables: { loginCustomerToken: token },
      fetchPolicy: "network-only"
    });
  
    useEffect(() => {
      if (!loading && res !== undefined && token !== undefined) {
        if (data) {
          localStorage.setItem("_id", data.loginCustomer._id);
          localStorage.setItem("accessToken", res.accessToken);
          history.push(`/profile&=${localStorage.getItem("accessToken")}`);
        } else {
          localStorage.setItem("token", res.tokenId);
          localStorage.setItem("gmail", res.profileObj.email);
          history.push("/register");
        }
      }
    }, [loading]);
  
    const responseGoogle = async (response: any) => {
      setRes(response);
      setToken(response.tokenId);
    };
  
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={classes.root}
      >
        <Grid item></Grid>
  
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
                <Typography variant="h4">ลงชื่อเข้าระบบ</Typography>
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
        <Grid item></Grid>
      </Grid>
    );
  }

  export default LoginPage;
  