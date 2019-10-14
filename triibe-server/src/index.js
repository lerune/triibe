const { GraphQLServer } = require('graphql-yoga')
const { join } = require('path')
const { makeSchema } = require('nexus')
const { Photon } = require('@generated/photon')
const { nexusPrismaPlugin } = require('@generated/nexus-prisma')
const cors = require('cors')

const { User, Chat, Message } = require('./schema/Type')
const { Mutation } = require('./schema/Mutation')
const { Query } = require('./schema/Query')

const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx) => ctx.photon,
})


const schema = makeSchema({
  types: [Query, Mutation, User, Chat, Message, nexusPrisma],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
    ],
  },
})

const opts = {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
} 

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      photon,
    }
  },
})

server.start(opts, () => console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`))
module.exports = { User }