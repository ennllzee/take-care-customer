import { useQuery } from "@apollo/client";
import { CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";
import RecordRow from "./RecordRow";

interface TrackingPageProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    sub: {
      minHeight: "15vh",
    },
    main: {
      minHeight: "70vh",
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    end: {
      minHeight: "5vh",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 12,
    },
    body: {
      fontSize: 10,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function TrackingPage({ id }: TrackingPageProps) {
  const classes = useStyles();
  const { GET_SINGLE_APPOINTMENT } = useCustomerApi();
  const { loading, error, data } = useQuery(GET_SINGLE_APPOINTMENT, {
    variables: { getAppointmentId: id },
  });

  const [appointment, setAppointment] = useState<Appointment>(
    data !== undefined ? data.getAppointment : undefined
  );

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAppointment);
    }
  }, [loading]);

  return (
    <Grid>
      <TopBar page="บันทึกการบริการ" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
        className={classes.root}
      >
        <Grid item className={classes.sub}></Grid>
        <Grid item className={classes.main}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            {!loading ? (
              <>
                <Grid item xs={12} md={12} lg={12}>
                  <AppointmentCard appointment={appointment} />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TableContainer>
                    <Table>
                      <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "50%" }} />
                      </colgroup>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>เวลา</StyledTableCell>
                          <StyledTableCell align="center">
                            กิจกรรม
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            บันทึก
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointment?.Record?.map((r, key) => {
                          return <RecordRow key={key} record={r}/>;
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            ) : (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <CircularProgress disableShrink />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item className={classes.end}></Grid>
      </Grid>
    </Grid>
  );
}

export default TrackingPage;
