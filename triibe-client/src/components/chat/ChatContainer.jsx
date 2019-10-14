import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import ChatView from './ChatView'

export default function Chat() {
  const GET_CHATS = gql`
    query {
      chats {
        id
        messages {
          content
        }
      }
    }
  `
  const GET_CURRENT_CHAT = gql`
    query Chat($currentChat: ID!) {
      chat(where: { id: $currentChat }) {
        messages {
          id
          sentBy {
            id
          }
          content
        }
      }
    }
  `
  const POST_MESSAGE = gql`
    mutation PostMessage($sentTo: ID!, $sentBy: ID!, $content: String!) {
      postMessage(sentBy: $sentBy, sentTo: $sentTo, content: $content) {
        id
      }
    }
  `
  const currentUser = 'ck1mm3sjj0000hfj9x2drhh1n'
  const currentChat = 'ck1o3950h0000s0j9vxauaz8v'

  const chatsQuery = useQuery(GET_CHATS, { variables: {} })
  const [postMessage, { postData }] = useMutation(POST_MESSAGE)
  const currentChatQuery = useQuery(GET_CURRENT_CHAT, {
    variables: { currentChat }
  })
  const handlePostMessage = async content => {
    await postMessage({
      variables: { content, sentBy: currentUser, sentTo: currentChat }
    })
  }
  return (
    <ChatView
      loading={currentChatQuery.loading}
      chatData={currentChatQuery.data}
      handlePostMessage={handlePostMessage}
    />
  )
}
