import {
  Button,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Card,
} from "@material-ui/core";
import { Minimize } from "@material-ui/icons";
import Customer from "../../models/Customer";

interface ContactCardProps {
  user?: Customer;
  setOpen?: any;
  check?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      width: "100%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "2%",
      padding: "0",
      width: "60%",
    },
    content: {
      flex: "1 0 auto",
      paddingRight: "0",
      alignItems: "center",
    },
    cover: {
      width: "40%",
    },
    pure: {
      flex: "1 0 auto",
      paddingRight: "0",
      paddingTop: "0",
      alignItems: "center",
    },
    check: {
      flex: "1 0 auto",
      paddingRight: "0",
      alignItems: "center",
      backgroundColor: "#7DC4B2",
    },
  })
);

function ContactCard({
  user,
  setOpen = undefined,
  check = false,
}: ContactCardProps) {
  const classes = useStyles();
  const convertAvatar = (Avatar: any) => {
    if (Avatar) {
      return `data:${Avatar?.mimetype};base64,${Avatar?.data}`;
    } else {
      return undefined;
    }
  };
  const avatar = convertAvatar(user?.Avatar)

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={avatar}
        title={user?.FirstName}
      />
      <div className={classes.details}>
        <CardContent
          className={
            setOpen !== undefined
              ? classes.pure
              : check
              ? classes.check
              : classes.content
          }
        >
          <Typography align="right">
            {setOpen !== undefined && (
              <Button onClick={() => setOpen(false)}>
                <Minimize fontSize="small" />
              </Button>
            )}
          </Typography>
          <Typography variant="body2">
            {user?.FirstName} {user?.LastName}
          </Typography>
          <Typography variant="body2">เพศ: {user?.Gender}</Typography>

          {/* {user.role === "guide" &&
                        <Typography variant="body2">        
                                Language skills: {user.languageSkills?.filter(e => e.level > 3).map((m,key) => {
                                    if(key === 0){
                                        return m.language
                                    }else{
                                        return `, ${m.language}`
                                    }
                                })
                            }                
                        </Typography>
                    }  */}
        </CardContent>
      </div>
    </Card>
  );
}

export default ContactCard;
