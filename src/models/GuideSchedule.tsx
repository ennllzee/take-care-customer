import Appointment from "./Appointment";
import Guide from "./Guide";

interface GuideSchedule {
    _id: string
    Date: any
    Period: string //"morning" "afternoon" "all-day"
    Guide: Guide
    IsAvailable: boolean
    WorkOnAppointmentId: Appointment
    Status: {
        Tag: string
        Details: string[]
    }
}

export default GuideSchedule