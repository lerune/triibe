const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const cors = require('cors');

const Query = require('./resolvers/queries')
const Mutation = require('./resolvers/mutations')


const opts = {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
} 
const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: { Query, Mutation } ,
  context: ( req ) => {
    return {
      ...req,
      prisma,
    }
  },
});

server.express.use(cookieParser())
server.express.use((request, response, next) => {
  const token = request.cookies.token
  if (token) {
    const { id } = jwt.verify(token, 'my-secret-from-env-file-in-prod')
    request.userId = id
  }
  console.log(request.userId)
  next()
})


server.start(opts, () => console.log("Server is running on http://localhost:4000"));
