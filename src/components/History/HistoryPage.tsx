import { makeStyles, Theme, createStyles, Grid, Typography, Divider } from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import Appointment from "../../models/Appointment";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    sub: {
      minHeight: "15vh",
    },
    main: {
      minHeight: "70vh",
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "100vw",
    },
    line: {
      padding: "1%",
    },
    card: {
      padding: "2%"
    }
  })
);

function HistoryPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null) {
      history.push("/");
    }
  }, [accessToken]);

  // const { getAllAppointment } = useAppointmentApi();
//   const QUERY_ALL_APPOINTMENT = gql`
//   query Query($getAllAppointmentByPatientPatientId: ID!, $getAllAppointmentByGuideGuideId: ID!) {
//     getAllAppointmentByPatient(
//       PatientId: $getAllAppointmentByPatientPatientId
//     ) {
//       _id
//       AppointTime
//       BeginTime
//       EndTime
//       PatientId {
//         _id
//         FirstName
//         LastName
//         Gender
//         DOB
//         PhoneNumber
//         Email
//         Avatar
//         Role
//       }
//       GuideId {
//         _id
//         FirstName
//         LastName
//         Gender
//         PhoneNumber
//         Email
//         IsValidated
//         Avatar
//         Role
//       }
//       DepId {
//         _id
//         Name
//         BuildingId {
//           _id
//           Name
//         }
//         HospitalId {
//           _id
//           Name
//         }
//       }
//       Review {
//         Star
//         Comment
//       }
//       Record {
//         At
//         Title
//         Description
//       }
//       OpenLink
//       Note
//       CreatedAt
//       UpdatedAt
//     },
//     getAllAppointmentByGuide(GuideId: $getAllAppointmentByGuideGuideId) {
//       _id
//       AppointTime
//       BeginTime
//       EndTime
//       PatientId {
//         _id
//         FirstName
//         LastName
//         Gender
//         DOB
//         PhoneNumber
//         Email
//         Avatar
//         Role
//       }
//       GuideId {
//         _id
//         FirstName
//         LastName
//         Gender
//         PhoneNumber
//         Email
//         IsValidated
//         Avatar
//         Role
//       }
//       DepId {
//         _id
//         Name
//         BuildingId {
//           _id
//           Name
//         }
//         HospitalId {
//           _id
//           Name
//         }
//       }
//       Review {
//         Star
//         Comment
//       }
//       Record {
//         At
//         Title
//         Description
//       }
//       OpenLink
//       Note
//       CreatedAt
//       UpdatedAt
//     }
//   }
//   `
//   const id = localStorage.getItem("_id");

//   const { loading, error, data } = useQuery(QUERY_ALL_APPOINTMENT, {
//     variables: { getAllAppointmentByPatientPatientId: id, getAllAppointmentByGuideGuideId: id },
//   });

//   const [appointment, setAppointment] = useState<Appointment[]>(
//     data !== undefined && role === "customer" ? data.getAllAppointmentByPatient : 
//     data !== undefined && role === "guide" ? data.getAllAppointmentByGuide
//     : []
//   );

//   useEffect(() => {
//     if (!loading) {
//       if(role === "customer"){
//         console.log(data);
//         setAppointment(data.getAllAppointmentByPatient);
//       }else{ //guide
//         setAppointment(data.getAllAppointmentByGuide);
//       }
      
//     }
//     console.log(error);
//   }, [loading]);

  const [appointment, setAppointment] = useState<Appointment[]>([]);

  return (
    <Grid>
      <TopBar page="ประวัติการนัดหมาย" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={classes.root}
      >
        <Grid item className={classes.sub}></Grid>
        <Grid item className={classes.main}>
          {/* {!loading ? ( */}
            <>
              {appointment !== undefined && appointment.find(a => a.EndTime !== null) ? (
                appointment
                  ?.filter(a => a.EndTime !== null).slice().sort((a, b) => {
                    return (
                      new Date(a.AppointTime).getTime() -
                      new Date(b.AppointTime).getTime()
                    );
                  })
                  .reverse()
                  .map((a) => {
                    return (
                      <>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-start"
                          className={classes.line}
                        >
                          <Grid item xs={10} md={11} lg={11}>
                            <Typography variant="h5">
                              {moment(a.AppointTime).format("DD MMMM YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider variant="middle" />
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.card}
                        >
                          <Grid item xs={12} md={10} lg={8}>
                            {/* <AppointmentCard
                              appointment={a}
                              match={role === "customer" ? a.Guide : a.Customer}
                            /> */}
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
              ) : (
                <Typography
                  align="center"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ไม่มีประวัติการนัดหมาย
                </Typography>
              )}
            </>
           {/* ) : (
             <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )} */}
        </Grid>

        <Grid item className={classes.sub}></Grid>
      </Grid>
      <BottomBar page="History" />
    </Grid>
  );
}
export default HistoryPage;
