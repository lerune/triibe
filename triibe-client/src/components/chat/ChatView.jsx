import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'

import { TextField, FormContainer, Button } from './styles'

const ChatView = ({ loading, chatData, handlePostMessage }) => {
  return (
    <>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={async (values, actions) => {
          await handlePostMessage(values.content)
          actions.setSubmitting(false)
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <FormContainer>
            {(loading || isSubmitting) && <div>loading</div>}
            {!(loading || isSubmitting) && (
              <div>
                {chatData.chat.messages.map(message => {
                  return (
                    <div key={message.id}>
                      {message.sentBy.id}
                      {message.content}
                    </div>
                  )
                })}
              </div>
            )}
            <TextField type="text" name="content" />
            <Button type="submit" disabled={isSubmitting}>
              {console.log(isSubmitting)}
              Submit
            </Button>
          </FormContainer>
        )}
      />
    </>
  )
}

export default ChatView
