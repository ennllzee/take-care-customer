import {
  Button,
  CardMedia,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
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
  PhoneAndroid,
  Email,
  Phone,
  AccountCircle,
} from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { history } from "../../helper/history";
import CustomerForm from "../../models/CustomerForm";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import TopBar from "../TopBar/TopBar";
import ContactForm from "./ContactForm";
import ProfileForm from "./ProfileForm";
import RegisterSubmit from "./RegisterSubmit";

import { gql, useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

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
  })
);

function RegisterPage() {
  const classes = useStyles();
  // const [username,setUsername] = useState<string>()
  // const [password,setPassword] = useState<string>()
  // const [confirmedPassword,setConfirmedPassword] = useState<string>()

  const accessToken = localStorage.getItem("accessToken");
  const gmail = localStorage.getItem("gmail");
  const token = localStorage.getItem("token");

  const [alert, setAlert] = useState<boolean>(false);

  const logout = () => {
    setAlert(true);
    history.push("/");
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  useEffect(() => {
    if (accessToken !== null) {
      history.push(`/profile&=${accessToken}`);
    }
    if (gmail === null) {
      history.push("/");
    }
  }, [accessToken, gmail]);

  const [submit, setSubmit] = useState<boolean>(false);

  const { SIGNUP_CUSTOMER } = useCustomerApi();

  const [
    createCustomer,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(SIGNUP_CUSTOMER);

  //NEEDED BACKEND
  const onSubmit = async () => {
    console.log(user);
    await createCustomer({ variables: { createdCustomerInput: { ...user } } });
    signOut();
  };

  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<CustomerForm>({
    Token: token,
  });

  return (
    <Grid>
      <TopBar page="ลงทะเบียน" />
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
            <Grid item xs={12} md={12} lg={12}>
              {/* <Paper className={classes.box}>         */}
              <div className={classes.margin}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="input-with-icon-grid"
                      label="Google Account"
                      fullWidth={true}
                      value={gmail}
                      type="text"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
              {/* </Paper> */}
              {/* </form> */}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {step === 1 && (
                <ProfileForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 2 && (
                <ContactForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 3 && (
                <RegisterSubmit
                  user={user}
                  setUser={setUser}
                  setStep={setStep}
                  setSubmit={setSubmit}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Alert
          closeAlert={() => {
            setAlert(false);
            history.push("/");
          }}
          alert={alert}
          title="ลงทะเบียนสำเร็จ"
          text="โปรดยืนยันตัวตนอีกครั้งผ่านแบบฟอร์มที่ส่งไปยังอีเมล์ที่ติดต่อได้ของท่าน"
          buttonText="ตกลง"
        />
        <Submit
          submit={submit}
          title="ยืนยันการลงทะเบียน?"
          text="กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนกดยืนยัน"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setSubmit(false)}
          submitAction={onSubmit}
        />
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
        <Grid item className={classes.end}></Grid>
      </Grid>
    </Grid>
  );
}
export default RegisterPage;
