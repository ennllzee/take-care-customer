import { gql } from "@apollo/client";

const useCustomerApi = () => {
  const GET_SINGLE_CUSTOMER = gql`
    query GET_SINGLE_CUSTOMER($getCustomerId: ID!) {
      getCustomer(_id: $getCustomerId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
        Gmail
      }
    }
  `;

  const SIGNUP_CUSTOMER = gql`
    mutation CREATE_USER($createdCustomerInput: CustomerSigninInput!) {
      createdCustomer(input: $createdCustomerInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_CUSTOMER = gql`
    mutation UPDATE_CUSTOMER(
      $updateCustomerId: ID!
      $updateCustomerInput: PatienUpdateInput!
    ) {
      updateCustomer(_id: $updateCustomerId, input: $updateCustomerInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        UpdatedAt
      }
    }
  `;

  const DELETE_CUSTOMER = gql`
    mutation DELETE_CUSTOMER($deleteCustomerId: ID!) {
      deleteCustomer(_id: $deleteCustomerId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar {
          filename
          mimetype
          data
        }
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const LOGIN_CUSTOMER = gql`
    query LOGIN_CUSTOMER($loginCustomerToken: String) {
      loginCustomer(Token: $loginCustomerToken) {
        _id
      }
    }
  `;

  const GET_SINGLE_APPOINTMENT = gql`
    query GET_SINGLE_APPOINTMENT($getAppointmentId: ID) {
      getAppointment(_id: $getAppointmentId) {
        _id
        AppointTime
        BeginTime
        EndTime
        Guide {
          FirstName
          LastName
          Email
        }
        Dep {
          Name
        }
        Hospital {
          Name
        }
        Review {
          Star
          Comment
        }
        Record {
          At
          Title
          Description
        }
        OpenLink
        Note
        Status {
          Tag
          Details
        }
        Period
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_ALLAPPOINTMENT_BY_CUSTOMER = gql`
    query GET_ALLAPPOINTMENT_BY_CUSTOMER(
      $getAllAppointmentByCustomerCustomerId: ID!
    ) {
      getAllAppointmentByCustomer(
        CustomerId: $getAllAppointmentByCustomerCustomerId
      ) {
        _id
        AppointTime
        BeginTime
        EndTime
        Guide {
          FirstName
          LastName
          Email
          Gender
          Avatar {
            filename
            mimetype
            data
          }
        }
        Department {
          Name
        }
        Hospital {
          Name
        }
        Review {
          Star
          Comment
        }
        Record {
          At
          Title
          Description
        }
        OpenLink
        Note
        Status {
          Tag
          Details
        }
        Period
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const CREATE_APPOINTMENT = gql`
    mutation CreateAppointmentMutation(
      $createAppointmentInput: BookingAppointmentInput
    ) {
      createAppointment(input: $createAppointmentInput) {
        _id
        AppointTime
      }
    }
  `;

  const UPDATE_APPOINTMENT_GUIDE_REQUEST = gql`
    mutation UpdateAppointmentRequestGuideMutation(
      $updateAppointmentRequestGuideId: ID!
      $updateAppointmentRequestGuideUpdateinput: UpdateAppointmentInput
    ) {
      updateAppointmentRequestGuide(
        _id: $updateAppointmentRequestGuideId
        updateinput: $updateAppointmentRequestGuideUpdateinput
      ) {
        _id
        AppointTime
        Guide {
          FirstName
          LastName
          Email
        }
        Dep {
          Name
        }
        Hospital {
          Name
        }
        Status {
          Tag
          Details
        }
        Period
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_APPOINTMENT_REVIEW = gql`
    mutation UpdateAppointmentReviewMutation(
      $updateAppointmentReviewId: ID!
      $updateAppointmentReviewReviewinput: ReviewInput
    ) {
      updateAppointmentReview(
        _id: $updateAppointmentReviewId
        reviewinput: $updateAppointmentReviewReviewinput
      ) {
        _id
      }
    }
  `;

  const CREATE_REPORT = gql`
    mutation CreateReportMutation($createReportInput: ReportInput!) {
      createReport(input: $createReportInput) {
        _id
        Title
        Description
        ByCustomer {
          _id
        }
        ResponseText
        ResponseByAdmin {
          _id
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_ALLHOSPITAL = gql`
    query GET_ALLHOSPITAL {
      getAllHospital {
        _id
        Name
        Address
        Building {
          _id
          Name
          Department {
            _id
            Name
          }
        }
        Department {
          _id
          Name
        }
        CreatedAt
        UpdatedAt
      }
      getAllDepartment {
        _id
        Name
        Building {
          _id
          Name
        }
        Hospital {
          _id
          Name
        }
      }
    }
  `;

  const GET_ALLBUILDING = gql`
    query GET_ALLBUILDING {
      getAllBuilding {
        _id
        Name
        Department {
          _id
          Name
        }
      }
    }
  `;

  const GET_ALLDEPARTMENT = gql`
    query GET_ALLDEPARTMENT {
      getAllDepartment {
        _id
        Name
        Building {
          _id
          Name
        }
      }
    }
  `;

  const GET_AVAILABLE_GUIDE = gql`
    query GET_AVAILABLE_GUIDE(
      $getAvailableGuideCustomerId: ID
      $getAvailableGuideDate: String!
      $getAvailableGuidePeriod: String!
    ) {
      getAvailableGuide(
        CustomerId: $getAvailableGuideCustomerId
        Date: $getAvailableGuideDate
        Period: $getAvailableGuidePeriod
      ) {
        _id
        ScheduleDate
        Available
        Period
        Createdby {
          FirstName
          LastName
          PhoneNumber
          Email
          LangSkill {
            Language
            Level
          }
          Status {
            Tag
            Details
          }
          _id
          Gender
          Avatar {
            filename
            mimetype
            data
          }
        }
      }
    }
  `;

  const GET_EXTENDTION_DATA = gql`
    query GET_EXTENDTION_DATA {
      getAppointmentStatus
      getPeriod
    }
  `;

  const UPLOAD_PROFILE = gql`
    mutation AddCustomerProfileMutation(
      $addCustomerProfileCustomerId: ID!
      $addCustomerProfileFile: Upload
    ) {
      addCustomerProfile(
        customerId: $addCustomerProfileCustomerId
        file: $addCustomerProfileFile
      )
    }
  `;

  return {
    GET_SINGLE_CUSTOMER,
    SIGNUP_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    LOGIN_CUSTOMER,
    GET_SINGLE_APPOINTMENT,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT_GUIDE_REQUEST,
    UPDATE_APPOINTMENT_REVIEW,
    CREATE_REPORT,
    GET_ALLHOSPITAL,
    GET_ALLBUILDING,
    GET_ALLDEPARTMENT,
    GET_AVAILABLE_GUIDE,
    GET_EXTENDTION_DATA,
    UPLOAD_PROFILE,
  };
};

export default useCustomerApi;
