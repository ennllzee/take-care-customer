import { useQuery } from "@apollo/client";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import TrackingPage from "./TrackingPage";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      minHeight: "100vh"
    }
  })
)

function TrackingRoute() {

  const classes = useStyles()

  //waitingfor GET_ALLAPOINTMENT
  const {GET_ALL_APPOINTMENT} = useCustomerApi()

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT, {
    // pollInterval: 1000,
  });

  const [appointments,setAppointments] = useState<Appointment[]>(data !== undefined ? data.getAllAppointment : [])

  useEffect(() => {
    console.log(loading)
    if (!loading && data) {
      setAppointments(data.getAppointment);
    }
    console.log(appointments)
  }, [loading]);

  return (
    <div className={classes.root}>
        <Switch>
          {appointments?.map((a) => {
            console.log(a)
            return <Route exact path={`/tracking&=${a._id}`} component={() => <TrackingPage id={a._id}/>}/>
          })}
        </Switch>
    </div>
  );
}

export default TrackingRoute;
