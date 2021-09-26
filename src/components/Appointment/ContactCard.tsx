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
  CardActions,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Minimize, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import clsx from "clsx";
import Guide from "../../models/Guide";

interface ContactCardProps {
  user?: Guide;
  setOpen?: any;
  check?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      // width: "100%",
      padding: 0,
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
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
      padding: 0,
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    below: {
      paddingTop: 0,
    },
  })
);

function ContactCard({
  user,
  setOpen = undefined,
  check = false,
}: ContactCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const convertAvatar = (Avatar: any) => {
    if (Avatar) {
      return `data:${Avatar?.mimetype};base64,${Avatar?.data}`;
    } else {
      return undefined;
    }
  };
  const avatar = convertAvatar(user?.Avatar)
  
  return (
    <Card>
      <CardContent className={classes.card}>
        <CardMedia
          className={classes.cover}
          // image={avatar}
          component="img"
          height="100%"
          image={"https://pbs.twimg.com/media/D42rqfjU0AA0CBZ.jpg"}
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
            <Typography variant="body1">
              {user?.FirstName} {user?.LastName}
            </Typography>
            <Typography variant="body1">
              เพศ:{" "}
              {user?.Gender === "male"
                ? "ชาย"
                : user?.Gender === "female"
                ? "หญิง"
                : "อื่น ๆ"}
            </Typography>
          </CardContent>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="แสดงข้อมูลเพิ่มเติม"
        >
          {!expanded && (
            <Typography variant="button">แสดงข้อมูลเพิ่มเติม</Typography>
          )}

          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.below}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            {user?.LangSkill?.map((m, key) => {
              return (
                <>
                  <Grid item xs={5}>
                    <Typography variant="body1">
                      {key === 0 && "ทักษะด้านภาษา:"}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body1">{m.Language}</Typography>
                  </Grid>
                </>
              );
            })}
            <Grid item xs={5}>
              <Typography variant="body1">เบอร์โทร:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">{user?.PhoneNumber}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ContactCard;
