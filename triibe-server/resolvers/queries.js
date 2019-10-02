const Query = {
    user: (root, { email }, { prisma }) => {
      return prisma.user({ email })
    },

    currentUser: (root, args, { prisma, user }) => {
      if (!user) {
        throw new Error('Not Authenticated')
      }
      return prisma.user({ email: user.email }) 
    }
  }


module.exports = Query