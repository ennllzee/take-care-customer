import { gql } from "@apollo/client";

const useCustomerApi = () => {
  const getSingleCustomer = gql`
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

  const signInCustomer = gql`
    mutation Mutation($createdCustomerInput: CustomerSigninInput!) {
      createdCustomer(input: $createdCustomerInput) {
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

  const updateCustomer = gql`
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

  const deleteCustomer = gql`
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

  const getCustomerAppointment = gql``;

  return {
    getSingleCustomer,
    signInCustomer,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
  };
};

export default useCustomerApi;
