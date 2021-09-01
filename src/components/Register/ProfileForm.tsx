import {
  Button,
  CardMedia,
  createStyles,
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

function ProfileForm({ user, setUser, setStep }: ProfileFormProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string | undefined>(
    user.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user.LastName);
  const [dob, setDOB] = useState<Date | undefined>(user.DOB);
  const [disorder, setDisorder] = useState<string | undefined>(
    user.CongenitalDisorders
  );
  const [gender, setGender] = useState<string | undefined>(user.Gender);
  //   const [imgName, setImgName] = useState<any | undefined>(user.FirstName);
  const [baseImage, setBaseImage] = useState<any | undefined>(user.Avatar);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
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
        CongenitalDisorders: disorder,
        Avatar: baseImage,
      });
      setStep(2);
    }
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Typography variant="h4">ข้อมูลส่วนตัว</Typography>
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4}>
              <CardMedia image={baseImage} className={classes.img} />
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-file"
                  //   key={imgName}
                  onChange={(e: any) => {
                    // setImgName(e.currentTarget.files[0].name);
                    uploadImage(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    อัปโหลด
                  </Button>
                </label>
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
                label="ชื่อ"
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
                label="นามสกุล"
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
                <InputLabel id="gender-label" shrink={true}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}
                  fullWidth={true}
                  required
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
                defaultValue={dob === undefined ? undefined : moment(dob).format("YYYY-MM-DD")}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                onChange={(e) => setDOB(new Date(e.target.value))}
                required
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
                value={disorder}
                onChange={(e) => setDisorder(e.target.value)}
                type="text"
              />
            </Grid>
          </Grid>
        </div>

        <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.button}>
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

export default ProfileForm;
