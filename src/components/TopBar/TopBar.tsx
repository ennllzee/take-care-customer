import Appointment from "../../models/Appointment";
import { history } from "../../helper/history";
import { makeStyles, Theme, createStyles, AppBar, Toolbar, Typography, Popper, Fade, Paper, Divider, IconButton, Button } from "@material-ui/core";
import { ViewList } from "@material-ui/icons";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import moment from "moment";

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
      backgroundColor: "#508F7F",
    }
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
  const id = localStorage.getItem("_id");

  const handleClick = () => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const accessToken = localStorage.getItem("accessToken");

//   const QUERY_ALL_APPOINTMENT = gql`
//     query Query(
//       $getAllAppointmentByPatientPatientId: ID!
//     ) {
//       getAllAppointmentByPatient(
//         PatientId: $getAllAppointmentByPatientPatientId
//       ) {
//         _id
//         AppointTime
//         BeginTime
//         EndTime
//         PatientId {
//           _id
//           FirstName
//           LastName
//           Gender
//           DOB
//           PhoneNumber
//           Email
//           Avatar
//           Role
//         }
//         GuideId {
//           _id
//           FirstName
//           LastName
//           Gender
//           PhoneNumber
//           Email
//           IsValidated
//           Avatar
//           Role
//         }
//         DepId {
//           _id
//           Name
//           BuildingId {
//             _id
//             Name
//           }
//           HospitalId {
//             _id
//             Name
//           }
//         }
//         Review {
//           Star
//           Comment
//         }
//         Record {
//           At
//           Title
//           Description
//         }
//         OpenLink
//         Note
//         CreatedAt
//         UpdatedAt
//       }
//       getAllAppointmentByGuide(GuideId: $getAllAppointmentByGuideGuideId) {
//         _id
//         AppointTime
//         BeginTime
//         EndTime
//         PatientId {
//           _id
//           FirstName
//           LastName
//           Gender
//           DOB
//           PhoneNumber
//           Email
//           Avatar
//           Role
//         }
//         GuideId {
//           _id
//           FirstName
//           LastName
//           Gender
//           PhoneNumber
//           Email
//           IsValidated
//           Avatar
//           Role
//         }
//         DepId {
//           _id
//           Name
//           BuildingId {
//             _id
//             Name
//           }
//           HospitalId {
//             _id
//             Name
//           }
//         }
//         Review {
//           Star
//           Comment
//         }
//         Record {
//           At
//           Title
//           Description
//         }
//         OpenLink
//         Note
//         CreatedAt
//         UpdatedAt
//       }
//     }
//   `;

//   const { loading, error, data } = useQuery(QUERY_ALL_APPOINTMENT, {
//     variables: {
//       getAllAppointmentByPatientPatientId: id,
//       getAllAppointmentByGuideGuideId: id,
//     },
//   });

//   const [appointment, setAppointment] = useState<any[]>(
//     data !== undefined ? data.getAllAppointmentByPatient : []
//   );

//   useEffect(() => {
//     if (!loading) {
//         console.log(data);
//         setAppointment(data.getAllAppointmentByPatient);
//     }
//     console.log(error);
//   }, [loading]);

const [appointment, setAppointment] = useState<Appointment[]>([]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.customer}
      >
        <Toolbar className={classes.bar}>
          <Typography variant="h4" className={classes.title}>
            {page}
          </Typography>
          {accessToken !== null ? (
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
                      {appointment !== undefined &&
                      appointment.find((a) => a.EndTime === null) ? (
                        appointment
                          ?.filter((a) => a.EndTime === null)
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
                                  Hospital: {a.Hospital.Name}
                                </Typography>
                                <Typography>
                                  Department: {a.Department.Name}
                                </Typography>
                                <Typography>
                                  Time:{" "}
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
                          No Appointment
                        </Typography>
                      )}
                    </Paper>
                  </Fade>
                )}
              </Popper>
              <IconButton className={classes.icon} onClick={handleClick()}>
                <ViewList />
              </IconButton>
            </>
          ) : page === "Register" ? (
            <GoogleLogout
              clientId="907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com"
              buttonText="Login"
              render={(renderProps) => (
                <Button
                  type="button"
                  onClick={renderProps.onClick}
                  className={classes.icon}
                >
                  login
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
