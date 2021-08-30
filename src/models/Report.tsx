import Customer from "./Customer";

interface Report {
    Title : string
    Description : string
    Reporter : Customer 
    Response? : string
    CreateAt : any
    ResponseAt? : any
}

export default Report