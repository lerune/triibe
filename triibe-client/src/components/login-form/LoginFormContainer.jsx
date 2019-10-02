import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import LoginFormView from './LoginFormView'

export default function LoginForm() {
  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
      }
    }
  `
  const [login, { data }] = useMutation(LOGIN)
  const handleSubmit = async values => {
    await login({ variables: values })
    console.log(data)
  }
  return <LoginFormView handleSubmit={handleSubmit} />
}
