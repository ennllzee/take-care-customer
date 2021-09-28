import React, { useState } from "react";
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
import { Button, Grid } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import Submit from "../Submit/Submit";

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
  })
);

interface AppointmentCardProps {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteAppointment = () => {
    setConfirmDelete(false)
    //waiting for delete
  }

  return (
    <Card>
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
        </Grid>
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
            <Button type="button" fullWidth={true} variant="contained" style={{padding: '5%'}} onClick={() => setConfirmDelete(true)}>
              <Typography variant="body1">ยกเลิกนัดหมาย</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            {appointment.Status.Tag === "Guide Reject" ||
              (appointment.Status.Tag === "Wait for Guide to Confirm" && (
                <Button type="button" fullWidth={true} variant="contained" style={{padding: '5%'}}>
                  <Typography variant="body1">เปลี่ยนไกด์</Typography>
                </Button>
              ))}
          </Grid>
        </Grid>
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
