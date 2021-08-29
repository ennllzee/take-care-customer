import { CardContent, CardMedia, createStyles, Grid, makeStyles, Theme, Typography, Card } from "@material-ui/core"
import { history } from "../../helper/history"
import { GoogleLogout } from 'react-google-login';

interface ProfileCardProps{
    name: string
    id: any
    img: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            padding: '2%',
            width: "60%"
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: "40%",
        },
        logout: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    })
)

function ProfileCard({name, id, img} : ProfileCardProps){

    const classes = useStyles()

    const logout = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <Card className={classes.card}>
            <CardMedia
            className={classes.cover}
            image={img}
            title={name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {name}
                        <br/>
                        <Typography variant="caption" color="textSecondary">
                            ID: {id}
                        </Typography>
                    </Typography>
                </CardContent>
                <Grid container justify="flex-end" className={classes.logout}>
                    <GoogleLogout
                    clientId="907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    icon={false}
                    >
                    </GoogleLogout>
                </Grid>
            </div>
        </Card>
    )
}

export default ProfileCard