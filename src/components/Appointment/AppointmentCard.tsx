import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, CardHeader, Grid, Link } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import Submit from "../Submit/Submit";
import ChangeGuide from "./ChangeGuide";
import Alert from "../Alert/Alert";
import { PlayCircleFilled } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: 0,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
      padding: 0,
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    foot: {
      padding: "5%",
    },
    monday: {
      backgroundColor: "#FFD68F",
      padding: "1%",
    },
    tuesday: {
      backgroundColor: "#FF8FD4",
      padding: "1%",
    },
    wednesday: {
      backgroundColor: "#94E18A",
      padding: "1%",
    },
    thursday: {
      backgroundColor: "#F3BE95",
      padding: "1%",
    },
    friday: {
      backgroundColor: "#9FBFF2",
      padding: "1%",
    },
    saturday: {
      backgroundColor: "#C78FDC",
      padding: "1%",
    },
    sunday: {
      backgroundColor: "#EA7C7C",
      padding: "1%",
    },
  })
);

interface AppointmentCardProps {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [changeGuide, setChangeGuide] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteAppointment = () => {
    setConfirmDelete(false);
    //waiting for delete
  };

  const [success, setSuccess] = useState<boolean>(false);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };
    var timeID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timeID);
    };
  }, [time]);

  const [startConfirm, setStartConfirm] = useState<boolean>(false);

  const start = () => {
    //waiting for start
    setStartConfirm(false);
  };

  return (
    <Card>
      <CardHeader
        className={
          new Date(appointment.AppointTime).getDay() === 0
            ? classes.sunday
            : new Date(appointment.AppointTime).getDay() === 1
            ? classes.monday
            : new Date(appointment.AppointTime).getDay() === 2
            ? classes.tuesday
            : new Date(appointment.AppointTime).getDay() === 3
            ? classes.wednesday
            : new Date(appointment.AppointTime).getDay() === 4
            ? classes.thursday
            : new Date(appointment.AppointTime).getDay() === 5
            ? classes.friday
            : classes.saturday
        }
      />
      <CardContent className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              เวลานัดหมาย:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {moment(appointment.AppointTime).format("HH.mm น.")}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              โรงพยาบาล:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Hospital.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              แผนก:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Department.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ข้อมูลเพิ่มเติม:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Note !== null ? appointment.Note : "-"}
            </Typography>
          </Grid>
          {appointment.OpenLink !== null && (
            <>
              <Grid item xs={5}>
                <Typography variant="body1" align="left">
                  Tracking Link:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Link href={appointment.OpenLink}>
                  <Typography variant="body1" align="left">
                    {appointment.OpenLink}
                  </Typography>
                </Link>
              </Grid>
            </>
          )}
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              สถานะ:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Status.Tag}
            </Typography>
          </Grid>
          {new Date(appointment.AppointTime) <= new Date(time) &&
            appointment.Status.Tag === "Guide Confirm" && (
              <Grid item xs={12}>
                <Button
                  onClick={() => setStartConfirm(true)}
                  style={{ backgroundColor: "#508F7F", color: "white" }}
                >
                  <Typography variant="button">
                    <PlayCircleFilled />
                    เริ่มต้นการบริการ
                  </Typography>
                </Button>
              </Grid>
            )}
        </Grid>
        <Submit
          submit={startConfirm}
          title="เริ่มนัดหมาย"
          text="ยืนยันเริ่มการใช้บริการหรือไม่?"
          denyText="ปิด"
          submitText="ยืนยัน"
          denyAction={() => setStartConfirm(false)}
          submitAction={start}
        />
      </CardContent>
      {appointment.Status.Tag !== "Guide Reject" && (
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="แสดงข้อมูลเพิ่มเติม"
          >
            {!expanded && (
              <Typography variant="body1">แสดงข้อมูลไกด์</Typography>
            )}
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
              >
                <Grid item xs={4}>
                  <Image
                    src={"https://pbs.twimg.com/media/D42rqfjU0AA0CBZ.jpg"}
                    // src={appointment.Guide?.Avatar}
                    cover={true}
                    // style={{padding: 0}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Grid item xs={5}>
                      <Typography variant="body1">ชื่อ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.FirstName}{" "}
                        {appointment.Guide?.LastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">เพศ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.Gender === "male"
                          ? "ชาย"
                          : appointment.Guide?.Gender === "female"
                          ? "หญิง"
                          : "อื่น ๆ"}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">เบอร์โทร:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.PhoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardContent className={classes.foot}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            {(new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >
              new Date(
                moment(new Date()).add(1, "days").format("DD MMMM yyyy")
              ) ||
              appointment.Status.Tag === "Guide Reject" ||
              appointment.Status.Tag === "Wait for Guide to Confirm") && (
              <Button
                type="button"
                fullWidth={true}
                variant="contained"
                style={{ padding: "5%" }}
                onClick={() => setConfirmDelete(true)}
              >
                <Typography variant="body1">ยกเลิกนัดหมาย</Typography>
              </Button>
            )}
          </Grid>
          <Grid item xs={4}>
            {(appointment.Status.Tag === "Guide Reject" ||
              appointment.Status.Tag === "Wait for Guide to Confirm") && (
              <Button
                type="button"
                fullWidth={true}
                variant="contained"
                style={{ padding: "5%" }}
                onClick={() => setChangeGuide(true)}
              >
                <Typography variant="body1">เปลี่ยนไกด์</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
        <ChangeGuide
          open={changeGuide}
          setOpen={setChangeGuide}
          appointment={appointment}
          setSuccess={setSuccess}
        />
        <Alert
          closeAlert={() => setSuccess(false)}
          alert={success}
          title="สำเร็จ"
          text="เปลี่ยนไกด์สำเร็จ กรุณารอการตอบรับจากไกด์"
          buttonText="ตกลง"
        />
        <Submit
          submit={confirmDelete}
          title="ยกเลิกนัดหมาย"
          text="ยืนยันการยกเลิกการนัดหมายหรือไม่?"
          denyText="ปิด"
          submitText="ยืนยัน"
          denyAction={() => setConfirmDelete(false)}
          submitAction={deleteAppointment}
        />
      </CardContent>
    </Card>
  );
}

export default AppointmentCard;
