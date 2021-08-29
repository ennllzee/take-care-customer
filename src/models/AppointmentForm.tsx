import Customer from "./Customer";
import Department from "./Department";
import Guide from "./Guide";
import Hospital from "./Hospital";

interface AppointmentForm {
    Period: string //"morning" "afternoon" "all-day"
    AppointTime: any
    Customer: Customer
    Guide?: Guide
    Hospital?: Hospital
    Department?: Department
    Note? : string
}


export default AppointmentForm