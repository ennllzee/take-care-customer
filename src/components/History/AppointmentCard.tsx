import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Chip, Grid, Link } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import { RateReview } from "@material-ui/icons";
import Review from "./Review";
import Alert from "../Alert/Alert";
import { Rating } from "@material-ui/lab";

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
      backgroundColor: "#FFDF8E",
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
      backgroundColor: "#FFD0AC",
      padding: "1%",
    },
    friday: {
      backgroundColor: "#9FBFF2",
      padding: "1%",
    },
    saturday: {
      backgroundColor: "#D4B7DE",
      padding: "1%",
    },
    sunday: {
      backgroundColor: "#FF9A9A",
      padding: "1%",
    },
    chip: {
      fontSize: 10,
      backgroundColor: "#508F7F",
      color: "white",
      padding: "1%",
    },
  })
);

interface AppointmentCardProps {
  appointment: Appointment;
  refresh: any
}

function AppointmentCard({ appointment, refresh }: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
              ?????????????????????????????????:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {moment(appointment.AppointTime).format("H.mm ???.")}{" "}
              {appointment.Period === "Morning"
                ? "(????????????)"
                : appointment.Period === "Afternoon"
                ? "(????????????)"
                : "(?????????????????????)"}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ???????????????????????????:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Hospital.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ????????????:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Department.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ?????????????????????????????????????????????:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Note !== null ? appointment.Note : "-"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="?????????????????????????????????????????????????????????"
        >
          {!expanded && (
            <Typography variant="button">??????????????????????????????????????????</Typography>
          )}
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ???????????????????????????:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {moment(appointment.BeginTime).format("HH.mm ???.")}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ?????????????????????????????????:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {moment(appointment.EndTime).format("HH.mm ???.")}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                Tracking Link:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Link
                rel="noopener noreferrer"
                href={`/tracking&=${appointment._id}`}
                target="_blank"
              >
                <Typography variant="body1" align="left">
                  click here
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ????????????:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {appointment.Guide?.FirstName} {appointment.Guide?.LastName}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">???????????????????????????:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{appointment.Price} ?????????</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ????????????????????????????????????????????????:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {appointment.Review?.Star !== null ? (
                  <>
                    <Rating
                      max={5}
                      value={appointment.Review?.Star}
                      style={{ color: "#FFC300" }}
                    />
                  </>
                ) : (
                  <Chip
                    size="small"
                    icon={<RateReview style={{ color: "white" }} />}
                    label="??????????????????????????????????????????????????????"
                    onClick={() => setReview(true)}
                    className={classes.chip}
                  />
                )}
              </Typography>
            </Grid>
            <Review
              appointment={appointment}
              open={review}
              setOpen={setReview}
              setAlert={setAlert}
              refresh={() => refresh()}
            />
            <Alert
              closeAlert={() => setAlert(false)}
              alert={alert}
              title="??????????????????"
              text="??????????????????????????????????????????????????????????????????????????????????????????"
              buttonText="?????????"
            />
            {appointment.Review?.Star !== null && (
              <>
                <Grid item xs={5}>
                  <Typography variant="body1" align="left">
                    ?????????????????????????????????:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1" align="left">
                    {appointment.Review?.Comment !== null ? (
                      <>{appointment.Review?.Comment}</>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AppointmentCard;
