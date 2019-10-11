const { objectType } = require('nexus')

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signUpUser' })
    t.crud.deleteOneUser()
  }
})


module.exports = { Mutation }