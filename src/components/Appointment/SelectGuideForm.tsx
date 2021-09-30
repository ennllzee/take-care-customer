import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { PersonPin } from "@material-ui/icons";
import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import AppointmentForm from "../../models/AppointmentForm";
import Alert from "../Alert/Alert";
import useCustomerApi from "../../hooks/customerhooks";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface SelectGuideFormProps {
  appointment?: AppointmentForm;
  setAppointment: any;
  setStep: any;
}

function SelectGuideForm({
  appointment,
  setAppointment,
  setStep,
}: SelectGuideFormProps) {
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

  const next = () => {
    if (availableGuide.find((g) => g.Createdby._id === guideId)) {
      setAppointment({
        ...appointment,
        Guide: availableGuide.find((g) => g.Createdby._id === guideId)
          .Createdby,
        ScheuleGuideId: availableGuide.find((g) => g.Createdby._id === guideId)
          ._id,
      });
      setStep(3);
    } else {
      setAlert(true);
    }
  };

  const back = () => {
    if(guideId !== undefined){
      setAppointment({
        ...appointment,
        Guide: availableGuide.find((g) => g.Createdby._id === guideId).Createdby,
        ScheuleGuideId: availableGuide.find((g) => g.Createdby._id === guideId)
          ._id,
      });
    }
    setStep(1);
  };

  const click = (g: any) => {
    if (g?._id === guideId) {
      setGuideId(undefined);
    } else {
      setGuideId(g?._id);
    }
  };

  useEffect(() => {
    if (!loading && data) {
      console.log(data.getAvailableGuide);
      setAvailableGuide(data.getAvailableGuide);
    }
  }, [loading]);

  useEffect(() => {
    console.log(availableGuide.find((e) => e._id === guideId));
  }, [guideId]);

  return (
    <Grid container direction="row" alignItems="center" justify="flex-start">
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
                        // onClick={() => setGuideId(undefined)}
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
                      // onClick={() => click(g.Createdby)}
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
              ขออภัย ระบบไม่พบไกด์ที่พร้อมบริการในช่วงเวลาที่ท่านเลือกได้
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
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={4} md={4} lg={4}>
            <Typography align="left">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={back}
              >
                ก่อนหน้า
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <Typography align="right">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={next}
              >
                ถัดไป
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SelectGuideForm;
