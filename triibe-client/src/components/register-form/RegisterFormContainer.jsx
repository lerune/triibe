import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import RegisterFormView from './RegisterFormView'

export default function RegisterForm() {
  const REGISTER = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
      registerUser(email: $email, password: $password, name: $name) {
        id
        email
      }
    }
  `
  const [register, { data }] = useMutation(REGISTER)
  const handleSubmit = async values => {
    await register({ variables: values })
    console.log(data)
  }
  return <RegisterFormView handleSubmit={handleSubmit} />
}
