import { useQuery } from "@apollo/client";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import AppointmentPage from "../Appointment/AppointmentPage";
import HistoryPage from "../History/HistoryPage";
import ProfilePage from "../Profile/ProfilePage";
import TrackingPage from "../Tracking/TrackingPage";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      minHeight: "100vh"
    }
  })
)

function Home() {

  const classes = useStyles()
  const accessToken = localStorage.getItem('accessToken')

  const {GET_ALL_APPOINTMENT} = useCustomerApi()

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT, {
    pollInterval: 1000,
  });

  const [appointments,setAppointments] = useState<Appointment[]>(data !== undefined ? data.getAllAppointment : [])

  useEffect(() => {
    console.log(loading)
    if (!loading && data) {
      setAppointments(data.getAllAppointment);
    }
    console.log(error)
  }, [loading, data]);

  return (
    <div className={classes.root}>
        <Switch>
          <Route exact path={`/profile&=${accessToken}`} component={ProfilePage} />
          <Route exact path={`/appointment&=${accessToken}`} component={AppointmentPage} />
          <Route exact path={`/history&=${accessToken}`} component={HistoryPage} />
          {appointments?.map((a) => {
            return <Route exact path={`/tracking&=${a._id}`} component={() => <TrackingPage id={a._id}/>}/>
          })}
        </Switch>
    </div>
  );
}

export default Home;
