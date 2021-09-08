import { useQuery } from "@apollo/client";
import {
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
import { Close } from "@material-ui/icons";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import useCustomerApi from "../../hooks/customerhooks";
import AppointmentForm from "../../models/AppointmentForm";
import Customer from "../../models/Customer";
import InformationForm from "./InformationForm";
import SelectGuideForm from "./SelectGuideForm";
import SubmitForm from "./SubmitForm";

interface AddAppointmentProps {
  open: boolean;
  setOpen: any;
  date: any;
  setSuccess: any;
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
  })
);

function AddAppointment({
  open,
  setOpen,
  date,
  setSuccess,
}: AddAppointmentProps) {
  const classes = useStyles();
  const [step, setStep] = useState<number>(1);
  
  // const [openSubmit,setOpenSubmit] = useState<boolean>(false)
  const id = localStorage.getItem("_id")

  const { GET_SINGLE_CUSTOMER } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_SINGLE_CUSTOMER, {
    variables: { getCustomerId: id },
  });

  const [newAppointment, setNewAppointment] = useState<AppointmentForm>({
    Customer: data !== undefined ? data.getCustomer : undefined
});

  const submit = () => {
    //wait for createAppointment
    setSuccess(true);
    setOpen(false);
  };

  useEffect (() => {
    if(!loading){
        setNewAppointment({
            Customer: data.getCustomer
        });
    }
  }, [loading])

  useEffect(() => {
    setNewAppointment({
        Customer: data !== undefined ? data.getCustomer : undefined
    });
  }, [date]);

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
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" className={classes.line}>
              {moment(date).format("DD MMMM YYYY")}
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            {step === 1 ? (
              <InformationForm
                appointment={newAppointment}
                setAppointment={setNewAppointment}
                setStep={setStep}
                date={date}
              />
            ) : step === 2 ? (
              <SelectGuideForm
                appointment={newAppointment}
                setAppointment={setNewAppointment}
                setStep={setStep}
              />
            ) : (
              <SubmitForm
                appointment={newAppointment}
                setStep={setStep}
                submit={submit}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default AddAppointment;