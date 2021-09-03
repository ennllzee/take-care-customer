import { gql } from "@apollo/client";

const useCustomerApi = () => {
  const GET_SINGLE_CUSTOMER = gql`
    query Query($getCustomerId: ID!) {
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
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const SIGNUP_CUSTOMER = gql`
    mutation CREAT_USER($createdCustomerInput: CustomerSigninInput!) {
      createdCustomer(input: $createdCustomerInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        PhoneNumber
        Email
        EmergencyTel
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_CUSTOMER = gql`
    mutation Mutation(
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
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const DELETE_CUSTOMER = gql`
    mutation Mutation($deleteCustomerId: ID!) {
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
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const LOGIN_CUSTOMER = gql`
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
    GET_SINGLE_CUSTOMER,
    SIGNUP_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    LOGIN_CUSTOMER,
  };
};

export default useCustomerApi;
