import { makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from "@material-ui/core";
import { Person, Wc, Cake, Healing, PhoneAndroid, Email, Phone } from "@material-ui/icons";
import moment from "moment";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import Customer from "../../models/Customer";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import ProfileCard from "./ProfileCard";

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
  })
);

function ProfilePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  //   const QUERY_ALL_USERS = gql`
  //   query Queary ($getPatientId: ID!, $getGuideId: ID!, $getAdminId: ID!) {
  //     getPatient(_id: $getPatientId) {
  //       _id
  //       FirstName
  //       LastName
  //       Gender
  //       DOB
  //       PhoneNumber
  //       Email
  //       EmergencyTel
  //       Avatar
  //       CongenitalDisorders
  //       Role
  //     }
  //     getGuide(_id: $getGuideId) {
  //       _id
  //       LastName
  //       FirstName
  //       Gender
  //       DOB
  //       Address
  //       ContactAddress
  //       PhoneNumber
  //       Email
  //       IsValidated
  //       LangSkill {
  //         Languages
  //         Level
  //       }
  //       ValidatedDate
  //       Avatar
  //       CongenitalDisorders
  //       Role
  //     }
  //     getAdmin(_id: $getAdminId) {
  //       _id
  //       FirstName
  //       LastName
  //       Gender
  //       DOB
  //       PhoneNumber
  //       Email
  //       Avatar
  //       CongenitalDisorders
  //       Role
  //     }
  //   }`

  //   const { loading, error, data } = useQuery(QUERY_ALL_USERS, {
  //     variables: { getPatientId: id, getGuideId: id, getAdminId: id},
  //   });

  //   const [user, setUser] = useState<Customer | Guide | undefined>(data !== undefined ? data.getPatient : undefined);

  //   useEffect(() => {
  //     if (!loading) {
  //       if(role === "customer"){
  //         setUser(data.getPatient);
  //         setFirstName(data.getPatient?.FirstName);
  //         setLastName(data.getPatient?.LastName);
  //         setDOB(data.getPatient?.DOB);
  //         setPhoneNum(data.getPatient?.PhoneNumber);
  //         setEmail(data.getPatient?.Email);
  //         setGender(data.getPatient?.Gender);
  //         setDisorder(data.getPatient?.CongenitalDisorders);
  //         setEmerNum(data.getPatient?.EmergencyTel);
  //         setAvatar(data.getPatient?.Avatar);
  //       }else{
  //         setUser(data.getGuide);
  //         setFirstName(data.getGuide?.FirstName);
  //         setLastName(data.getGuide?.LastName);
  //         setDOB(data.getGuide?.DOB);
  //         setPhoneNum(data.getGuide?.PhoneNumber);
  //         setEmail(data.getGuide?.Email);
  //         setGender(data.getGuide?.Gender);
  //         setAvatar(data.getGuide?.Avatar);
  //       }
  //     }
  //   }, [loading]);
  const [user, setUser] = useState<Customer | undefined>();

  const [firstName, setFirstName] = useState<string | undefined>(
    user?.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.LastName);
  const [dob, setDOB] = useState<Date | null>(new Date(user?.DOB));
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
  const [avatar, setAvatar] = useState<any | undefined>(user?.Avatar);
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
      disorder !== undefined &&
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
        className={classes.root}
      >
        <Grid item className={classes.sub}></Grid>
        <Grid item className={classes.main}>
          {/* {!loading ? ( */}
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={10} lg={8}>
                <ProfileCard
                  name={user?.FirstName + " " + user?.LastName}
                  id={user?._id}
                  img={user?.Avatar}
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
                          InputProps={{
                            readOnly: !edit,
                          }}
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
                          InputProps={{
                            readOnly: !edit,
                          }}
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
                          <InputLabel id="gender-label" shrink={true}>
                            เพศ
                          </InputLabel>
                          <Select
                            labelId="gender-label"
                            value={user !== undefined ? gender : "gender"}
                            onChange={(e) => {
                              setGender(e.target.value as string);
                            }}
                            fullWidth={true}
                            inputProps={{
                              readOnly: !edit,
                            }}
                          >
                            <MenuItem value={undefined} disabled>
                              เพศ
                            </MenuItem>
                            <MenuItem value="male">ชาย</MenuItem>
                            <MenuItem value="female">หญิง</MenuItem>
                            <MenuItem value="transgender">
                              ทรานสเจนเดอร์
                            </MenuItem>
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
                        <TextField
                          id="date"
                          label="วันเกิด"
                          type="date"
                          value={moment(dob).format("YYYY-MM-DD")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: !edit,
                          }}
                          fullWidth={true}
                          onChange={(e) => setDOB(new Date(e.target.value))}
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
                        <Healing />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="input-with-icon-grid"
                          label="โรคประจำตัว"
                          fullWidth={true}
                          value={disorder === undefined ? "-" : disorder}
                          onChange={(e) => setDisorder(e.target.value)}
                          InputProps={{
                            readOnly: !edit,
                          }}
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
                          InputProps={{
                            readOnly: !edit,
                          }}
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
                          InputProps={{
                            readOnly: !edit,
                          }}
                          type="text"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {/* {role === "customer" && ( */}
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
                            label="เบอร์ติดต่อกรณีฉุกเฉิน"
                            fullWidth={true}
                            value={emerNum}
                            onChange={(e) => setEmerNum(e.target.value)}
                            InputProps={{
                              readOnly: !edit,
                            }}
                            type="text"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  {/* )} */}
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
          {/* ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )} */}
        </Grid>

        <Grid item className={classes.sub}></Grid>
      </Grid>

      <BottomBar page="Profile" />
    </Grid>
  );
}

export default ProfilePage;
