const { objectType, idArg, stringArg } = require('nexus')

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()

    t.field('createChat', {
      type: "Chat",
      args: {
        users: idArg({list: true})
      },
      resolve: (root, { users }, ctx) => {
        return ctx.photon.chats.create({ 
          data: {
            users: {
              connect: users.map( user => { return {id: user} })
            }
          },
          include: {
            users: true
          } 
        })
      }
    })
    t.field('postMessage', {
      type: "Message",
      args: {
        sentBy: idArg(),
        sentTo: idArg(),
        content: stringArg()
      },
      resolve: (root, { sentBy, sentTo, content }, ctx) => {
        return ctx.photon.chats.update({
          where: { id: sentTo },
          data: {
            messages: {
              create: {
                sentBy: {
                  connect: {id: sentBy}
                },
                content
              }
            }
          }
        })
      }
    })
  }
})


module.exports = { Mutation }