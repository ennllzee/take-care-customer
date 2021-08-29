import { gql } from "@apollo/client";

const useCustomerApi = () => {
  const getSinglePatient = gql`
    query Query($getPatientId: ID!) {
      getPatient(_id: $getPatientId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const signInPatient = gql`
    mutation Mutation($createdPatientInput: PatientSigninInput!) {
      createdPatient(input: $createdPatientInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const updatePatient = gql`
    mutation Mutation(
      $updatePatientId: ID!
      $updatePatientInput: PatienUpdateInput!
    ) {
      updatePatient(_id: $updatePatientId, input: $updatePatientInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const deletePatient = gql`
    mutation Mutation($deletePatientId: ID!) {
      deletePatient(_id: $deletePatientId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const loginCustomer = gql`
    query Query($loginCustomerToken: String) {
      loginCustomer(Token: $loginCustomerToken) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  return {
    getSinglePatient,
    signInPatient,
    updatePatient,
    deletePatient,
    loginCustomer,
  };
};

export default useCustomerApi;
