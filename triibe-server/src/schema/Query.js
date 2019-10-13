const { objectType } = require('nexus')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user()
    t.crud.users()
    t.crud.chat()
    t.crud.chats()
  }
})

module.exports = { Query }