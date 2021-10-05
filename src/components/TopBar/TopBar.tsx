import Appointment from "../../models/Appointment";
import { history } from "../../helper/history";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Popper,
  Fade,
  Paper,
  Divider,
  IconButton,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { ViewList } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import moment from "moment";
import { useQuery } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      height: "7vh",
    },
    icon: {
      // marginRight: theme.spacing(2),
      color: "white",
    },
    title: {
      flexGrow: 1,
    },
    typography: {
      padding: theme.spacing(2),
    },
    customer: {
      backgroundColor: "#7C5D92",
    },
  })
);

interface TopBarProps {
  page: string;
}

function TopBar({ page }: TopBarProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = () => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const accessToken = localStorage.getItem("accessToken");

  const { GET_ALLAPPOINTMENT_BY_CUSTOMER } = useCustomerApi();

  const id = localStorage.getItem("_id");

  const { loading, error, data } = useQuery(GET_ALLAPPOINTMENT_BY_CUSTOMER, {
    variables: { getAllAppointmentByCustomerCustomerId: id },
    pollInterval: 1000,
  });

  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByCustomer : []
  );

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByCustomer);
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.customer}>
        <Toolbar className={classes.bar}>
          <Typography variant="h4" className={classes.title}>
            {page}
          </Typography>
          {accessToken !== null && page !== "บันทึกการบริการ" ? (
            <>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper className={classes.typography}>
                      {!loading ? (
                        <>
                          {appointment !== undefined &&
                          appointment.find(
                            (a) => a.Status.Tag === "Guide Reject"
                          ) ? (
                            appointment
                              ?.filter((a) => a.Status.Tag === "Guide Reject")
                              .slice()
                              .sort((a, b) => {
                                return (
                                  new Date(a.AppointTime).getTime() -
                                  new Date(b.AppointTime).getTime()
                                );
                              })
                              .map((a) => {
                                return (
                                  <>
                                    <Typography>
                                      {moment(new Date(a.AppointTime)).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </Typography>
                                    <Divider />
                                    <Typography>
                                      โรงพยาบาล: {a.Hospital.Name}
                                    </Typography>
                                    <Typography>
                                      แผนก: {a.Department.Name}
                                    </Typography>
                                    <Typography>
                                      เวลานัดหมาย:{" "}
                                      {moment(new Date(a.AppointTime)).format(
                                        "HH:mm"
                                      )}
                                    </Typography>
                                  </>
                                );
                              })
                          ) : (
                            <Typography
                              align="center"
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              ไม่มีการนัดหมาย
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                        >
                          <CircularProgress disableShrink />
                        </Grid>
                      )}
                    </Paper>
                  </Fade>
                )}
              </Popper>
              <IconButton className={classes.icon} onClick={handleClick()}>
                <ViewList />
              </IconButton>
            </>
          ) : page === "ลงทะเบียน" ? (
            <GoogleLogout
              clientId="907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com"
              buttonText="Login"
              render={(renderProps) => (
                <Button
                  type="button"
                  onClick={renderProps.onClick}
                  className={classes.icon}
                >
                  ลงชื่อเข้าระบบ
                </Button>
              )}
              onLogoutSuccess={logout}
              icon={false}
            ></GoogleLogout>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
