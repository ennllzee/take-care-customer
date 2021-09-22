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

  const { loading, error, data  } = useQuery(GET_ALLAPPOINTMENT_BY_CUSTOMER, {
    variables: { getAllAppointmentByCustomerCustomerId: id },
  });

  const [add, setAdd] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [calender, setCalender] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByCustomer : []
  );
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      setAppointment(data.getAllAppointmentByCustomer);
    }
    console.log(data);
  }, [loading,data]);

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
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                className={classes.line}
              >
                <Grid item xs={10} md={11} lg={11}>
                  <Typography variant="h5">
                    {convertToThaiDate(date)}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1} lg={1}>
                  <Typography align="center">
                    <IconButton
                      color="inherit"
                      onClick={() => setCalender(true)}
                    >
                      <Today />
                    </IconButton>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        open={calender}
                        onClose={() => setCalender(false)}
                        value={date}
                        onChange={(e) => e !== null && setDate(e)}
                        showTodayButton={true}
                        TextFieldComponent={() => null}
                        minDate={new Date()}
                        maxDate={new Date(moment(new Date()).add(7, 'days').format('DD MMMM yyyy'))}
                      />
                    </MuiPickersUtilsProvider>
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
                  {appointment?.find(
                    (m) =>
                      moment(m.AppointTime).format("YYYY-MM-DD") ===
                      moment(date).format("YYYY-MM-DD")
                  ) ? (
                    appointment?.map((m) => {
                      if (
                        moment(m.AppointTime).format("YYYY-MM-DD") ===
                        moment(date).format("YYYY-MM-DD")
                      ) {
                        return (
                          // <AppointmentCard appointment={m} match={m.Guide} />
                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                            justify="center"
                          >
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">เวลานัดหมาย:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{moment(m.AppointTime).format("HH.mm น.")}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">โรงพยาบาล:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{m.Hospital.Name}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">แผนก:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{m.Department.Name}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">ข้อมูลเพิ่มเติม:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{m.Note !== null ? m.Note : "-"}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">ไกด์:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{m.Guide?.FirstName} {m.Guide?.LastName}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography variant="body1" align="left">สถานะ:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body1" align="left">{m.Status.Tag}</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} xl={10}>
                              <ContactCard user={m.Guide}/>
                            </Grid>
                          </Grid>
                        );
                      }
                    })
                  ) : (
                    <Typography align="center">
                      {date <=
                      new Date(
                        moment(new Date()).add(1, "days").format("DD MMMM yyyy")
                      ) ? (
                        <Typography
                          align="center"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          ไม่มีการนัดหมาย
                        </Typography>
                      ) : date <=
                        new Date(
                          moment(new Date())
                            .add(8, "days")
                            .format("DD MMMM yyyy")
                        ) ? (
                        <Button
                          type="button"
                          variant="contained"
                          onClick={() => setAdd(true)}
                        >
                          <PostAdd />
                          เพิ่มนัดหมาย
                        </Button>
                      ) : (
                        <Typography
                          align="center"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          ลูกค้าสามารถเพิ่มการนัดหมายที่เกิดขึ้นภายใน 7
                          วันถัดไปเท่านั้น
                        </Typography>
                      )}
                    </Typography>
                  )}
                  {success && (
                    // <Alert severity="success" onClose={() => setSuccess(false)}>
                    //   เพิ่มการนัดหมายสำเร็จ
                    // </Alert>
                    <Alert
                      closeAlert={() => setSuccess(false)}
                      alert={success}
                      title="เพิ่มนัดหมายสำเร็จ"
                      text="กรุณารอการตอบกลับจากไกด์"
                      buttonText="ปิดหน้าต่าง"
                    />
                  )}
                </Grid>
              </Grid>
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
      <AddAppointment
        open={add}
        setOpen={setAdd}
        date={date}
        setSuccess={setSuccess}
      />
    </Grid>
  );
}
export default AppointmentPage;
