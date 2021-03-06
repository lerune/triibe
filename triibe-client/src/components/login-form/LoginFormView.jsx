import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { TextField, FormContainer, Button } from './styles'

const LoginFormView = ({ handleSubmit }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => {
      handleSubmit(values)
    }}
    render={({ errors, status, touched, isSubmitting }) => (
      <FormContainer>
        <TextField type="email" name="email" />
        {errors.email && touched.email && <div>{errors.email}</div>}
        <TextField type="password" name="password" />
        {errors.social && errors.social.facebook && touched.social.facebook && (
          <div>{errors.social.facebook}</div>
        )}
        {status && status.msg && <div>{status.msg}</div>}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </FormContainer>
    )}
  />
)

LoginFormView.propTypes = {
  handleSubmit: PropTypes.func
}

LoginFormView.defaultProps = {
  handleSubmit: () => console.error('Submit Function Not Passed')
}

export default LoginFormView
