import {
  Button,
  CircularProgress,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  AlarmAdd,
  Apartment,
  LocalHospital,
  MeetingRoom,
  Message,
  Today,
} from "@material-ui/icons";
import { useState } from "react";
import AppointmentForm from "../../models/AppointmentForm";
import Department from "../../models/Department";
import Hospital from "../../models/Hospital";
import { useEffect } from "react";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import Alert from "../Alert/Alert";
import useCustomerApi from "../../hooks/customerhooks";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Appointment from "../../models/Appointment";

interface InformationFormProps {
  appointment?: AppointmentForm;
  setAppointment: any;
  setStep: any;
  appointments: Appointment[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    form: {
      paddingTop: "2%",
    },
    paper: {
      padding: "5%",
    },
    formControlLabel: { fontSize: "0.6rem", "& label": { fontSize: "0.6rem" } },
  })
);



function InformationForm({
  appointment,
  setAppointment,
  setStep,
  appointments,
}: InformationFormProps) {
  const classes = useStyles();
  const [hosId, setHosId] = useState<string | undefined>(
    appointment?.Hospital?._id
  );

  

  const [depId, setDepId] = useState<string | undefined>(
    appointment?.Department?._id
  );
  const [period, setPeriod] = useState<string | undefined>(appointment?.Period);
  const [time, setTime] = useState<any | undefined>(appointment?.AppointTime);
  const [note, setNote] = useState<string | undefined>();

  const { GET_ALLHOSPITAL } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_ALLHOSPITAL, {});

  const [alert, setAlert] = useState<boolean>(false);
  const [timeAlert, setTimeAlert] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(
    new Date(
      time !== undefined
        ? time
        : moment(new Date()).add(1, "days").format("DD MMMM yyyy")
    )
  );

  const [dateAlert, setDateAlert] = useState<boolean>(false);

  const next = () => {
    if (
      appointments.find(
        (d) => moment(d.AppointTime).format("DD MMMM yyyy") === moment(date).format("DD MMMM yyyy")
      )
    ) {
      setDateAlert(true);
    } else {
      if (
        period !== undefined &&
        time !== undefined &&
        hosId !== undefined &&
        depId !== undefined
      ) {
        if (isWrongTime()) {
          setTimeAlert(true);
        } else {
          setAppointment({
            ...appointment,
            Period: period,
            AppointTime: time,
            Hospital: hos.find((h) => h._id === hosId),
            Department: dep?.find((d) => d._id === depId),
            Note: note,
          });
          setStep(2);
        }
      } else {
        setAlert(true);
      }
    }
  };

  function disableWeekends(d : any) {
    return appointments.find(e => moment(e.AppointTime).format("DD MMMM yyyy") === moment(d).format("DD MMMM yyyy")) !== undefined
  }

  const [hos, setHos] = useState<Hospital[]>(
    data !== undefined ? data.getAllHospital : []
  );
  const [dep, setDep] = useState<Department[]>(
    data !== undefined ? data.getAllDepartment : []
  );

  useEffect(() => {
    if (!loading && data) {
      setHos(data.getAllHospital);
      setDep(data.getAllDepartment);
    }
  }, [loading]);

  useEffect(() => {
    setDepId(
      dep.find((d) => d._id === depId)?.Hospital?._id ? depId : undefined
    );
  }, [hosId]);

  // useEffect(() => {
  //   setTime(!isWrongTime() ? time : undefined);
  //   setAppointment({
  //     ...appointment,
  //     Guide: undefined,
  //   });
  // }, [period]);

  useEffect(() => {
    if (time !== undefined) {
      setTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          new Date(time).getHours(),
          new Date(time).getMinutes(),
          new Date(time).getMilliseconds()
        ).toISOString()
      );
    }
    // setAppointment({
    //   ...appointment,
    //   Guide: undefined,
    // });
  }, [date]);

  const handleChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    let minTime =
      (event.target as HTMLInputElement).value === "Afternoon" ? 13 : 7;
    setMin(
      (event.target as HTMLInputElement).value === "Afternoon"
        ? "13:00:00"
        : "07:00:00"
    );
    setMax(
      (event.target as HTMLInputElement).value === "Morning"
        ? "12:00:00"
        : "18:00:00"
    );
    setPeriod((event.target as HTMLInputElement).value);
    setTime(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        minTime,
        0,
        0
      ).toISOString()
    );
  };

  const [min, setMin] = useState<string>(
    period === "Afternoon" ? "13:00:00" : "07:00:00"
  );
  const [max, setMax] = useState<string>(
    period === "Morning" ? "12:00:00" : "18:00:00"
  );

  const isWrongTime = () => {
    return (
      time > new Date(moment(date).format("YYYY-MM-DDT" + max)).toISOString() ||
      time < new Date(moment(date).format("YYYY-MM-DDT" + min)).toISOString()
    );
  };

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={props.onClick}
      label="วันนัดหมาย"
      fullWidth={true}
      value={convertToThaiDate(date)}
      onChange={props.onChange}
      type="text"
    />
  );

  return (
    <Grid container direction="row" alignItems="center" justify="flex-start">
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <LocalHospital fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6">รายละเอียดการนัดหมาย</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12} className={classes.form}>
        <Paper className={classes.paper}>
          {!loading ? (
            <form>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Typography>
                      <Apartment />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl required fullWidth={true}>
                      <InputLabel id="hos-label" shrink={hosId !== undefined}>
                        ชื่อโรงพยาบาล
                      </InputLabel>
                      <Select
                        labelId="hos-label"
                        value={hosId}
                        onChange={(e) => {
                          setHosId(e.target.value as string);
                        }}
                        fullWidth={true}
                      >
                        <MenuItem value={undefined} disabled>
                          ชื่อโรงพยาบาล
                        </MenuItem>
                        {hos.map((h) => {
                          return <MenuItem value={h._id}>{h.Name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Typography>
                      <MeetingRoom />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl required fullWidth={true}>
                      <InputLabel id="dep-label" shrink={depId !== undefined}>
                        ชื่อแผนก
                      </InputLabel>
                      <Select
                        labelId="dep-label"
                        value={depId}
                        onChange={(e) => {
                          setDepId(e.target.value as string);
                        }}
                        fullWidth={true}
                      >
                        <MenuItem value={undefined} disabled>
                          ชื่อแผนก
                        </MenuItem>
                        {dep?.map((d) => {
                          if (d?.Hospital?._id === hosId) {
                            return <MenuItem value={d._id}>{d.Name}</MenuItem>;
                          }
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>
                      <AlarmAdd />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <FormLabel component="legend">ช่วงเวลานัดหมาย</FormLabel>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Today />
                  </Grid>
                  <Grid item xs={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        label="วันนัดหมาย"
                        value={date}
                        onChange={(e) => e !== null && setDate(e)}
                        minDate={
                          new Date(
                            moment(new Date())
                              .add(1, "days")
                              .format("DD MMMM yyyy")
                          )
                        }
                        maxDate={
                          new Date(
                            moment(new Date())
                              .add(7, "days")
                              .format("DD MMMM yyyy")
                          )
                        }
                        shouldDisableDate={disableWeekends} 
                        fullWidth={true}
                        TextFieldComponent={renderInput}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item xs={10}>
                    <FormControl component="fieldset" fullWidth={true}>
                      <RadioGroup
                        name="period"
                        value={period}
                        onChange={handleChangePeriod}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="space-evenly"
                          alignItems="flex-end"
                        >
                          <Grid item xs={10} md={4} lg={4}>
                            <FormControlLabel
                              value="Morning"
                              control={<Radio />}
                              label={
                                <>
                                  <Typography variant="body1">
                                    ช่วงเช้า
                                  </Typography>
                                  <Typography variant="caption">
                                    (7.00-12.00 น.)
                                  </Typography>
                                </>
                              }
                            />
                          </Grid>
                          <Grid item xs={10} md={4} lg={4}>
                            <FormControlLabel
                              value="Afternoon"
                              control={<Radio />}
                              label={
                                <>
                                  <Typography variant="body1">
                                    ช่วงบ่าย
                                  </Typography>
                                  <Typography variant="caption">
                                    (13.00-18.00 น.)
                                  </Typography>
                                </>
                              }
                            />
                          </Grid>
                          <Grid item xs={10} md={4} lg={4}>
                            <FormControlLabel
                              value="All-day"
                              control={<Radio />}
                              label={
                                <>
                                  <Typography variant="body1">
                                    ทั้งวัน
                                  </Typography>
                                  <Typography variant="caption">
                                    (7.00-18.00 น.)
                                  </Typography>
                                </>
                              }
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                        ampm={false}
                        id="time-picker"
                        label="เวลานัดหมาย"
                        value={time !== undefined ? new Date(time) : null}
                        onChange={(e) => {
                          setTime(
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              e?.getHours(),
                              e?.getMinutes(),
                              e?.getMilliseconds()
                            ).toISOString()
                          );
                        }}
                        minutesStep={5}
                        required
                        fullWidth={true}
                        error={isWrongTime()}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography>
                      <Message />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ข้อมูลเพิ่มเติม"
                      fullWidth={true}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      type="text"
                      multiline={true}
                      rows={3}
                      variant="outlined"
                      placeholder="(ตัวอย่าง) ผู้ป่วยต้องการรถเข็น"
                    />
                  </Grid>
                </Grid>
              </div>
              <Alert
                closeAlert={() => setAlert(false)}
                alert={alert}
                title="ข้อมูลการนัดหมาย"
                text="กรุณากรอกข้อมูลให้ครบ"
                buttonText="ตกลง"
              />
              <Alert
                closeAlert={() => setTimeAlert(false)}
                alert={timeAlert}
                title="ช่วงเวลาไม่ถูกต้อง"
                text="กรุณากำหนดเวลานัดหมายให้ตรงช่วงเวลาที่กำหนด"
                buttonText="ตกลง"
              />
              <Alert
                closeAlert={() => setDateAlert(false)}
                alert={dateAlert}
                title="วันที่ไม่ถูกต้อง"
                text="มีนัดหมายในวันดังกล่าวแล้ว ไม่สามารถเพิ่มนัดหมายอีกได้"
                buttonText="ตกลง"
              />
              <div className={classes.margin}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography align="right">
                      <Button
                        type="button"
                        onClick={next}
                        variant="contained"
                        color="primary"
                      >
                        ถัดไป
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </form>
          ) : (
            <CircularProgress disableShrink />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default InformationForm;
