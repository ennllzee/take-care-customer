import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Appointment from "../../models/Appointment";

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

  const [appointmets,setAppointments] = useState<Appointment[]>([])

  return (
    <div className={classes.root}>
        <Switch>
          {/* <Route exact path={`/profile&=${accessToken}`} component={ProfilePage} />
          <Route path={`/appointment&=${accessToken}`} component={AppointmentPage} />
          <Route path={`/history&=${accessToken}`} component={HistoryPage} /> */}
          <Route path={`/tracking&=`} component={TrackingRoute}/>
        </Switch>
    </div>
  );
}

export default TrackingRoute;
