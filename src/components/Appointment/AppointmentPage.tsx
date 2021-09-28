import { useQuery } from "@apollo/client";
import DateFnsUtils from "@date-io/date-fns";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Today, PostAdd } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AddAppointment from "./AddAppointment";
import AppointmentCard from "./AppointmentCard";
import ContactCard from "./ContactCard";

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
      padding: "2%",
    },
    card: {
      padding: "2%",
    },
  })
);

function AppointmentPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken === null) {
      history.push("/");
    }
  }, [accessToken]);

  const { GET_ALLAPPOINTMENT_BY_CUSTOMER } = useCustomerApi();
  const id = localStorage.getItem("_id");

  const { loading, error, data } = useQuery(GET_ALLAPPOINTMENT_BY_CUSTOMER, {
    variables: { getAllAppointmentByCustomerCustomerId: id },
    pollInterval: 1000,
  });

  const [add, setAdd] = useState<boolean>(false);
  // const [date, setDate] = useState<Date>(new Date());
  // const [calender, setCalender] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByCustomer : []
  );
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByCustomer);
    }
    console.log(data);
  }, [loading, data]);

  return (
    <Grid>
      <TopBar page="การนัดหมาย" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={classes.root}
      >
        <Grid item className={classes.sub}></Grid>
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              {appointment?.filter(
                (a) =>
                  new Date(a.AppointTime) >= new Date() &&
                  new Date(a.AppointTime) <=
                    new Date(
                      moment(new Date()).add(7, "days").format("DD MMMM yyyy")
                    )
              ).length !== 0 ? (
                <>
                  {appointment
                    ?.filter(
                      (a) =>
                        new Date(a.AppointTime) >= new Date() &&
                        new Date(a.AppointTime) <=
                          new Date(
                            moment(new Date())
                              .add(7, "days")
                              .format("DD MMMM yyyy")
                          )
                    )
                    .slice()
                    .reverse()
                    .sort((a, b) => {
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
                                {convertToThaiDate(new Date(a.AppointTime))}
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
                              <AppointmentCard appointment={a} />
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                </>
              ) : (
                <Typography
                  align="center"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ไม่มีนัดหมาย
                </Typography>
              )}
              <Button
                // fullWidth={true}
                type="button"
                onClick={() => setAdd(true)}
                color="primary"
                variant="contained"
              >
                <PostAdd/> เพิ่มนัดหมาย
              </Button>
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
        </Grid>

        <Grid item className={classes.sub}></Grid>
      </Grid>
      <BottomBar page="Appointment" />
      <Alert closeAlert={() => setSuccess(false)} alert={success} title="สำเร็จ" text="เพิ่มนัดหมายสำเร็จ" buttonText="ตกลง"/>
      <AddAppointment open={add} setOpen={setAdd} setSuccess={setSuccess} appointments={appointment}/>
    </Grid>
  );
}
export default AppointmentPage;
