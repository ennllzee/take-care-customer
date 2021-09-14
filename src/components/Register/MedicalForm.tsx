import {
  Button,
  CardMedia,
  createStyles,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Person, Wc, Cake, Healing } from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import CustomerForm from "../../models/CustomerForm";

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
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
    button: {
      padding: "5%",
    },
  })
);

interface ProfileFormProps {
  user: CustomerForm;
  setUser: any;
  setStep: any;
}

function MedicalForm({ user, setUser, setStep }: ProfileFormProps) {
  const classes = useStyles();

  const [disorder, setDisorder] = useState<string | undefined>(
    user.CongenitalDisorders
  );

  const next = () => {
      setUser({
        ...user,
        CongenitalDisorders: disorder,
      });
      setStep(3);
  };

  const back = () => {
    setUser({
      ...user,
      CongenitalDisorders: disorder,
    });
    setStep(1);
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          {/* <Grid item xs={1}>
            <Typography align="center">1</Typography>
          </Grid> */}
          <Grid item xs={8}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="flex-start"
            >
              <Grid item>
                <Fab
                  variant="extended"
                  style={{ background: "#AC86C7", color: "white" }}
                  disabled={true}
                >
                  2
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Medical Information</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ข้อมูลทางการแพทย์
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={1}>
            <Typography align="center">3</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center">4</Typography>
          </Grid> */}
        </Grid>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Healing />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="โรคประจำตัว(ไม่จำเป็น)"
                fullWidth={true}
                value={disorder}
                onChange={(e) => setDisorder(e.target.value)}
                type="text"
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={back}
              // color="primary"
              variant="contained"
            >
              ก่อนหน้า
            </Button>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="submit"
              // color="primary"
              onClick={next}
              variant="contained"
            >
              ถัดไป
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default MedicalForm;
