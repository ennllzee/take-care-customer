import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextFieldProps,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  Healing,
  PhoneAndroid,
  Email,
  Phone,
} from "@material-ui/icons";
import moment from "moment";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import Customer from "../../models/Customer";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import ProfileCard from "./ProfileCard";
import { useQuery } from "@apollo/client";

import useCustomerApi from "../../hooks/customerhooks";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import convertToThaiDate from "../../hooks/convertToThaiDate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
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
  })
);

function ProfilePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  const { GET_SINGLE_CUSTOMER } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_SINGLE_CUSTOMER, {
    variables: { getCustomerId: id },
  });

  const [user, setUser] = useState<Customer | undefined>(
    data !== undefined ? data.getCustomer : undefined
  );

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={edit ? props.onClick : undefined}
      label="วันเกิด"
      fullWidth={true}
      value={dob !== undefined ? convertToThaiDate(new Date(dob)) : null}
      onChange={props.onChange}
      required
      type="text"
      disabled={!edit}
      InputProps={{
        readOnly: true,
      }}
    />
  );

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getCustomer);
      setFirstName(data.getCustomer?.FirstName);
      setLastName(data.getCustomer?.LastName);
      setDOB(data.getCustomer?.DOB);
      setPhoneNum(data.getCustomer?.PhoneNumber);
      setEmail(data.getCustomer?.Email);
      setGender(data.getCustomer?.Gender);
      setDisorder(data.getCustomer?.CongenitalDisorders);
      setEmerNum(data.getCustomer?.EmergencyTel);
      setAvatar(
        data.getCustomer.Avatar !== null
          ? `data:${data.getCustomer?.Avatar?.mimetype};base64,${data.getCustomer?.Avatar?.data}`
          : undefined
      );
    }
  }, [loading]);

  const [firstName, setFirstName] = useState<string | undefined>(
    user?.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.LastName);
  const [dob, setDOB] = useState<string | undefined>(user?.DOB);
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user?.PhoneNumber
  );
  const [email, setEmail] = useState<string | undefined>(user?.Email);
  const [emerNum, setEmerNum] = useState<string | undefined>(
    user?.EmergencyTel
  );
  const [disorder, setDisorder] = useState<string | undefined>(
    user?.CongenitalDisorders
  );
  const [gender, setGender] = useState<string | undefined>(user?.Gender);
  const [avatar, setAvatar] = useState<any | undefined>();
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken === null) {
      history.push("/");
    }
  }, [accessToken]);

  const editProfile = () => {
    if (
      user !== undefined &&
      firstName !== undefined &&
      lastName !== undefined &&
      dob !== undefined &&
      phoneNum !== undefined &&
      gender !== undefined
    ) {
      console.log("completed");
    }

    setEdit(false);
  };

  return (
    <Grid>
      <TopBar page="ข้อมูลส่วนตัว" />

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={10} lg={8}>
                <ProfileCard
                  name={user?.FirstName + " " + user?.LastName}
                  gmail={user?.Gmail}
                  img={avatar}
                />
              </Grid>
              <Grid item xs={12} md={10} lg={8}>
                <form className={classes.form}>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
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
                          disabled={!edit}
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
                          disabled={!edit}
                          type="text"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <Wc />
                      </Grid>
                      <Grid item xs={10}>
                        <FormControl required fullWidth={true}>
                          <InputLabel
                            id="gender-label"
                            shrink={gender !== undefined}
                          >
                            เพศ
                          </InputLabel>
                          <Select
                            labelId="gender-label"
                            value={user !== undefined ? gender : "gender"}
                            onChange={(e) => {
                              setGender(e.target.value as string);
                            }}
                            fullWidth={true}
                            disabled={!edit}
                          >
                            <MenuItem value={undefined} disabled>
                              เพศ
                            </MenuItem>
                            <MenuItem value="male">ชาย</MenuItem>
                            <MenuItem value="female">หญิง</MenuItem>
                            <MenuItem value="other">อื่น ๆ</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                  <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <Cake />
                      </Grid>
                      <Grid item xs={10}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            label="วันเกิด"
                            value={dob !== undefined ? new Date(dob) : null}
                            onChange={(e) => setDOB(e?.toISOString())}
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
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <Healing />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="input-with-icon-grid"
                          label="โรคประจำตัว"
                          fullWidth={true}
                          value={
                            disorder === undefined || disorder === null
                              ? "-"
                              : disorder
                          }
                          onChange={(e) => setDisorder(e.target.value)}
                          disabled={!edit}
                          type="text"
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PhoneAndroid />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="input-with-icon-grid"
                          label="เบอร์โทรศัพท์"
                          fullWidth={true}
                          value={phoneNum}
                          onChange={(e) => setPhoneNum(e.target.value)}
                          disabled={!edit}
                          required
                          type="text"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
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
                          disabled={!edit}
                          type="text"
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <Phone />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="input-with-icon-grid"
                          label="เบอร์ติดต่อกรณีฉุกเฉิน(ไม่จำเป็น)"
                          fullWidth={true}
                          value={
                            emerNum === undefined || emerNum === null
                              ? "-"
                              : emerNum
                          }
                          onChange={(e) => setEmerNum(e.target.value)}
                          disabled={!edit}
                          type="text"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <br />
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={4} md={3} lg={2}>
                      {edit && (
                        <Button
                          fullWidth={true}
                          type="submit"
                          onClick={editProfile}
                          color="primary"
                          variant="contained"
                        >
                          ยืนยัน
                        </Button>
                      )}
                      {!edit && (
                        <Button
                          fullWidth={true}
                          type="button"
                          onClick={() => setEdit(true)}
                          color="primary"
                          variant="contained"
                        >
                          แก้ไข
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      </Grid>
      <BottomBar page="Profile" />
    </Grid>
  );
}

export default ProfilePage;
