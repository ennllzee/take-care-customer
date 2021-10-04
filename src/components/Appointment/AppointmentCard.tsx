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
import { Button, CardHeader, Chip, Grid, Link } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import Submit from "../Submit/Submit";
import ChangeGuide from "./ChangeGuide";
import Alert from "../Alert/Alert";
import {
  Announcement,
  Cancel,
  CheckCircle,
  Delete,
  Error,
  FaceRounded,
  HighlightOff,
  Person,
  PlayCircleFilled,
  Timer,
} from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

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
    monday: {
      backgroundColor: "#FFD68F",
      padding: "1%",
    },
    tuesday: {
      backgroundColor: "#EE9EC7",
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
    deny: {
      backgroundColor: "#EA4A4A",
      color: "white",
    },
    status: {
      padding: "2%",
    },
    wait: {
      backgroundColor: "#F5B32E",
      color: "white",
    },
    confirm: {
      backgroundColor: "#34C156",
      color: "white",
    },
    process: {
      backgroundColor: "#4884E6",
      color: "white",
    },
    cancel: {
      backgroundColor: "#5D5D5D",
      color: "white",
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

  const id = localStorage.getItem("_id");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { DELETE_APPOINTMENT, GET_ALLAPPOINTMENT_BY_CUSTOMER } =
    useCustomerApi();

  const [deleteAppointmentAPI] = useMutation(DELETE_APPOINTMENT, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const deleteAppointment = () => {
    setConfirmDelete(false);
    deleteAppointmentAPI({
      variables: {
        deleteAppointmentId: appointment._id,
      },
      refetchQueries: [
        {
          query: GET_ALLAPPOINTMENT_BY_CUSTOMER,
          variables: { getAllAppointmentByCustomerCustomerId: id },
        },
      ],
    });
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
          <Grid item xs={12} className={classes.status}>
            <Typography variant="body1" align="center">
              {appointment.Status.Tag === "Wait for Guide to Confirm" &&
              new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >
                new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <Chip
                  size="small"
                  icon={<Timer style={{ color: "white" }} />}
                  label="รอการตอบรับจากไกด์"
                  className={classes.wait}
                />
              ) : appointment.Status.Tag === "Guide Confirm" &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) >= new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <>
                  <Chip
                    size="small"
                    icon={<CheckCircle style={{ color: "white" }} />}
                    label="เพิ่มนัดหมายสำเร็จ"
                    className={classes.confirm}
                  />
                </>
              ) : appointment.Status.Tag === "Guide Reject" &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) > new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <>
                  <Chip
                    size="small"
                    icon={<Error style={{ color: "white" }} />}
                    label="ไกด์ปฏิเสธ กรุณาเปลี่ยนไกด์คนใหม่"
                    className={classes.deny}
                  />
                  <Typography color="textSecondary">
                    ข้อความจากไกด์: {appointment.Status.Details}
                  </Typography>
                </>
              ) : appointment.Status.Tag === "In process" ? (
                <>
                  <Chip
                    size="small"
                    icon={<FaceRounded style={{ color: "white" }} />}
                    label="อยู่ระหว่างการรับบริการ"
                    className={classes.process}
                  />
                </>
              ) : (
                <>
                  <Chip
                    size="small"
                    icon={<Cancel style={{ color: "white" }} />}
                    label="การเพิ่มนัดหมายไม่สำเร็จ"
                    className={classes.cancel}
                  />
                  <Typography color="textSecondary">
                    ข้อมูลการนัดหมายจะถูกลบจากระบบในวันถัดไป
                  </Typography>
                </>
              )}
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
        <CardContent style={{ paddingTop: 0 }}>
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
                    // src={"https://pbs.twimg.com/media/D42rqfjU0AA0CBZ.jpg"}
                    src={appointment.Guide?.Avatar}
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
      {(new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >
        new Date(moment(new Date()).add(1, "days").format("DD MMMM yyyy")) ||
        appointment.Status.Tag === "Guide Reject" ||
        appointment.Status.Tag === "Wait for Guide to Confirm" ||
        ((appointment.Status.Tag === "Guide Reject" ||
          appointment.Status.Tag === "Wait for Guide to Confirm") &&
          new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >
            new Date(moment(new Date()).format("DD MMMM yyyy")))) && (
        <CardContent style={{ padding: "2%" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
              {(new Date(
                moment(appointment.AppointTime).format("DD MMMM yyyy")
              ) >
                new Date(
                  moment(new Date()).add(1, "days").format("DD MMMM yyyy")
                ) ||
                appointment.Status.Tag === "Guide Reject" ||
                appointment.Status.Tag === "Wait for Guide to Confirm") && (
                <Button
                  type="button"
                  fullWidth={true}
                  // variant="contained"
                  style={{ padding: "5%" }}
                  onClick={() => setConfirmDelete(true)}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    alignItems="center"
                  >
                    <Delete />
                    <Typography variant="body1">
                      {new Date(
                        moment(appointment.AppointTime).format("DD MMMM yyyy")
                      ) > new Date(moment(new Date()).format("DD MMMM yyyy"))
                        ? "ยกเลิกนัดหมาย"
                        : "ลบ"}
                    </Typography>
                  </Grid>
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              {(appointment.Status.Tag === "Guide Reject" ||
                appointment.Status.Tag === "Wait for Guide to Confirm") &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) > new Date(moment(new Date()).format("DD MMMM yyyy")) && (
                  <Button
                    type="button"
                    fullWidth={true}
                    // variant="contained"
                    style={{ padding: "5%" }}
                    onClick={() => setChangeGuide(true)}
                  >
                    <Grid
                      container
                      direction="row"
                      spacing={1}
                      justify="center"
                      alignItems="center"
                    >
                      <Person />
                      <Typography variant="body1"> เปลี่ยนไกด์</Typography>
                    </Grid>
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
      )}
    </Card>
  );
}

export default AppointmentCard;
