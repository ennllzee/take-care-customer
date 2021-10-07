import {
  Button,
  createStyles,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  AlarmAdd,
  Apartment,
  Description,
  MeetingRoom,
  Message,
  Payment,
  PersonPin,
} from "@material-ui/icons";
import moment from "moment";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import AppointmentForm from "../../models/AppointmentForm";
import ContactCard from "./ContactCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    form: {
      paddingTop: "2%",
      // height: "100%",
    },
    paper: {
      padding: "2%",
    },
  })
);

interface SubmitFormProps {
  appointment?: AppointmentForm;
  setStep: any;
  submit: any;
}

function SubmitForm({ appointment, setStep, submit }: SubmitFormProps) {
  const classes = useStyles();

  const back = () => {
    setStep(2);
  };

  return (
    <Grid container direction="row" alignItems="center" justify="flex-start">
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Description fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6">ยืนยันการนัดหมาย</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12} className={classes.form}>
        <Paper className={classes.paper}>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="flex-end">
              <Grid item>
                <Typography>
                  <Apartment />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="ชื่อโรงพยาบาล"
                  value={appointment?.Hospital?.Name}
                  disabled={true}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="flex-end">
              <Grid item>
                <Typography>
                  <MeetingRoom />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="ชื่อแผนก"
                  value={appointment?.Department?.Name}
                  disabled={true}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="center">
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
            <Grid container spacing={1} justify="center" alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  label="วันนัดหมาย"
                  value={convertToThaiDate(new Date(appointment?.AppointTime))}
                  disabled={true}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="flex-end">
              <Grid item xs={5}>
                <TextField
                  label="ช่วงเวลา"
                  value={
                    appointment?.Period === "Morning"
                      ? "ช่วงเช้า"
                      : appointment?.Period === "Afternoon"
                      ? "ช่วงบ่าย"
                      : "ทั้งวัน"
                  }
                  disabled={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="เวลานัดหมาย"
                  value={moment(appointment?.AppointTime).format("H.mm น.")}
                  disabled={true}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </div>
          <br />
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
                  label="ข้อมูลเพิ่มเติม"
                  value={
                    appointment?.Note === undefined ? "-" : appointment.Note
                  }
                  disabled={true}
                  fullWidth={true}
                  multiline={true}
                  rows={3}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  <Payment />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormLabel>ค่าบริการเริ่มต้น: {appointment?.Period === "All-day" ? 300 : 175} บาท</FormLabel>
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  <PersonPin />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormLabel component="legend">ไกด์</FormLabel>
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item xs={12} md={4} lg={4}>
                <ContactCard user={appointment?.Guide} />
              </Grid>
            </Grid>
          </div>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={4} md={4} lg={4}>
              <Typography align="left">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={back}
                >
                  ก่อนหน้า
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <Typography align="right">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={submit}
                >
                  ยืนยัน
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SubmitForm;
