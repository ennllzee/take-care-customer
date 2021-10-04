import {
  createStyles,
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
import InformationForm from "./InformationForm";
import SelectGuideForm from "./SelectGuideForm";
import SubmitForm from "./SubmitForm";
import { useMutation, useQuery } from "@apollo/client";
import Appointment from "../../models/Appointment";

interface AddAppointmentProps {
  open: boolean;
  setOpen: any;
  setSuccess: any;
  appointments: Appointment[]
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
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "85vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "2%",
    },
  })
);

function AddAppointment({
  open,
  setOpen,
  setSuccess,
  appointments
}: AddAppointmentProps) {
  const classes = useStyles();
  const [step, setStep] = useState<number>(1);

  // const [openSubmit,setOpenSubmit] = useState<boolean>(false)
  const id = localStorage.getItem("_id");

  const {
    GET_SINGLE_CUSTOMER,
    CREATE_APPOINTMENT,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
  } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_SINGLE_CUSTOMER, {
    variables: { getCustomerId: id },
  });

  const [
    createAppointment,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_APPOINTMENT);

  const [newAppointment, setNewAppointment] = useState<AppointmentForm>({
    Customer: data !== undefined ? data.getCustomer : undefined,
  });

  const submit = () => {
    console.log(newAppointment)
    createAppointment({
      variables: {
        createAppointmentInput: {
          AppointTime: newAppointment.AppointTime,
          CustomerId: newAppointment.Customer?._id,
          DepId: newAppointment.Department?._id,
          HospitalId: newAppointment.Hospital?._id,
          Note: newAppointment.Note,
          Period: newAppointment.Period,
          ScheuleGuideId: newAppointment.ScheuleGuideId,
        },
      },
      refetchQueries: [
        {
          query: GET_ALLAPPOINTMENT_BY_CUSTOMER,
          variables: { getAllAppointmentByCustomerCustomerId: id },
        },
      ],
    });
    setSuccess(true);
    setOpen(false);
  };

  useEffect(() => {
    setStep(1)
  }, [open])

  useEffect(() => {
    if (!loading) {
      setNewAppointment({
        Customer: data.getCustomer,
      });
    }
  }, [loading]);

  useEffect(() => {
    setNewAppointment({
      Customer: data !== undefined ? data.getCustomer : undefined,
    });
  }, [data]);

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
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            {step === 1 ? (
              <InformationForm
                appointment={newAppointment}
                setAppointment={setNewAppointment}
                setStep={setStep}
                appointments={appointments}
                // date={date}
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
