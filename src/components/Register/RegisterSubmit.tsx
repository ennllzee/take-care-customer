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
import Submit from "../Submit/Submit";

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

interface RegisterSubmitProps {
  user: CustomerForm;
  setUser: any;
  setStep: any;
  setSubmit: any;
}

function RegisterSubmit({
  user,
  setUser,
  setStep,
  setSubmit,
}: RegisterSubmitProps) {
  const classes = useStyles();

  const back = () => {
    setStep(2);
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
          <Grid item xs={2}>
            <Typography align="center">
              <Fab
                variant="extended"
                style={{ background: "#AC86C7", color: "white" }}
                disabled={true}
              >
                2
              </Fab>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={2} alignItems="center" justify="flex-end">            
                <Grid item>
                  <Fab
                    variant="extended"
                    style={{ background: "#AC86C7", color: "white" }}
                    disabled={true}
                  >
                    3
                  </Fab>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h4">Submit</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ยืนยันการลงทะเบียน
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ยืนยันการลงทะเบียน</Typography> */}
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4}>
              <CardMedia image={user.Avatar} className={classes.img} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Person />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="ชื่อ"
                fullWidth={true}
                value={user.FirstName}
                required
                type="text"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="นามสกุล"
                fullWidth={true}
                value={user.LastName}
                required
                type="text"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Wc />
            </Grid>
            <Grid item xs={10}>
              <FormControl required fullWidth={true}>
                <InputLabel id="gender-label" shrink={true}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={user.Gender}
                  fullWidth={true}
                  inputProps={{
                    readOnly: true,
                  }}
                >
                  <MenuItem value={undefined} disabled>
                    เพศ
                  </MenuItem>
                  <MenuItem value="male">ชาย</MenuItem>
                  <MenuItem value="female">หญิง</MenuItem>
                  <MenuItem value="others">อื่น ๆ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Cake />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue={moment(user.DOB).format("YYYY-MM-DD")}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                required
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Healing />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="Congenital disorder"
                fullWidth={true}
                value={
                  user.CongenitalDisorders !== undefined
                    ? user.CongenitalDisorders
                    : "-"
                }
                type="text"
                required
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </div>
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
                value={user.PhoneNumber}
                required
                type="text"
                inputProps={{
                  readOnly: true,
                }}
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
                value={user.Email}
                type="text"
                required
                inputProps={{
                  readOnly: true,
                }}
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
                value={
                  user.EmergencyTel !== undefined ? user.EmergencyTel : "-"
                }
                type="text"
                inputProps={{
                  readOnly: true,
                }}
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
              type="button"
              onClick={() => setSubmit(true)}
              // color="primary"
              variant="contained"
            >
              ยืนยัน
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default RegisterSubmit;
