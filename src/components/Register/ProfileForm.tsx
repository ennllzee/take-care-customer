import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  createStyles,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@material-ui/core";
import { Person, Wc, Cake, NavigateNext } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import CustomerForm from "../../models/CustomerForm";
import Alert from "../Alert/Alert";
import Image from "material-ui-image";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: "2%",
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
  displayImg: any;
  setdisplayImg: any;
}

function ProfileForm({
  user,
  setUser,
  setStep,
  displayImg,
  setdisplayImg,
}: ProfileFormProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string | undefined>(
    user.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user.LastName);
  const [dob, setDOB] = useState<string | undefined>(user.DOB);
  const [gender, setGender] = useState<string | undefined>(user.Gender);
  const [avatar, setavatar] = useState<any | undefined>(user.Avatar);

  const [alert, setAlert] = useState<boolean>(false);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    setavatar(file);

    const base64 = await convertBase64(file);
    setdisplayImg(base64);
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const next = () => {
    if (
      firstName !== undefined &&
      lastName !== undefined &&
      gender !== undefined &&
      dob !== undefined
    ) {
      setUser({
        ...user,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        DOB: dob,
        Avatar: avatar,
      });
      setStep(2);
    } else {
      setAlert(true);
    }
  };

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={props.onClick}
      label="?????????????????????"
      fullWidth={true}
      value={dob !== undefined ? convertToThaiDate(new Date(dob)) : null}
      onChange={props.onChange}
      required
      type="text"
      InputProps={{
        readOnly: true,
      }}
    />
  );

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid item xs={12}>
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
                  1
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Profile</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ???????????????????????????????????????
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4} md={3} lg={2} style={{ backgroundColor: "#EFEFEF" }}>
              <Image
                src={displayImg}
                loading={displayImg === undefined ? false : true}
                cover={true}
              />
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-file"
                  onChange={(e: any) => {
                    uploadImage(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-file">
                  <Button
                    component="span"
                    style={{
                      padding: "7%",
                      backgroundColor: "#7C5D92",
                      color: "white",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      spacing={1}
                      justify="center"
                      alignItems="center"
                    >
                      <Typography variant="body1">???????????????????????????????????????????????????</Typography>
                    </Grid>
                  </Button>
                </label>
              </Typography>
              <Typography variant="body1" align="center">
                {avatar !== undefined
                  ? " ???????????????????????????????????????"
                  : " ????????????????????????????????????????????????????????????"}
              </Typography>
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
                label="????????????"
                fullWidth={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="?????????????????????"
                fullWidth={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
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
                <InputLabel id="gender-label" shrink={gender !== undefined}>
                  ?????????
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}
                  fullWidth={true}
                  required
                >
                  <MenuItem value={undefined} disabled>
                    ?????????
                  </MenuItem>
                  <MenuItem value="male">?????????</MenuItem>
                  <MenuItem value="female">????????????</MenuItem>
                  <MenuItem value="others">???????????? ???</MenuItem>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="?????????????????????"
                  value={dob !== undefined ? new Date(dob) : null}
                  onChange={(e) => setDOB(moment(e).format())}
                  openTo="year"
                  views={["year", "month", "date"]}
                  disableFuture
                  fullWidth={true}
                  TextFieldComponent={renderInput}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={next}
              style={{
                padding: "7%",
                backgroundColor: "#7C5D92",
                color: "white",
              }}
            >
              <Grid
                container
                direction="row"
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <Typography variant="body1">???????????????</Typography>
                <NavigateNext />
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </form>
      <Alert
        closeAlert={() => setAlert(false)}
        alert={alert}
        title="????????????????????????????????????"
        text="??????????????????????????????????????????????????????????????????????????????????????????"
        buttonText="?????????"
      />
    </Grid>
  );
}

export default ProfileForm;
