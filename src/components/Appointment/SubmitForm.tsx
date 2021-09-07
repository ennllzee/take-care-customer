import { gql, useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  createStyles,
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
  PersonPin,
} from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import AppointmentForm from "../../models/AppointmentForm";
import ContactCard from "./ContactCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    form: {
      paddingTop: "5%",
      height: "100%",
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

  // const QUERY_HOSPITAL_DEPARTMENT = gql`
  // query Query {
  //     getAllHospital {
  //       _id
  //       Name
  //     }
  //     getAllDepartment {
  //       _id
  //       Name
  //     }
  //     getAllGuide {
  //       _id
  //       FirstName
  //       LastName
  //       Gender
  //       DOB
  //       PhoneNumber
  //       Email
  //       Avatar
  //       Role
  //     }
  // }`

  // const { loading, error, data } = useQuery(QUERY_HOSPITAL_DEPARTMENT, {
  // });

  // const [hos, setHos] = useState<any[]>(data !== undefined ? data.getAllHospital : [])
  // const [dep, setDep] = useState<any[]>(data !== undefined ? data.getAllDepartment : [])
  // const [users, setUsers] = useState<any[]>(data !== undefined ? data.getAllPatient : [])

  // useEffect (() => {
  //     console.log(loading)
  //     if(!loading ){
  //         setHos(data.getAllHospital)
  //         setDep(data.getAllDepartment)
  //         setUsers(data.getGuide)
  //     }
  // }, [loading])

  return (
    <Grid container direction="row" alignItems="center" justify="flex-start">
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Description fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6">ยืนยันการนัดหมาย</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12} className={classes.form}>
        <Paper className={classes.paper}>
          {/* {!loading ? (
            <> */}
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
                    <TextField
                      label="ชื่อโรงพยาบาล"
                      value={appointment?.Hospital?.Name}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                    />
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
                    <TextField
                      label="ชื่อแผนก"
                      value={appointment?.Department?.Name}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                    />
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
                      <AlarmAdd />
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="ช่วงเวลานัดหมาย"
                      value={appointment?.Period === "morning" ? "ช่วงเช้า" : appointment?.Period === "afternoon" ? "ช่วงบ่าย" : "ทั้งวัน"}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="เวลานัดหมาย"
                      value={moment(appointment?.AppointTime).format("LT")}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>
              </div>
              {/* <div className={classes.margin}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Typography>
                      <AlarmAdd />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      label="เวลานัดหมาย"
                      value={moment(appointment?.AppointTime).format("LT")}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>
              </div> */}
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
                      value={appointment?.Note === undefined ? "-" : appointment.Note}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth={true}
                      multiline={true}
                      rows={3}
                      variant="outlined"
                    />
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
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <PersonPin /> ไกด์
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ContactCard user={appointment?.Guide} />
                  </Grid>
                </Grid>
              </div>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={4} md={4} lg={4}>
                  <Typography align="left">
                    <Button
                      type="submit"
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
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={submit}
                    >
                      ยืนยัน
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            {/* </>
          ) : (
            <CircularProgress disableShrink />
          )} */}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SubmitForm;
