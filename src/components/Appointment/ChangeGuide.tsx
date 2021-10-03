import {
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Close, PersonPin } from "@material-ui/icons";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import useCustomerApi from "../../hooks/customerhooks";
import AppointmentForm from "../../models/AppointmentForm";
import Customer from "../../models/Customer";
import InformationForm from "./InformationForm";
import SelectGuideForm from "./SelectGuideForm";
import SubmitForm from "./SubmitForm";
import { gql, useMutation, useQuery } from "@apollo/client";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Appointment from "../../models/Appointment";
import ContactCard from "./ContactCard";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";

interface ChangeGuideProps {
  open: boolean;
  setOpen: any;
  appointment: Appointment;
  setSuccess: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "80vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "5%",
    },
    form: {
      paddingTop: "2%",
    },
    card: {
      padding: "2%",
    },
    check: {
      color: "#29A940",
    },
    body: {
      padding: "2%",
    },
  })
);

function ChangeGuide({ open, setOpen, appointment, setSuccess }: ChangeGuideProps) {
  const classes = useStyles();
  const id = localStorage.getItem("_id");

  const { GET_AVAILABLE_GUIDE } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_AVAILABLE_GUIDE, {
    variables: {
      getAvailableGuideCustomerId: id,
      getAvailableGuideDate: appointment?.AppointTime,
      getAvailableGuidePeriod: appointment?.Period,
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [guideId, setGuideId] = useState<string | undefined>(
    appointment?.Guide?._id
  );

  const [availableGuide, setAvailableGuide] = useState<any[]>(
    data !== undefined ? data.getAvailableGuide : []
  );

  const click = (g: any) => {
    if (g?._id === guideId) {
      setGuideId(undefined);
    } else {
      setGuideId(g?._id);
    }
  };

  useEffect(() => {
    if (!loading && data) {
      setAvailableGuide(data.getAvailableGuide);
    }
  }, [loading]);

  const [confirmSubmit, setConfirmSubmit] = useState<boolean>(false);

  const submit = () => {
    if (guideId !== undefined) {
      setConfirmSubmit(true);
    } else {
      setAlert(true);
    }
  };

  const updateGuide = () => {
    //waiting for update guide
    setConfirmSubmit(false)
    setSuccess(true)
    setOpen(false)
  }

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {/* <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" className={classes.line}>
              แบบเพิ่มนัดหมาย
            </Typography>
            <Divider variant="middle" />
          </Grid> */}
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <PersonPin fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">เลือกไกด์</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} lg={12} className={classes.form}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-evenly"
                  className={classes.body}
                >
                  {availableGuide.length !== 0 ? (
                    availableGuide.map((g) => {
                      return (
                        <>
                          {g.Createdby._id === guideId && (
                            <>
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={3}
                                className={classes.card}
                              >
                                <ContactCard
                                  user={g.Createdby}
                                  check={true}
                                  click={() => click(undefined)}
                                />
                              </Grid>
                            </>
                          )}
                          {g.Createdby._id !== guideId && (
                            <Grid
                              item
                              xs={12}
                              md={4}
                              lg={3}
                              className={classes.card}
                            >
                              <ContactCard
                                user={g.Createdby}
                                click={() => click(g.Createdby)}
                              />
                            </Grid>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <Typography
                      align="center"
                      variant="body1"
                      color="textSecondary"
                    >
                      ขออภัย
                      ระบบไม่พบไกด์ที่พร้อมบริการในช่วงเวลาที่ท่านเลือกได้
                    </Typography>
                  )}
                </Grid>
                <Alert
                  closeAlert={() => setAlert(false)}
                  alert={alert}
                  title="เลือกไกด์"
                  text="กรุณาเลือกไกด์"
                  buttonText="ตกลง"
                />
                <Submit
                  submit={confirmSubmit}
                  title="เลือกไกด์"
                  text="ยืนยันการเปลี่ยนไกด์หรือไม่?"
                  denyText="ปิด"
                  submitText="ยืนยัน"
                  denyAction={() => setConfirmSubmit(false)}
                  submitAction={updateGuide}
                />
                <Grid container justify="flex-end" alignItems="center">
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default ChangeGuide;
