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
import {
  Person,
  Wc,
  Cake,
  Healing,
  Email,
  Phone,
  PhoneAndroid,
} from "@material-ui/icons";
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

interface ContactFormProps {
  user: CustomerForm;
  setUser: any;
  setStep: any;
}

function ContactForm({ user, setUser, setStep }: ContactFormProps) {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user.PhoneNumber
  );
  const [email, setEmail] = useState<string | undefined>(user.Email);
  const [emerNum, setEmerNum] = useState<string | undefined>(user.EmergencyTel);

  const back = () => {
    setUser({
      ...user,
      PhoneNumber: phoneNum,
      Email: email,
      EmergencyTel: emerNum,
    });
    setStep(1);
  };

  const next = () => {
    if (phoneNum !== undefined && email !== undefined) {
      setUser({
        ...user,
        PhoneNumber: phoneNum,
        Email: email,
        EmergencyTel: emerNum,
      });
      setStep(3);
    }
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
          <Grid item xs={2}>
            <Typography align="center">
              <Fab
                variant="extended"
                style={{ background: "#AC86C7", color: "white" }}
                disabled={true}
              >
                1
              </Fab>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={2} alignItems="center">
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
                <Typography variant="h4">Contact</Typography>
                <Typography variant="subtitle2" color="textSecondary">ช่องทางการติดต่อ</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">
              <Fab
                variant="extended"
                style={{ background: "#C3A3DB" }}
                disabled={true}
              >
                3
              </Fab>
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ช่องทางการติดต่อ</Typography> */}
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <PhoneAndroid />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรศัพท์มือถือ"
                fullWidth={true}
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                required
                type="text"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Email />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="อีเมล์"
                fullWidth={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Phone />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์ติดต่อกรณีฉุกเฉิน"
                fullWidth={true}
                value={emerNum}
                onChange={(e) => setEmerNum(e.target.value)}
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
              onClick={next}
              // color="primary"
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

export default ContactForm;
