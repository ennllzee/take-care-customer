import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/styles";
import moment from "moment";
import { Theme } from "pretty-format";
import { useEffect, useState } from "react";
import Appointment from "../../models/Appointment";
import Record from "../../models/Record";
import Alert from "../Alert/Alert";
import { useMutation, useQuery } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

interface ReviewProps {
  appointment: Appointment;
  open: boolean;
  setOpen: any;
  setAlert: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
    },
  })
);

function Review({ appointment, open, setOpen, setAlert }: ReviewProps) {
  const classes = useStyles();

  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string | undefined>();
  const [alertData, setAlertData] = useState<boolean>(false);

  const { UPDATE_APPOINTMENT_REVIEW } = useCustomerApi();
  const [addReview] = useMutation(UPDATE_APPOINTMENT_REVIEW, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const submit = () => {
    if (rate !== 0) {
      let newReview = {
        Star: rate,
        Comment: comment
      }

      addReview({
        variables: {
          updateAppointmentRecordId: appointment._id,
          updateAppointmentRecordRecordinput: {...newReview},
      }});

      setAlert(true);
      setOpen(false)
    } else {
      setAlertData(true);
    }
  };

  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={open}
      className={classes.root}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">ประเมินความพึงพอใจ</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="ความคิดเห็น (ถ้ามี)"
          fullWidth={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={submit} color="primary">
            ยืนยัน
          </Button>
        </DialogActions>
      </DialogActions>
      <Alert closeAlert={() => setAlertData(false)} alert={alertData} title="ข้อมูลไม่ครบ" text="โปรดให้คะแนน" buttonText="ตกลง"/>
    </Dialog>
  );
}

export default Review;
