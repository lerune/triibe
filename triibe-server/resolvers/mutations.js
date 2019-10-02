
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

 const Mutation = {
    registerContact: async (root, { name, email }, { prisma }) => {
      return await prisma.createContact({ name, email })
    },

    registerUser: async (root, { name, email, password }, { prisma }) => {
      const hashedPass = await bcrypt.hash(password, 10)
      return await prisma.createUser({ email, password: hashedPass, name })
    },

    login: async (root, { email, password }, { prisma, response }) => {
      const user = await prisma.user({ email })

      if (!user) { 
        throw new Error('Invalid Login')
      }
      const passMatch = await bcrypt.compare(password, user.password)
      if (!passMatch) {
        throw new Error('Invalid Login')
      }
      const token = jwt.sign({
        id: user.id,
        username: user.email,    
      }, 
      'my-secret-from-env-file-in-prod', 
      {
        expiresIn: '30d'
      })
      response.cookie('token', token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 31, 
      })
      return user
    }
  }


module.exports = Mutation