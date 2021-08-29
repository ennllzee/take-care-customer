import { Button, CardMedia, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Theme, Typography } from "@material-ui/core"
import { Person, Wc, Cake, Healing, PhoneAndroid, Email, Phone, AccountCircle } from "@material-ui/icons"
import moment from "moment"
import { useEffect, useState } from "react"
import { history } from "../../helper/history"
import CustomerForm from "../../models/CustomerForm"
import TopBar from "../TopBar/TopBar"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh'
        },
        sub: {
            minHeight: '15vh'
        },
        main: {
            minHeight: '70vh',
            paddingRight: '5%',
            paddingLeft: '5%',
            minWidth: '80vw',
            maxWidth: '100vw'
        },
        form: {
            paddingTop: '5%',
        },
        margin: {
            margin: theme.spacing(1),
        },
        box: {
            padding: "5%",
            marginBottom: "5%"
        },
        end: {
            minHeight: '5vh' 
        },
        img: {
            height: '20vh',
            weight: '80%',
            border: "2px solid #000",
        },
        card: {
            padding: '2%'
        }
    })
)

function RegisterPage() {

    const classes = useStyles()
    // const [username,setUsername] = useState<string>()
    // const [password,setPassword] = useState<string>()
    // const [confirmedPassword,setConfirmedPassword] = useState<string>()
    const [firstName,setFirstName] = useState<string>()
    const [lastName,setLastName] = useState<string>()
    const [dob,setDOB] = useState<Date>()
    const [phoneNum,setPhoneNum] = useState<string>()
    const [email,setEmail] = useState<string | undefined>()
    const [emerNum,setEmerNum] = useState<string | undefined>()
    const [disorder,setDisorder] = useState<string>()
    const [gender, setGender] = useState<string>()
    const [imgName,setImgName] = useState<any | undefined>()
    const [baseImage,setBaseImage] = useState<any | undefined>()
    

    const accessToken = localStorage.getItem("accessToken");
    const gmail = localStorage.getItem("gmail");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (accessToken !== null) {
            history.push(`/profile&=${accessToken}`)
        }
        if(gmail === null){
            history.push("/")
        }
      }, [accessToken,gmail]);

    const onSubmit = () => {

        if(firstName !== undefined && lastName !== undefined && dob !== undefined && phoneNum !== undefined && disorder !== undefined && gender !== undefined && token !== null){
            let user : CustomerForm = {
                FirstName: firstName,
                LastName: lastName,
                Gender: gender,
                DOB: dob,
                PhoneNumber: phoneNum,
                Email: email,
                CongenitalDisorders: disorder,
                EmergencyTel: emerNum,
                Avatar: {imgName, baseImage},
                Token: token,
            }
            localStorage.clear()
            history.push('/')
        }
        
    }

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

    return (
        <Grid>
            <TopBar page="ลงทะเบียน"/>
            <Grid container direction="column" alignItems="center" justify="space-between" className={classes.root}>
                <Grid item className={classes.sub}>

                </Grid>
                <Grid item className={classes.main}>
                    <Grid container direction="row" alignItems="flex-start" justify="center">
                        <Grid item xs={12} md={12} lg={12}>
                            <form className={classes.form}>
                                <Paper className={classes.box}>        
                                    <Typography variant="h4">
                                        บัญชีผู้ใช้
                                    </Typography>
                                    <div className={classes.margin}>
                                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                                            <Grid item >
                                                <AccountCircle />
                                            </Grid>
                                            <Grid item xs={10} >
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
                                </Paper>
                                
                                <Paper className={classes.box}>  
                                    <Typography variant="h4">
                                        Profile
                                    </Typography>
                                    <div className={classes.margin}>
                                        <Grid container spacing={1} justify="center" alignItems="center" className={classes.card}>
                                            <Grid item xs={4} >
                                                <CardMedia
                                                image={baseImage}
                                                className={classes.img}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Typography align="center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="contained-button-file"
                                                    key={imgName}
                                                    onChange={(e: any) => {
                                                    setImgName(e.currentTarget.files[0].name);
                                                    uploadImage(e);
                                                    }}
                                                    hidden
                                                />
                                                <label htmlFor="contained-button-file">
                                                    <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    >
                                                    อัปโหลด
                                                    </Button>{" "}
                                                    {imgName}
                                                </label>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        
                                    </div>
                                    <div className={classes.margin}>
                                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                                            <Grid item >
                                                <Person />
                                            </Grid>
                                            <Grid item xs={5} >
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
                                                <Wc/>
                                            </Grid>
                                            <Grid item xs={10} >
                                                <FormControl required fullWidth={true}>
                                                    <InputLabel id="gender-label" shrink={true}>เพศ</InputLabel>
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
                                                    <MenuItem value="trangender">ทรานสเจนเดอร์</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.margin}>
                                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                                            <Grid item >
                                                <Cake/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    id="date"
                                                    label="Birthday"
                                                    type="date"
                                                    defaultValue={moment(dob).format("YYYY-MM-DD")}
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
                                            <Grid item >
                                                <Healing />
                                            </Grid>
                                            <Grid item xs={10} >
                                                <TextField 
                                                id="input-with-icon-grid" 
                                                label="Congenital disorder"
                                                fullWidth={true}
                                                value={disorder}
                                                onChange={(e) => setDisorder(e.target.value)}
                                                type="text"
                                                required
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Paper>
                                <Paper className={classes.box}>  
                                    <Typography variant="h4">
                                        ช่องทางการติดต่อ
                                    </Typography>
                                    <div className={classes.margin}>
                                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                                            <Grid item >
                                                <PhoneAndroid/>
                                            </Grid>
                                            <Grid item xs={10} >
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
                                            <Grid item >
                                                <Email/>
                                            </Grid>
                                            <Grid item xs={10} >
                                                <TextField 
                                                id="input-with-icon-grid" 
                                                label="อีเมล์" 
                                                fullWidth={true}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.margin}>
                                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                                            <Grid item >
                                                <Phone/>
                                            </Grid>
                                            <Grid item xs={10} >
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
                                </Paper>
                                
                                <Grid container direction="row" justify="flex-end" alignItems="center">
                                    <Grid item xs={4} md={3} lg={2}>
                                        
                                        <Button
                                        fullWidth={true}
                                        type="submit"
                                        onClick={onSubmit}
                                        color="primary"
                                        variant="contained"
                                        >
                                            ยืนยัน
                                        </Button>

                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item className={classes.end}>

                </Grid>
            </Grid>
        </Grid>
    )
}
export default RegisterPage