const { objectType } = require('nexus')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.chats()
  },
})

const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.model.id()
    t.model.users()
    t.model.messages()
  },
})

const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id()
    t.model.sentBy()
    t.model.sentAt()
    t.model.content()
  },
})

module.exports = { User, Chat, Message }
